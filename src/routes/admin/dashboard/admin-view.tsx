import { GiHamburgerMenu } from 'react-icons/gi';
import { MdBorderColor } from 'react-icons/md';
import OrdersReview from './orders-review.tsx';

function AdminView() {
	return (
		<div>
			<div className="drawer">
				<input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content">
					{/* Page content here */}
					<label htmlFor="my-drawer-1" className="btn drawer-button">
						<GiHamburgerMenu />
					</label>
					<OrdersReview></OrdersReview>
				</div>
				<div className="drawer-side">
					<label
						htmlFor="my-drawer-1"
						aria-label="close sidebar"
						className="drawer-overlay"
					></label>
					<ul className="menu bg-base-200 min-h-full w-80 p-4">
						{/* Sidebar content here */}
						<button className="btn btn-neutral">
							<MdBorderColor /> Revisión de pedidos
						</button>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default AdminView;
