import { useUser } from '../contexts/user.context.tsx';
import { useEffect } from 'react';
import { useAuth } from '../contexts/auth.context.tsx';
import { Outlet, useNavigate } from 'react-router';
import { useToast } from '../contexts/toast.context.tsx';

const RequiredRoleContainer = ({
	roles,
}: {
	roles: ('user' | 'artist' | 'admin' | 'guest')[];
}) => {
	const user = useUser();
	const toast = useToast();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user.loading && !roles.includes(user.user!.role)) {
			toast.showToast('Debes iniciar sesión primero', 'error', 5000);
			navigate('/auth/sign-in');
		}
	}, [user.loading]);

	return (
		<>
			{user.loading && <div className="m-5 rounded-box skeleton h-[80dvh] grow" />}
			{!user.loading && <Outlet />}
		</>
	);
};

export default RequiredRoleContainer;
