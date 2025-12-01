import { Outlet, useNavigate } from 'react-router';
import {
	MdDashboardCustomize,
	MdGraphicEq,
	MdPayments,
	MdPerson,
	MdSend,
} from 'react-icons/md';

const MenuBar = () => {
	const navigate = useNavigate();

	return (
		<ul className="menu bg-base-200 rounded-box w-56 h-fit">
			<li>
				<a
					className="text-lg"
					onClick={() => navigate('/artist/dashboard/for-you')}
				>
					<MdDashboardCustomize />
					Para ti
				</a>
			</li>
			<li>
				<a
					className="text-lg"
					onClick={() => navigate('/artist/dashboard/releases')}
				>
					<MdSend />
					Lanzamientos
				</a>
			</li>
			<li>
				<a
					className="text-lg"
					onClick={() => navigate('/artist/dashboard/payments')}
				>
					<MdPayments />
					Pagos
				</a>
			</li>
			<li>
				<a className="text-lg" onClick={() => navigate('/artist/dashboard/stats')}>
					<MdGraphicEq />
					Estadísticas
				</a>
			</li>
			<li>
				<a
					className="text-lg"
					onClick={() => navigate('/artist/dashboard/profile')}
				>
					<MdPerson />
					Perfil
				</a>
			</li>
		</ul>
	);
};

const ArtistDashboard = () => {
	return (
		<div className="flex p-5 gap-5">
			<MenuBar />
			<div className="bg-base-200 rounded-box grow p-5">
				<Outlet />
			</div>
		</div>
	);
};

export default ArtistDashboard;
