import { FaShoppingCart } from 'react-icons/fa';
import {
	type CartItemProps,
	useCart,
} from '../../../contexts/pending/cart.context.tsx';
import ShoppingCartItem from './ShoppingCartItem.tsx';
import { useEffect, useState } from 'react';
import AddToCartButton from './AddToCartButton.tsx';

function ShoppingCart() {
	const shoppingCart = useCart();
	const [cart, setCart] = useState<CartItemProps[]>([]);

	useEffect(() => {
		shoppingCart.getProducts().then((result) => setCart(result));
	}, []);

	useEffect(() => {
		shoppingCart.getProducts().then((result) => setCart(result));
	}, [cart]);

	return (
		<div className="drawer drawer-end">
			<AddToCartButton
				item={{
					format: 'cd',
					uuid: 'bc681e92-7634-4210-9354-d9cd2d2df71e',
					type: 'song',
					quantity: 1,
				}}
			></AddToCartButton>
			<input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content">
				<label htmlFor="my-drawer-5" className="drawer-button btn btn-primary">
					<FaShoppingCart />
				</label>
			</div>
			<div className="drawer-side justify-around">
				<label
					htmlFor="my-drawer-5"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>

				<div className="menu bg-base-200 min-h-full w-120 flex overflow-y-auto flex-col gap-4">
					<div className="flex flex-col gap-2 space-between ">
						{cart.length !== 0 ? (
							cart.map((item) => <ShoppingCartItem item={item} />)
						) : (
							<div>
								<h1 className="flex justify-center font-black text-lg">
									El carrito está vacío
								</h1>
							</div>
						)}
					</div>
					<div>
						{cart.length !== 0 ? (
							<button className="btn btn-primary w-full h-10 justify-center">
								Comprar ya
							</button>
						) : (
							<div></div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ShoppingCart;
