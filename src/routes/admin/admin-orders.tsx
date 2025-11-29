import {
	type Order,
	OrderStatus,
	OrderStatusMapping,
	useOrder,
} from '../../contexts/order.context.tsx';
import { useEffect, useState } from 'react';

const AdminOrders = () => {
	const order = useOrder();
	const [orders, setOrders] = useState<Order[] | undefined>(undefined);

	useEffect(() => {
		order.getOrders()
			.then(o => setOrders(o));
	}, []);

	if (orders === undefined) return <div className="skeleton w-full h-96" />

	return (
		<div>
			<h1 className="font-bold text-3xl">Pedidos</h1>

			<table className="table">
				<thead>
					<tr>
						<th>UUID</th>
						<th>Fecha</th>
						<th>Importe</th>
						<th>Estado</th>
					</tr>
				</thead>
				<tbody>
				{
					orders.map(item => (
						<tr key={item.uuid}>
							<th>{item.uuid}</th>
							<th>{(new Date(item.creationDate)).toLocaleDateString()}</th>
							<th>{(item.totalPrice / 100).toFixed(2)} €</th>
							<th>
								<select
									className="select"
									defaultValue={item.status}
									onChange={async (e) => {
										await order.update(item.uuid, e.target.value as OrderStatus);
									}}
								>
									<option value={OrderStatus.PENDING_PAYMENT}>
										{OrderStatusMapping[OrderStatus.PENDING_PAYMENT]}
									</option>
									<option value={OrderStatus.PAID}>
										{OrderStatusMapping[OrderStatus.PAID]}
									</option>
									<option value={OrderStatus.PREPARING}>
										{OrderStatusMapping[OrderStatus.PREPARING]}
									</option>
									<option value={OrderStatus.SHIPPED}>
										{OrderStatusMapping[OrderStatus.SHIPPED]}
									</option>
									<option value={OrderStatus.DELIVERED}>
										{OrderStatusMapping[OrderStatus.DELIVERED]}
									</option>
									<option value={OrderStatus.CANCELLED}>
										{OrderStatusMapping[OrderStatus.CANCELLED]}
									</option>
								</select>
							</th>
						</tr>
					))
				}
				</tbody>
			</table>
		</div>
	)
}

export default AdminOrders;