import {
	type CartItemPopulated,
	useCart,
} from '../../contexts/cart.context.tsx';
import AddressBook from '../user/settings/address-book.component.tsx';
import { useState } from 'react';
import { useOrder } from '../../contexts/order.context.tsx';
import { useToast } from '../../contexts/toast.context.tsx';
import { useNavigate } from 'react-router';

const CheckoutItem = ({ item }: { item: CartItemPopulated }) => {
	return (
		<div className="flex gap-2">
			<img
				src={item.cover}
				alt="Ítem de carrito"
				className="w-24 h-24 rounded-box"
			/>
			<div className="flex flex-col w-48">
				<p className="font-semibold text-xl truncate w-40">{item.title}</p>
				<span className="badge badge-accent">
					{item.type === 'song'
						? 'Canción'
						: item.type === 'album'
							? 'Álbum'
							: 'Merchandising'}
				</span>
				<p className="pt-2">Cantidad: {item.quantity}</p>
			</div>
			<div className="flex flex-col gap-2">
				<p className="text-2xl">{(item.price / 100).toFixed(2)} €</p>
			</div>
		</div>
	);
};

const Checkout = () => {
	const cart = useCart();
	const order = useOrder();
	const toast = useToast();
	const navigate = useNavigate();
	const [selectedAddress, setSelectedAddress] = useState<string>('0');

	const shipping = () => {
		return cart.populatedCart!.some(item => item.format === undefined || item.format !== 'digital') ? 5 : 0;
	}

	const totalPrice = () => {
		if (cart.populatedCart!.length === 1) {
			return (cart.populatedCart![0].price * cart.populatedCart![0].quantity / 100 + shipping()).toFixed(2);
		}
		let sum = 0;
		for (const item of cart.populatedCart!) {
			sum += item.price * item.quantity;
		}
		return (sum / 100 + shipping()).toFixed(2);
	};

	if (cart.cart.length == 0) navigate('/');
	if (!cart.populatedCart) return <div className="skeleton w-full h-96" />;

	return (
		<div className="p-5 flex gap-5 justify-center">
			<div className="grow bg-base-100 p-5 rounded-box max-w-6xl">
				<AddressBook
					selectedAddress={selectedAddress}
					setSelectedAddress={setSelectedAddress}
				/>
			</div>
			<div className="divider divider-horizontal" />
			<div className="flex flex-col gap-2">
				<p className="text-2xl font-semibold">Resumen</p>
				{cart.populatedCart.map((item, index) => (
					<CheckoutItem item={item} key={index} />
				))}
				<div className="divider divider-vertical p-0 m-0" />
				<div className="flex gap-2 justify-between items-center">
					<p>Envío</p>
					<p className="text-xl font-bold">{shipping() === 0 ? 'Gratis' : shipping() + ' €'}</p>
				</div>
				<div className="flex gap-2 justify-between">
					<p>Total</p>
					<p className="text-3xl font-bold">{totalPrice()} €</p>
				</div>
				<button
					className="btn btn-primary mt-5"
					onClick={() => {
						if (selectedAddress !== '0') order.createOrder(selectedAddress);
						else toast.showToast('Selecciona una dirección', 'error', 3000);
					}}
				>
					Pagar
				</button>
			</div>
		</div>
	);
};

export default Checkout;
