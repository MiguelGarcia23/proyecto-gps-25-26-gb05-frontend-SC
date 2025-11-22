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
import { WishlistProvider } from './contexts/wishlist.context.tsx';
import { ReviewsProvider } from './contexts/reviews.context.tsx';
import Player from './components/player.tsx';
import { NotificationProvider } from './contexts/notification.context.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <UserProvider>
            <AdminProvider>
              <SongProvider>
                <AlbumProvider>
                  <PlayerProvider>
                    <CartProvider>
                      <HelpProvider>
                        <WishlistProvider>
                          <ReviewsProvider>
																											 <NotificationProvider>
                              <div className="min-h-screen bg-base-300">
                                <App />
                              </div>
																											 </NotificationProvider>
                          </ReviewsProvider>
                        </WishlistProvider>
                      </HelpProvider>
                    </CartProvider>
                  </PlayerProvider>
                </AlbumProvider>
              </SongProvider>
            </AdminProvider>
          </UserProvider>
        </AuthProvider>
      </ToastProvider>
		</BrowserRouter>
	</StrictMode>,
);