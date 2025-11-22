import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './contexts/auth.context.tsx';
import { ToastProvider } from './contexts/toast.context.tsx';
import { UserProvider } from './contexts/user.context.tsx';
import { AdminProvider } from './contexts/admin.context.tsx';
import { SongProvider } from './contexts/song.context.tsx';
import { AlbumProvider } from './contexts/album.context.tsx';
import { PlayerProvider } from './contexts/player.context.tsx';
import { CartProvider } from './contexts/cart.context.tsx';
import { ArtistProvider } from './contexts/artists.context.tsx';
import { HelpProvider } from './contexts/help.context.tsx';
import { ReviewsProvider } from './contexts/reviews.context.tsx';
import { WishlistProvider } from './contexts/wishlist.context.tsx';
import { PlaylistProvider } from './contexts/playlist.context.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<ToastProvider>
				<AuthProvider>
					<AdminProvider>
						<UserProvider>
							<ArtistProvider>
								<GenreProvider>
									<HelpProvider>
										<ReviewsProvider>
											<WishlistProvider>
												<PlaylistProvider>
													<div className="min-h-screen bg-base-300">
														<App />
													</div>
												</PlaylistProvider>
											</WishlistProvider>
										</ReviewsProvider>
									</HelpProvider>
								</GenreProvider>
							</ArtistProvider>
						</UserProvider>
					</AdminProvider>
				</AuthProvider>
			</ToastProvider>
		</BrowserRouter>
	</StrictMode>,
);