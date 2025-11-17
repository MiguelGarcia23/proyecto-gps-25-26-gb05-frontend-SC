import './App.css';
import { Route, Routes } from 'react-router';
import SignUp from './routes/auth/sign-up.tsx';
import SignIn from './routes/auth/sign-in.tsx';
import Catalog from './routes/products/catalog.tsx';
import NavBarContainer from './components/navbar.container.tsx';
import Index from './routes';
import UserDashboard from './routes/user/user-dashboard.tsx';
import RequiredRoleContainer from './components/required-role.container.tsx';
import UserSettings from './routes/user/user-settings.tsx';
import UserOrders from './routes/user/user-orders.tsx';
import OrderDetails from './routes/user/orders/order-details.tsx';
import NotFound from "./routes/not-found.tsx";

function App() {
	return (
		<Routes>
			<Route path="*" element={<NotFound />} />

			<Route path="auth">
				<Route path="sign-up" element={<SignUp />} />
				<Route path="sign-in" element={<SignIn />} />
			</Route>

			<Route path="admin">
				<Route path="dashboard"></Route>
			</Route>

			<Route path="" element={<NavBarContainer />}>
				<Route path="" element={<Index />} />
				<Route path="help"></Route>
				<Route path="shop" element={<Catalog />} />
				<Route
					path="user"
					element={<RequiredRoleContainer roles={['user', 'artist']} />}
				>
					<Route path="dashboard" element={<UserDashboard />}>
						<Route path="for-you" />
						<Route path="library" />
						<Route path="orders">
							<Route index element={<UserOrders />} />
							<Route path=":uuid" element={<OrderDetails />} />
						</Route>
						<Route path="stats" />
						<Route path="profile" />
						<Route path="settings" element={<UserSettings />} />
					</Route>
				</Route>
				<Route
					path="artist"
					element={<RequiredRoleContainer roles={['user', 'artist']} />}
				>
					<Route path="dashboard"></Route>
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
