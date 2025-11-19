import { type SubmitHandler, useForm } from 'react-hook-form';
import { MdOutlineUploadFile } from 'react-icons/md';
import { useArtist } from '../../contexts/pending/artists.context.tsx';

type SongForm = {
	songName: string;
	songFile: FileList;
	songCover: FileList;
};
function SongUpload() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SongForm>();
	const artist = useArtist();
	const onSubmit: SubmitHandler<SongForm> = async (data) => {
		try {
			await artist.uploadSong(data.songName, data.songFile[0], data.songCover[0]);
		} catch (error: any) {}
		console.log(data);
	};

	return (
		<div className="flex flex-col min-h-screen items-center justify-center">
			<div className="card w-96 shadow-sm p-3 bg-white">
				<div className="flex flex-col items-center">
					<MdOutlineUploadFile className="w-20 h-20" />
				</div>

				<h1 className="text-2xl font-bold text-center mt-2">Subir una canción</h1>
				<div className="card-body">
					<form
						className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
						onSubmit={handleSubmit(onSubmit)}
					>
						<label className="label">Título</label>
						<input
							type="text"
							className="input"
							placeholder="Título"
							{...register('songName', { required: true })}
						/>
						<label className="label">Autor</label>
						<input
							type="text"
							className="input"
							placeholder="Nombre del Usuario"
							disabled
						/>{' '}
						{/* La idea es que podamos recoger por defecto el nombre del usuario que sube la canción y que se muestre aquí, no que sea un campo rellenable*/}
						<label className="label">Archivo</label>
						<input
							type="file"
							className="file-input file-input-ghost"
							accept=".mp3,.wav,.aiff,.aif,.flac,.m4a,.alac,.aac,.m4a,.ogg,.oga,.opus"
							{...register('songFile', { required: true })}
						/>
						<label className="label">Portada</label>
						<input
							type="file"
							className="file-input file-input-ghost"
							accept=".png,.jpg,.jpeg"
							{...register('songCover', { required: false })}
						/>
						<button type="submit" className="btn btn-md btn-primary w-full">
							Subir
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SongUpload;
