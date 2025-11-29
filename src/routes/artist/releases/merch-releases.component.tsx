import { useEffect, useState } from 'react';
import {
	type Merch,
	MerchTypeMapping,
	useMerch,
} from '../../../contexts/merch.context.tsx';
import { MdDelete, MdEdit, MdPlayArrow, MdStore } from 'react-icons/md';
import MerchUpdate from './merch-update.component.tsx';
import { useNavigate } from 'react-router';

const MerchReleaseItem = ({ merch }: { merch: Merch }) => {
	const { remove } = useMerch();
	const navigate = useNavigate();

	const del = async () => {
		await remove(merch.uuid);
		window.location.reload();
	}

	return (
		<tr>
			<th>
				<img
					src={merch.previews[0]}
					alt="Vista previa"
					className="w-12 h-12 rounded-box"
				/>
			</th>
			<th className="w-full">{merch.title}</th>
			<th>{MerchTypeMapping[merch.type]}</th>
			<th>
				<p className="w-max">
					{(merch.price / 100).toFixed(2)} €
				</p>
			</th>
			<th>
				<div className="flex gap-2 w-fit">
					<button
						className="btn btn-accent btn-square"
						onClick={() => {
							(document.getElementById(`merch-update-modal-${merch.uuid}`) as any).showModal();
						}}
					>
						<MdEdit className="w-5 h-5" />
					</button>
					<button
						className="btn btn-active btn-square"
						onClick={() => navigate(`/merch/${merch.uuid}`)}
					>
						<MdStore className="w-5 h-5" />
					</button>
					<button
						className="btn btn-error btn-square"
						onClick={del}
					>
						<MdDelete className="w-5 h-5" />
					</button>
					<MerchUpdate merch={merch} />
				</div>
			</th>
		</tr>
	)
}

const MerchReleases = () => {
	const merch = useMerch();
	const [merchs, setMerchs] = useState<Merch[] | undefined>(undefined);

	useEffect(() => {
		merch.getFromToken()
			.then(m => setMerchs(m));
	}, []);

	if (merchs === undefined) return <div className="skeleton w-full h-96" />

	return (
		<table className="table">
			<thead>
				<tr>
					<th>Vista previa</th>
					<th>Nombre</th>
					<th>Tipo</th>
					<th>Precio</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
			{
				merchs.map(m => <MerchReleaseItem merch={m} key={m.uuid} />)
			}
			</tbody>
		</table>
	)
}

export default MerchReleases;