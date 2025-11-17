import React from 'react';
import type { Genre } from '../../contexts/pending/genre.context.tsx';

interface SelectorDeGenerosProps {
	generosDisponibles: Genre[];
	generosSeleccionados: string[]; // el id
	generoOnChange: (genero: string) => void;
	precioMinOnChange: (precio: number) => void;
	precioMaxOnChange: (precio: number) => void;
	fechaIniOnChange: (date: Date | null) => void;
	fechaFinOnChange: (date: Date | null) => void;
}

export const Filters: React.FC<SelectorDeGenerosProps> = ({
	generosDisponibles,
	generosSeleccionados,
	generoOnChange,
	precioMinOnChange,
	precioMaxOnChange,
	fechaIniOnChange,
	fechaFinOnChange,
}) => {
	return (
		<div className="w-[30%]">
			<div className="collapse collapse-plus bg-base-100 border-base-300 border">
				<input type="checkbox" />
				<div className="collapse-title font-semibold">Géneros</div>
				<div className="collapse-content text-sm flex flex-row gap-2 flex-wrap">
					{generosDisponibles.map((genero: Genre) => (
						<div>
							<label className="label cursor-pointer justify-start">
								<input
									className="btn w-16"
									type="checkbox"
									id={genero.name}
									name={genero.name}
									value={genero.name}
									checked={generosSeleccionados.includes(genero.name)}
									onChange={() => generoOnChange(genero.name)}
									aria-label={genero.name}
								/>
							</label>
						</div>
					))}
				</div>
			</div>
			<div className="collapse collapse-plus bg-base-100 border-base-300 border">
				<input type="checkbox" />
				<div className="collapse-title font-semibold">Precio</div>
				<div className="collapse-content text-sm">
					<input
						type="number"
						min="0"
						placeholder="Mínimo"
						className="input-md w-14 h-10"
						onBlur={(event) => precioMinOnChange(event.target.valueAsNumber)}
					/>
					-
					<input
						type="number"
						min="1"
						placeholder="Máximo"
						className="input-md w-14 h-10"
						onBlur={(event) => precioMaxOnChange(event.target.valueAsNumber)}
					/>
				</div>
			</div>
			<div className="collapse collapse-plus bg-base-100 border-base-300 border">
				<input type="checkbox" />
				<div className="collapse-title font-semibold">Fecha de lanzamiento</div>
				<div className="collapse-content text-sm flex-wrap">
					<p>Desde</p>
					<input
						type="date"
						className="input input-bordered"
						onBlur={(event) => fechaIniOnChange(event.target.valueAsDate)}
					/>
					<p>hasta</p>
					<input
						type="date"
						className="input input-bordered "
						onBlur={(event) => fechaFinOnChange(event.target.valueAsDate)}
					/>
				</div>
			</div>
		</div>
	);
};
