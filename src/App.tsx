import './App.css';
import { Route, Routes } from 'react-router';
import SignUp from './routes/auth/sign-up.tsx';
import SignIn from './routes/auth/sign-in.tsx';

function App() {
	return (
		<Routes>
			<Route path="auth">
				<Route path="sign-up" element={<SignUp />} />
				<Route path="sign-in" element={<SignIn />} />
			</Route>
		</Routes>
	);
}

export default App;
