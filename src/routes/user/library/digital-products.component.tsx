import { type LibraryItem, useUser } from '../../../contexts/user.context.tsx';
import { usePlayer } from '../../../contexts/player.context.tsx';
import { useNavigate } from 'react-router';
import { type Song, useSong } from '../../../contexts/song.context.tsx';
import {
	MdArrowDropDown,
	MdDownload,
	MdPlayArrow,
	MdQueueMusic,
	MdQueuePlayNext,
} from 'react-icons/md';
import { useEffect, useState } from 'react';

const DigitalItem = ({ item }: { item: LibraryItem }) => {
	const player = usePlayer();
	const navigate = useNavigate();
	const song = useSong();

	return (
		<div className="card bg-base-100 shadow-sm">
			<figure>
				<img src={item.item.cover} alt="Carátula" className="w-50 h-50" />
			</figure>

			<div className="flex flex-col gap-2 p-2">
				<p
					className="text-xl font-bold max-w-44 truncate cursor-pointer"
					onClick={() => navigate(`/${item.type}/${item.item.uuid}`)}
				>
					{item.item.title}
				</p>
				<p>{item.item.author.artistName}</p>
				{item.type === 'song' && (
					<div className="flex gap-2">
						<div className="flex">
							<div className="tooltip" data-tip="Reproducir">
								<button
									className="btn btn-primary btn-square rounded-none rounded-tl-sm rounded-bl-sm w-fit pr-2"
									onClick={() => player.playSong(item.item as Song)}
								>
									<MdPlayArrow className="w-7 h-7" />
									Reproducir
								</button>
							</div>
							<details className="dropdown dropdown-end">
								<summary className="btn btn-primary rounded-none rounded-tr-sm rounded-br-sm w-5 p-0">
									<MdArrowDropDown className="w-5 h-5" />
								</summary>
								<ul className="menu dropdown-content bg-base-100 rounded-box w-42 mt-2">
									<li>
										<a onClick={() => player.playNext(item.item as Song)}>
											<MdQueuePlayNext className="w-5 h-5" />A continuación
										</a>
									</li>
									<li>
										<a onClick={() => player.addToQueue(item.item as Song)}>
											<MdQueueMusic className="w-5 h-5" />
											Añadir a la cola
										</a>
									</li>
								</ul>
							</details>
						</div>

						<details className="dropdown">
							<summary className="btn btn-outline btn-square">
								<MdDownload className="w-6 h-6" />
							</summary>
							<ul className="menu dropdown-content bg-base-100 rounded-box w-36 mt-2">
								{(item.item as Song).formats.includes('mp3-128') && (
									<li>
										<a onClick={() => song.downloadSong(item.item.uuid, 'mp3-128')}>
											MP3 128kbps
										</a>
									</li>
								)}
								{(item.item as Song).formats.includes('mp3-320') && (
									<li>
										<a onClick={() => song.downloadSong(item.item.uuid, 'mp3-320')}>
											MP3 320kbps
										</a>
									</li>
								)}
								{(item.item as Song).formats.includes('aac') && (
									<li>
										<a onClick={() => song.downloadSong(item.item.uuid, 'aac')}>AAC</a>
									</li>
								)}
								{(item.item as Song).formats.includes('flac') && (
									<li>
										<a onClick={() => song.downloadSong(item.item.uuid, 'flac')}>FLAC</a>
									</li>
								)}
							</ul>
						</details>
					</div>
				)}
				{item.type === 'album' && (
					<div className="flex flex-col gap-2">
						<button
							className="btn btn-primary"
							onClick={() => navigate(`/user/dashboard/library/album/${item.item.uuid}`)}
						>
							Ver más
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

const UserDigitalProducts = () => {
	const user = useUser();
	const [library, setLibrary] = useState<LibraryItem[] | undefined>(undefined);

	useEffect(() => {
		user.getLibrary().then((l) => setLibrary(l));
	}, []);

	if (!library) return <div className="w-full h-72 skeleton" />;

	return (
		<div className="flex gap-2 flex-wrap items-center justify-start h-full bg-base-100 p-5">
			{library.length === 0 && (
				<p>No tienes ningún artículo digital en tu librería.</p>
			)}
			{library.map((i, index) => (
				<DigitalItem item={i} key={index} />
			))}
		</div>
	);
};

export default UserDigitalProducts;
