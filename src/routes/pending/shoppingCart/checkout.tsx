import {
	type CartItemProps,
	useCart,
} from '../../../contexts/pending/cart.context.tsx';
import { useEffect, useState } from 'react';

function Checkout() {
	const shoppingCart = useCart();
	const [cart, setCart] = useState<CartItemProps[]>([]);

	// Campos del formulario de dirección
	const [street, setStreet] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zip, setZip] = useState('');

	useEffect(() => {
		shoppingCart.getProducts().then((result) => setCart(result));
	}, []);

	const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

	const handleCheckout = (e: React.FormEvent) => {
		e.preventDefault();

		const shippingData = {
			street,
			city,
			state,
			zip,
		};

		console.log('Dirección:', shippingData);
		console.log('Productos comprados:', cart);

		alert('Pedido realizado con éxito');
	};

	return (
		<div className="flex flex-col mx-auto w-full max-w-3xl p-6 gap-6">
			<h2 className="text-3xl font-bold text-center">Checkout</h2>

			<div className="flex flex-col gap-4 overflow-y-auto max-h-96 p-4 border rounded-lg bg-base-200">
				{cart.length === 0 ? (
					<p className="text-center text-gray-500">El carrito está vacío</p>
				) : (
					cart.map((item) => (
						<div
							key={item.uuid + item.format}
							className="flex justify-between items-center p-3 bg-white rounded-lg shadow"
						>
							<div className="flex gap-3">
								<img
									src={item.imgUrl}
									alt={item.title}
									className="w-16 h-16 object-cover rounded"
								/>
								<div>
									<p className="font-semibold">{item.title}</p>
									<p className="text-sm text-gray-600">
										{item.format?.toUpperCase()} — x{item.quantity}
									</p>
								</div>
							</div>

							<p className="font-bold">{item.price * item.quantity} €</p>
						</div>
					))
				)}
			</div>

			<div className="text-xl font-bold text-center">Total: {total} €</div>

			<form
				onSubmit={handleCheckout}
				className="flex flex-col gap-4 bg-base-200 p-6 rounded-lg shadow"
			>
				<h3 className="text-xl font-bold mb-2">Dirección de envío</h3>

				<div className="flex flex-col">
					<label className="font-semibold">Calle</label>
					<input
						type="text"
						className="input input-bordered w-full"
						value={street}
						onChange={(e) => setStreet(e.target.value)}
						placeholder="c/ Ejemplo, 123"
						required
					/>
				</div>

				<div className="flex flex-col">
					<label className="font-semibold">Ciudad</label>
					<input
						type="text"
						className="input input-bordered w-full"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						placeholder="Mérida"
						required
					/>
				</div>

				<div className="flex flex-col">
					<label className="font-semibold">Estado / Provincia</label>
					<input
						type="text"
						className="input input-bordered w-full"
						value={state}
						onChange={(e) => setState(e.target.value)}
						placeholder="Extremadura"
						required
					/>
				</div>

				<div className="flex flex-col">
					<label className="font-semibold">Código Postal</label>
					<input
						type="text"
						className="input input-bordered w-full"
						value={zip}
						onChange={(e) => setZip(e.target.value)}
						placeholder="28001"
						pattern="[0-9]{5}"
						required
					/>
				</div>

				<button className="btn btn-success mt-2" type="submit">
					Completar pedido
				</button>
			</form>
		</div>
	);
}

export default Checkout;
