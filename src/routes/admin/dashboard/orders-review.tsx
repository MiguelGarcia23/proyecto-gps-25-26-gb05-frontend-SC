import React, { useEffect, useState } from 'react';
import {
	type Order,
	OrderStatusEnum,
	useAdmin,
} from '../../../contexts/pending/admin.context.tsx';
import { FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../../../contexts/auth.context.tsx';

const OrderStatusNames: Record<OrderStatusEnum, string> = {
	[OrderStatusEnum.PENDING_PAYMENT]: 'Pending Payment',
	[OrderStatusEnum.PAID]: 'Paid',
	[OrderStatusEnum.PREPARING]: 'Preparing',
	[OrderStatusEnum.SHIPPED]: 'Shipped',
	[OrderStatusEnum.DELIVERED]: 'Delivered',
	[OrderStatusEnum.CANCELLED]: 'Cancelled',
};

function OrdersReview() {
	const [orders, setOrders] = useState<Order[]>([]);

	const { session } = useAuth();
	const admin = useAdmin();

	useEffect(() => {
		if (!session) return;

		admin.getOrders().then((result) => setOrders(result));
	}, [session]);

	const actualizarPedidos = async (uuid: string, status: OrderStatusEnum) => {
		await admin.upadateOrder(uuid, status);
		window.location.reload();
	};

	return (
		<div>
			{orders?.length === 0 ? (
				<h1 className="flex justify-center font-black text-4xl">
					No existen pedidos
				</h1>
			) : (
				<div>
					<ul className="list bg-base-100 rounded-box shadow-md">
						<li
							className="p-4 pb-2 text-4xl font-black tracking-wide flex flex-col gap-4"
							key={-1}
						>
							Todos los pedidos realizados
						</li>
						{orders.map((pedido) => (
							<li className="list-row flex flex-col" key={pedido.uuid}>
								<div className="flex flex-row gap-6">
									<div>
										<div className="text-xl uppercase font-medium">
											Pedido con uuid: {pedido.uuid}
										</div>
										<div className="text-lg uppercase font-medium">
											Usuario con uuid: {pedido.userUuid}
										</div>
									</div>

									<div>
										<div className="text-md font-medium">
											Número de articulos del pedido: {pedido.items.length}
										</div>
										<div className="text-md font-medium">
											Fecha de creación del pedido {pedido.creationDate.toString()}
										</div>
									</div>

									<div>
										<details className="dropdown">
											<summary className="btn m-1">
												{OrderStatusNames[pedido.status]}
											</summary>
											<ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
												{Object.values(OrderStatusEnum).map((status) => (
													<li key={status}>
														<button
															className="btn btn-outline"
															key={OrderStatusNames[pedido.status]}
															onClick={() => actualizarPedidos(pedido.uuid, status)}
														>
															{OrderStatusNames[status]}
														</button>
													</li>
												))}
											</ul>
										</details>
									</div>
								</div>
								<div>
									<details className="dropdown dropdown-end">
										<summary className="btn m-1">
											<FaChevronDown />
										</summary>
										<div className="flex flex-col gap-4 w-full ">
											{pedido.items.map((item) => (
												<div className="flex flex-row gap-5 w-full">
													<img
														src={item.img}
														className="max-w-100 h-auto object-cover rounded-lg shadows-2x1"
														alt="Portada de la Canción"
													/>
													<div>
														<div className="text-md font-bold">{item.title}</div>
														<div className="text-md font-bold">Tipo: {item.type}</div>
														<div className="text-md font-bold">Formato: {item.format}</div>
													</div>
													<div>
														<div className="text-md font-bold">
															Precio a pagar: {(item.price / 100).toFixed(2)}€
														</div>
														<div className="text-md font-bold">
															Cantidad pedida: {item.quantity}
														</div>
													</div>
												</div>
											))}
										</div>
									</details>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default OrdersReview;
