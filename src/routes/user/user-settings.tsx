import { useForm } from 'react-hook-form';
import { type Address, useUser } from '../../contexts/user.context.tsx';
import { removeEmptyFields } from '../../lib/util.ts';
import { MdClose, MdEdit } from 'react-icons/md';
import { useAuth } from '../../contexts/auth.context.tsx';
import AddressBook from './settings/address-book.component.tsx';
import {useToast} from "../../contexts/toast.context.tsx";

type UpdateUserForm = {
	firstName: string;
	lastName: string;
	// email: string // TODO
};

const UpdateUser = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<UpdateUserForm>();
	const user = useUser();
	const toast = useToast();

	const onSubmit = async (data: UpdateUserForm) => {
		removeEmptyFields(data);
		await user.update(data);
		toast.showToast('Información actualizada con éxito', 'info', 1500);

		setTimeout(() => window.location.reload(), 2000);
	};

	return (
		<div className="flex flex-col gap-2 border-2 border-base-300 rounded-box p-2">
			<h2 className="text-xl">Actualizar información personal</h2>
			<form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
				<label className="label">Nombre</label>
				<input
					className="input w-full"
					placeholder={user.user?.firstName}
					type="text"
					{...register('firstName')}
				/>

				<label className="label">Apellidos</label>
				<input
					className="input w-full"
					placeholder={user.user?.lastName}
					type="text"
					{...register('lastName')}
				/>

				<button className="btn btn-accent">Actualizar</button>
			</form>
		</div>
	);
};

const DeleteAccountBtn = () => {
	const auth = useAuth();

	return (
		<div className="grow">
			<button
				className="btn btn-error w-full"
				onClick={() =>
					(document.getElementById('delete-account-modal') as any).showModal()
				}
			>
				Eliminar cuenta
			</button>
			<dialog id="delete-account-modal" className="modal">
				<div className="modal-box">
					<form method="dialog">
						<button className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
							<MdClose />
						</button>
					</form>

					<h3 className="font-bold text-lg">¿Estás seguro?</h3>
					<p>No podrás deshacer esta acción.</p>

					<button
						className="btn btn-error mt-5"
						onClick={() => auth.deleteAccount()}
					>
						Eliminar cuenta
					</button>
				</div>
			</dialog>
		</div>
	);
};

const UserSettings = () => {
	const auth = useAuth();
	const toast = useToast();

	return (
		<div className="flex flex-col gap-2">
			<h1 className="text-3xl font-bold">Ajustes</h1>
			<div className="flex gap-2">
				<div className="flex flex-col gap-2">
					<UpdateUser />
					<button className="btn btn-active" onClick={async () => {
						await auth.resetPassword();
						toast.showToast(
							'Se ha enviado un correo para restablecer la contraseña.',
							'info',
							5000
						);
					}}>
						Restablecer contraseña
					</button>
					<DeleteAccountBtn />
				</div>
				<AddressBook />
			</div>
		</div>
	);
};

export default UserSettings;
