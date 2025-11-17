import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './contexts/auth.context.tsx';
import { ToastProvider } from './contexts/toast.context.tsx';
import { UserProvider } from './contexts/user.context.tsx';
import { ArtistProvider } from './contexts/pending/artists.context.tsx';
import { GenreProvider } from './contexts/pending/genre.context.tsx';
import { SearchProvider } from './contexts/pending/search.context.tsx';
import { CartProvider } from './contexts/pending/cart.context.tsx';
import { OrderProvider } from './contexts/order.context.tsx';
import { SongProvider } from './contexts/song.context.tsx';
import {AlbumProvider} from "./contexts/album.context.tsx";
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<ToastProvider>
				<AuthProvider>
					<UserProvider>
						<SongProvider>
							<AlbumProvider>
								<div className="min-h-screen bg-base-300">
									<App />
								</div>
							</AlbumProvider>
						</SongProvider>
					</UserProvider>
				</AuthProvider>
			</ToastProvider>
		</BrowserRouter>
	</StrictMode>,
);
