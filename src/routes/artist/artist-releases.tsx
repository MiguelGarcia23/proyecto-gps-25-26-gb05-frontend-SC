import { useState } from 'react';
import AlbumReleases from './releases/album-releases.component.tsx';
import SongReleases from './releases/song-releases.component.tsx';
import SongUpload from './releases/song-upload.component.tsx';
import AlbumUpload from './releases/album-upload.component.tsx';
import MerchReleases from './releases/merch-releases.component.tsx';

const ArtistReleases = () => {
	const [currentTab, setCurrentTab] = useState<string>('songs');

	const tabChange = (e: any) => {
		setCurrentTab(e.target.value);
	};

	return (
		<div className="flex flex-col gap-2">
			<h1 className="text-3xl font-bold">Lanzamientos</h1>
			<div className="flex justify-between gap-2">
				<div className="tabs tabs-box grow">
					<input
						type="radio"
						name="releases-tab"
						className="tab"
						aria-label="Canciones"
						value="songs"
						checked={currentTab === 'songs'}
						onChange={tabChange}
					/>
					<input
						type="radio"
						name="releases-tab"
						className="tab"
						aria-label="Álbumes"
						value="albums"
						checked={currentTab === 'albums'}
						onChange={tabChange}
					/>
					<input
						type="radio"
						name="releases-tab"
						className="tab"
						aria-label="Merchandising"
						value="merch"
						checked={currentTab === 'merch'}
						onChange={tabChange}
					/>
				</div>
				<div className="flex gap-2">
					<button
						className="btn btn-primary"
						onClick={() =>
							(document.getElementById('song-upload-modal') as any).showModal()
						}
					>
						+ Nueva canción
					</button>
					<button
						className="btn btn-primary"
						onClick={() =>
							(document.getElementById('album-upload-modal') as any).showModal()
						}
					>
						+ Nuevo álbum
					</button>
				</div>
			</div>
			{currentTab === 'songs' && <SongReleases />}
			{currentTab === 'albums' && <AlbumReleases />}
			{currentTab === 'merch' && <MerchReleases />}
			<SongUpload />
			<AlbumUpload />
		</div>
	);
};

export default ArtistReleases;
