import { createContext, useContext, type ReactNode } from 'react';

export interface Genre {
	uuid: string;
	name: string;
}

interface GenreContextType {
	getGenres: () => Promise<Genre[]>;
	postGenre: (name: string) => Promise<void>;
	getGenreById: (id: string) => Promise<Genre>;
	updateGenreById: (id: string, name: string) => Promise<Genre>;
	deleteGenreById: (id: string) => Promise<boolean>;
}

const GenreContext = createContext<GenreContextType | undefined>(undefined);

export const GenreProvider = ({ children }: { children: ReactNode }) => {
	const getGenres = async () => {
		const response = await fetch(
			`${window.location.origin}/api/v1/content/genres`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		if (!response.ok) {
			const body = await response.json();
			throw new Error(body.message);
		}

		return (await response.json()) as Genre[];
	};

	const postGenre = async (name: string) => {
		const response = await fetch(`${window.location.origin}/api/v1/genres`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
			}),
		});

		if (!response.ok) {
			const body = await response.json();
			throw new Error(body.message);
		}
	};

	const getGenreById = async (id: string) => {
		const response = await fetch(
			`${window.location.origin}/api/v1/genres/${id}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		if (!response.ok) {
			const body = await response.json();
			throw new Error(body.message);
		}

		return (await response.json()) as Genre;
	};

	const updateGenreById = async (id: string, name: string) => {
		const response = await fetch(
			`${window.location.origin}/api/v1/genres/${id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					//TODO reolver seguridad del PUT
				},
				body: JSON.stringify({
					name,
				}),
			},
		);

		if (!response.ok) {
			const body = await response.json();
			throw new Error(body.message);
		}

		return (await response.json()) as Genre;
	};

	const deleteGenreById = async (id: string) => {
		const response = await fetch(
			`${window.location.origin}/api/v1/genres/${id}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					// TODO reolver seguridad del DELETE
				},
			},
		);

		if (!response.ok) {
			const body = await response.json();
			throw new Error(body.message);
		}

		return (await response.json()) as boolean;
	};

	return (
		<GenreContext.Provider
			value={{
				getGenres,
				postGenre,
				getGenreById,
				updateGenreById,
				deleteGenreById,
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
