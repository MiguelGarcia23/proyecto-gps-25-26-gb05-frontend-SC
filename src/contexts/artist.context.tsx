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

interface ArtistWalletWithdrawHistoryItem {
	date: Date;
	invoice: string;
	amount: number;
}

export interface ArtistWallet {
	balance: number;
	iban: string;
	withdrawHistory: ArtistWalletWithdrawHistoryItem[];
}

interface ArtistContextType {
	getWallet: () => Promise<ArtistWallet>;
	updateWallet: (wallet: Partial<ArtistWallet>) => Promise<void>;
	withdrawWallet: () => Promise<void>;
	getSongs: () => Promise<Song[]>;
	getAlbums: () => Promise<Album[]>;
	uploadSong: (data: Partial<Song>, cover: File, file: File) => Promise<void>;
	updateSong: (data: Partial<Song>) => Promise<void>,
	deleteSong: (uuid: string) => Promise<void>;
	uploadAlbum: (data: Partial<Album>, cover: File) => Promise<void>;
	updateAlbum: (data: Partial<Album>) => Promise<void>;
	deleteAlbum: (uuid: string) => Promise<void>;
}

const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

export const ArtistProvider = ({ children }: { children: ReactNode }) => {
	const auth = useAuth();
	let songs: Song[] | undefined = undefined;

	const getWallet = async () => {
		const response = await fetch(`${window.location.origin}/api/v1/payments/wallet`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${auth.session?.access_token}`
			}
		});
		if (!response.ok) throw new Error();

		return (await response.json()) as ArtistWallet;
	}

	const updateWallet = async (wallet: Partial<ArtistWallet>) => {
		const response = await fetch(`${window.location.origin}/api/v1/payments/wallet`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${auth.session?.access_token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(wallet)
		});
		if (!response.ok) throw new Error();
	}

	const withdrawWallet = async () => {
		const response = await fetch(`${window.location.origin}/api/v1/payments/wallet/withdraw`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${auth.session?.access_token}`
			}
		});
		if (!response.ok) throw new Error();
	}

	const getSongs = async () => {
		if (songs) return songs;
		const response = await fetch(`${window.location.origin}/api/v1/songs`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${auth.session?.access_token}`,
			},
		});
		if (!response.ok) throw new Error();

		const body = await response.json();
		songs = body as Song[];
		return songs;
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

	const updateSong = async (data: Partial<Song>) => {
		const response = await fetch(
			`${window.location.origin}/api/v1/songs/${data.uuid}`, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${auth.session?.access_token}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data),
			}
		)
		if (!response.ok) throw new Error();
	}

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

	const updateAlbum = async (data: Partial<Album>) => {
		const response = await fetch(
			`${window.location.origin}/api/v1/albums/${data.uuid}`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${auth.session?.access_token}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			},
		)
		if (!response.ok) throw new Error();
	}

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
				getWallet,
				updateWallet,
				withdrawWallet,
				getSongs,
				getAlbums,
				uploadSong,
				updateSong,
				deleteSong,
				uploadAlbum,
				updateAlbum,
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
