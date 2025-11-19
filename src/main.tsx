import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './contexts/auth.context.tsx';
import { ToastProvider } from './contexts/toast.context.tsx';
import { UserProvider } from './contexts/user.context.tsx';
import { SongProvider } from './contexts/song.context.tsx';
import { AlbumProvider } from './contexts/album.context.tsx';
import Player from './components/player.tsx';
import { PlayerProvider } from './contexts/player.context.tsx';
import { CartProvider } from './contexts/cart.context.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<ToastProvider>
				<AuthProvider>
					<PlayerProvider>
						<UserProvider>
							<SongProvider>
								<AlbumProvider>
									<CartProvider>
										<div className="min-h-screen bg-base-300">
											<App />
											<Player />
										</div>
									</CartProvider>
								</AlbumProvider>
							</SongProvider>
						</UserProvider>
					</PlayerProvider>
				</AuthProvider>
			</ToastProvider>
		</BrowserRouter>
	</StrictMode>,
);
