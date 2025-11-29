import type { Song } from '../../../contexts/song.context.tsx';
import type { Album } from '../../../contexts/album.context.tsx';
import {
	MerchType,
	MerchTypeMapping, useMerch,
} from '../../../contexts/merch.context.tsx';
import { useForm } from 'react-hook-form';
import { MdSell } from 'react-icons/md';

type MerchUploadForm = {
	type: MerchType;
	price: number;
	title: string;
	description: string;
}

const MerchUpload = ({ referenceType, reference }: { referenceType: 'song' | 'album', reference: Song | Album }) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<MerchUploadForm>();
	const merch = useMerch();

	const onSubmit = async (data: MerchUploadForm) => {
		await merch.upload({
			reference: reference.uuid as unknown as Album,
			referenceType,
			...data,
			price: Math.round(data.price * 100)
		});
		window.location.reload();
	}

	return (
		<dialog className="modal" id={`merch-upload-modal-${reference.uuid}`}>
			<div className="modal-box max-w-2xl">
				<form method="dialog">
					<button className="btn btn-sm btn-square btn-ghost absolute top-6 right-6">
						✕
					</button>
				</form>
				<p
					className="text-2xl font-bold truncate max-w-xl"
				>
					Crear merchandising de {reference.title}
				</p>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-2 mt-5"
				>
					<div className="flex gap-2 items-center">
						<fieldset className="fieldset flex-1">
							<label className="label text-sm">Tipo</label>
							<select
								defaultValue={MerchTypeMapping[MerchType.TSHIRT]}
								className="select"
								{...register('type', { required: true })}
							>
								<option disabled>Escoge un tipo</option>
								<option value={MerchType.TSHIRT}>{MerchTypeMapping[MerchType.TSHIRT]}</option>
								<option value={MerchType.HOODIE}>{MerchTypeMapping[MerchType.HOODIE]}</option>
								<option value={MerchType.CAP}>{MerchTypeMapping[MerchType.CAP]}</option>
								<option value={MerchType.POSTER}>{MerchTypeMapping[MerchType.POSTER]}</option>
								<option value={MerchType.TOTEBAG}>{MerchTypeMapping[MerchType.TOTEBAG]}</option>
								<option value={MerchType.STICKERS}>{MerchTypeMapping[MerchType.STICKERS]}</option>
								<option value={MerchType.PHONECASE}>{MerchTypeMapping[MerchType.PHONECASE]}</option>
								<option value={MerchType.BRACELET}>{MerchTypeMapping[MerchType.BRACELET]}</option>
								<option value={MerchType.MUG}>{MerchTypeMapping[MerchType.MUG]}</option>
							</select>
						</fieldset>
						<div className="flex flex-col gap-1 flex-2">
							<label className="label">Título</label>
							<input
								className="input w-full"
								{...register('title', { required: true })}
							/>
						</div>
					</div>

					<div className="flex flex-col gap-1">
						<label className="label">Descripción</label>
						<textarea
							className="textarea w-full"
							placeholder="Descripción"
							{...register('description', { required: true })}
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="label">Precio</label>
						<input
							className="input w-full"
							type="number"
							step="0.01"
							placeholder=" €"
							{...register('price', { required: true, min: 1 })}
						/>
					</div>

					<button
						className="btn btn-primary w-full"
					>
						<MdSell />
						Crear
					</button>
				</form>
			</div>
		</dialog>
	)
}

export default MerchUpload;