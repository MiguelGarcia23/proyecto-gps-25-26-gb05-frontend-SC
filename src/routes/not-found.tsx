import {useNavigate} from "react-router";


const NotFound = () => {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col items-center justify-center h-screen gap-3">
			<h1 className="text-9xl font-bold">404</h1>
			<h2 className="text-2xl">Eso que buscas no se encuentra aquí</h2>
			<button className="btn btn-primary" onClick={() => navigate("/")}>
				Volver al inicio
			</button>
		</div>
	)
}

export default NotFound;