import { useEffect, useState } from 'react';
import { type Song, useSong } from '../../contexts/song.context.tsx';
import { useNavigate, useParams } from 'react-router';
import { MdFavorite, MdPlaylistAdd } from 'react-icons/md';
import SongPreviewButton from './song-preview-button.component.tsx';
import AddToCart from '../../components/add-to-cart.component.tsx';
import Reviews from '../../components/reviews.component.tsx';
import { useWishlist } from '../../contexts/wishlist.context.tsx';

const SongInfo = () => {
	const { uuid } = useParams();
	const song = useSong();
	const navigate = useNavigate();
	const wishlist = useWishlist();
	const [songInfo, setSongInfo] = useState<Song | undefined>(undefined);

	useEffect(() => {
		song
			.getSong(uuid!)
			.then((s) => setSongInfo(s))
			.catch((e) => navigate('/404'));
	}, []);

	return (
		<div className="p-5 flex flex-col items-center">
			{!songInfo ? (
				<div className="skeleton w-full h-[90dvh]" />
			) : (
				<div className="flex flex-col gap-5 w-full max-w-[1200px]">
					<div className="flex gap-5">
						<img
							src={songInfo.cover}
							alt="Carátula de la canción"
							className="w-72 h-72 rounded-box"
						/>
						<div className="grow flex flex-col justify-between">
							<div className="flex flex-col gap-1">
								<h1 className="text-2xl">{songInfo.title}</h1>
								<p>{songInfo.author.artistName}</p>
								{songInfo.featuring.length > 0 && (
									<p>feat. {songInfo.featuring.map((f) => f.artistName)}</p>
								)}
								<div className="flex gap-2">
									{songInfo.genres.map((genre) => (
										<span className="badge badge-primary">{genre.name}</span>
									))}
								</div>
								<div className="flex gap-2">
									<p>Disponible en: </p>
									{songInfo.formats.includes('flac') && (
										<span className="badge badge-warning">FLAC</span>
									)}
									{songInfo.formats.includes('aac') && (
										<span className="badge badge-success">AAC</span>
									)}
									{songInfo.formats.includes('mp3-320') && (
										<span className="badge badge-neutral">MP3 320kbps</span>
									)}
									{songInfo.formats.includes('mp3-128') && (
										<span className="badge badge-neutral">MP3 128kbps</span>
									)}
								</div>
							</div>
							<div className="flex gap-2">
								<SongPreviewButton song={songInfo} />
								<button
									className="btn btn-square btn-secondary"
									onClick={() => wishlist.addToWishlist(songInfo?.uuid)}
								>
									<MdFavorite className="w-5 h-5" />
								</button>
								<button className="btn btn-square btn-neutral">
									<MdPlaylistAdd className="w-5 h-5" />
								</button>
							</div>
						</div>
						<AddToCart item={songInfo} />
					</div>
					<Reviews type="Song" uuid={songInfo.uuid} />
				</div>
			)}
		</div>
	);
};

export default SongInfo;
