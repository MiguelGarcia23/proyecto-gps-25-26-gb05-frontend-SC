import { useForm, type SubmitHandler } from 'react-hook-form';
import { useUser } from '../contexts/user.context.tsx';
import { useToast } from '../contexts/toast.context';

type PublicForm = {
	username: string;
	imgUrl: string;
};

export default function PublicProfileForm() {
	const { updatePublicUser } = useUser();
	const { showToast } = useToast();

	const { register, handleSubmit } = useForm<PublicForm>();

	const onSubmit: SubmitHandler<PublicForm> = async (data) => {
		try {
			await updatePublicUser(data);
			showToast('Datos públicos actualizados', 'success', 4000);
		} catch {
			showToast('Error al actualizar', 'error', 4000);
		}
	};

	return (
		<div className="card w-full max-w-xl bg-white p-6 shadow text-center">
			<h2 className="text-xl font-bold mb-4">Datos públicos</h2>

			<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
				<label className="label">Nombre de usuario </label>
				<input
					type="text"
					placeholder="username123"
					className="input w-full"
					{...register('username', { required: true })}
				/>

				<label className="label">Imagen de usuario</label>
				<input
					type="file"
					placeholder="http://img.jpg"
					className="input w-full"
					{...register('imgUrl', { required: true })}
				/>

				<button className="btn btn-primary">Guardar cambios </button>
			</form>
		</div>
	);
}
