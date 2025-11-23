import { createContext, type ReactNode, useContext } from 'react';
import { useAuth } from './auth.context.tsx';
import type { Song } from './song.context.tsx';
import type { Album } from './album.context.tsx';

export interface Artist {
	uuid: string;
	artistName: string;
	profileImg: string;
	bannerImg: string;
	biography: string;
}

interface ArtistContextType {
	getSongs: () => Promise<Song[]>;
	getAlbums: () => Promise<Album[]>;
	uploadSong: (data: Partial<Song>, cover: File, file: File) => Promise<void>;
	deleteSong: (uuid: string) => Promise<void>;
	uploadAlbum: (data: Partial<Album>, cover: File) => Promise<void>;
	deleteAlbum: (uuid: string) => Promise<void>;
}

const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

export const ArtistProvider = ({ children }: { children: ReactNode }) => {
	const auth = useAuth();

	const getSongs = async () => {
		const response = await fetch(`${window.location.origin}/api/v1/songs`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${auth.session?.access_token}`,
			},
		});
		if (!response.ok) throw new Error();

		const body = await response.json();
		return body as Song[];
	};

	const getAlbums = async () => {
		const response = await fetch(`${window.location.origin}/api/v1/albums`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${auth.session?.access_token}`,
			},
		});
		if (!response.ok) throw new Error();

		const body = await response.json();
		return body as Album[];
	};

	const uploadSong = async (data: Partial<Song>, cover: File, file: File) => {
		const formData = new FormData();
		formData.append('title', data.title!);
		formData.append('genres', JSON.stringify(data.genres!));
		formData.append('featuring', JSON.stringify(data.featuring!));
		formData.append('pricing', JSON.stringify(data.pricing!));
		formData.append('cover', cover);
		formData.append('file', file);

		const response = await fetch(`${window.location.origin}/api/v1/songs`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${auth.session?.access_token}`,
			},
			body: formData,
		});
		if (!response.ok) throw new Error();
	};

	const deleteSong = async (uuid: string) => {
		const response = await fetch(
			`${window.location.origin}/api/v1/songs/${uuid}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${auth.session?.access_token}`,
				},
			},
		);
		if (!response.ok) throw new Error();
	};

	const uploadAlbum = async (data: Partial<Album>, cover: File) => {
		const formData = new FormData();
		formData.append('title', data.title!);
		formData.append('songs', JSON.stringify(data.songs));
		formData.append('pricing', JSON.stringify(data.pricing!));
		formData.append('cover', cover);

		const response = await fetch(`${window.location.origin}/api/v1/albums`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${auth.session?.access_token}`,
			},
			body: formData,
		});
		if (!response.ok) throw new Error();
	};

	const deleteAlbum = async (uuid: string) => {
		const response = await fetch(
			`${window.location.origin}/api/v1/albums/${uuid}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${auth.session?.access_token}`,
				},
			},
		);
		if (!response.ok) throw new Error();
	};

	return (
		<ArtistContext.Provider
			value={{
				getSongs,
				getAlbums,
				uploadSong,
				deleteSong,
				uploadAlbum,
				deleteAlbum,
			}}
		>
			{children}
		</ArtistContext.Provider>
	);
};

export const useArtist = () => {
	const context = useContext(ArtistContext);
	if (!context)
		throw new Error('useArtist sólo puede ser usado dentro de ArtistContext');
	return context;
};
