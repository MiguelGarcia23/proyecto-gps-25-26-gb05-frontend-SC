import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './contexts/auth.context.tsx';
import { ToastProvider } from './contexts/toast.context.tsx';
import { UserProvider } from './contexts/user.context.tsx';
import EditPrivateUserProfile from '../src/routes/UpdatePrivateUser.tsx';
import EditPublicUserProfile from '../src/routes/UpdatePublicUser.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<ToastProvider>
				<AuthProvider>
					<UserProvider>
						<div className="min-h-screen bg-base-300">
							<App />
						</div>
					</UserProvider>
				</AuthProvider>
			</ToastProvider>
		</BrowserRouter>
	</StrictMode>,
);
