import { createContext, type ReactNode, useContext } from 'react';
import { useAuth } from './auth.context.tsx';
import { type Address, useUser } from './user.context.tsx';
import { useCart } from './cart.context.tsx';

// @ts-ignore
export enum OrderStatus {
	PENDING_PAYMENT = 'pending_payment',
	PAID = 'paid',
	PREPARING = 'preparing',
	SHIPPED = 'shipped',
	DELIVERED = 'delivered',
	CANCELLED = 'cancelled',
}

export const OrderStatusMapping = {
	[OrderStatus.PENDING_PAYMENT]: 'Pendiente de pago',
	[OrderStatus.PAID]: 'Pagado',
	[OrderStatus.PREPARING]: 'En preparación',
	[OrderStatus.SHIPPED]: 'Enviado',
	[OrderStatus.DELIVERED]: 'Entregado',
	[OrderStatus.CANCELLED]: 'Cancelado',
};

export interface OrderItem {
	uuid: string;
	title: string;
	type: 'album' | 'song' | 'merch';
	format?: 'cd' | 'vinyl' | 'cassette' | 'digital';
	img: string;
	price: number;
	quantity: number;
}

export interface Order {
	uuid: string;
	creationDate: string;
	status: OrderStatus;
	items: OrderItem[];
	address: Address;
	shippingPrice: number;
	totalPrice: number;
}

interface OrderContextType {
	getOrders: () => Promise<Order[]>;
	getOrder: (uuid: string) => Promise<Order>;
	createOrder: (addressUuid: string) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
	const auth = useAuth();
	const cart = useCart();
	const user = useUser();

	const getOrders = async () => {
		const response = await fetch(`${window.location.origin}/api/v1/orders`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${auth.session?.access_token}`,
			},
		});
		const body = await response.json();
		return body as Order[];
	};

	const getOrder = async (uuid: string) => {
		const response = await fetch(
			`${window.location.origin}/api/v1/orders/${uuid}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${auth.session?.access_token}`,
				},
			},
		);
		if (!response.ok) throw new Error();

		const body = await response.json();
		return body as Order;
	};

	const createOrder = async (addressUuid: string) => {
		const addresses = await user.getAddressBook();
		const address = addresses.find((a) => a.uuid === addressUuid)!;
		console.log({
			address,
			items: cart.cart,
		});

		const response = await fetch(`${window.location.origin}/api/v1/orders/`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${auth.session?.access_token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				address,
				items: cart.cart,
			}),
		});

		if (!response.ok) throw new Error();
		cart.clear();
		const body = await response.json();
		window.location = body.redirectUrl;
	};

	return (
		<OrderContext.Provider
			value={{
				getOrders,
				getOrder,
				createOrder,
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};

export const useOrder = () => {
	const context = useContext(OrderContext);
	if (!context)
		throw new Error('useOrder sólo puede ser usado dentro de OrderContext');
	return context;
};
