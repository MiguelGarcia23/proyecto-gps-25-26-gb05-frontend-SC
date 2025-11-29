import type { Album } from '../../../contexts/album.context.tsx';
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
import AlbumUpload from './album-upload.component.tsx';
import AlbumUpdate from './album-update.component.tsx';
import MerchUpload from './merch-upload.component.tsx';

const AlbumReleaseItem = ({ album }: { album: Album }) => {
	const navigate = useNavigate();
	const artist = useArtist();

	const del = async () => {
		await artist.deleteAlbum(album.uuid);
		window.location.reload();
	};

	return (
		<tr>
			<th>
				<img
					src={album.cover}
					alt="Carátula de álbum"
					className="w-12 h-12 rounded-box"
				/>
			</th>
			<th className="w-full">{album.title}</th>
			<th>{durationToString(album.duration)}</th>
			<th>{new Date(album.releaseDate).toLocaleDateString()}</th>
			<th>
				<div className="flex gap-2 w-fit">
					<button className="btn btn-primary btn-square">
						<MdPlayArrow className="w-5 h-5" />
					</button>
					<button
						className="btn btn-accent btn-square"
						onClick={() => (document.getElementById(`album-update-modal-${album.uuid}`) as any).showModal()}
					>
						<MdEdit className="w-5 h-5" />
					</button>
					<button
						className="btn btn-active btn-square"
						onClick={() => navigate(`/album/${album.uuid}`)}
					>
						<MdStore className="w-5 h-5" />
					</button>
					<button
						className="btn btn-warning btn-square"
						onClick={() => {
							(document.getElementById(`merch-upload-modal-${album.uuid}`) as any).showModal();
						}}
					>
						<MdTrolley className="w-5 h-5" />
					</button>
					<button className="btn btn-error btn-square" onClick={del}>
						<MdDelete className="w-5 h-5" />
					</button>

					<AlbumUpdate album={album} />
					<MerchUpload referenceType="album" reference={album} />
				</div>
			</th>
		</tr>
	);
};

const AlbumReleases = () => {
	const artist = useArtist();
	const [albums, setAlbums] = useState<Album[] | undefined>(undefined);

	useEffect(() => {
		artist.getAlbums().then((a) => setAlbums(a));
	}, []);

	if (albums === undefined) return <div className="skeleton w-full h-96" />;
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
				{albums?.map((album, index) => (
					<AlbumReleaseItem album={album} key={index} />
				))}
			</tbody>
		</table>
	);
};

export default AlbumReleases;
