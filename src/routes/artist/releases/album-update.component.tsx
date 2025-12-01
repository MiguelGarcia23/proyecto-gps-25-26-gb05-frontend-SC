import type { Album } from '../../../contexts/album.context.tsx';
import { MdPostAdd, MdUpdate, MdUpload } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { useToast } from '../../../contexts/toast.context.tsx';
import { useArtist } from '../../../contexts/artist.context.tsx';
import { useEffect, useState } from 'react';
import type { Song } from '../../../contexts/song.context.tsx';

type AlbumUpdateForm = {
	title: string;
	songs: string[];
	pricingCd: number;
	pricingCassette: number;
	pricingVinyl: number;
	pricingDigital: number;
}

const AlbumUpdate = ({ album }: { album: Album }) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<AlbumUpdateForm>();
	const toast = useToast();
	const artist = useArtist();
	const [availableSongs, setAvailableSongs] = useState<Song[]>([]);
	const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);

	useEffect(() => {
		artist.getSongs().then((s) => setAvailableSongs(s));
		setSelectedSongs(album.songs);
	}, []);

	const onSubmit = async (data: AlbumUpdateForm) => {
		if (selectedSongs.length === 0) {
			toast.showToast('Debes seleccionar al menos una canción', 'error', 5000);
			return;
		}

		const form = Object.fromEntries(
			Object.entries(data).filter(([key, value]) => value !== '')
		);

		await artist.updateAlbum(
			{
				...form,
				uuid: album.uuid,
				songs: selectedSongs.map((g) => g.uuid) as unknown as Song[],
				pricing: {
					cd: data.pricingCd ? Math.round(data.pricingCd * 100) : album.pricing.cd,
					cassette: data.pricingCassette ? Math.round(data.pricingCassette * 100) : album.pricing.cassette,
					vinyl: data.pricingVinyl ? Math.round(data.pricingVinyl * 100) : album.pricing.vinyl,
					digital: data.pricingDigital ? Math.round(data.pricingDigital * 100) : album.pricing.digital
				},
			}
		);
		window.location.reload();
	}

	return (
		<dialog id={`album-update-modal-${album.uuid}`} className="modal">
			<div className="modal-box max-w-4xl">
				<form method="dialog">
					<button className="btn btn-sm btn-cicle btn-ghost absolute top-6 right-6">
						✕
					</button>
				</form>
				<p className="text-2xl font-bold">Editar {album.title}</p>
				<form
					className="flex flex-col gap-2 mt-5"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="flex gap-5">
						<div className="flex flex-col justify-between gap-5 grow">
							<div className="flex flex-col gap-2">
								<label className="label font-semibold">Título</label>
								<input
									className="input w-full"
									placeholder={album.title}
									type="text"
									{...register('title')}
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
										placeholder={(album.pricing.digital / 100).toFixed(2) + ' €'}
										type="number"
										step="0.01"
										{...register('pricingDigital', { min: 1 })}
									/>

									<label className="label text-sm">CD</label>
									<input
										className="input"
										placeholder={(album.pricing.cd / 100).toFixed(2) + ' €'}
										type="number"
										step="0.01"
										{...register('pricingCd', { min: 1 })}
									/>

									<label className="label text-sm">Vinilo</label>
									<input
										className="input"
										placeholder={(album.pricing.vinyl / 100).toFixed(2) + ' €'}
										type="number"
										step="0.01"
										{...register('pricingVinyl', { min: 1 })}
									/>

									<label className="label text-sm">Cassette</label>
									<input
										className="input"
										placeholder={(album.pricing.cassette / 100).toFixed(2) + ' €'}
										type="number"
										step="0.01"
										{...register('pricingCassette', { min: 1 })}
									/>
								</div>
							</div>

							<button className="btn btn-primary">
								<MdUpdate />
								Actualizar
							</button>
						</div>
					</div>
				</form>
			</div>
		</dialog>
	)
}

export default AlbumUpdate;