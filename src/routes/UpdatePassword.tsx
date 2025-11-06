// src/components/user/PublicProfileForm.tsx
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useUser } from '../contexts/user.context.tsx';
import { useToast } from '../contexts/toast.context';

type PasswordForm = {
	password: string;
};

export default function ChangePasswordForm() {
	const { updatePrivateUser } = useUser();
	const { showToast } = useToast();

	const { register, handleSubmit } = useForm<PasswordForm>();

	const onSubmit: SubmitHandler<PasswordForm> = async (data) => {
		try {
			await updatePrivateUser(data);
			showToast("Datos públicos actualizados", "success", 4000);
		} catch {
			showToast("Error al actualizar", "error", 4000);
		}
	};

	return (
		<div className="card w-full max-w-xl bg-white p-6 shadow text-center">
			<h2 className="text-xl font-bold mb-4">Cambiar contraseña</h2>

			<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
					<label className="label">Contraseña </label>
					<input type="password" placeholder="username123" className="input w-full" {...register("password", { required: true })} />

				<button className="btn btn-primary">Guardar cambios </button>
			</form>
		</div>
	);
}
