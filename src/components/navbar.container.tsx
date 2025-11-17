import { Outlet, useNavigate } from 'react-router';
import {
	MdDashboard,
	MdHelp,
	MdLogout,
	MdMusicNote,
	MdNote,
	MdShoppingCart,
} from 'react-icons/md';
import { useAuth } from '../contexts/auth.context.tsx';
import { useUser } from '../contexts/user.context.tsx';

const UserDropdown = () => {
	const navigate = useNavigate();
	const auth = useAuth();
	const user = useUser();

	return (
		<div className="dropdown dropdown-end">
			<div
				tabIndex={0}
				role="button"
				className="btn btn-ghost btn-circle avatar mr-1.5"
			>
				<div className="w-10 rounded-full">
					{user.profile ? (
						<img src={user.profile?.profileImg} alt="Imagen de perfil" />
					) : (
						<div className="skeleton w-10 h-10" />
					)}
				</div>
			</div>
			<ul
				tabIndex={-1}
				className="menu menu-sm bg-base-100 dropdown-content rounded-box z-1 mt-2 p-2 shadow w-max"
			>
				<li>
					<a
						className="justify-start gap-6 text-sm w-full"
						onClick={() => navigate('/user/dashboard')}
					>
						<MdDashboard className="w-6 h-6" />
						Panel de usuario
					</a>
					{user.user?.role === 'artist' && (
						<a
							className="justify-start gap-6 text-sm w-full"
							onClick={() => navigate('/artist/dashboard')}
						>
							<MdMusicNote className="w-6 h-6" />
							Panel de artista
						</a>
					)}
					<a
						className="justify-start gap-6 text-sm w-full"
						onClick={async () => {
							await auth.signOut();
							navigate('/');
						}}
					>
						<MdLogout className="w-6 h-6" />
						Cerrar sesión
					</a>
				</li>
			</ul>
		</div>
	);
};

const NavBar = () => {
	const navigate = useNavigate();
	const auth = useAuth();

	return (
		<div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 right-0 z-10">
			<div className="navbar-start">
				<a className="btn btn-ghost text-xl" onClick={() => navigate('/')}>
					UnderSounds
				</a>
			</div>

			<div className="navbar-center grow">
				<input
					type="text"
					placeholder="Buscar..."
					className="input min-w-xl w-full"
				/>
			</div>

			<div className="navbar-end gap-2">
				<button
					className="btn btn-ghost btn-circle"
					onClick={() => navigate('/help')}
				>
					<MdHelp className="w-6 h-6" />
				</button>
				<div
					role="button"
					className="btn btn-ghost btn-circle"
					onClick={() => navigate('/help')}
				>
					<div className="indicator">
						<MdShoppingCart className="w-6 h-6" />
						<span className="badge badge-accent badge-xs indicator-item">6</span>
					</div>
				</div>
				{auth.session === null ? (
					<button
						className="btn btn-primary"
						onClick={() => navigate('/auth/sign-in')}
					>
						Iniciar sesión
					</button>
				) : (
					<UserDropdown />
				)}
			</div>
		</div>
	);
};

const NavBarContainer = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<NavBar />
			<div className="mt-16">
				<Outlet />
			</div>
		</div>
	);
};

export default NavBarContainer;
