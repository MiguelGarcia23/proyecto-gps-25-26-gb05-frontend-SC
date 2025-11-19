import { MdInfo } from 'react-icons/md';
import { useEffect, useState } from 'react';
import {
	type Order,
	OrderStatusMapping,
	useOrder,
} from '../../contexts/order.context.tsx';
import { useUser } from '../../contexts/user.context.tsx';
import { useNavigate } from 'react-router';

const OrderItem = ({ order }: { order: Order }) => {
	const navigate = useNavigate();

	return (
		<tr className="hover:bg-base-300">
			<th>{order.uuid}</th>
			<th>{new Date(order.creationDate).toLocaleDateString()}</th>
			<th>{order.totalPrice / 100} €</th>
			<th>
				<div className="badge badge-primary">
					{OrderStatusMapping[order.status]}
				</div>
			</th>
			<th>
				<button
					className="btn btn-ghost btn-square"
					onClick={() => navigate(order.uuid)}
				>
					<MdInfo className="w-5 h-5" />
				</button>
			</th>
		</tr>
	);
};

const UserOrders = () => {
	const [orders, setOrders] = useState<Order[] | undefined>(undefined);
	const order = useOrder();
	const user = useUser();

	useEffect(() => {
		if (!user.loading) {
			order.getOrders().then((orders) => setOrders(orders));
		}
	}, []);

	return (
		<div className="flex flex-col gap-2">
			<h1 className="text-3xl font-bold">Pedidos</h1>
			<div className="flex flex-col items-center gap-2">
				<table className="table">
					<thead>
						<tr>
							<th>Identificador</th>
							<th>Fecha</th>
							<th>Total</th>
							<th>Estado</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders?.map((order) => (
							<OrderItem key={order.uuid} order={order} />
						))}
					</tbody>
				</table>
				{!orders && <div className="skeleton w-full h-96" />}
				{orders?.length === 0 && <p className="text-lg">Sin pedidos que mostrar</p>}
			</div>
		</div>
	);
};

export default UserOrders;
