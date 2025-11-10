import './App.css';
import { Route, Routes } from 'react-router';
import SignUp from './routes/auth/sign-up.tsx';
import SignIn from './routes/auth/sign-in.tsx';
import Catalog from './routes/products/catalog.tsx';

function App() {
	return (
		<Routes>
			<Route path="auth">
				<Route path="sign-up" element={<SignUp />} />
				<Route path="sign-in" element={<SignIn />} />
			</Route>
			<Route path="catalog" element={<Catalog />} />
		</Routes>
	);
}

export default App;
