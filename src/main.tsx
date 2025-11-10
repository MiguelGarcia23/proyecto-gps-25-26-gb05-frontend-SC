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

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<ToastProvider>
				<AuthProvider>
					<UserProvider>
						<ArtistProvider>
							<GenreProvider>
                <SearchProvider>
                  <div className="min-h-screen bg-base-300">
                    <App />
                  </div>
                </SearchProvider>
						  </GenreProvider>
						</ArtistProvider>
					</UserProvider>
				</AuthProvider>
			</ToastProvider>
		</BrowserRouter>
	</StrictMode>,
);
