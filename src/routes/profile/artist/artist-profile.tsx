import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { type Artist, useArtist } from '../../../contexts/artist.context.tsx';
import type { Song } from '../../../contexts/song.context.tsx';
import type { Album } from '../../../contexts/album.context.tsx';
import type { Merch } from '../../../contexts/merch.context.tsx';
import { MdAdd, MdRemove } from 'react-icons/md';
import { useUser } from '../../../contexts/user.context.tsx';

const ArtistSongs = ({ uuid }: { uuid: string }) => {
	const artist = useArtist();
	const navigate = useNavigate();
	const [songs, setSongs] = useState<Song[] | undefined>(undefined);

	useEffect(() => {
		artist.getSongsByUuid(uuid)
			.then(s => setSongs(s));
	}, []);

	if (!songs) return <div className="skeleton w-full h-72" />

	return (
		<ul className="list rounded-box shadow-md">
			{
				songs.map(song => (
					<li
						key={song.uuid}
						className="list-row cursor-pointer"
						onClick={() => navigate(`/song/${song.uuid}`)}
					>
						<div>
							<img alt="Carátula" src={song.cover} className="rounded-box w-15 h-15" />
						</div>
						<div className="flex flex-col justify-between">
							<p className="font-semibold text-lg">{song.title}</p>
							<div className="flex gap-2">
								{
									song.genres.map(genre => <span key={genre.uuid} className="badge badge-primary">{genre.name}</span>)
								}
							</div>
						</div>
					</li>
				))
			}
		</ul>
	)
};

const ArtistAlbums = ({ uuid }: { uuid: string }) => {
	const navigate = useNavigate();
	const artist = useArtist();
	const [albums, setAlbums] = useState<Album[] | undefined>(undefined);

	useEffect(() => {
		artist.getAlbumsByUuid(uuid)
			.then(a => setAlbums(a));
	}, []);

	if (!albums) return <div className="skeleton w-full h-72" />

	return (
		<div className="flex gap-2 p-5 flex-wrap">
			{
				albums.map(album => (
					<div
						className="card shadow-sm cursor-pointer"
						onClick={() => navigate(`/album/${album.uuid}`)}
					>
						<figure>
							<img alt="Álbum" className="w-48 h-48" src={album.cover} />
						</figure>
						<div className="card-body p-2">
							<p className="text-lg truncate w-44">{album.title}</p>
						</div>
					</div>
				))
			}
		</div>
	)
}

const ArtistMerch = ({ uuid }: { uuid: string }) => {
	const navigate = useNavigate();
	const artist = useArtist();
	const [merch, setMerch] = useState<Merch[] | undefined>(undefined);

	useEffect(() => {
		artist.getMerchByUuid(uuid)
			.then(m => setMerch(m));
	}, []);

	if (!merch) return <div className="skeleton w-full h-72" />

	return (
		<div className="flex gap-2 p-5 flex-wrap">
			{
				merch.map(item => (
					<div
						className="card shadow-sm cursor-pointer"
						onClick={() => navigate(`/merch/${item.uuid}`)}
					>
						<figure>
							<img alt="Merch" className="w-48 h-48" src={item.previews[0]} />
						</figure>
						<div className="card-body p-2">
							<p className="text-lg truncate w-44">{item.title}</p>
						</div>
					</div>
				))
			}
		</div>
	)
}

const ArtistProfile = () => {
	const { uuid } = useParams();
	const navigate = useNavigate();
	const artist = useArtist();
	const user = useUser();
	const [info, setInfo] = useState<Artist | undefined>(undefined);
	const [tab, setTab] = useState<'songs' | 'albums' | 'merch'>('songs');
	const [following, setFollowing] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		if (!uuid) {
			navigate('/404');
			return;
		}
		artist.getByUuid(uuid)
			.then(a => setInfo(a))
			.catch(error => navigate('/404'));

		user.getFollowing()
			.then(u => {
				if (u.some(artist => artist.uuid === uuid)) {
					setFollowing(true);
				} else {
					setFollowing(false);
				}
			})
	}, []);

	if (!info || (following === undefined && user.user?.role !== 'guest')) return <div className="skeleton w-full h-96" />

	return (
		<div className="flex flex-col w-full items-center">
			<div className="flex flex-col gap-2 w-full max-w-6xl">
				<div className="relative">
					<img alt="Banner" src={info.bannerImg} className="w-full h-96 object-cover" />
					<div className="flex gap-2 items-end absolute -bottom-24 left-10 w-full">
						<img
							alt="Perfil"
							src={info.profileImg}
							className="w-48 h-48 rounded-full"
						/>
						<div className="flex flex-col gap-2 pb-2 pl-2 w-full">
							<div className="flex justify-between w-full">
								<p className="text-5xl font-bold">{info.artistName}</p>
								{following !== undefined && (
									<button
										className={`btn mr-10 ${following ? 'btn-outline' : 'btn-primary'}`}
										onClick={async () => {
											if (following) {
												await artist.unfollow(uuid!);
											} else {
												await artist.follow(uuid!);
											}
											setFollowing(!following);
										}}
									>
										{following && <p>Dejar de seguir</p>}
										{!following && <><MdAdd />Seguir</>}
									</button>
								)}
							</div>
							<p>{info.followers.length} seguidores</p>
						</div>
					</div>
				</div>

				<div className="flex gap-5 mt-32">
					<div className="card bg-base-100 flex-1 h-fit">
						<div className="card-body">
							<p className="font-bold text-2xl">Biografía</p>
							<p>{info.biography}</p>
						</div>
					</div>
					<div className="card bg-base-100 flex-2 p-2">
						<div role="tablist" className="tabs tabs-border">
							<a
								role="tab"
								className={`tab ${tab === 'songs' ? 'tab-active' : ''}`}
								onClick={() => setTab('songs')}
							>
								Canciones
							</a>
							<a
								role="tab"
								className={`tab ${tab === 'albums' ? 'tab-active' : ''}`}
								onClick={() => setTab('albums')}
							>
								Álbumes
							</a>
							<a
								role="tab"
								className={`tab ${tab === 'merch' ? 'tab-active' : ''}`}
								onClick={() => setTab('merch')}
							>
								Merchandising
							</a>
						</div>
						{ tab === 'songs' && <ArtistSongs uuid={uuid!} /> }
						{ tab === 'albums' && <ArtistAlbums uuid={uuid!} /> }
						{ tab === 'merch' && <ArtistMerch uuid={uuid!} /> }
					</div>
				</div>
			</div>
		</div>
	)
}

export default ArtistProfile;