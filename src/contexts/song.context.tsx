import { createContext, type ReactNode, useContext } from 'react';
import type { Pricing } from '../common/pricing.interface.ts';
import type { Genre } from './genre.context.tsx';
import type { Artist } from './artist.context.tsx';

export interface Song {
	uuid: string;
	title: string;
	releaseDate: string;
	author: Artist;
	featuring: Artist[];
	genres: Genre[];
	cover: string;
	duration: number;
	pricing: Pricing;
	formats: ('flac' | 'aac' | 'mp3-128' | 'mp3-320')[];
}

interface SongContextType {
	getSong: (uuid: string) => Promise<Song>;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

export const SongProvider = ({ children }: { children: ReactNode }) => {
	const getSong = async (uuid: string) => {
		const response = await fetch(
			`${window.location.origin}/api/v1/songs/${uuid}`,
			{
				method: 'GET',
			},
		);
		if (!response.ok) throw new Error();

		const body = await response.json();
		return body as Song;
	};
	return (
		<SongContext.Provider
			value={{
				getSong,
			}}
		>
			{children}
		</SongContext.Provider>
	);
};

export const useSong = () => {
	const context = useContext(SongContext);
	if (!context)
		throw new Error('useSong sólo puede ser usado dentro de SongContext');
	return context;
};
