import {
	createContext,
	useState,
	useEffect,
	type ReactNode,
	useContext,
} from "react";
import { useAuth } from "./auth.context";
import { useToast } from "./toast.context";

export interface WishlistItem {
	uuid: string;
	title: string;
	img: string;
	type: "song" | "album" | "product";
	price: number;
}

interface WishlistContextType {
	wishlist: WishlistItem[];
	fetchWishlist: () => Promise<void>;
	addToWishlist: (uuid: string) => Promise<void>;
	removeFromWishlist: (uuid: string) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
	undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
	const { session } = useAuth();
	const toast = useToast();
	const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

	const fetchWishlist = async () => {
		if (!session) return;

		const res = await fetch(`${window.location.origin}/api/v1/wishlist`, {
			headers: {
				Authorization: `Bearer ${session.access_token}`,
			},
		});

		if (!res.ok) {
			toast.showToast("Error al cargar la lista de deseados", "error", 4000);
			return;
		}

		const data = await res.json();
		setWishlist(data);
	};

	useEffect(() => {
		if (session) fetchWishlist();
	}, [session]);

	const addToWishlist = async (uuid: string) => {
		const res = await fetch(`${window.location.origin}/api/v1/wishlist`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session?.access_token}`,
			},
			body: JSON.stringify({ uuid }),
		});

		if (!res.ok) {
			toast.showToast("No se pudo añadir a favoritos", "error", 4000);
			return;
		}

		await fetchWishlist();
		toast.showToast("Añadido a tu lista de deseados", "success", 3000);
	};

	const removeFromWishlist = async (uuid: string) => {
		const res = await fetch(
			`${window.location.origin}/api/v1/wishlist/${uuid}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${session?.access_token}`,
				},
			}
		);

		if (!res.ok) {
			toast.showToast("No se pudo eliminar", "error", 4000);
			return;
		}

		await fetchWishlist();
		toast.showToast("Eliminado de tu lista", "success", 3000);
	};

	return (
		<WishlistContext.Provider
			value={{
				wishlist,
				fetchWishlist,
				addToWishlist,
				removeFromWishlist,
			}}
		>
			{children}
		</WishlistContext.Provider>
	);
};

export const useWishlist = () => {
	const ctx = useContext(WishlistContext);
	if (!ctx) {
		throw new Error("useWishlist debe usarse dentro de WishlistProvider");
	}
	return ctx;
};
