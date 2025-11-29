import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { type Artist, useArtist } from '../../contexts/artist.context.tsx';
import type { Song } from '../../contexts/song.context.tsx';
import type { Album } from '../../contexts/album.context.tsx';
import type { Product } from '../../contexts/product.context.tsx';

const ArtistProfile: React.FC = () => {

	const { uuid } = useParams();
	const artist = useArtist();
	const navigate = useNavigate();
	const [artistInfo, setArtistInfo] = useState<Artist | undefined>(undefined);
	const [songs, setSongs] = useState<Song[]>([]);
	const [albums, setAlbums] = useState<Album[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [isFollowing, setIsFollowing] = useState(false);
	const [activeTab, setActiveTab] = useState('songs');

	useEffect(() => {
		artist
			.getArtistById(uuid!)
			.then((a) => setArtistInfo(a))
			.catch(() => navigate('/404'));

		artist
			.isFollowingByArtistId(uuid!)
			.then((r) => setIsFollowing(r))
			.catch(() => setIsFollowing(false));

		artist
			.getSongsByArtistId(uuid!)
			.then((s) => setSongs(s))
			.catch((e) => console.log('Error al obtener canciones de artista: ', e));

		artist
			.getAlbumsByArtistId(uuid!)
			.then((a) => setAlbums(a))
			.catch((e) => console.log('Error al obtener albumes de artista: ', e));

		artist
			.getProductsByArtistId(uuid!)
			.then((p) => setProducts(p))
			.catch((e) => console.log('Error al obtener productos de merchandising de artista: ', e));
	}, [artist, navigate, uuid]);

	function toggleFollow() {

		if(!isFollowing) {
			artist
				.followByArtistId(uuid!)
				.then(() => setIsFollowing(true))
				.catch((e) => console.log('Error al seguir al artista: ', e));
		} else {
			artist
				.unfollowByArtistId(uuid!)
				.then(() => setIsFollowing(false))
				.catch((e) => console.log('Error al dejar de seguir al artista: ', e));
		}

	}

	return (
		<div className="max-w-6xl mx-auto">
			{/* Banner */}
			<div className="relative rounded-xl overflow-hidden shadow-lg">
				<img src={artistInfo?.bannerImg} alt={`${artistInfo?.artistName} banner`} className="w-full h-56 sm:h-72 object-cover" />
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />

				{/* Imagen de perfil sobrepuesta al banner */}
				<div className="absolute left-6 sm:left-12 bottom-[32px] sm:bottom-[48px]">
					<div className="flex items-end gap-4">
						<div className="avatar">
							<div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full ring ring-white ring-offset-base-100 ring-offset-2 overflow-hidden">
								<img src={artistInfo?.profileImg} alt={`${artistInfo?.artistName} avatar`} />
							</div>
						</div>
						<div className="text-white">
							<h1 className="text-2xl sm:text-3xl font-bold">{artistInfo?.artistName}</h1>
							<p className="text-sm opacity-90">{artistInfo?.followers} seguidores</p>
						</div>
					</div>
				</div>
			</div>

			{/* Espaciador para la superposición de la imagen de perfil */}
			<div className="h-20 sm:h-24" />

			{/* Info */}
			<div className="card bg-base-100 shadow-xl p-6">
				<div className="flex flex-col gap-6 lg:flex-row">
					{/* Columna izquierda: biografía */}
					<aside className="lg:w-1/3">
						<div className="mb-4">
							<div className="flex items-center gap-2">
								<button
									className={`btn btn-sm ${isFollowing ? 'btn-ghost' : 'btn-primary'}`}
									onClick={toggleFollow}
									aria-pressed={isFollowing}
								>
									{isFollowing ? 'Siguiendo' : 'Seguir'}
								</button>
							</div>
						</div>

						<div className="prose max-w-none mb-4">
							<h3 className="text-lg font-semibold">Biografía</h3>
							<p>{artistInfo?.biography}</p>
						</div>
					</aside>

					{/* Columna derecha: tabs para canciones, albumes y productos */}
					<main className="lg:w-2/3">
						<div className="flex items-center justify-between mb-4">
							<div className="tabs">
								<a
									className={`tab tab-bordered ${activeTab === 'songs' ? 'tab-active' : ''}`}
									onClick={() => setActiveTab('songs')}
								>
									Canciones
								</a>
								<a
									className={`tab tab-bordered ${activeTab === 'albums' ? 'tab-active' : ''}`}
									onClick={() => setActiveTab('albums')}
								>
									Álbumes
								</a>
								<a
									className={`tab tab-bordered ${activeTab === 'merch' ? 'tab-active' : ''}`}
									onClick={() => setActiveTab('merch')}
								>
									Merch
								</a>
							</div>
						</div>

						<section>
							{activeTab === 'songs' && (
								<div className="space-y-3">
									{songs.map((s) => (
										<div key={s.uuid}
															className="flex items-center justify-between p-3 bg-base-200 rounded cursor-pointer"
															onClick={() => console.log("Card clicked")}
										>
											<div className="flex items-center gap-3">
												<div>
													<div className="font-medium">{s.title}</div>
													<div className="text-xs opacity-60">{s.author?.artistName}</div>
												</div>
											</div>
											<div className="text-sm opacity-80">{s.duration}</div>
										</div>
									))}
								</div>
							)}

							{activeTab === 'albums' && (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									{albums.map((a) => (
										<div key={a.uuid}
															className="card card-compact bg-base-200 shadow cursor-pointer"
															onClick={() => console.log("Card clicked")}
										>
											<figure>
												<img src={a.cover} alt={a.title} className="object-cover h-48 w-full" />
											</figure>
											<div
												className="card-body p-3 hover:bg-base-200 transition"
											>
												<h5 className="card-title">{a.title}</h5>
												<p className="text-sm opacity-70">{a.author?.artistName}</p>
												<p className="text-sm opacity-70">{a.releaseDate}</p>
											</div>
										</div>
									))}
								</div>
							)}

							{activeTab === 'merch' && (
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
									{products.map((p) => (
										<div key={p.uuid}
															className="card bg-base-200 shadow cursor-pointer"
															onClick={() => console.log("Card clicked")}
										>
											<figure>
												<img src={p.previews[0]} alt={p.title} className="object-cover h-44 w-full" />
											</figure>
											<div className="card-body p-3">
												<h5 className="card-title">{p.title}</h5>
												<p className="text-sm opacity-70">{
													p.description.length > 60
															? p.description.slice(0, 60) + "..."
															: p.description
												}</p>
												<p className="text-sm opacity-70">{p.price}</p>
											</div>
										</div>
									))}
								</div>
							)}
						</section>
					</main>
				</div>
			</div>
		</div>
	);
}

export default ArtistProfile;