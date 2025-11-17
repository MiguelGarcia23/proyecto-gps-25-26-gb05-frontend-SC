import {useNavigate, useParams} from 'react-router';
import {useEffect, useState} from 'react';
import {type Order, type OrderItem, OrderStatus, useOrder,} from '../../../contexts/order.context.tsx';
import type {Address} from '../../../contexts/user.context.tsx';

const OrderItemCard = ({ item }: { item: OrderItem }) => {
	return (
		<li className="list-row pr-0">
			<div>
				<img
					src={item.img}
					alt="Imagen de producto de pedido"
					className="w-20 h-20 rounded-box"
				/>
			</div>
			<div className="flex flex-col items-start justify-start">
				<p className="text-lg">{item.title}</p>
				<span className="badge badge-primary">{item.format}</span>
			</div>
			<div className="flex flex-col items-end justify-start">
				<p className="text-lg font-bold">{(item.price / 100).toFixed(2)} €</p>
				<p className="">Cantidad: {item.quantity}</p>
			</div>
		</li>
	);
};

const OrderAddress = ({ address }: { address: Address }) => {
	return (
		<div className="w-72">
			<p className="text-xl font-bold">Dirección de envío</p>
			<p>{address.recipientName}</p>
			<p>{address.street}</p>
			<p>
				{address.zipCode} {address.city}
			</p>
			<p>{address.state}</p>
			<p>{address.phoneNumber}</p>
		</div>
	);
};

const orderStatusMapping = {
	[OrderStatus.PENDING_PAYMENT]: ['✓', '', '', '', ''],
	[OrderStatus.PAID]: ['✓', '✓', '', '', ''],
	[OrderStatus.PREPARING]: ['✓', '✓', '✓', '', ''],
	[OrderStatus.SHIPPED]: ['✓', '✓', '✓', '✓', ''],
	[OrderStatus.DELIVERED]: ['✓', '✓', '✓', '✓', '✓'],
	[OrderStatus.CANCELLED]: ['✓', '✓', '✓', '✓', '✓'],
};

const OrderDetails = () => {
	const { uuid } = useParams();
	const [orderDetails, setOrderDetails] = useState<Order | undefined>(undefined);
	const order = useOrder();
	const navigate = useNavigate();

	useEffect(() => {
		order
			.getOrder(uuid!)
			.then((order) => {
				setOrderDetails(order);
				console.log(order);
			})
			.catch((error) => navigate('..'));
	}, []);
	return (
		<div className="flex flex-col gap-2">
			<div className="breadcrumbs text-sm">
				<ul>
					<li>
						<a onClick={() => navigate('..')}>Pedidos</a>
					</li>
					<li>{uuid}</li>
				</ul>
			</div>
			<h1 className="text-3xl font-bold">Información del pedido</h1>
			{!orderDetails ? (
				<div className="skeleton w-full h-96" />
			) : (
				<div className="flex flex-col gap-2">
					<ul className="steps">
						<li
							data-content={orderStatusMapping[orderDetails.status][0]}
							className={`step ${orderStatusMapping[orderDetails.status][0] === '' ? '' : 'step-primary'}`}
						>
							Pendiente de pago
						</li>
						<li
							data-content={orderStatusMapping[orderDetails.status][1]}
							className={`step ${orderStatusMapping[orderDetails.status][1] === '' ? '' : 'step-primary'}`}
						>
							Pagado
						</li>
						<li
							data-content={orderStatusMapping[orderDetails.status][2]}
							className={`step ${orderStatusMapping[orderDetails.status][2] === '' ? '' : 'step-primary'}`}
						>
							En preparación
						</li>
						<li
							data-content={orderStatusMapping[orderDetails.status][3]}
							className={`step ${orderStatusMapping[orderDetails.status][3] === '' ? '' : 'step-primary'}`}
						>
							Enviado
						</li>
						<li
							data-content={orderStatusMapping[orderDetails.status][4]}
							className={`step ${orderStatusMapping[orderDetails.status][4] === '' ? '' : 'step-primary'}`}
						>
							Entregado
						</li>
					</ul>
					<div className="flex items-start gap-2">
						<div className="grow">
							<p className="text-xl font-bold">Productos</p>
							<ul className="list">
								{orderDetails?.items.map((item) => (
									<OrderItemCard item={item} key={`${item.uuid}-${item.format}`} />
								))}
								<li>
									<div className="flex justify-between w-full">
										<p className="text-lg">Gastos de envío</p>
										<p className="text-lg">
											{((orderDetails?.shippingPrice ?? 1) / 100).toFixed(2)} €
										</p>
									</div>
								</li>
								<li>
									<div className="flex justify-between w-full">
										<p className="text-4xl font-bold">Total</p>
										<p className="text-4xl font-bold">
											{((orderDetails?.totalPrice ?? 1) / 100).toFixed(2)} €
										</p>
									</div>
								</li>
							</ul>
						</div>
						<div className="divider divider-horizontal" />
						<OrderAddress address={orderDetails.address} />
					</div>
				</div>
			)}
		</div>
	);
};

export default OrderDetails;
