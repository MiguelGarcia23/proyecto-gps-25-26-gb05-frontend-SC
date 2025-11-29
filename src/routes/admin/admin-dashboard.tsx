import { Outlet, useNavigate } from 'react-router';
import { MdLocalShipping, MdLogout, MdMusicNote } from 'react-icons/md';
import { useAuth } from '../../contexts/auth.context.tsx';

const MenuBar = () => {
	const navigate = useNavigate();
	const auth = useAuth();

	return (
		<ul className="menu bg-base-200 rounded-box w-56 h-fit">
			<li>
				<a
					className="text-lg"
					onClick={() => navigate('/admin/dashboard/genres')}
				>
					<MdMusicNote />
					Géneros
				</a>
			</li>
			<li>
				<a
					className="text-lg"
					onClick={() => navigate('/admin/dashboard/orders')}
				>
					<MdLocalShipping />
					Pedidos
				</a>
			</li>
			<li>
				<a
					className="text-lg"
					onClick={async () => {
						await auth.signOut();
						navigate('/');
					}}
				>
					<MdLogout />
					Cerrar sesión
				</a>
			</li>
		</ul>
	)
}

const AdminDashboard = () => {
	return (
		<div className="flex p-5 gap-5">
			<MenuBar />
			<div className="bg-base-200 rounded-box grow p-5">
				<Outlet />
			</div>
		</div>
	)
}

export default AdminDashboard;