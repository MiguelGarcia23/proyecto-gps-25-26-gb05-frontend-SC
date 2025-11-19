import { createContext, useContext, type ReactNode } from 'react';

export interface Genre {
	uuid: string;
	name: string;
}

interface GenreContextType {
	getGenres: () => Promise<Genre[]>;
}

const GenreContext = createContext<GenreContextType | undefined>(undefined);

export const GenreProvider = ({ children }: { children: ReactNode }) => {
	const getGenres = async () => {
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

		return (await response.json()) as Genre[];
	};

	return (
		<GenreContext.Provider
			value={{
				getGenres,
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
