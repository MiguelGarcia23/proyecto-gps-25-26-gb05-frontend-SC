import { useNotifications } from "../../contexts/notification.context";
import { useEffect } from 'react';
import Checkout from '../pending/shoppingCart/checkout.tsx';

function NotificationBell() {
	const { notifications, deleteNotification, fetchNotifications } = useNotifications();

	useEffect(() => {
		fetchNotifications();
	}, []);

	return (
		<div className="dropdown dropdown-end">
			<label tabIndex={0} className="btn btn-ghost btn-circle">
				<div className="indicator">
					<i className="fa-regular fa-bell text-xl"></i>
					{notifications.length > 0 && (
						<span className="badge badge-sm indicator-item">
                            {notifications.length}
                        </span>
					)}
				</div>
			</label>

			<div
				tabIndex={0}
				className="dropdown-content mt-3 card card-compact p-4 shadow-lg bg-base-200 w-80"
			>
				<h3 className="font-bold text-lg mb-2">Notificaciones</h3>

				{notifications.length === 0 ? (
					<p className="opacity-70 text-center">No tienes notificaciones</p>
				) : (
					<ul className="flex flex-col gap-2">
						{notifications.map((n) => (
							<li
								key={n.uuid}
								className="flex justify-between items-center bg-base-100 rounded-lg p-2"
							>
								<p className="text-sm">{n.message}</p>

								<button
									className="btn btn-error btn-sm"
									onClick={() => deleteNotification(n.uuid)}
								>
									<i className="fa-solid fa-trash"></i>
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default NotificationBell;