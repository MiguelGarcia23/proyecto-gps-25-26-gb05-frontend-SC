import type { Song } from '../../../contexts/song.context.tsx';
import { useForm } from 'react-hook-form';
import { type Genre, useGenre } from '../../../contexts/genre.context.tsx';
import { useToast } from '../../../contexts/toast.context.tsx';
import { useArtist } from '../../../contexts/artist.context.tsx';
import { useEffect, useState } from 'react';
import { MdPostAdd, MdUpdate } from 'react-icons/md';

type SongUpdateForm = {
	title: string;
	featuring: string[];
	pricingCd: number;
	pricingCassette: number;
	pricingVinyl: number;
	pricingDigital: number;
}

const SongUpdate = ({ song }: { song: Song }) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<SongUpdateForm>();
	const genre = useGenre();
	const toast = useToast();
	const artist = useArtist();
	const [availableGenres, setAvailableGenres] = useState<Genre[]>([]);
	const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

	useEffect(() => {
		genre.getGenres().then(g => setAvailableGenres(g));
		setSelectedGenres(song.genres);
	}, []);

	const onSubmit = async (data: SongUpdateForm) => {
		if (selectedGenres.length === 0) {
			toast.showToast('Debes seleccionar al menos un género', 'error', 5000);
			return;
		}
		const form = Object.fromEntries(
			Object.entries(data).filter(([key, value]) => value !== '')
		);
		await artist.updateSong({
			...form,
			uuid: song.uuid,
			pricing: {
				cd: data.pricingCd ? Math.round(data.pricingCd * 100) : song.pricing.cd,
				cassette: data.pricingCassette ? Math.round(data.pricingCassette * 100) : song.pricing.cassette,
				vinyl: data.pricingVinyl ? Math.round(data.pricingVinyl * 100) : song.pricing.vinyl,
				digital: data.pricingDigital ? Math.round(data.pricingDigital * 100) : song.pricing.digital
			},
			genres: selectedGenres.map(g => g.uuid) as unknown as Genre[]
		});
		window.location.reload();
	}

	return (
		<dialog className="modal" id={`song-update-modal-${song.uuid}`}>
			<div className="modal-box max-w-2xl">
				<form method="dialog">
					<button className="btn btn-sm btn-square btn-ghost absolute top-6 right-6">
						✕
					</button>
				</form>
				<p className="text-2xl font-bold">Editar {song.title}</p>
				<form
					className="flex flex-col gap-2 mt-5"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="flex flex-col justify-between gap-5 grow">
						<div className="flex flex-col gap-2">
							<label className="label font-semibold">Título</label>
							<input
								className="input w-full"
								placeholder={song.title}
								type="text"
								{...register('title')}
							/>
						</div>

						<div className="flex gap-2">
							<div className="flex flex-col gap-2 flex-1">
								<label className="label font-semibold">Géneros</label>
								<div className="flex flex-wrap gap-2">
									{availableGenres.map((g) => (
										<span
											className={`badge badge-${
												selectedGenres.some((i) => i.uuid === g.uuid) ? 'primary' : 'ghost'
											}`}
											onClick={() => {
												if (selectedGenres.some((i) => i.uuid === g.uuid)) {
													setSelectedGenres(
														selectedGenres.filter((i) => i.uuid !== g.uuid),
													);
												} else {
													setSelectedGenres([...selectedGenres, g]);
												}
											}}
											key={g.uuid}
										>
												{g.name}
											</span>
									))}
								</div>
							</div>

							<div className="flex flex-col gap-2 flex-1">
								<label className="label font-semibold">Precios</label>
								<label className="label text-sm">Digital</label>
								<input
									className="input"
									placeholder={(song.pricing.digital / 100).toFixed(2) + ' €'}
									type="number"
									step="0.01"
									{...register('pricingDigital', { min: 1 })}
								/>

								<label className="label text-sm">CD</label>
								<input
									className="input"
									placeholder={(song.pricing.cd / 100).toFixed(2) + ' €'}
									type="number"
									step="0.01"
									{...register('pricingCd', { min: 1 })}
								/>

								<label className="label text-sm">Vinilo</label>
								<input
									className="input"
									placeholder={(song.pricing.vinyl / 100).toFixed(2) + ' €'}
									type="number"
									step="0.01"
									{...register('pricingVinyl', { min: 1 })}
								/>

								<label className="label text-sm">Cassette</label>
								<input
									className="input"
									placeholder={(song.pricing.cassette / 100).toFixed(2) + ' €'}
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
				</form>
			</div>
		</dialog>
	)
}

export default SongUpdate;