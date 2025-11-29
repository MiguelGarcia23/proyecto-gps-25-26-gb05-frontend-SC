import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './contexts/auth.context.tsx';
import { ToastProvider } from './contexts/toast.context.tsx';
import { UserProvider } from './contexts/user.context.tsx';
import { SongProvider } from './contexts/song.context.tsx';
import { AlbumProvider } from './contexts/album.context.tsx';
import { PlayerProvider } from './contexts/player.context.tsx';
import { CartProvider } from './contexts/cart.context.tsx';
import { HelpProvider } from './contexts/help.context.tsx';
import { WishlistProvider } from './contexts/wishlist.context.tsx';
import { ReviewsProvider } from './contexts/reviews.context.tsx';
import Player from './components/player.tsx';
import { NotificationProvider } from './contexts/notification.context.tsx';
import { PlaylistProvider } from './contexts/playlist.context.tsx';
import { MerchProvider } from './contexts/merch.context.tsx';

// @ts-ignore
const Providers = ({ providers, children }) => {
	const renderProvider = (providers: any, children: any): any => {
		const [provider, ...restProviders] = providers;

		if (provider) {
			return React.cloneElement(
				provider,
				{},
				renderProvider(restProviders, children)
			);
		}

		return children;
	}

	return renderProvider(providers, children);

}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Providers providers={[
				<ToastProvider />,
				<AuthProvider />,
				<UserProvider />,
				<SongProvider />,
				<AlbumProvider />,
				<PlayerProvider />,
				<CartProvider />,
				<HelpProvider />,
				<WishlistProvider />,
				<ReviewsProvider />,
				<PlaylistProvider />,
				<NotificationProvider />,
				<MerchProvider />
			]}>
				<div className="min-h-screen bg-base-300">
					<App />
					<Player />
				</div>
			</Providers>
		</BrowserRouter>
	</StrictMode>,
);
