import { useState } from 'react';
import { usePlaylist } from '../../contexts/playlist.context.tsx';
import { useNavigate } from 'react-router-dom';

function CreatePlaylist() {
	const { createPlaylist } = usePlaylist();
	const navigate = useNavigate();

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [cover, setCover] = useState('');
	const [isPublic, setIsPublic] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const ok = await createPlaylist({
			title,
			description,
			cover,
			public: isPublic,
		});

		setLoading(false);

		if (ok) {
			navigate('/playlists');
		}
	};

	return (
		<div className="p-8 flex justify-center">
			<div className="card bg-base-200 shadow-xl w-full max-w-lg p-8">
				<h1 className="text-3xl font-bold mb-6 text-center">
					Crear nueva playlist
				</h1>

				<form onSubmit={handleSubmit} className="flex flex-col gap-6">
					{/* Contenedor para los campos */}
					<div className="flex flex-col gap-4">
						{/* Título */}
						<label className="flex flex-col">
							<span className="label-text font-medium mb-1">Título</span>
							<input
								type="text"
								className="input input-bordered w-full"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
							/>
						</label>

						{/* Descripción */}
						<label className="flex flex-col">
							<span className="label-text font-medium mb-1">Descripción</span>
							<textarea
								className="textarea textarea-bordered w-full"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								rows={3}
							/>
						</label>

						{/* Cover */}
						<label className="flex flex-col">
							<span className="label-text font-medium mb-1">URL del cover</span>
							<input
								type="text"
								className="input input-bordered w-full"
								value={cover}
								onChange={(e) => setCover(e.target.value)}
								placeholder="https://ejemplo.com/imagen.jpg"
							/>
						</label>

						{/* Pública */}
						<label className="flex items-center justify-between mt-2">
							<span className="label-text font-medium">¿Playlist pública?</span>
							<input
								type="checkbox"
								className="checkbox"
								checked={isPublic}
								onChange={(e) => setIsPublic(e.target.checked)}
							/>
						</label>
					</div>

					{/* Botón enviar */}
					<button className="btn btn-primary mt-4" type="submit" disabled={loading}>
						{loading ? 'Creando...' : 'Crear playlist'}
					</button>
				</form>
			</div>
		</div>
	);
}

export default CreatePlaylist;
