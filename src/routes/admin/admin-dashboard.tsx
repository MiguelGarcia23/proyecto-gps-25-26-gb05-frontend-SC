import { Outlet, useNavigate } from 'react-router';
import { MdMusicNote } from 'react-icons/md';

const MenuBar = () => {
	const navigate = useNavigate();
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