import { useNavigate, useParams } from 'react-router';
import { type Album, useAlbum } from '../../../contexts/album.context.tsx';
import { useEffect, useState } from 'react';
import {
	MdArrowDropDown,
	MdDownload,
	MdPlayArrow,
	MdQueueMusic,
	MdQueuePlayNext,
	MdStop,
} from 'react-icons/md';
import  { type Song, useSong } from '../../../contexts/song.context.tsx';
import { usePlayer } from '../../../contexts/player.context.tsx';

const LibraryAlbum = () => {
	const { uuid } = useParams();
	const navigate = useNavigate();
	const { getAlbum } = useAlbum();
	const player = usePlayer();
	const { downloadSong } = useSong();
	const [album, setAlbum] = useState<Album | undefined>(undefined);

	useEffect(() => {
		if (!uuid) {
			navigate('/404');
			return;
		}
		getAlbum(uuid)
			.then(a => setAlbum(a))
			.catch(error => navigate('/404'));
	}, []);

	if (!album) return <div className="skeleton w-full h-96" />

	return (
		<div className="flex flex-col gap-5">
			<div className="breadcrumbs">
				<ul>
					<li><a onClick={() => navigate('/user/dashboard/library')}>Biblioteca</a></li>
					<li>{album.title}</li>
				</ul>
			</div>
			<h1 className="text-4xl font-bold">{album.title}</h1>

			<div className="flex gap-5">
				<img src={album.cover} className="rounded-box h-56 w-56" alt="Álbum" />
				<ul className="list rounded-box shadow-md p-5 w-full">
					<li className="text-xl font-bold">Pistas</li>

					{album.songs.map((song, index) => (
						<li className="list-row items-center" key={index}>
							<div className="text-4xl font-thin tabular-nums">{index + 1}</div>
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
							<div className="flex gap-2">
								<div className="flex">
									<div className="tooltip" data-tip="Reproducir">
										<button
											className="btn btn-primary btn-square rounded-none rounded-tl-sm rounded-bl-sm w-fit pr-2"
											onClick={() => player.playSong(song)}
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
												<a onClick={() => player.playNext(song)}>
													<MdQueuePlayNext className="w-5 h-5" />A continuación
												</a>
											</li>
											<li>
												<a onClick={() => player.addToQueue(song)}>
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
										{song.formats.includes('mp3-128') && (
											<li>
												<a onClick={() => downloadSong(song.uuid, 'mp3-128')}>
													MP3 128kbps
												</a>
											</li>
										)}
										{song.formats.includes('mp3-320') && (
											<li>
												<a onClick={() => downloadSong(song.uuid, 'mp3-320')}>
													MP3 320kbps
												</a>
											</li>
										)}
										{song.formats.includes('aac') && (
											<li>
												<a onClick={() => downloadSong(song.uuid, 'aac')}>AAC</a>
											</li>
										)}
										{song.formats.includes('flac') && (
											<li>
												<a onClick={() => downloadSong(song.uuid, 'flac')}>FLAC</a>
											</li>
										)}
									</ul>
								</details>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default LibraryAlbum;