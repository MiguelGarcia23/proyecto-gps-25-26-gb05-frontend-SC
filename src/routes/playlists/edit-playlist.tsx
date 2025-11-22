import { useState, useEffect } from "react";
import { usePlaylist } from "../../contexts/playlist.context.tsx";
import { useNavigate, useParams } from "react-router-dom";

function EditPlaylist() {
	const { playlist, fetchPlaylist, removeSong } = usePlaylist();
	const navigate = useNavigate();
	const { uuid } = useParams<{ uuid: string }>();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [cover, setCover] = useState("");
	const [isPublic, setIsPublic] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (uuid) {
			fetchPlaylist(uuid);
		}
	}, [uuid]);

	useEffect(() => {
		if (playlist) {
			setTitle(playlist.title);
			setDescription(playlist.description);
			setCover(playlist.cover);
			setIsPublic(playlist.public);
		}
	}, [playlist]);

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!playlist) return;

		setLoading(true);
		try {
			const res = await fetch(`${window.location.origin}/api/v1/playlists/${playlist.uuid}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${playlist.authorUuid}`, // Ajusta si tienes session
				},
				body: JSON.stringify({
					title,
					description,
					cover,
					public: isPublic,
				}),
			});

			if (!res.ok) throw new Error("Error actualizando playlist");
			await fetchPlaylist(playlist.uuid);
			alert("Playlist actualizada correctamente");
		} catch (error) {
			console.error(error);
			alert("No se pudo actualizar la playlist");
		} finally {
			setLoading(false);
		}
	};

	if (!playlist) {
		return <div className="p-8 text-center text-lg">Cargando playlist...</div>;
	}

	return (
		<div className="p-8 flex flex-col gap-8">
			{/* Formulario editable de la playlist */}
			<form onSubmit={handleSave} className="flex flex-col gap-4 max-w-xl">
				<label className="flex flex-col">
					<span className="label-text font-medium mb-1">Título</span>
					<input
						type="text"
						className="input input-bordered w-full"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</label>

				<label className="flex flex-col">
					<span className="label-text font-medium mb-1">Descripción</span>
					<textarea
						className="textarea textarea-bordered w-full"
						rows={3}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</label>

				<label className="flex flex-col">
					<span className="label-text font-medium mb-1">Cover (URL)</span>
					<input
						type="text"
						className="input input-bordered w-full"
						value={cover}
						onChange={(e) => setCover(e.target.value)}
					/>
				</label>

				<label className="flex items-center justify-between mt-2">
					<span className="label-text font-medium">¿Playlist pública?</span>
					<input
						type="checkbox"
						className="checkbox"
						checked={isPublic}
						onChange={(e) => setIsPublic(e.target.checked)}
					/>
				</label>

				<button className="btn btn-primary mt-2" type="submit" disabled={loading}>
					{loading ? "Guardando..." : "Guardar cambios"}
				</button>
			</form>

			{/* Lista de canciones */}
			<div className="flex flex-col gap-4">
				{playlist.songs.length === 0 ? (
					<div className="bg-base-200 p-4 rounded-xl text-center">
						La playlist no tiene canciones.
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{playlist.songs.map((song) => (
							<div key={song.uuid} className="card bg-base-200 shadow-xl flex flex-col">
								<figure>
									<img
										src={song.cover}
										alt={song.title}
										className="w-full h-48 object-cover"
									/>
								</figure>
								<div className="card-body flex flex-col justify-between">
									<div>
										<h2 className="card-title">{song.title}</h2>
										<p className="text-sm opacity-70">Autor: {song.author.artistName}</p>
									</div>
									<button
										className="btn btn-error mt-4 self-end"
										onClick={() => removeSong(playlist.uuid, song.uuid)}
									>
										<i className="fa-solid fa-trash"></i>
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default EditPlaylist;
