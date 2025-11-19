import { type CartItemPopulated, useCart } from '../contexts/cart.context.tsx';
import {MdDelete, MdShoppingCart} from 'react-icons/md';
import {useNavigate} from "react-router";

const CartItemCard = ({ item }: { item: CartItemPopulated }) => {
	const cart = useCart();
	const format =
		item.format == 'cd' ? 'CD' :
		item.format == 'vinyl' ? 'Vinilo' :
		item.format === 'digital' ? 'Digital' :
		'Cassette';

	return (
		<div className="card bg-base-100 w-full shadow-sm flex-row">
			<figure className="rounded-none rounded-tl-md rounded-bl-md">
				<img src={item.cover} alt="Artículo de carrito" className="w-40 h-40" />
			</figure>
			<div className="card-body flex-row justify-between p-2">
				<div className="flex flex-col gap-2 h-full">
					<p className="font-bold text-xl truncate max-w-[380px]">{item.title}</p>
					<p className="truncate max-w-[380px]">{item.author}</p>
					<div className="flex gap-2">
						<span className="badge badge-primary">{format}</span>
					</div>
					<div className="grow">
						<p className="text-3xl font-semibold">{(item.price / 100).toFixed(2)} <span className="text-xl">€</span></p>
					</div>
				</div>
				<div className="flex">
					<button
						className="btn btn-shadow btn-square rounded-none rounded-tl-md rounded-bl-md"
						onClick={() => cart.setQuantity(item, item.quantity - 1)}
					>
						-
					</button>
					<input
						type="number"
						disabled
						placeholder={item.quantity.toString()}
						className="input rounded-none w-16 text-center"
					/>
					<button
						className="btn btn-shadow btn-square rounded-none rounded-tr-md rounded-br-md"
						onClick={() => cart.setQuantity(item, item.quantity + 1)}
					>
						+
					</button>

					<button
						className="btn btn-error btn-square ml-2"
						onClick={() => cart.remove(item)}
					>
						<MdDelete className="w-5 h-5" />
					</button>
				</div>
			</div>
		</div>
	);
};

const CartDrawer = () => {
	const cart = useCart();
	const navigate = useNavigate();
	return (
		<div className="drawer drawer-end">
			<input id="cart-drawer" type="checkbox" className="drawer-toggle" />

			<div className="drawer-side">
				<label
					htmlFor="cart-drawer"
					aria-label="Cerrar carrito"
					className="drawer-overlay"
				/>
				<div className="flex flex-col gap-2 bg-base-100 h-full w-[800px] p-5">
					<p className="font-bold text-xl">Carrito</p>
					{cart.populatedCart.length === 0 &&
						<div className="flex flex-col gap-5 items-center">
							<MdShoppingCart className="w-36 h-36" />
							<p className="font-semibold text-xl">Tu carrito está vacío</p>
							<button className="btn btn-primary w-fit" onClick={() => navigate('/shop')}>
								Seguir comprando
							</button>
						</div>
					}
					{cart.populatedCart.map((item, index) => (
						<CartItemCard item={item} key={index} />
					))}
					{cart.populatedCart.length > 0 &&
						<button className="btn btn-primary">
							Pagar
						</button>
					}
				</div>
			</div>
		</div>
	);
};

export default CartDrawer;
