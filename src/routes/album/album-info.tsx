import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {type Album, useAlbum} from "../../contexts/album.context.tsx";
import {MdFavorite, MdPlayArrow, MdPlaylistAdd} from "react-icons/md";
import AddToCart from "../../components/add-to-cart.component.tsx";

const AlbumTracklist = ({ album }: { album: Album }) => {
	return (
		<ul className="list rounded-box shadow-md p-5">
			<li className="text-xl font-bold">Pistas</li>

			<li className="list-row items-center">
				<div className="text-4xl font-thin tabular-nums">01</div>
				<div>
					<img className="size-12 rounded-box" alt="Pista" />
				</div>
				<div className="list-col-grow">
					<p className="text-lg font-bold">Pista</p>
					<p className="text-sm font-semibold opacity-60">Artista</p>
				</div>
				<button className="btn btn-primary">
					<MdPlayArrow />
					Vista previa
				</button>
			</li>
		</ul>
	)
}

const AlbumInfo = () => {
	const { uuid } = useParams();
	const album = useAlbum();
	const navigate = useNavigate();
	const [albumInfo, setAlbumInfo] = useState<Album | undefined>(undefined);

	useEffect(() => {
		album
			.getAlbum(uuid!)
			.then(a => setAlbumInfo(a))
			.catch(error => navigate("/404"))
	}, []);

	return (
		<div className="flex flex-col items-center p-5">
			{!albumInfo ? (
				<div className="skeleton w-full h-96" />
			) : (
				<div className="flex flex-col gap-5 w-full max-w-[1200px]">
					<div className="flex gap-5">
						<img
							src={albumInfo.cover}
							alt="Carátula del álbum"
							className="w-72 h-72 rounded-box"
						/>
						<div className="grow flex flex-col justify-between">
							<div className="flex flex-col gap-1">
								<h1 className="text-2xl">{albumInfo.title}</h1>
								<p>{albumInfo.author.artistName}</p>
								<div className="flex gap-2">
									{albumInfo.genres.map((genre) => (
										<span className="badge badge-primary">{genre.name}</span>
									))}
								</div>
							</div>
							<div className="flex gap-2">
								<button className="btn btn-square btn-secondary">
									<MdFavorite className="w-5 h-5" />
								</button>
							</div>
						</div>
						<AddToCart item={albumInfo} />
					</div>
					<AlbumTracklist album={albumInfo} />
				</div>
			)
			}
		</div>
	)
}

export default AlbumInfo;