import { createContext, useContext, type ReactNode } from 'react';
import { useAuth } from './auth.context.tsx';

export interface Genre {
	uuid: string;
	name: string;
}

interface GenreContextType {
	getGenres: () => Promise<Genre[]>;
	postGenre: (name: string) => Promise<void>;
	deleteGenre: (uuid: string) => Promise<void>;
}

const GenreContext = createContext<GenreContextType | undefined>(undefined);

export const GenreProvider = ({ children }: { children: ReactNode }) => {
	const auth = useAuth();
	let genres: Genre[] | undefined = undefined;

	const getGenres = async () => {
		if (genres) return genres;

		const response = await fetch(`${window.location.origin}/api/v1/genres`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const body = await response.json();
			throw new Error(body.message);
		}
		genres = (await response.json()) as Genre[];
		return genres;
	};

	const postGenre = async (name: string) => {
		const response = await fetch(`${window.location.origin}/api/v1/genres`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${auth.session?.access_token}`
			},
			body: JSON.stringify({ name })
		})
		if (!response.ok) throw new Error();
	}

	const deleteGenre = async (uuid: string) => {
		const response = await fetch(`${window.location.origin}/api/v1/genres/${uuid}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${auth.session?.access_token}`
			}
		})
		if (!response.ok) throw new Error();
	}

	return (
		<GenreContext.Provider
			value={{
				getGenres,
				postGenre,
				deleteGenre
			}}
		>
			{children}
		</GenreContext.Provider>
	);
};

export const useGenre = () => {
	const context = useContext(GenreContext);
	if (!context)
		throw new Error('useGenre sólo puede ser usado dentro de GenreContext');
	return context;
};
