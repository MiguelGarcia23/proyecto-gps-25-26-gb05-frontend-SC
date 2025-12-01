import { type Genre, useGenre } from '../../contexts/genre.context.tsx';
import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';

const CreateGenreModal = () => {
	const genre = useGenre();
	const [name, setName] = useState<string | undefined>(undefined);

	const onSubmit = async () => {
		if (!name) return;
		await genre.postGenre(name);
		window.location.reload();
	}

	return (
		<dialog id="create-genre-modal" className="modal">
			<div className="modal-box">
				<form method="dialog">
					<button className="btn btn-ghost btn-square btn-sm absolute top-5 right-5">✕</button>
				</form>

				<div className="flex flex-col gap-5">
					<h2 className="text-xl font-bold">Crear género</h2>

					<div className="flex flex-col gap-2">
						<label className="label">Nombre</label>
						<input
							placeholder="Nombre"
							className="input w-full"
							type="text"
							onChange={(e: any) => setName(e.target.value)}
						/>
						<button
							className="btn btn-primary"
							onClick={onSubmit}
						>
							Crear
						</button>
					</div>

				</div>
			</div>
		</dialog>
	)
}

const AdminGenres = () => {
	const genre = useGenre();
	const [genres, setGenres] = useState<Genre[]>([])

	useEffect(() => {
		genre.getGenres()
			.then(g => setGenres(g));
	}, []);

	return (
		<div>
			<div className="flex justify-between">
				<h1 className="font-bold text-3xl">
					Géneros
				</h1>
				<button
					className="btn btn-primary"
					onClick={() => (document.getElementById('create-genre-modal') as unknown as any).showModal()}
				>
					+ Crear género
				</button>
				<CreateGenreModal />
			</div>
			<table className="table">
				<thead>
					<tr>
						<th>Nombre</th>
						<th>UUID</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
				{
					genres.map(g => (
						<tr key={g.uuid}>
							<th>{g.name}</th>
							<th>{g.uuid}</th>
							<th>
								<button
									className="btn btn-error btn-square"
									onClick={async () => {
										await genre.deleteGenre(g.uuid);
										window.location.reload();
									}}
								>
									<MdDelete />
								</button>
							</th>
						</tr>
					))
				}
				</tbody>
			</table>
		</div>
	)
}

export default AdminGenres;