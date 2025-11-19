import React, {useState} from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useArtist } from '../../contexts/artists.context.tsx';
import { useSubmit } from 'react-router';
import { MdOutlineLibraryMusic } from 'react-icons/md';

type MerchForm={
	productName: string,
	productMerch: string,
	productType: string[],
	productPrice: string,
}

function UploadMerchForm() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<MerchForm>();
	const artist = useArtist();
	const onSubmit: SubmitHandler<MerchForm> = async (data) => {
		try{
			await artist.uploadMerch(
				data.productName,
				data.productMerch,
				data.productType,
				data.productPrice,
			);
		} catch (error:any) {

		}
			console.log(data);
	};

	return (
		<div className="flex flex-col min-h-screen items-center justify-center">
			<div className="card w-96 shadow-sm p-3 bg-white">
				<div className="flex flex-col items-center">
					<MdOutlineLibraryMusic className="w-20 h-20"/>
				</div>

				<h1 className="text-2xl font-bold text-center mt-2">
					Crear un producto de Merchandising
				</h1>
				<div className="card-body">
					<form className="fieldset bg-base-200 border-base-300 roundedbox w-xs border p-4" onSubmit={handleSubmit(onSubmit)}>
						<label className="label"> Titulo</label>
						<input type="text" className="input" placeholder="Nombre" {...register('productName',{required:true})}/>

						<label className="label">Selección del Merch</label>
						<select className="select" {...register('productMerch', {required:true})}>
							<option value="song1">Cancion1</option>
							<option value="song2">Cancion2</option>
							<option value="song3">Cancion3</option>
							<option value="song4">Cancion4</option>
							<option value="song5">Cancion5</option>
							<option value="song6">Cancion6</option>
						</select>

						<label className="label">Tipo de Merch</label>
						<select className="select" multiple {...register('productType', {required:true})}>
							<option value="mug">Taza</option>
							<option value="hoodie">Sudadera</option>
							<option value="bottle">Botella</option>
							<option value="stamp">Chapa</option>
							<option value="pin">Pin</option>
						</select>

						<label className="label"> Precio</label>
						<input type="text" className="input" placeholder="10€" {...register('productPrice',{required:true})}/>
						<button type="submit" className="btn btn-md btn-primary w-full">Subir</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default UploadMerchForm;