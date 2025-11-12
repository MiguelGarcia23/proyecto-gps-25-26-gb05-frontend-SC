import{
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react';
import { useNavigate} from 'react-router';
import { useAuth } from './auth.context.tsx';

interface ArtistContextType{
	uploadSong: (
		songName: string,
		songFile: File,
		songCover: File,
	) => Promise<void>;
	uploadAlbum: (
		albumName: string,
		albumSong: string[],
		albumCover: File,
	) => Promise<void>;
	uploadMerch: (
		productName: string,
		productMerch: string,
		productType: string[],
		productPrice: string,
	) => Promise<void>;
}


const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

export const ArtistProvider = ({ children }: { children: ReactNode }) => {
	const auth = useAuth();


	const uploadSong = async (
		songName: string,
		songFile: File,
		songCover: File,
		) => {
		const formData = new FormData();
		formData.append('songName', songName);
		formData.append('songFile', songFile);
		formData.append('songCover', songCover);
	const response = await fetch(`${window.location.origin}/api/v1/songs`,{
		method: 'POST',
		headers: {
			'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${auth.session?.access_token}`
			},
		body: formData
	})
	};

	const uploadAlbum = async (
		albumName: string,
		albumSong: string[],
		albumCover: File,
	)=> {
		const formData = new FormData();
		formData.append('albumName', albumName);
		formData.append('albumSong', JSON.stringify(albumSong));
		formData.append('albumCover', albumCover);

		const response = await fetch(`${window.location.origin}/api/v1/songs`,{
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${auth.session?.access_token}`
			},
			body: formData
		})
	};

		const uploadMerch = async (
			productName: string,
			productMerch: string,
			productType: string[],
			productPrice: string,
		) => {
			const formData = new FormData();
			formData.append('productName', productName);
			formData.append('productMerch', productMerch);
			formData.append('productType', JSON.stringify(productType));
			formData.append('productPrice', productPrice);

			const response = await fetch(`${window.location.origin}/api/v1/songs`,{
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${auth.session?.access_token}`
				},
				body: formData
			})
		}
	return(
		<ArtistContext.Provider value={{uploadSong, uploadAlbum, uploadMerch}}>
			{children}
		</ArtistContext.Provider>
	)

}

export const useArtist = () => {
	const context = useContext(ArtistContext);
	if(!context){
		throw new Error('useArtist solo puede ser usado dentro de ArtistContext');
	}
		return context;
}

