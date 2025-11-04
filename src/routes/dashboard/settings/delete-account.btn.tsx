import { useAuth } from '../../../contexts/auth.context.tsx';
import { useNavigate } from 'react-router';

function DeleteAccountBtn() {
	const auth = useAuth();
	const navigate = useNavigate();

	return (
		<button
			className="btn btn-error"
			onClick={async () => {
				await auth.deleteAccount();
				navigate('/');
			}}
		>
			Eliminar cuenta
		</button>
	);
}

export default DeleteAccountBtn;
