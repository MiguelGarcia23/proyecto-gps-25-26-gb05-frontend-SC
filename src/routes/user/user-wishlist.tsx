import { useWishlist } from '../../contexts/wishlist.context.tsx';

function UserWishlist() {
	const { wishlist, removeFromWishlist } = useWishlist();

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6">Mi lista de deseados</h1>

			{wishlist.length === 0 ? (
				<div className="bg-base-200 p-10 rounded-xl text-center text-lg">
					Tu lista de deseados está vacía.
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{wishlist.map((item) => (
						<div key={item.uuid} className="card bg-base-200 shadow-xl">
							<figure>
								<img
									src={item.img}
									alt={item.title}
									className="w-full h-48 object-cover"
								/>
							</figure>

							<div className="card-body">
								<h2 className="card-title">{item.title}</h2>
								<p className="text-sm opacity-70">Tipo: {item.type}</p>
								<p className="font-bold text-lg">{item.price} €</p>

								<button
									className="btn btn-error mt-4"
									onClick={() => removeFromWishlist(item.uuid)}
								>
									Eliminar
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default UserWishlist;
