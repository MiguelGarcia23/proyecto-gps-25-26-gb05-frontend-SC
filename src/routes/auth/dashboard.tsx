import { useNavigate } from 'react-router';
import { useUser } from '../../contexts/user.context.tsx';
import { useEffect } from 'react';

const Dashboard = () => {
	const navigate = useNavigate();
	const user = useUser();

	useEffect(() => {
		if (user.user) {
			if (user.user.role === 'guest') {
				navigate('/');
				return;
			}
			navigate(`/${user.user.role}/dashboard`);
		}
	}, [user.user]);

	return (<></>)
}

export default Dashboard;