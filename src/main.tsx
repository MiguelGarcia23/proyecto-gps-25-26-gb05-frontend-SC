import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './contexts/auth.context.tsx';
import { ToastProvider } from './contexts/toast.context.tsx';
import { UserProvider } from './contexts/user.context.tsx';
import { ArtistProvider } from './contexts/artists.context.tsx';
import { GenreProvider } from './contexts/genre.context.tsx';
import { SearchProvider } from './contexts/search.context.tsx';
import { AdminProvider } from './contexts/admin.context.tsx';
import { HelpProvider } from './contexts/help.context.tsx';
import { WishlistProvider } from './contexts/wishlist.context.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<ToastProvider>
				<AuthProvider>
					<AdminProvider>
						<UserProvider>
							<ArtistProvider>
								<GenreProvider>
									<SearchProvider>
										<WishlistProvider>
											<div className="min-h-screen bg-base-300">
												<App />
											</div>
									 </WishlistProvider>
									</SearchProvider>
								</GenreProvider>
							</ArtistProvider>
						</UserProvider>
					</AdminProvider>
					<UserProvider>
						<ArtistProvider>
							<GenreProvider>
								<HelpProvider>
									<SearchProvider>
										<WishlistProvider>
											<div className="min-h-screen bg-base-300">
												<App />
											</div>
										</WishlistProvider>
									</SearchProvider>
								</HelpProvider>
							</GenreProvider>
						</ArtistProvider>
					</UserProvider>
				</AuthProvider>
			</ToastProvider>
		</BrowserRouter>
	</StrictMode>,
);
