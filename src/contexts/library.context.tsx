import {
	createContext,
	useContext,
	type ReactNode,

} from 'react';
import { useAuth } from './auth.context.tsx';

interface authorProps{
	artistName: string
	bannerImg: string
	biography: string
	profileImg: string
	uuid: string
}

export interface itemsProps {
	title: string;
	cover: string;
	type: 'Album' | 'Song';
	author: authorProps;
}

export interface LibraryResponse {
	type:'Album' | 'Song',
	item: itemsProps
}

interface LibraryContextType {
	getProducts: () => Promise<LibraryResponse[]>;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
	const auth = useAuth();

	const getProducts = async () => {

		const response = await fetch(
			`${window.location.origin}/api/v1/content/users/library`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.session?.access_token}`,
				},
			},
		);

		if (!response.ok) {
			const body = await response.json();
			throw new Error(body.message);
		}
		return await response.json() as LibraryResponse[];
	};

	return (
		<LibraryContext.Provider
			value={{
				getProducts,
			}}
		>
			{children}
		</LibraryContext.Provider>
	);
};

export const useLibrary = () => {
	const context = useContext(LibraryContext);
	if (!context)
		throw new Error('useLibrary sólo puede ser usado dentro de LibraryContext');
	return context;
};
