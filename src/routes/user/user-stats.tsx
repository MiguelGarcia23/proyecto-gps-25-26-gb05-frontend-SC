import { MdMoney, MdPeople, MdTimer } from 'react-icons/md';

const UserStats = () => {
	return (
		<div className="flex flex-col gap-5">
			<h1 className="text-3xl font-bold">Estadísticas</h1>
			<div className="flex flex-col gap-2">
				<div className="stats shadow">
					<div className="stat">
						<div className="stat-figure">
							<MdMoney className="w-12 h-12"/>
						</div>
						<div className="stat-title">Total gastado</div>
						<div className="stat-value">3217 €</div>
					</div>

					<div className="stat">
						<div className="stat-figure">
							<MdTimer className="w-12 h-12"/>
						</div>
						<div className="stat-title">Tiempo de escucha</div>
						<div className="stat-value">777 min</div>
					</div>
				</div>

				<div className="stats shadow">
					<div className="stat">
						<div className="stat-title">Canciones más escuchadas</div>
					</div>

					<div className="stat">
						<div className="stat-title">Artistas más escuchados</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default UserStats;