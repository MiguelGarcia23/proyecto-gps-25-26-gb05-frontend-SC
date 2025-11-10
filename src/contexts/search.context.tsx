import { createContext, useContext, type ReactNode } from 'react';
import type { Genre } from './genre.context.tsx';

interface SearchContextType {
	getProducts: (
		generosSeleccionados: string[],
		precioMin: number,
		precioMax: number,
		fechaInicio: Date | null,
		fechaFin: Date | null,
		orderDirection: string,
		orderBy: string,
		query: string,
	) => Promise<searchResponse>;
}

export interface searchResponse {
	total: number;
	items: (
		| {
				type: string;
				item: Song;
		  }
		| {
				type: string;
				item: Album;
		  }
		| undefined
	)[];
}

export type Artist = {
	uuid: string;
	artistName: string;
	profileImg: string;
	bannerImg: string;
	biography: string;
};

export type Album = {
	uuid: string;
	title: string;
	releaseDate: Date;
	author: Artist;
	cover: string;
	duration: number;
	songs: Song[];
	genres: Genre[];
	pricing: PricingType;
};

export type Song = {
	uuid: string;
	title: string;
	releaseDate: Date;
	author: Artist;
	featuring: Artist[];
	genres: Genre[];
	cover: string;
	duration: number;
	pricing: PricingType;
};

export type PricingType = {
	cd: number;
	vinyl: number;
	cassette: number;
	digital: number;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
	const getProducts = async (
		generosSeleccionados: string[],
		precioMin: number,
		precioMax: number,
		fechaInicio: Date | null,
		fechaFin: Date | null,
		orderDirection: string,
		orderBy: string,
		query: string,
	) => {
		const url = new URL(`${window.location.origin}/api/v1/content/search`);

		//Comprobaciones de si estan vacio los valores y si no es asi se añaden al query
		if (generosSeleccionados.length !== 0) {
			const generosUnidos = generosSeleccionados.join(',');
			console.log(generosUnidos);
			url.searchParams.append('genres', generosUnidos);
		}

		if (!isNaN(precioMin))
			url.searchParams.append('minPrice', precioMin.toString());

		if (!Number.isNaN(precioMax))
			url.searchParams.append('maxPrice', precioMax.toString());

		if (fechaInicio !== null)
			url.searchParams.append('minReleaseDate', fechaInicio.toISOString());

		if (fechaFin !== null)
			url.searchParams.append('maxReleaseDate', fechaFin.toISOString());

		if (orderDirection !== '')
			url.searchParams.append('orderDirection', orderDirection);

		if (orderBy !== '') url.searchParams.append('orderBy', orderBy);

		if(query !== '') url.searchParams.append('query', query);

		console.log(url.toString());

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const body = await response.json();
			throw new Error(body.message);
		}

		return (await response.json()) as searchResponse;
	};

	return (
		<SearchContext.Provider
			value={{
				getProducts,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearch = () => {
	const context = useContext(SearchContext);
	if (!context)
		throw new Error('useSearch sólo puede ser usado dentro de SearchContext');
	return context;
};
