import {
	MdAlbum,
	MdLibraryMusic,
	MdMonetizationOn,
	MdMoney,
	MdMusicNote,
	MdPeople,
	MdPlayArrow,
} from 'react-icons/md';
import { CiShirt } from 'react-icons/ci';
import { FaShirt } from 'react-icons/fa6';
import { BsCassette, BsVinyl } from 'react-icons/bs';
import { CgVinyl } from 'react-icons/cg';
import { LuCassetteTape } from 'react-icons/lu';

const ArtistStats = () => {
	return (
		<div className="flex flex-col gap-5">
			<h1 className="text-3xl font-bold">Estadísticas</h1>
			<div className="flex flex-col gap-2">
				<div className="stats shadow">
					<div className="stat">
						<div className="stat-figure">
							<MdPeople className="w-12 h-12"/>
						</div>
						<div className="stat-title">Seguidores</div>
						<div className="stat-value">321787</div>
					</div>

					<div className="stat">
						<div className="stat-figure">
							<MdMonetizationOn className="w-12 h-12"/>
						</div>
						<div className="stat-title">Ganancias totales</div>
						<div className="stat-value">77.23 €</div>
					</div>

					<div className="stat">
						<div className="stat-figure">
							<MdPlayArrow className="w-12 h-12"/>
						</div>
						<div className="stat-title">Reproducciones</div>
						<div className="stat-value">7729882</div>
					</div>
				</div>

				<div className="flex gap-5">
					<div className="stats shadow stats-vertical flex-1">
						<div className="stat">
							<div className="stat-figure">
								<MdMusicNote className="w-12 h-12"/>
							</div>
							<div className="stat-title">Canciones vendidas</div>
							<div className="stat-value">22871</div>
						</div>

						<div className="stat">
							<div className="stat-figure">
								<MdAlbum className="w-12 h-12"/>
							</div>
							<div className="stat-title">Álbumes vendidos</div>
							<div className="stat-value">22871</div>
						</div>

						<div className="stat">
							<div className="stat-figure">
								<FaShirt className="w-12 h-12"/>
							</div>
							<div className="stat-title">Merchandising vendido</div>
							<div className="stat-value">22871</div>
						</div>
					</div>

					<div className="stats shadow stats-vertical flex-1">
						<div className="stat">
							<div className="stat-figure">
								<MdLibraryMusic className="w-12 h-12"/>
							</div>
							<div className="stat-title">Productos digitales vendidos</div>
							<div className="stat-value">22871</div>
						</div>

						<div className="stat">
							<div className="stat-figure">
								<MdAlbum className="w-12 h-12"/>
							</div>
							<div className="stat-title">CDs vendidos</div>
							<div className="stat-value">22871</div>
						</div>

						<div className="stat">
							<div className="stat-figure">
								<CgVinyl className="w-12 h-12"/>
							</div>
							<div className="stat-title">Vinilos vendidos</div>
							<div className="stat-value">22871</div>
						</div>

						<div className="stat">
							<div className="stat-figure">
								<LuCassetteTape className="w-12 h-12"/>
							</div>
							<div className="stat-title">Cassettes vendidos</div>
							<div className="stat-value">22871</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ArtistStats;