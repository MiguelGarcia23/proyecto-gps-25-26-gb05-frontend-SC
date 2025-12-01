import type { Song } from '../../../contexts/song.context.tsx';
import { useNavigate } from 'react-router';
import { useArtist } from '../../../contexts/artist.context.tsx';
import { durationToString } from '../../../lib/util.ts';
import {
	MdDelete,
	MdEdit,
	MdPlayArrow,
	MdStore,
	MdTrolley,
} from 'react-icons/md';
import { useEffect, useState } from 'react';
import SongUpdate from './song-update.component.tsx';
import { usePlayer } from '../../../contexts/player.context.tsx';
import MerchUpload from './merch-upload.component.tsx';

const SongReleaseItem = ({ song }: { song: Song }) => {
	const navigate = useNavigate();
	const artist = useArtist();
	const player = usePlayer();

	const del = async () => {
		await artist.deleteSong(song.uuid);
		window.location.reload();
	};

	return (
		<tr>
			<th>
				<img
					src={song.cover}
					alt="Carátula de canción"
					className="w-12 h-12 rounded-box"
				/>
			</th>
			<th className="w-full">{song.title}</th>
			<th>{durationToString(song.duration)}</th>
			<th>{new Date(song.releaseDate).toLocaleDateString()}</th>
			<th>
				<div className="flex gap-2 w-fit">
					<button
						className="btn btn-primary btn-square"
						onClick={() => player.playSong(song)}
					>
						<MdPlayArrow className="w-5 h-5" />
					</button>
					<button
						className="btn btn-accent btn-square"
						onClick={() => {
							(document.getElementById(`song-update-modal-${song.uuid}`) as any).showModal();
						}}
					>
						<MdEdit className="w-5 h-5" />
					</button>
					<button
						className="btn btn-active btn-square"
						onClick={() => navigate(`/song/${song.uuid}`)}
					>
						<MdStore className="w-5 h-5" />
					</button>
					<button
						className="btn btn-warning btn-square"
						onClick={() => {
							(document.getElementById(`merch-upload-modal-${song.uuid}`) as any).showModal();
						}}
					>
						<MdTrolley className="w-5 h-5" />
					</button>
					<button className="btn btn-error btn-square" onClick={del}>
						<MdDelete className="w-5 h-5" />
					</button>

					<SongUpdate song={song} />
					<MerchUpload referenceType="song" reference={song} />
				</div>
			</th>
		</tr>
	);
};

const SongReleases = () => {
	const artist = useArtist();
	const [songs, setSongs] = useState<Song[] | undefined>(undefined);

	useEffect(() => {
		artist.getSongs().then((s) => setSongs(s));
	}, []);

	if (songs === undefined) return <div className="skeleton w-full h-96" />;
	return (
		<table className="table">
			<thead>
				<tr>
					<th>Carátula</th>
					<th>Título</th>
					<th>Duración</th>
					<th>Fecha de publicación</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				{songs?.map((song, index) => (
					<SongReleaseItem song={song} key={index} />
				))}
			</tbody>
		</table>
	);
};

export default SongReleases;
