import type { Album, Song } from '../../contexts/search.context.tsx';

const minimo = (
	precio1: number,
	precio2: number,
	precio3: number,
	precio4: number,
) => {
	return Math.min(precio1, precio2, precio3, precio4);
};

interface ProductCardProps {
	item:
		| {
				type: string;
				item: Song;
		  }
		| {
				type: string;
				item: Album;
		  };
}

function ProductCard(item: ProductCardProps) {
	return (
		<div className="card bg-base-100 w-96 shadow-sm pt-4">
			<figure>
				<img src={item.item.item.cover} alt="Portada" />
			</figure>
			<div className="card-body">
				<h2 className="card-title">{item.item.item.title}</h2>
				<p>{item.item.item.author.artistName}</p>
				<div className="flex justify-between w-full">
					<p className="flex justify-end">
						Desde:{' '}
						{minimo(
							item.item.item.pricing.cd,
							item.item.item.pricing.digital,
							item.item.item.pricing.cassette,
							item.item.item.pricing.vinyl,
						)}
						€
					</p>
				</div>
				<div className="card-actions justify-between items-center">
					<div className="badge badge-neutral text-white">{item.item.type}</div>
					<button className="btn btn-primary text-white">Buy Now</button>
				</div>
			</div>
		</div>
	);
}

export default ProductCard;
