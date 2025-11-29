import { type SubmitHandler, useForm } from 'react-hook-form';
import { MdPostAdd, MdUpload } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { type Genre, useGenre } from '../../../contexts/genre.context.tsx';
import { useToast } from '../../../contexts/toast.context.tsx';
import { type Artist, useArtist } from '../../../contexts/artist.context.tsx';

type SongUploadForm = {
	title: string;
	featuring: string[];
	cover: string;
	file: string;
	pricingCd: number;
	pricingCassette: number;
	pricingVinyl: number;
	pricingDigital: number;
};

const SongUpload = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SongUploadForm>();
	const genre = useGenre();
	const toast = useToast();
	const artist = useArtist();
	const [availableGenres, setAvailableGenres] = useState<Genre[]>([]);
	const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
	const [file, setFile] = useState();
	const [cover, setCover] = useState();

	useEffect(() => {
		genre.getGenres().then(g => setAvailableGenres(g));
	}, []);

	const onSubmit: SubmitHandler<SongUploadForm> = async (data) => {
		if (selectedGenres.length === 0) {
			toast.showToast('Debes seleccionar al menos un género', 'error', 5000);
			return;
		}
		if (!cover) {
			toast.showToast('Debes subir la carátula', 'error', 5000);
			return;
		}
		if (!file) {
			toast.showToast('Debes subir el fichero de la canción', 'error', 5000);
		}
		await artist.uploadSong(
			{
				...data,
				genres: selectedGenres.map((g) => g.uuid) as unknown as Genre[],
				featuring: [],
				pricing: {
					cd: Math.round(data.pricingCd * 100),
					digital: Math.round(data.pricingDigital * 100),
					cassette: Math.round(data.pricingCassette * 100),
					vinyl: Math.round(data.pricingVinyl * 100),
				},
			},
			cover!,
			file!,
		);
		window.location.reload();
	};

	const coverUpload = (e: any) => {
		const file = e.target.files[0];
		if (!file) return;
		setCover(file);
	};

	const fileUpload = (e: any) => {
		const file = e.target.files[0];
		if (!file) return;
		setFile(file);
	};

	return (
		<dialog id="song-upload-modal" className="modal">
			<div className="modal-box max-w-4xl">
				<form method="dialog">
					<button className="btn btn-sm btn-cicle btn-ghost absolute top-6 right-6">
						✕
					</button>
				</form>
				<p className="text-2xl font-bold">Nueva canción</p>
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
									id="upload-song-cover-input"
									type="file"
									className="hidden"
									accept=".jpg,.jpeg,.png"
									onChange={coverUpload}
								/>
								<button
									type="button"
									className="absolute bottom-2 right-2 btn btn-accent btn-square w-12 h-12"
									onClick={() =>
										document.getElementById('upload-song-cover-input')?.click()
									}
								>
									<MdUpload className="w-7 h-7" />
								</button>
							</div>

							<input
								id="upload-song-file-input"
								type="file"
								className="hidden"
								accept=".mp3,.aac,.flac"
								onChange={fileUpload}
							/>
							<button
								type="button"
								className="btn btn-outline border-2 border-dashed flex flex-col items-center justify-center w-60 h-60"
								onClick={() =>
									document.getElementById('upload-song-file-input')?.click()
								}
							>
								<MdUpload className="w-10 h-10" />
								Subir archivo
								<span className="badge badge-info">MP3, AAC, FLAC</span>
							</button>
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

export default SongUpload;
