import { createContext, type ReactNode, useContext } from 'react';
import { useAuth } from './auth.context.tsx';
import type { Song } from './song.context.tsx';
import type { Album } from './album.context.tsx';
import type { Merch } from './merch.context.tsx';

export interface Artist {
	uuid: string;
	artistName: string;
	profileImg: string;
	bannerImg: string;
	biography: string;
	followers: number;
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
	getArtistById: (uuid: string) => Promise<Artist>;
	getArtistByTokenSession: () => Promise<Artist>;
	getSongsByArtistId: (uuid: string) => Promise<Song[]>;
	getAlbumsByArtistId: (uuid: string) => Promise<Album[]>;
	getProductsByArtistId: (uuid: string) => Promise<Merch[]>;
	updateArtistProfile: (data: Partial<Artist>, profileImg: File, bannerImg: File) => Promise<Artist>;
	followByArtistId: (uuid: string) => Promise<void>;
	unfollowByArtistId: (uuid: string) => Promise<void>;
	isFollowingByArtistId: (uuid: string) => Promise<boolean>;

	getByUuid: (uuid: string) => Promise<Artist>;
	getSongsByUuid: (uuid: string) => Promise<Song[]>;
	getAlbumsByUuid: (uuid: string) => Promise<Album[]>;
	getMerchByUuid: (uuid: string) => Promise<Merch[]>;
	follow: (uuid: string) => Promise<void>;
	unfollow: (uuid: string) => Promise<void>;
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

	// Función para obtener un artista por su ID
	const getArtistById = async (uuid: string): Promise<Artist> => {
		const response = await fetch(
			`${window.location.origin}/api/v1/artists/${uuid}`,
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

		return (await response.json()) as Artist;
	};

	// Función para obtener un artista por su token de sesión
	const getArtistByTokenSession = async (): Promise<Artist> => {
		const response = await fetch(
			`${window.location.origin}/api/v1/artists/profile`,
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

		return (await response.json()) as Artist;
	};

	// Función para obtener las canciones de un artista por su ID
	const getSongsByArtistId = async (uuid: string): Promise<Song[]> => {
		const response = await fetch(
			`${window.location.origin}/api/v1/artists/${uuid}/songs`,
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

		return (await response.json()) as Song[];
	};

	// Función para obtener los álbumes de un artista por su ID
	const getAlbumsByArtistId = async (uuid: string): Promise<Album[]> => {
		const response = await fetch(
			`${window.location.origin}/api/v1/artists/${uuid}/albums`,
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

		return (await response.json()) as Album[];
	};

	// Función para obtener los productos de merchandising de un artista por su ID
	const getProductsByArtistId = async (uuid: string): Promise<Merch[]> => {
		const response = await fetch(
			`${window.location.origin}/api/v1/artists/${uuid}/products`,
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

		return (await response.json()) as Merch[];
	};

	// Función para modificar el perfil de un artista
	const updateArtistProfile = async (data: Partial<Artist>, profileImg: File | null, bannerImg: File | null): Promise<Artist> => {
		const formData = new FormData();
		formData.append('artistName', data.artistName!);
		if (profileImg) formData.append('profileImg', profileImg);
		if (bannerImg) formData.append('bannerImg', bannerImg);
		formData.append('biography', data.biography!);

		const response = await fetch(
			`${window.location.origin}/api/v1/artists/${data.uuid}`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${auth.session?.access_token}`,
				},
				body: formData,
		},
		);
		if (!response.ok) throw new Error();

		if (!response.ok) {
			const body = await response.json();
			throw new Error(body.message);
		}

		return (await response.json()) as Artist;
	};

	// Función para seguir a un artista
	const followByArtistId = async (uuid: string): Promise<void> => {
		const response = await fetch(
			`${window.location.origin}/api/v1/artists/${uuid}/follow`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		if (!response.ok) {
			const body = await response.json();
			throw new Error(body.message);
		}
	};

	// Función para dejar de seguir a un artista
	const unfollowByArtistId = async (uuid: string): Promise<void> => {
		const response = await fetch(
			`${window.location.origin}/api/v1/artists/${uuid}/unfollow`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		if (!response.ok) {
			const body = await response.json();
			throw new Error(body.message);
		}
	};

	// Función para obtener si el usuario actual es seguidor del artista
	const isFollowingByArtistId = async (uuid: string): Promise<boolean> => {
		const response = await fetch(
			`${window.location.origin}/api/v1/artists/${uuid}/is-following`,
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

		return (await response.json()) as boolean;
	};

	const getByUuid = async (uuid: string) => {
		const response = await fetch(`${window.location.origin}/api/v1/artists/${uuid}`, {
			method: 'GET'
		});
		if (!response.ok) throw new Error();
		return (await response.json()) as Artist;
	};

	const getSongsByUuid = async (uuid: string) => {
		const response = await fetch(`${window.location.origin}/api/v1/artists/${uuid}/songs`, {
			method: 'GET'
		});
		if (!response.ok) throw new Error();
		return (await response.json()) as Song[];
	}

	const getAlbumsByUuid = async (uuid: string) => {
		const response = await fetch(`${window.location.origin}/api/v1/artists/${uuid}/albums`, {
			method: 'GET'
		});
		if (!response.ok) throw new Error();
		return (await response.json()) as Album[];
	}

	const getMerchByUuid = async (uuid: string) => {
		const response = await fetch(`${window.location.origin}/api/v1/artists/${uuid}/products`, {
			method: 'GET'
		});
		if (!response.ok) throw new Error();
		return (await response.json()) as Merch[];
	}

	const follow = async (uuid: string) => {
		const response = await fetch(`${window.location.origin}/api/v1/artists/${uuid}/follow`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${auth.session?.access_token}`
			}
		});
		if (!response.ok) throw new Error();
	}

	const unfollow = async (uuid: string) => {
		const response = await fetch(`${window.location.origin}/api/v1/artists/${uuid}/unfollow`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${auth.session?.access_token}`
			}
		});
		if (!response.ok) throw new Error();
	}

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
				getArtistById,
				getArtistByTokenSession,
				getSongsByArtistId,
				getAlbumsByArtistId,
				getProductsByArtistId,
				updateArtistProfile,
				isFollowingByArtistId,
				followByArtistId,
				unfollowByArtistId,

				getByUuid,
				getSongsByUuid,
				getAlbumsByUuid,
				getMerchByUuid,
				follow,
				unfollow,
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
