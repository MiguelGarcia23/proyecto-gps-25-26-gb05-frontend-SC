import { useForm, type SubmitHandler } from 'react-hook-form';
import { useUser } from '../contexts/user.context.tsx';
import { useToast } from '../contexts/toast.context';

type PrivateForm = {
	firstName: string;
	lastName: string;
};

export default function PrivateProfileForm() {
	const { updatePrivateUser } = useUser();
	const { showToast } = useToast();

	const { register, handleSubmit } = useForm<PrivateForm>();

	const onSubmit: SubmitHandler<PrivateForm> = async (data) => {
		try {
			await updatePrivateUser(data);
			showToast('Datos privados actualizados', 'success', 4000);
		} catch {
			showToast('Error actualizando', 'error', 4000);
		}
	};

	return (
		<div className="card w-full max-w-xl bg-white p-6 shadow text-center">
			<h2 className="text-xl font-bold mb-4">Datos privados</h2>

			<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
				<label className="label">Nombre</label>
				<input
					type="text"
					placeholder="John"
					className="input w-full"
					{...register('firstName', { required: true })}
				/>

				<label className="label">Apellidos</label>
				<input
					type="text"
					placeholder="Doe"
					className="input w-full"
					{...register('lastName', { required: true })}
				/>

				<button className="btn btn-primary">Guardar cambios</button>
			</form>
		</div>
	);
}
