import { usePlaylist } from '../../contexts/playlist.context.tsx';

function Playlist() {
	const { playlist, removeSong } = usePlaylist();

	if (!playlist) {
		return <div className="p-8 text-center text-lg">Cargando playlist...</div>;
	}

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6">Playlist "{playlist.title}"</h1>

			{playlist.songs.length === 0 ? (
				<div className="bg-base-200 p-10 rounded-xl text-center text-lg">
					Tu lista de reproducción está vacía.
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{playlist.songs.map((item) => (
						<div key={item.uuid} className="card bg-base-200 shadow-xl">
							<figure>
								<img
									src={item.cover}
									alt={item.title}
									className="w-full h-48 object-cover"
								/>
							</figure>

							<div className="card-body">
								<h2 className="card-title">{item.title}</h2>
								<p className="text-sm opacity-70">Autor: {item.author.artistName}</p>
								<p className="text-sm opacity-70">Duración: {item.duration}</p>

								<button
									className="btn btn-success mt-4"
									//TODO para Iván
								>
									Reproducir
								</button>

								<button
									className="btn btn-error mt-4"
									onClick={() => removeSong(playlist.uuid, item.uuid)}
								>
									Eliminar
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default Playlist;
