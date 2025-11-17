import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { useAuth } from './auth.context';

interface UserProfile {
	uuid: string;
	username: string;
	profileImg: string;
	playlists: string[]; // TODO
	following: string[]; // TODO
}

interface User {
	uuid: string;
	firstName: string;
	lastName: string;
	email: string;
	role: 'user' | 'artist' | 'admin' | 'guest';
}

export interface Address {
	uuid: string;
	alias: string;
	recipientName: string;
	street: string;
	additionalInfo: string;
	city: string;
	state: string;
	zipCode: string;
	phoneNumber: number;
}

interface UserContextType {
	profile: UserProfile | null;
	user: User | null;
	loading: boolean;
	update: (user: Partial<User>) => Promise<void>;
	getAddressBook: () => Promise<Address[]>;
	postAddress: (address: Address) => Promise<Address>;
	updateAddress: (address: Address) => Promise<Address>;
	deleteAddress: (uuid: string) => Promise<void>;

	//updatePublicUser: (data: Partial<FullUser>) => Promise<void>;
	//updatePassword: (data: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const auth = useAuth();

	useEffect(() => {
		if (!auth.loading && auth.session) {
			fetch(`${window.location.origin}/api/v1/users`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${auth.session.access_token}`,
				},
			})
				.then((response) => response.json())
				.then((response) => {
					setProfile(response);

					fetch(`${window.location.origin}/api/v1/auth/users`, {
						method: 'GET',
						headers: {
							Authorization: `Bearer ${auth.session!.access_token}`,
						},
					})
						.then((response) => response.json())
						.then((response) => {
							setUser(response);
							setLoading(false);
						});
				});
		} else if (!auth.loading) {
			setUser({ uuid: '', firstName: '', lastName: '', email: '', role: 'guest' });
			setLoading(false);
		}
	}, [auth.loading]);

	const update = async (user: Partial<User>) => {
		const response = await fetch(`${window.location.origin}/api/v1/auth/users`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${auth.session?.access_token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});
		if (!response.ok) throw new Error();
	};

	const getAddressBook = async () => {
		const response = await fetch(
			`${window.location.origin}/api/v1/auth/users/addresses`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${auth.session?.access_token}`,
				},
			},
		);
		if (!response.ok) throw new Error();

		return (await response.json()) as Address[];
	};

	const postAddress = async (address: Address) => {
		const response = await fetch(
			`${window.location.origin}/api/v1/auth/users/addresses`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${auth.session?.access_token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(address),
			},
		);
		if (!response.ok) throw new Error();

		return (await response.json()) as Address;
	};

	const updateAddress = async (address: Partial<Address>) => {
		const response = await fetch(
			`${window.location.origin}/api/v1/auth/users/addresses/${address.uuid}`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${auth.session?.access_token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(address),
			},
		);
		if (!response.ok) throw new Error();

		return (await response.json()) as Address;
	};

	const deleteAddress = async (uuid: string) => {
		const response = await fetch(
			`${window.location.origin}/api/v1/auth/users/addresses/${uuid}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${auth.session?.access_token}`,
				},
			},
		);
		if (!response.ok) throw new Error();
	};

	/*
	const { session } = useAuth();
	const [fullUser, setFullUser] = useState<FullUser | null>(null);
	const [loading, setLoading] = useState(true);
	const toast = useToast();

	//3. Update público
	const updatePublicUser = async (data: Partial<FullUser>) => {
		const response = await fetch(
			`${window.location.origin}/api/v1/users/public`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${session?.access_token}`,
				},
				body: JSON.stringify(data),
			},
		);

		if (!response.ok) {
			toast.showToast('Error actualizando datos públicos', 'error', 4000);
			return;
		}

		await fetchUser();
		toast.showToast('Perfil actualizado', 'success', 3000);
	};

	//5. Update password

	const updatePassword = async (data: string) => {
		const response = await fetch(
			`${window.location.origin}/api/v1/users/password`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${session?.access_token}`,
				},
				body: JSON.stringify(data),
			},
		);

		if (!response.ok) {
			toast.showToast('Error actualizando contraseña', 'error', 4000);
			return;
		}

		await fetchUser();
		await supabase.auth.updateUser({ password: data });
		toast.showToast('Contraseña actualizada', 'success', 3000);
	};
	*/

	return (
		<UserContext.Provider
			value={{
				profile,
				user,
				loading,
				update,
				getAddressBook,
				postAddress,
				updateAddress,
				deleteAddress,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const ctx = useContext(UserContext);
	if (!ctx) {
		throw new Error('useUser debe usarse dentro de UserProvider');
	}
	return ctx;
};
