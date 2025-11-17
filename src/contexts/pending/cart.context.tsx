import {
	createContext,
	useContext,
	type ReactNode,
	useState,
	useEffect,
} from 'react';
import type { Album, Song } from './search.context.tsx';
import { useToast } from '../toast.context.tsx';

export interface CartItemType {
	type: 'song' | 'album' | 'merch';
	uuid: string;
	format?: 'cd' | 'vinyl' | 'cassette' | 'digital';
	quantity: number;
}

export interface CartItemProps extends CartItemType {
	imgUrl: string;
	title: string;
	price: number;
}

export interface CartProps {
	items: CartItemType[];
}

interface CartContextType {
	cart: CartProps;
	getProducts: () => Promise<CartItemProps[]>;
	addItemToCart: (item: CartItemType) => void;
	setQuantity: (item: Partial<CartItemType>, quantity: number) => void;
	removeItemFromCart: (item: Partial<CartItemType>) => void;
	removeOne: (item: Partial<CartItemType>) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const initCart = () => {
		const savedCart = localStorage.getItem('cart');
		if (!savedCart) {
			const newCart = { items: [] };
			localStorage.setItem('cart', JSON.stringify(newCart));
			return newCart;
		} else {
			return JSON.parse(savedCart);
		}
	};

	const [cart, setCart] = useState<CartProps>(initCart());
	const toast = useToast();

	useEffect(() => {
		if (!cart) return;
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const getProducts = async () => {
		const arrayResponse: CartItemProps[] = [];

		for (let i: number = 0; i < cart.items.length; i++) {
			if (cart.items[i].type === 'song') {
				const url = new URL(
					`${window.location.origin}/api/v1/content/songs/${cart.items[i].uuid}`,
				);

				const response = await fetch(url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (!response.ok) {
					const body = await response.json();
					throw new Error(body.message);
				}

				const data = (await response.json()) as Song;
				const fixedData: CartItemProps = {
					imgUrl: data.cover,
					title: data.title,
					type: 'song',
					uuid: data.uuid,
					format: cart.items[i].format,
					quantity: cart.items[i].quantity,
					price: data.pricing[cart.items[i].format!] as number,
				};

				arrayResponse.push(fixedData);
			} else if (cart.items[i].type === 'album') {
				const url = new URL(
					`${window.location.origin}/api/v1/content/albums/${cart.items[i].uuid}`,
				);

				const response = await fetch(url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (!response.ok) {
					const body = await response.json();
					throw new Error(body.message);
				}

				const data = (await response.json()) as Album;
				const fixedData: CartItemProps = {
					imgUrl: data.cover,
					title: data.title,
					type: 'album',
					uuid: data.uuid,
					format: cart.items[i].format,
					quantity: cart.items[i].quantity,
					price: data.pricing[cart.items[i].format!] as number,
				};

				arrayResponse.push(fixedData);
			} else if (cart.items[i].type === 'merch') {
				const url = new URL(
					`${window.location.origin}/api/v1/content/products/${cart.items[i].uuid}`,
				);

				const response = await fetch(url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (!response.ok) {
					const body = await response.json();
					throw new Error(body.message);
				}

				/*const data = await response.json() as Merch;
				const fixedData: CartItemProps = {
					imgUrl: data.cover,
					title: data.title,
					type: 'album',
					uuid: data.uuid,
					format: cart.items[i].format,
					quantity: cart.items[i].quantity,
					price: data.pricing[cart.items[i].format!] as number
				}

				arrayResponse.push(fixedData);*/
			}
		}
		return arrayResponse;
	};

	const addItemToCart = (item: CartItemType) => {
		console.log(cart);
		const itemAlreadyInCartIndex = cart.items.findIndex((cartItem) => {
			return cartItem.uuid === item.uuid && cartItem.format === item.format;
		});

		if (itemAlreadyInCartIndex !== -1) {
			if (item.format === 'digital') {
				toast.showToast(
					'No se pueden adquirir dos veces el mismo articulo digital',
					'error',
					5,
				);
				return;
			}

			const newItems = [...cart.items];
			newItems[itemAlreadyInCartIndex] = {
				...newItems[itemAlreadyInCartIndex],
				quantity: newItems[itemAlreadyInCartIndex].quantity + item.quantity,
			};

			console.log('Articulo añadido' + newItems);
			setCart({ items: newItems });
		} else {
			toast.showToast('Producto añadido al carrito', 'success', 5);
			setCart({ items: [...cart.items, item] });
		}
	};

	const setQuantity = (item: Partial<CartItemType>, quantity: number) => {
		if (quantity < 1) {
			removeItemFromCart(item);
			return;
		}

		const itemIndex = cart.items.findIndex(
			(cartItem) => cartItem.uuid === item.uuid && cartItem.format === item.format,
		);

		if (itemIndex !== -1) {
			const newItems = [...cart.items];
			newItems[itemIndex] = {
				...newItems[itemIndex],
				quantity,
			};

			setCart({ items: newItems });
		}
	};

	const removeOne = (item: Partial<CartItemProps>) => {
		const cartItem = cart.items.find(
			(cartItem) => cartItem.uuid === item.uuid && cartItem.format === item.format,
		);
		if (cartItem!.quantity > 1) {
			setQuantity(cartItem!, cartItem!.quantity - 1);
		} else {
			removeItemFromCart(cartItem!);
		}
	};

	const removeItemFromCart = (item: Partial<CartItemType>) => {
		const removeItem = cart.items.filter(
			(cartItem) => cartItem.uuid !== item.uuid && cartItem.format !== item.format,
		);

		setCart({ items: removeItem });
		toast.showToast('Producto eliminado con exito', 'success', 5);
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				getProducts,
				addItemToCart,
				setQuantity,
				removeItemFromCart,
				removeOne,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context)
		throw new Error('useCaer sólo puede ser usado dentro de CartContext');
	return context;
};
