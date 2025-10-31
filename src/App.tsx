import './App.css';
import { Route, Routes } from 'react-router';
import SignUp from './routes/auth/sign-up.tsx';

function App() {
	return (
		<Routes>
			<Route path="auth">
				<Route path="sign-up" element={<SignUp />} />

			</Route>
		</Routes>
	);
}

export default App;
