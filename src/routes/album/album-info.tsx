import { useNavigate, useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { type Album, useAlbum } from '../../contexts/album.context.tsx';
import { MdFavorite, MdPlayArrow, MdStop } from 'react-icons/md';
import AddToCart from '../../components/add-to-cart.component.tsx';
import type { Song } from '../../contexts/song.context.tsx';

const AlbumTrack = ({ song, order }: { song: Song; order: number }) => {
	const navigate = useNavigate();
	const previewRef = useRef<HTMLAudioElement>(null);
	const [playing, setPlaying] = useState(false);

	useEffect(() => {
		if ('mediaSession' in navigator) {
			navigator.mediaSession.metadata = new MediaMetadata({
				title: song.title,
				artist: song.author.artistName,
				artwork: [{ src: song.cover }],
			});
			navigator.mediaSession.setActionHandler('play', play);
			navigator.mediaSession.setActionHandler('pause', pause);
		}
	}, []);

	const play = () => {
		const preview = previewRef.current;
		if (!preview) return;
		preview.currentTime = 0;
		preview.play().then(() => {
			setPlaying(true);
			navigator.mediaSession.playbackState = 'playing';
		});
	};

	const pause = () => {
		const preview = previewRef.current;
		if (!preview) return;
		setPlaying(false);
		preview.pause();
		navigator.mediaSession.playbackState = 'paused';
	};

	const playPause = () => {
		if (playing) {
			pause();
		} else {
			play();
		}
	};

	return (
		<li className="list-row items-center">
			<div className="text-4xl font-thin tabular-nums">{order}</div>
			<div>
				<img className="size-12 rounded-box" alt="Pista" src={song.cover} />
			</div>
			<div className="list-col-grow">
				<p
					className="text-lg font-bold"
					onClick={() => navigate(`/song/${song.uuid}`)}
				>
					{song.title}
				</p>
				<p className="text-sm font-semibold opacity-60">{song.author.artistName}</p>
			</div>
			<button className="btn btn-info w-52" onClick={playPause}>
				{!playing ? (
					<>
						<MdPlayArrow />
						Escuchar vista previa
					</>
				) : (
					<>
						<MdStop />
						Parar
					</>
				)}
			</button>

			<audio
				ref={previewRef}
				preload="none"
				src={`${window.location.origin}/api/v1/songs/${song.uuid}/preview`}
			/>
		</li>
	);
};

const AlbumTracklist = ({ album }: { album: Album }) => {
	return (
		<ul className="list rounded-box shadow-md p-5">
			<li className="text-xl font-bold">Pistas</li>

			{album.songs.map((a, index) => (
				<AlbumTrack song={a} order={index + 1} key={index} />
			))}
		</ul>
	);
};

const AlbumInfo = () => {
	const { uuid } = useParams();
	const album = useAlbum();
	const navigate = useNavigate();
	const [albumInfo, setAlbumInfo] = useState<Album | undefined>(undefined);

	useEffect(() => {
		album
			.getAlbum(uuid!)
			.then((a) => setAlbumInfo(a))
			.catch((error) => navigate('/404'));
	}, []);

	return (
		<div className="flex flex-col items-center p-5">
			{!albumInfo ? (
				<div className="skeleton w-full h-96" />
			) : (
				<div className="flex flex-col gap-5 w-full max-w-[1200px]">
					<div className="flex gap-5">
						<img
							src={albumInfo.cover}
							alt="Carátula del álbum"
							className="w-72 h-72 rounded-box"
						/>
						<div className="grow flex flex-col justify-between">
							<div className="flex flex-col gap-1">
								<h1 className="text-2xl">{albumInfo.title}</h1>
								<p>{albumInfo.author.artistName}</p>
								<div className="flex gap-2">
									{albumInfo.genres.map((genre) => (
										<span className="badge badge-primary">{genre.name}</span>
									))}
								</div>
							</div>
							<div className="flex gap-2">
								<button className="btn btn-square btn-secondary">
									<MdFavorite className="w-5 h-5" />
								</button>
							</div>
						</div>
						<AddToCart item={albumInfo} />
					</div>
					<AlbumTracklist album={albumInfo} />
				</div>
			)}
		</div>
	);
};

export default AlbumInfo;
