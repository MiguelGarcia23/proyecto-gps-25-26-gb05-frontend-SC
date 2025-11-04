import { type SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { TbMusicBolt } from 'react-icons/tb';
import { FaGoogle } from 'react-icons/fa6';
import { useAuth } from '../../contexts/auth.context.tsx';
import { useToast } from '../../contexts/toast.context.tsx';

type SignInForm = {
	email: string;
	password: string;
};

function SignIn() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SignInForm>();

	const navigate = useNavigate();
	const auth = useAuth();
	const toast = useToast();

	const onSubmit: SubmitHandler<SignInForm> = async (data) => {
		try {
			await auth.signIn(data.email, data.password);

			navigate('/dashboard');
		} catch (error: any) {
			if (error.message.includes('Invalid login credentials')) {
				toast.showToast(
					'Correo electrónico o contraseña incorrectos',
					'error',
					5000,
				);
			} else {
				toast.showToast('Error desconocido', 'error', 5000);
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
					Inicia sesión en UnderSounds
				</h1>

				<div className="card-body">
					<form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
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
							{...register('password', { required: 'true' })}
						/>

						<button type="submit" className="btn btn-primary">
							Iniciar sesión
						</button>

						<div className="flex items-center gap-4 my-2">
							<hr className="border-gray-300 flex-1" />
							<span className="text-lg">o bien</span>
							<hr className="border-gray-300 flex-1" />
						</div>
					</form>

					<button
						type="submit"
						className="btn btn-soft btn-primary"
						onClick={auth.signInWithGoogle}
					>
						<FaGoogle />
						Iniciar sesión con Google
					</button>

					<hr className="border-gray-300 flex-1 my-5" />

					<div className="flex gap-3 items-center">
						<span>¿Aún no tienes cuenta?</span>
						<button className="btn flex-1" onClick={() => navigate('/auth/sign-up')}>
							Registrarse
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignIn;
