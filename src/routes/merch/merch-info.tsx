import {
	type Merch,
	MerchTypeMapping,
	useMerch,
} from '../../contexts/merch.context.tsx';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { MdFavorite, MdShoppingCart } from 'react-icons/md';
import { useWishlist } from '../../contexts/wishlist.context.tsx';
import { useToast } from '../../contexts/toast.context.tsx';
import { useCart } from '../../contexts/cart.context.tsx';

const MerchInfo = () => {
	const { uuid } = useParams();
	const merch = useMerch();
	const navigate = useNavigate();
	const wishlist = useWishlist();
	const toast = useToast();
	const cart = useCart();
	const [item, setItem] = useState<Merch | undefined>(undefined);

	useEffect(() => {
		if (!uuid) {
			navigate('/404');
			return;
		};

		merch.get(uuid)
			.then(m => setItem(m))
			.catch(error => navigate('/404'));
	}, []);

	if (item === undefined) return <div className="skeleton w-full h-96" />

	return (
		<div className="flex gap-5 p-5 w-full justify-center">
			<div className="flex gap-5 justify-between w-full max-w-[1200px]">
				<div className="carousel carousel-vertical rounded-box h-96">
					{
						item.previews.map(src => (
							<div className="carousel-item h-full" key={src}>
								<img src={src} alt="Vista previa" />
							</div>
						))
					}
				</div>

				<div className="flex flex-col gap-2 grow">
					<h1 className="font-bold text-4xl">{item.title}</h1>
					<h1 className="cursor-pointer text-xl" onClick={() => navigate(`/profile/artist/${item?.reference.author.uuid}`)}>
						{item.reference.author.artistName}
					</h1>
					<span className="badge badge-primary">{MerchTypeMapping[item.type]}</span>
					<p className="grow">{item.description}</p>
					<div className="flex gap-2">
						<button
							className="btn btn-square btn-secondary"
							onClick={async () => {
								await wishlist.add(item.uuid, 'merch');
								toast.showToast('Añadido a la lista de deseados', 'success', 5000);
							}}
						>
							<MdFavorite className="w-5 h-5" />
						</button>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<p className="text-3xl font-bold">
						{(item.price / 100).toFixed(2)}
						<span className="text-xl font-normal"> €</span>
					</p>
					<button
						className="btn btn-primary"
						onClick={() => {
							cart.add(item);
						}}
					>
						<MdShoppingCart />
						Añadir al carrito
					</button>
				</div>
			</div>

		</div>
	)
}

export default MerchInfo;