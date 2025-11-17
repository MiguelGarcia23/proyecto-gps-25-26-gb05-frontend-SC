import { MdOutlineLibraryMusic } from 'react-icons/md';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useArtist } from '../../contexts/pending/artists.context.tsx';

type AlbumForm = {
	albumName: string;
	albumSong: string[];
	albumCover: File;
};

function AlbumUpload() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<AlbumForm>();
	const artist = useArtist();
	const onSubmit: SubmitHandler<AlbumForm> = async (data) => {
		try {
			await artist.uploadAlbum(data.albumName, data.albumSong, data.albumCover[0]);
		} catch (error: any) {}
		console.log(data);
	};

	return (
		<div className="flex flex-col min-h-screen items-center justify-center">
			<div className="card w-96 shadow-sm p-3 bg-white">
				<div className="flex flex-col items-center">
					<MdOutlineLibraryMusic className="w-20 h-20" />
				</div>

				<h1 className="text-2xl font-bold text-center mt-2">Subir un álbum</h1>
				<div className="card-body">
					<form
						className="fieldset bg-base-200 border-base-300 roundedbox w-xs border p-4"
						onSubmit={handleSubmit(onSubmit)}
					>
						<label className="label"> Titulo</label>
						<input
							type="text"
							className="input"
							placeholder="Titulo"
							{...register('albumName', { required: true })}
						/>

						<label className="label">Portada</label>
						<input
							type="file"
							className="file-input file-input-ghost"
							accept=".png,.jpg,.jpeg"
							{...register('albumCover', { required: false })}
						/>

						<label className="label">Canciones del Álbum</label>
						<select
							className="select"
							multiple
							{...register('albumSong', { required: true })}
						>
							<option value="song1">Cancion1</option>
							<option value="song2">Cancion2</option>
							<option value="song3">Cancion3</option>
							<option value="song4">Cancion4</option>
							<option value="song5">Cancion5</option>
							<option value="song6">Cancion6</option>
						</select>
						<button type="submit" className="btn btn-md btn-primary w-full">
							Subir
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default AlbumUpload;
