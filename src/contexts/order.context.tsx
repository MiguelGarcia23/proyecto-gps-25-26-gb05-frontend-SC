import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './auth.context.tsx';

export type OrderItem = {
	uuid: string;
	title: string;
	type: 'album' | 'song' | 'merch';
	format?: 'cd' | 'vinyl' | 'cassette' | 'digital';
	img: string;
	price: number;
	quantity: number;
};

export enum OrderStatus {
	PENDING_PAYMENT = 'pending_payment',
	PAID = 'paid',
	PREPARING = 'preparing',
	SHIPPED = 'shipped',
	DELIVERED = 'delivered',
	CANCELLED = 'cancelled',
}

export type Order = {
	uuid: string;
	userUuid: string;
	creationDate: string;
	status: OrderStatus;
	items: OrderItem[];
	shippingPrice: number;
	totalPrice: number;
	stripeSessionId: string;
};

interface OrderContextType {
	orders: Order[];
	fetchOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
	const [orders, setOrders] = useState<Order[]>([]);
	const { session } = useAuth();

	const fetchOrders = async () => {
		if (!session) return;

		try {
			const res = await fetch(`${window.location.origin}/api/v1/orders`, {
				headers: {
					Authorization: `Bearer ${session.access_token}`,
				},
			});

			if (!res.ok) throw new Error('Error al obtener pedidos');

			const data: Order[] = await res.json();
			setOrders(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (session) fetchOrders();
	}, [session]);

	return (
		<OrderContext.Provider value={{ orders, fetchOrders }}>
			{children}
		</OrderContext.Provider>
	);
};

export const useOrders = () => {
	const ctx = useContext(OrderContext);
	if (!ctx) throw new Error('useOrders debe usarse dentro de OrderProvider');
	return ctx;
};
