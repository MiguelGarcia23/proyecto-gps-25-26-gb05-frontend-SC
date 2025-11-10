import React, { useState } from 'react';

interface OrderProps {
	orderBy: (order: string) => void;
	orderDirection: (direccion: string) => void;
}

export const OrderBy: React.FC<OrderProps> = ({ orderBy, orderDirection }) => {
	const [botonOrden, setBotonOrden] = useState<number>(0);
	const [botonActivo, setBotonActivo] = useState<number>(0);

	const manejarClick = (idBoton: number) => {
		if (idBoton !== botonActivo) {
			setBotonActivo(idBoton);
			switch (idBoton) {
				case 0:
					orderBy('releaseDate');
					break;

				case 1:
					orderBy('price');
					break;

				case 2:
					orderBy('author');
					break;

				case 3:
					orderBy('rating');
					break;
			}
		}
	};

	const manejarClickOrden = (idBoton: number) => {
		if (idBoton !== botonOrden) {
			setBotonOrden(idBoton);
			switch (idBoton) {
				case 0:
					orderDirection('desc');
					break;

				case 1:
					orderDirection('asc');
					break;
			}
		}
	};

	const botones = [
		{ id: 0, etiqueta: 'Fecha de lanzamiento' },
		{ id: 1, etiqueta: 'Precio' },
		{ id: 2, etiqueta: 'Artista' },
		{ id: 3, etiqueta: 'Calificación' },
	];

	const orden = [
		{ id: 0, etiqueta: 'Descendente' },
		{ id: 1, etiqueta: 'Ascendente' },
	];

	return (
		<div className="flex justify-between gap-10">
			{botones.map((boton) => (
				<button
					key={boton.id}
					className={
						botonActivo === boton.id
							? 'btn btn-active btn-primary text-white'
							: 'btn btn-outline '
					}
					onClick={() => manejarClick(boton.id)}
				>
					{boton.etiqueta}
				</button>
			))}

			{orden.map((orden) => (
				<button
					key={botones.length + orden.id}
					className={
						botonOrden == orden.id
							? 'btn btn-active btn-primary text-white'
							: 'btn btn-outline  '
					}
					onClick={() => manejarClickOrden(orden.id)}
				>
					{orden.etiqueta}
				</button>
			))}
		</div>
	);
};
