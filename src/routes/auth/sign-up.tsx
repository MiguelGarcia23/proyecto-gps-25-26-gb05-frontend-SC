import { type SubmitHandler, useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa6';
import { TbMusicBolt } from 'react-icons/tb';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/auth.context.tsx';
import { useToast } from '../../contexts/toast.context.tsx';

type SignUpForm = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
	username: string;
	role: 'user' | 'artist';
};

function SignUp() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SignUpForm>();

	const navigate = useNavigate();
	const auth = useAuth();
	const toast = useToast();

	const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
		if (data.password !== data.confirmPassword) {
			return toast.showToast('Las contraseñas deben coincidir', 'warning', 5000);
		}

		try {
			await auth.signUp(
				data.firstName,
				data.lastName,
				data.email,
				data.password,
				data.username,
				data.role,
			);
		} catch (error: any) {
			if (error.message.includes('User already registered')) {
				return toast.showToast('Correo ya registrado', 'error', 5000);
			} else {
				return toast.showToast('Error en el registro', 'error', 5000);
			}
		}
	};

	return (
		<div className="flex flex-col min-h-screen items-center justify-center">
			<div className="card w-96 shadow-sm p-3 bg-white">
				<div className="flex flex-col items-center">
					<TbMusicBolt className="w-60 h-60" />
				</div>

				<h1 className="text-2xl font-bold text-center mt-2">
					Regístrate en UnderSounds
				</h1>

				<div className="card-body">
					<form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
						<label className="label">Nombre</label>
						<input
							className="input"
							placeholder="Juan"
							{...register('firstName', { required: 'true' })}
						/>

						<label className="label">Apellidos</label>
						<input
							className="input"
							placeholder="Álvarez"
							{...register('lastName', { required: 'true' })}
						/>

						<label className="label">Nombre de usuario</label>
						<input
							className="input"
							placeholder="juan_alvarez"
							{...register('username', { required: 'true' })}
						/>

						<label className="label">Correo electrónico</label>
						<input
							className="input"
							placeholder="example@email.com"
							type="email"
							{...register('email', { required: 'true' })}
						/>

						<label className="label">Contraseña</label>
						<input
							className="input"
							type="password"
							{...register('password', { required: 'true', minLength: 6 })}
						/>
						<span>Debe tener al menos 6 caracteres.</span>

						<label className="label">Confirmar contraseña</label>
						<input
							className="input"
							type="password"
							{...register('confirmPassword', { required: 'true' })}
						/>

						<label className="label">Tipo de usuario</label>
						<label className="flex items-center gap-3">
							<input
								type="radio"
								value="user"
								className="radio radio-primary"
								{...register('role', { required: true })}
							/>
							<span>Usuario</span>
						</label>
						<label className="flex items-center gap-3">
							<input
								type="radio"
								value="artist"
								className="radio radio-primary"
								{...register('role', { required: true })}
							/>
							<span>Artista</span>
						</label>

						<button type="submit" className="btn btn-primary">
							Registrarse
						</button>

						<div className="flex items-center gap-4 my-2">
							<hr className="border-gray-300 flex-1" />
							<span className="text-lg">o bien</span>
							<hr className="border-gray-300 flex-1" />
						</div>
					</form>

					<button type="submit" className="btn btn-soft btn-primary">
						<FaGoogle />
						Registrarse con Google
					</button>

					<hr className="border-gray-300 flex-1 my-5" />

					<div className="flex gap-3 items-center">
						<span>¿Ya eres usuario?</span>
						<button className="btn flex-1" onClick={() => navigate('/auth/sign-in')}>
							Iniciar sesión
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
