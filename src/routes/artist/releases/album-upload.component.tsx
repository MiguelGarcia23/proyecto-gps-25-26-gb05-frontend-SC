import { type SubmitHandler, useForm } from 'react-hook-form';
import { MdPostAdd, MdUpload } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { type Genre, useGenre } from '../../../contexts/genre.context.tsx';
import { useToast } from '../../../contexts/toast.context.tsx';
import { type Artist, useArtist } from '../../../contexts/artist.context.tsx';
import type { Song } from '../../../contexts/song.context.tsx';

type AlbumUploadForm = {
	title: string;
	cover: string;
	songs: string[];
	pricingCd: number;
	pricingCassette: number;
	pricingVinyl: number;
	pricingDigital: number;
};

const AlbumUpload = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<AlbumUploadForm>();
	const toast = useToast();
	const artist = useArtist();
	const [availableSongs, setAvailableSongs] = useState<Song[]>([]);
	const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
	const [cover, setCover] = useState();

	useEffect(() => {
		artist.getSongs().then((s) => setAvailableSongs(s));
	}, []);

	const onSubmit: SubmitHandler<AlbumUploadForm> = async (data) => {
		if (selectedSongs.length === 0) {
			toast.showToast('Debes seleccionar al menos una canción', 'error', 5000);
			return;
		}
		if (!cover) {
			toast.showToast('Debes subir la carátula', 'error', 5000);
			return;
		}

		await artist.uploadAlbum(
			{
				...data,
				songs: selectedSongs.map((g) => g.uuid) as unknown as Song[],
				pricing: {
					cd: data.pricingCd * 100,
					digital: data.pricingDigital * 100,
					cassette: data.pricingCassette * 100,
					vinyl: data.pricingVinyl * 100,
				},
			},
			cover!,
		);
		window.location.reload();
	};

	const coverUpload = (e: any) => {
		const file = e.target.files[0];
		if (!file) return;
		setCover(file);
	};

	return (
		<dialog id="album-upload-modal" className="modal">
			<div className="modal-box max-w-4xl">
				<form method="dialog">
					<button className="btn btn-sm btn-cicle btn-ghost absolute top-6 right-6">
						✕
					</button>
				</form>
				<p className="text-2xl font-bold">Nuevo álbum</p>
				<form
					className="flex flex-col gap-2 mt-5"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="flex gap-5">
						<div className="flex flex-col gap-2">
							<div className="relative inline-block">
								{cover ? (
									<img
										alt="Vista previa de carátula"
										src={cover ? URL.createObjectURL(cover) : ''}
										className="w-60 h-60 rounded-box object-cover"
									/>
								) : (
									<div className="skeleton w-60 h-60 rounded-box" />
								)}
								<input
									id="upload-album-cover-input"
									type="file"
									className="hidden"
									accept=".jpg,.jpeg,.png"
									onChange={coverUpload}
								/>
								<button
									type="button"
									className="absolute bottom-2 right-2 btn btn-accent btn-square w-12 h-12"
									onClick={() =>
										document.getElementById('upload-album-cover-input')?.click()
									}
								>
									<MdUpload className="w-7 h-7" />
								</button>
							</div>
						</div>

						<div className="flex flex-col justify-between gap-5 grow">
							<div className="flex flex-col gap-2">
								<label className="label font-semibold">Título</label>
								<input
									className="input w-full"
									placeholder="Canción to guapa"
									type="text"
									{...register('title', { required: true })}
								/>
							</div>

							<div className="flex gap-2">
								<div className="flex flex-col gap-2 flex-1">
									<label className="label font-semibold">Canciones</label>
									<div className="flex flex-wrap gap-2 overflow-auto max-h-72">
										<table className="table">
											<thead>
												<tr>
													<th></th>
													<th>Título</th>
													<th>Fecha</th>
												</tr>
											</thead>
											<tbody>
												{availableSongs.map((s, index) => (
													<tr key={index}>
														<th>
															<label>
																<input
																	type="checkbox"
																	className="checkbox"
																	checked={selectedSongs.some((i) => i.uuid === s.uuid)}
																	onChange={() => {
																		if (selectedSongs.some((i) => i.uuid === s.uuid)) {
																			setSelectedSongs(
																				selectedSongs.filter((i) => i.uuid !== s.uuid),
																			);
																		} else {
																			setSelectedSongs([...selectedSongs, s]);
																		}
																	}}
																/>
															</label>
														</th>
														<td className="list-col-grow">{s.title}</td>
														<td>{new Date(s.releaseDate).toLocaleDateString()}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>

								<div className="flex flex-col gap-2 flex-1">
									<label className="label font-semibold">Precios</label>
									<label className="label text-sm">Digital</label>
									<input
										className="input"
										type="number"
										step="0.01"
										{...register('pricingDigital', { required: true, min: 1 })}
									/>

									<label className="label text-sm">CD</label>
									<input
										className="input"
										type="number"
										step="0.01"
										{...register('pricingCd', { required: true, min: 1 })}
									/>

									<label className="label text-sm">Vinilo</label>
									<input
										className="input"
										type="number"
										step="0.01"
										{...register('pricingVinyl', { required: true, min: 1 })}
									/>

									<label className="label text-sm">Cassette</label>
									<input
										className="input"
										type="number"
										step="0.01"
										{...register('pricingCassette', { required: true, min: 1 })}
									/>
								</div>
							</div>

							<button className="btn btn-primary">
								<MdPostAdd />
								Publicar
							</button>
						</div>
					</div>
				</form>
			</div>
		</dialog>
	);
};

export default AlbumUpload;
