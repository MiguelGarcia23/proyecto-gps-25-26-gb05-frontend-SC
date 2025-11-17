import {
	type CartItemProps,
	useCart,
} from '../../contexts/pending/cart.context.tsx';

function ShoppingCartItem({ item }: { item: CartItemProps }) {
	const cart = useCart();

	return (
		<div className="card lg:card-side bg-base-100 shadow-sm">
			<figure>
				<img src={item.imgUrl} alt="Imagen item" />
			</figure>
			<div className="card-body w-fit">
				<h2 className="card-title">{item.title}</h2>
				<div className="flex justify-between">
					<h1>{item.format}</h1>
					<h1 className="font-black text-lg">{item.price}€</h1>
				</div>
				<div className="card-actions flex justify-end">
					<div className="flex flex-row items-center justify-center">
						<button className="btn" onClick={() => cart.removeOne(item)}>
							-
						</button>
						<p>{item.quantity}</p>
						<button
							className="btn"
							onClick={() => cart.addItemToCart({ ...item, quantity: 1 })}
						>
							+
						</button>
					</div>
					<div>
						<button
							className="btn btn-error"
							onClick={() => cart.removeItemFromCart(item)}
						>
							Eliminar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ShoppingCartItem;
