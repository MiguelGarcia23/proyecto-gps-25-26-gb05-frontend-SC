import {
	useWishlist,
	type WishlistItem,
} from '../../contexts/wishlist.context.tsx';
import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router';

function UserWishlist() {
	const { get, remove } = useWishlist();
	const [wishlist, setWishlist] = useState<WishlistItem[] | undefined>(undefined);
	const navigate = useNavigate();

	useEffect(() => {
		get()
			.then(w => setWishlist(w));
	}, []);

	if (wishlist === undefined) return <div className="skeleton w-full h-96" />

	return (
		<div>
			<h1 className="text-3xl font-bold mb-6">Mi lista de deseados</h1>

			{wishlist.length === 0 ? (
				<div className="bg-base-200 p-10 rounded-xl text-center text-lg">
					Tu lista de deseados está vacía.
				</div>
			) : (
				<div className="flex flex-wrap gap-5">
					{wishlist.map((item, index) => (
						<div key={index} className="card bg-base-200 shadow-xl">
							<figure>
								<img
									src={item.type === 'merch' ? (item.item as any).previews[0] : (item.item as any).cover}
									alt={item.item.title}
									className="w-48 h-48 object-cover cursor-pointer"
									onClick={() => navigate(`/${item.type}/${item.item.uuid}`)}
								/>
								<button
									className="btn btn-error mt-4m absolute top-2 right-2 btn-square"
									onClick={async () => {
										await remove(item.item.uuid);
										window.location.reload();
									}}
								>
									<MdDelete className="w-5 h-5" />
								</button>
							</figure>

							<div className="card-body p-2">
								<h2 className="card-title">{item.item.title}</h2>
								<p>{item.type === 'merch' ? (item.item as any).reference.author.artistName : (item.item as any).author.artistName}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default UserWishlist;
