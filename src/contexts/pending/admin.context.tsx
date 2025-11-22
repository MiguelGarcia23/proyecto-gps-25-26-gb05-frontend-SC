import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react';
import { useAuth } from '../auth.context.tsx';

export enum OrderStatusEnum {
	PENDING_PAYMENT = 'pending_payment',
	PAID = 'paid',
	PREPARING = 'preparing',
	SHIPPED = 'shipped',
	DELIVERED = 'delivered',
	CANCELLED = 'cancelled',
}

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
	userUuid: string;
	creationDate: Date;
	status: OrderStatusEnum;
	items: OrderItem[];
	shippingPrice: number;
	totalPrice: number;
	stripeSessionId: string;
}

interface AdminContextType {
	getOrders: () => Promise<Order[]>;

	upadateOrder: (uuid: string, status: OrderStatusEnum) => Promise<Order>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
	const auth = useAuth();

	const getOrders = async () => {
		const response = await fetch(
			`${window.location.origin}/api/v1/compras/orders`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${auth.session?.access_token}`,
				},
			},
		);

		if (!response.ok) {
			const body = await response.json();
			throw new Error(body.message);
		}

		return (await response.json()) as Order[];
	};

	const upadateOrder = async (uuid: string, status: OrderStatusEnum) => {
		const response = await fetch(
			`${window.location.origin}/api/v1/compras/orders/${uuid}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.session?.access_token}`,
				},
				body: JSON.stringify({ status }),
			},
		);

		if (!response.ok) {
			const body = await response.json();
			throw new Error(body.message);
		}

		return (await response.json()) as Order;
	};

	return (
		<AdminContext.Provider
			value={{
				getOrders,
				upadateOrder,
			}}
		>
			{children}
		</AdminContext.Provider>
	);
};

export const useAdmin = () => {
	const context = useContext(AdminContext);
	if (!context) {
		throw new Error('useAdmin solo puede ser usado dentro de AdminContext');
	}
	return context;
};
