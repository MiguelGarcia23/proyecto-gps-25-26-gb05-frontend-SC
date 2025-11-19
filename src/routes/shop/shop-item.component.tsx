import { useNavigate } from 'react-router';
import type { Song } from '../../contexts/song.context.tsx';
import type { SearchItem } from './shop.tsx';

const ShopItem = ({ item }: { item: SearchItem }) => {
	const navigate = useNavigate();
	return (
		<div
			className="card bg-base-100 shadow-sm cursor-pointer w-fit"
			onClick={() => navigate(`/${item.type}/${item.item.uuid}`)}
		>
			<figure>
				<img src={item.item.cover} alt="Resultado" className="w-56 h-56" />
			</figure>
			<div className="card-body p-3">
				<p className="text-lg max-w-48 truncate cursor-pointer">
					{item.item.title}
				</p>
				<p>{item.item.author.artistName}</p>
				<div className="flex gap-2 flex-wrap">
					<span className="badge badge-primary">
						{item.type === 'song' ? 'Canción' : 'Álbum'}
					</span>
					{item.type === 'song' &&
						(item.item as Song).formats.filter((f) => !f.includes('mp3')).length >
							0 && <span className="badge badge-warning">Hi-Res</span>}
				</div>
				<p className="text-xl font-bold text-end">
					<span className="text-sm font-normal">Desde </span>
					{Math.min(
						item.item.pricing.cd,
						item.item.pricing.cassette,
						item.item.pricing.vinyl,
						item.item.pricing.digital,
					) / 100}{' '}
					€
				</p>
			</div>
		</div>
	);
};

export default ShopItem;
