import { useNavigate } from 'react-router';

const Index = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className="flex flex-col gap-2 items-center justify-center grow h-[80dvh] min-h-96">
				<h1 className="text-5xl">Tu nueva forma de descubrir música</h1>
				<h1 className="text-5xl font-bold italic">independiente.</h1>
				<div className="flex gap-2">
					<button
						className="btn btn-accent mt-3"
						onClick={() => navigate('auth/sign-up')}
					>
						Regístrate ahora
					</button>
					<button className="btn btn-outline mt-3" onClick={() => navigate('shop')}>
						Descubre el catálogo
					</button>
				</div>
			</div>

			<div className="flex items-center bg-gray-800 justify-center py-5">
				<h1 className="text-5xl text-white">¿Por qué elegirnos?</h1>
			</div>

			<div className="flex gap-5 items-start justify-center grow bg-gray-200 p-10">
				<div className="flex-col items-center justify-center text-end max-w-96">
					<h2 className="text-4xl font-bold">Compra música</h2>
					<h2 className="text-xl">
						Adquiere tu música favorita en tu formato preferido: desde cassette hasta
						digital
					</h2>
				</div>
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/1200px-Example_image.svg.png"
					alt="Compra música"
					width="640"
					height="480"
				/>
			</div>

			<div className="flex gap-5 items-start justify-center grow bg-gray-300 p-10">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/1200px-Example_image.svg.png"
					alt="Compra música"
					width="640"
					height="480"
				/>
				<div className="flex-col items-center justify-center text-start max-w-96">
					<h2 className="text-4xl font-bold">Reproduce sin límites</h2>
					<h2 className="text-xl">
						Reproduce o descarga tu librería digital en cualquier momento
					</h2>
				</div>
			</div>

			<div className="flex gap-5 items-start justify-center grow bg-gray-200 p-10">
				<div className="flex flex-col items-end justify-center text-end max-w-96">
					<div>
						<h2 className="text-4xl font-bold">Calidad de estudio</h2>
						<h2 className="text-xl">
							Disfruta de tu música en formatos sin pérdida como AAC y FLAC
						</h2>
					</div>
				</div>
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/1200px-Example_image.svg.png"
					alt="Compra música"
					width="640"
					height="480"
				/>
			</div>

			<div className="flex gap-5 items-start justify-center grow bg-gray-300 p-10">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/1200px-Example_image.svg.png"
					alt="Compra música"
					width="640"
					height="480"
				/>
				<div className="flex-col items-center justify-center text-start max-w-96">
					<h2 className="text-4xl font-bold">Sigue a tus artistas favoritos</h2>
					<h2 className="text-xl">
						Mantente al día con notificaciones sobre nuevos lanzamientos
					</h2>
				</div>
			</div>

			<div className="flex gap-5 items-start justify-center grow bg-gray-200 p-10">
				<div className="flex flex-col items-center justify-center text-center max-w-96">
					<div>
						<h2 className="text-4xl font-bold">¿Alguna duda?</h2>
						<h2 className="text-xl">
							Visita el centro de ayuda para conocer más sobre UnderSounds
						</h2>
						<button className="btn btn-info mt-5" onClick={() => navigate('help')}>
							Centro de ayuda
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Index;
