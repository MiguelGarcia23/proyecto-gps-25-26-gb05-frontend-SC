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
import { useCart } from '../contexts/cart.context.tsx';
import { useNotifications } from '../contexts/notification.context.tsx';
import { useEffect, useState } from 'react';

const UserDropdown = () => {
	const navigate = useNavigate();
	const auth = useAuth();
	const user = useUser();

	return (
		<div className="dropdown dropdown-end">
			<button
				tabIndex={0}
				className="btn btn-ghost btn-circle avatar mr-1.5"
			>
				<div className="w-10 rounded-full">
					{user.profile ? (
						<img src={user.profile?.profileImg} alt="Imagen de perfil" />
					) : (
						<div className="skeleton w-10 h-10" />
					)}
				</div>
			</button>
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
					{user.user?.role === 'admin' && (
						<a
							className="justify-start gap-6 text-sm w-full"
							onClick={() => navigate('/admin/dashboard')}
						>
							<MdMusicNote className="w-6 h-6" />
							Panel de administrador
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

const NotificationBell = () => {
	const { notifications, fetchNotifications, deleteNotification } =
		useNotifications();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		fetchNotifications(); // Carga las notificaciones al montar
	}, []);

	return (
		<div className="relative">
			<button
				className="btn btn-ghost btn-circle relative"
				onClick={() => setOpen(!open)}
			>
				{/* Icono de campana */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6 6 0 10-12 0v3c0 .386-.149.735-.395 1.001L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
					/>
				</svg>

				{/* Badge de número de notificaciones */}
				{notifications.length > 0 && (
					<span className="badge badge-xs badge-primary absolute top-0 right-0">
						{notifications.length}
					</span>
				)}
			</button>

			{/* Dropdown de notificaciones */}
			{open && (
				<ul className="menu menu-sm dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-80 absolute right-0 z-50">
					{notifications.length === 0 && (
						<li className="text-center opacity-50">No hay notificaciones</li>
					)}
					{notifications.map((notif) => (
						<li key={notif.uuid} className="flex justify-between items-center gap-2">
							<span className="truncate">{notif.message}</span>
							<button
								className="btn btn-ghost btn-xs"
								onClick={() => deleteNotification(notif.uuid)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

const NavBar = () => {
	const navigate = useNavigate();
	const auth = useAuth();
	const cart = useCart();

	return (
		<div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 right-0 z-10">
			<div className="navbar-start">
				<a className="btn btn-ghost text-xl" onClick={() => navigate('/')}>
					UnderSounds
				</a>
			</div>

			<div className="navbar-center grow">
				<form
					onSubmit={(e: any) => {
						e.preventDefault();
						navigate(`/shop/?query=${e.target[0].value}`);
					}}
				>
					<input
						type="text"
						placeholder="Buscar..."
						className="input min-w-xl w-full"
					/>
				</form>
			</div>

			<div className="navbar-end gap-2">
				<button
					className="btn btn-ghost btn-circle"
					onClick={() => navigate('/help')}
				>
					<MdHelp className="w-6 h-6" />
				</button>

				<NotificationBell />

				<div role="button" className="btn btn-ghost btn-circle">
					<label
						htmlFor="cart-drawer"
						className="drawer-button m-0 pt-2 cursor-pointer"
					>
						<div className="indicator">
							<MdShoppingCart className="w-6 h-6" />
							<span className="badge badge-accent badge-xs indicator-item">
								{cart.cart.length}
							</span>
						</div>
					</label>
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
