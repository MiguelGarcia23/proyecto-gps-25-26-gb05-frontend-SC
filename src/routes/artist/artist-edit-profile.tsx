import React, { useState, useEffect } from "react";
import  { type Artist, useArtist } from '../../contexts/artist.context.tsx';
import { useNavigate } from 'react-router';

const ArtistEditProfile: React.FC = () => {

	const navigate = useNavigate();

	const { getArtistByTokenSession, updateArtistProfile } = useArtist();

	const [artist, setArtist] = useState<Artist>();
	const [artistName, setArtistName] = useState(artist?.artistName || "");
	const [biography, setBiography] = useState(artist?.biography || "");
	const [bannerImg, setBannerImg] = useState(null);
	const [profileImg, setProfileImg] = useState(null);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		getArtistByTokenSession()
			.then((a) => setArtist(a))
			.catch((e) => console.error(e));
	}, [getArtistByTokenSession, navigate]);

	useEffect(() => {
		if (artist) {
			setArtistName(artist.artistName || "");
			setBiography(artist.biography || "");
		}
	}, [artist]);

	// Maneja la subida de archivos para el banner
	const handleBannerUpload = (e: any) => {
		const file = e.target.files[0];
		if (file) setBannerImg(file);
	};

	// Maneja la subida de archivos para la imagen de perfil
	const handleProfileUpload = (e: any) => {
		const file = e.target.files[0];
		if (file) setProfileImg(file);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			if (artist) {
				await updateArtistProfile({
					...artist,
					artistName,
					biography,
				}, profileImg!, bannerImg!);
				setMessage('Perfil de artista actualizado correctamente');
			}
		} catch (err) {
			console.error(err);
			setMessage('Error al guardar el perfil de artista');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-4xl mx-auto">
			<h1 className="text-3xl font-bold mb-6">
				Editar Perfil
			</h1>

			<div className="card bg-base-100 shadow-xl p-6 space-y-8">

				{/* Subida de imagen de Banner */}
				<div>
					<label className="block font-medium mb-2">Banner</label>
					<div className="w-full h-48 bg-base-200 rounded-lg flex items-center justify-center overflow-hidden relative">
						<img
							src={
								bannerImg
									? URL.createObjectURL(bannerImg)
									: artist?.bannerImg ?? ""
							}
							alt="Banner preview"
							className="w-full h-full object-cover"
						/>
					</div>
					<input
						type="file"
						className="file-input file-input-bordered w-full mt-3"
						accept=".jpg,.jpeg,.png"
						onChange={handleBannerUpload}
					/>
				</div>

				{/* Subida de imagen de perfil */}
				<div>
					<label className="block font-medium mb-2">Foto de Perfil</label>
					<div className="w-32 h-32 rounded-full bg-base-200 overflow-hidden flex items-center justify-center mx-auto">
						<img
							src={
								profileImg
									? URL.createObjectURL(profileImg)
									: artist?.profileImg ?? ""
							}
							alt="Profile preview"
							className="w-full h-full object-cover"
						/>
					</div>
					<input
						type="file"
						className="file-input file-input-bordered w-full mt-3"
						accept=".jpg,.jpeg,.png"
						onChange={handleProfileUpload}
					/>
				</div>

				{/* Nombre del artista */}
				<div>
					<label className="block font-medium mb-2">Nombre del Artista</label>
					<input
						type="text"
						value={artistName}
						onChange={(e) => setArtistName(e.target.value)}
						className="input input-bordered w-full"
						placeholder="Ej. Bad Bunny"
					/>
				</div>

				{/* Biografía */}
				<div>
					<label className="block font-medium mb-2">Biografía</label>
					<textarea
						value={biography}
						onChange={(e) => setBiography(e.target.value)}
						className="textarea textarea-bordered w-full h-32"
						placeholder="Escribe una biografía del artista..."
					/>
				</div>

				{/* Mensaje y botón */}
				<div className="flex justify-between items-center">
					{/* Mensaje */}
					<div className="modal-action flex justify-between items-center m-0">
						{message && (
							<p
								className={`text-sm ${
									message.includes('Error') ? 'text-error' : 'text-success font-semibold'
								}`}
							>
								{message}
							</p>
						)}
					</div>

					{/* Botón de envío */}
					<div className="flex justify-end">
						<button
							className= {`btn btn-primary ${loading ? 'btn-disabled' : ''}`}
							onClick={handleSubmit}
							disabled={loading}
						>
							{loading ? (
								<span className="loading loading-spinner loading-sm" />
							) : (
								"Guardar Cambios"
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ArtistEditProfile;