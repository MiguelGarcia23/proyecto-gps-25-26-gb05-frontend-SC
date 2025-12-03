import { Outlet, useNavigate } from 'react-router';
import { MdHelp, MdLocalShipping, MdLogout, MdMusicNote } from 'react-icons/md';
import { useAuth } from '../../contexts/auth.context.tsx';

const MenuBar = () => {
	const navigate = useNavigate();
	const auth = useAuth();

	return (
		<ul className="menu bg-base-200 rounded-box w-56 h-fit">
			<li>
				<button
					className="text-lg"
					onClick={() => navigate('/admin/dashboard/genres')}
				>
					<MdMusicNote />
					Géneros
				</button>
			</li>
			<li>
				<button
					className="text-lg"
					onClick={() => navigate('/admin/dashboard/orders')}
				>
					<MdLocalShipping />
					Pedidos
				</button>
			</li>
			<li>
				<button
					className="text-lg"
					onClick={() => navigate('/admin/dashboard/help')}
				>
					<MdHelp />
					Artículos de ayuda
				</button>
			</li>
			<li>
				<button
					className="text-lg"
					onClick={async () => {
						await auth.signOut();
						navigate('/');
					}}
				>
					<MdLogout />
					Cerrar sesión
				</button>
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