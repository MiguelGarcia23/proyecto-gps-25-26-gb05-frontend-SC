import { type Address, useUser } from '../../../contexts/user.context.tsx';
import { MdClose, MdDelete, MdEdit } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { removeEmptyFields } from '../../../lib/util.ts';

type AddressForm = Partial<Address>;

const AddressFormModal = ({
	address,
	id,
}: {
	address?: Address;
	id: 'address-add' | 'address-edit';
}) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<AddressForm>();
	const user = useUser();

	const onSubmit = async (data: AddressForm) => {
		if (data.phoneNumber) {
			data.phoneNumber = parseInt(data.phoneNumber as unknown as string);
		}

		if (id === 'address-add') {
			await user.postAddress(data as Address);
		} else if (id === 'address-edit') {
			removeEmptyFields(data);
			await user.updateAddress({ ...data, uuid: address!.uuid } as Address);
		}

		setTimeout(() => window.location.reload(), 1000);
	};

	return (
		<dialog id={id} className="modal">
			<div className="modal-box">
				<form method="dialog">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
						<MdClose />
					</button>
					<h3 className="text-xl font-bold">
						{id === 'address-add' ? 'Añadir dirección' : 'Editar dirección'}
					</h3>
				</form>

				<form className="flex flex-col mt-2" onSubmit={handleSubmit(onSubmit)}>
					<label className="label">Alias</label>
					<input
						className="input w-full"
						placeholder={address ? address.alias : ''}
						{...register('alias', { required: id === 'address-add' })}
					/>

					<label className="label">Nombre completo</label>
					<input
						className="input w-full"
						placeholder={address ? address.recipientName : ''}
						{...register('recipientName', { required: id === 'address-add' })}
					/>

					<label className="label">Calle</label>
					<input
						className="input w-full"
						placeholder={address ? address.street : ''}
						{...register('street', { required: id === 'address-add' })}
					/>

					<label className="label">Información adicional</label>
					<input
						className="input w-full"
						placeholder={address ? address.additionalInfo : ''}
						{...register('additionalInfo', { required: false })}
					/>

					<div className="flex gap-2">
						<div className="flex flex-col grow">
							<label className="label">Ciudad</label>
							<input
								className="input w-full"
								placeholder={address ? address.city : ''}
								{...register('city', { required: id === 'address-add' })}
							/>
						</div>

						<div className="flex flex-col">
							<label className="label">Código postal</label>
							<input
								className="input w-full"
								maxLength={5}
								placeholder={address ? address.zipCode : ''}
								{...register('zipCode', { required: id === 'address-add' })}
							/>
						</div>
					</div>

					<label className="label">Provincia</label>
					<input
						className="input w-full"
						placeholder={address ? address.state : ''}
						{...register('state', { required: id === 'address-add' })}
					/>

					<label className="label">Número de teléfono</label>
					<input
						className="input w-full"
						type="number"
						placeholder={address ? address.phoneNumber.toString() : ''}
						{...register('phoneNumber', { required: id === 'address-add' })}
					/>

					<button className="btn btn-primary w-full mt-2">Enviar</button>
				</form>
			</div>
		</dialog>
	);
};

const AddressItem = ({
	address,
	selectedAddress,
	setSelectedAddress,
}: {
	address: Address;
	selectedAddress?: string;
	setSelectedAddress?: (a: string) => void;
}) => {
	const user = useUser();
	return (
		<div className="flex gap-5 justify-between items-start border-2 border-base-300 rounded-box p-2 h-fit">
			<div className="flex flex-col">
				<p className="font-bold">{address.alias}</p>
				<p className="text-sm">{address.recipientName}</p>
				<p className="text-sm">{address.street}</p>
				<p className="text-sm">{address.additionalInfo}</p>
				<p className="text-sm">
					{address.zipCode} {address.city}
				</p>
				<p className="text-sm">{address.state}</p>
				<p className="text-sm">{address.phoneNumber}</p>
			</div>
			{!selectedAddress && (
				<div className="flex flex-col gap-2">
					<button
						className="btn btn-outline rounded-box btn-square"
						onClick={() =>
							(document.getElementById('address-edit') as any).showModal()
						}
					>
						<MdEdit />
					</button>

					<button
						className="btn btn-error rounded-box btn-square"
						onClick={async () => {
							await user.deleteAddress(address!.uuid);
							window.location.reload();
						}}
					>
						<MdDelete />
					</button>
				</div>
			)}
			{selectedAddress && (
				<div className="flex flex-col gap-2">
					<input
						type="checkbox"
						className="checkbox"
						value={address.uuid}
						readOnly
						checked={selectedAddress === address.uuid}
						onClick={(e: any) => {
							setSelectedAddress!(e.target.value);
						}}
					/>
				</div>
			)}
			<AddressFormModal id={'address-edit'} address={address} />
		</div>
	);
};

const AddressBook = ({
	selectedAddress,
	setSelectedAddress,
}: {
	selectedAddress?: string;
	setSelectedAddress?: (a: string) => void;
}) => {
	const user = useUser();
	const [addresses, setAddresses] = useState<Address[] | undefined>(undefined);

	useEffect(() => {
		user.getAddressBook().then((a) => setAddresses(a));
	}, []);

	return (
		<div className="flex flex-col gap-2 grow border-2 border-base-300 rounded-box p-2 h-fit">
			<div className="flex gap-2 justify-between items-start">
				<h2 className="text-xl">Direcciones guardadas</h2>
				<button
					className="btn btn-primary"
					onClick={() => (document.getElementById('address-add') as any).showModal()}
				>
					+ Añadir
				</button>
				<AddressFormModal id={'address-add'} />
			</div>
			{addresses ? (
				<div className="flex flex-col gap-2">
					{addresses!.length > 0 ? (
						addresses!.map((address) => (
							<AddressItem
								key={address.uuid}
								address={address}
								selectedAddress={selectedAddress}
								setSelectedAddress={setSelectedAddress}
							/>
						))
					) : (
						<p className="text-lg">Ninguna dirección guardada</p>
					)}
				</div>
			) : (
				<div className="skeleton w-full h-52" />
			)}
		</div>
	);
};

export default AddressBook;
