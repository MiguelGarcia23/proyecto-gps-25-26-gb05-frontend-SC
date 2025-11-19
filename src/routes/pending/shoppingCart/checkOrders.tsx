import { useOrders } from '../../../contexts/order.context.tsx';

function CheckOrders() {
	const { orders } = useOrders();

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6">Mis pedidos</h1>

			{orders.length === 0 ? (
				<div className="mt-10 p-10 bg-base-200 rounded-xl text-center text-lg">
					No tienes ningún pedido todavía.
				</div>
			) : (
				<div className="space-y-6">
					{orders.map((order) => (
						<div key={order.uuid} className="p-6 bg-base-200 rounded-xl shadow">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-semibold">
									Pedido #{order.uuid.slice(0, 8)}
								</h2>
								<span className="badge badge-info text-sm">{order.status}</span>
							</div>

							<div className="space-y-3">
								{order.items.map((item) => (
									<div key={item.uuid} className="flex items-center gap-4">
										<img
											src={item.img}
											alt={item.title}
											className="w-16 h-16 object-cover rounded"
										/>
										<div>
											<p>{item.title}</p>
											<p className="text-sm">Cantidad: {item.quantity}</p>
											<p className="text-sm font-semibold">
												Precio: {item.price.toFixed(2)}€
											</p>
										</div>
									</div>
								))}
							</div>

							<div className="mt-4 flex justify-end gap-6 text-right font-bold">
								<span>Envío: {order.shippingPrice.toFixed(2)}€</span>
								<span>Total: {order.totalPrice.toFixed(2)}€</span>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default CheckOrders;
