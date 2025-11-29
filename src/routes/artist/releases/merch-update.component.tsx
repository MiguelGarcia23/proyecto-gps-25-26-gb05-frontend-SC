import  { type Merch, useMerch } from '../../../contexts/merch.context.tsx';
import { useForm } from 'react-hook-form';
import { MdUpdate, MdUpload } from 'react-icons/md';
import { removeEmptyFields } from '../../../lib/util.ts';

type MerchUpdateForm = {
	title: string;
	description: string;
	price: number;
}

const MerchUpdate = ({ merch }: { merch: Merch }) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<MerchUpdateForm>();
	const { update } = useMerch();

	const onSubmit = async (data: MerchUpdateForm) => {
		removeEmptyFields(data);
		await update({
			uuid: merch.uuid,
			...data,
			price: Math.round(data.price * 100)
		});
		window.location.reload();
	}

	return (
		<dialog className="modal" id={`merch-update-modal-${merch.uuid}`}>
			<div className="modal-box max-w-2xl">
				<form method="dialog">
					<button className="btn btn-sm btn-square btn-ghost absolute top-6 right-6">
						✕
					</button>
				</form>
				<p className="text-2xl font-bold">Editar {merch.title}</p>

				<form
					className="flex flex-col gap-2 mt-5"
					onSubmit={handleSubmit(onSubmit)}
				>
					<label className="label">Título</label>
					<input
						className="input w-full"
						placeholder={merch.title}
						{...register('title')}
					/>

					<label className="label">Descripción</label>
					<textarea
						className="textarea w-full"
						placeholder={merch.description}
						{...register('description')}
					/>

					<label className="label">Precio</label>
					<input
						className="input w-full"
						type="number"
						step="0.01"
						placeholder={(merch.price / 100).toFixed(2) + ' €'}
						{...register('price', { min: 1 })}
					/>

					<button className="btn btn-primary w-full">
						<MdUpload />
						Actualizar
					</button>
				</form>
			</div>
		</dialog>
	)
}

export default MerchUpdate;