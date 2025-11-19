import { Outlet, useNavigate } from 'react-router';
import {
	MdDashboardCustomize,
	MdGraphicEq,
	MdLibraryMusic,
	MdLocalShipping,
	MdPerson,
	MdSettings,
} from 'react-icons/md';

const MenuBar = () => {
	const navigate = useNavigate();

	return (
		<ul className="menu bg-base-200 rounded-box w-56 h-fit">
			<li>
				<a className="text-lg" onClick={() => navigate('/user/dashboard/for-you')}>
					<MdDashboardCustomize />
					Para ti
				</a>
			</li>
			<li>
				<a className="text-lg" onClick={() => navigate('/user/dashboard/library')}>
					<MdLibraryMusic />
					Biblioteca
				</a>
			</li>
			<li>
				<a className="text-lg" onClick={() => navigate('/user/dashboard/orders')}>
					<MdLocalShipping />
					Pedidos
				</a>
			</li>
			<li>
				<a className="text-lg" onClick={() => navigate('/user/dashboard/stats')}>
					<MdGraphicEq />
					Estadísticas
				</a>
			</li>
			<li>
				<a className="text-lg" onClick={() => navigate('/user/dashboard/profile')}>
					<MdPerson />
					Perfil
				</a>
			</li>
			<li>
				<a className="text-lg" onClick={() => navigate('/user/dashboard/settings')}>
					<MdSettings />
					Ajustes
				</a>
			</li>
		</ul>
	);
};

const UserDashboard = () => {
	return (
		<div className="flex p-5 gap-5">
			<MenuBar />
			<div className="bg-base-200 rounded-box grow p-5">
				<Outlet />
			</div>
		</div>
	);
};

export default UserDashboard;
