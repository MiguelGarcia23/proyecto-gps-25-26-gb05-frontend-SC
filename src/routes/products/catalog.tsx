import { Filters } from './filters.tsx';
import SearchProduct from './searchProduct.tsx';
import { OrderBy } from './orderBy.tsx';
import { useEffect, useState } from 'react';
import { type Genre, useGenre } from '../../contexts/genre.context.tsx';
import {
	type searchResponse,
	useSearch,
} from '../../contexts/search.context.tsx';
import ProductCard from './product.tsx';

function Catalog() {
	const [generosSeleccionados, setGenerosSeleccionados] = useState<string[]>([]);
	const [generos, setGeneros] = useState<Genre[]>([]);
	const [precioMin, setPrecioMin] = useState<number>(NaN);
	const [precioMax, setPrecioMax] = useState<number>(NaN);
	const [fechaInicio, setFechaInicio] = useState<Date | null>(null);
	const [fechaFin, setFechaFin] = useState<Date | null>(null);
	const [orderDirection, setOrderDirection] = useState<string>('');
	const [orderBy, setOrderBy] = useState<string>('');
	const [result, setResult] = useState<searchResponse>();
	//const [page, setPage] = useState(Math.round(result!.total / 20)+1);
	const [query, setQuery] = useState<string>('');

	const genre = useGenre();
	const search = useSearch();
	//const generos: Genre[] = [{uuid:'1',name:'Rock'},{uuid:'2',name:'Pop'}] //TODO Cuando este hecho el endpoint de obtener generos quitar y descomentar el resto

	useEffect(() => {
		genre.getGenres().then((genreResult) => setGeneros(genreResult));
	}, []);

	useEffect(() => {
		search
			.getProducts(
				generosSeleccionados,
				precioMin,
				precioMax,
				fechaInicio,
				fechaFin,
				orderDirection,
				orderBy,
				query,
			)
			.then((result) => setResult(result));

		console.log(result);
	}, [
		generosSeleccionados,
		precioMin,
		precioMax,
		fechaInicio,
		fechaFin,
		orderDirection,
		orderBy,
		query,
	]);

	const handleGeneroChange = (genero: string) => {
		if (generosSeleccionados.includes(genero)) {
			setGenerosSeleccionados(generosSeleccionados.filter((g) => g !== genero));
			//console.log('Quitando el genero: ' + genero + ' al array.');
			//console.log(generosSeleccionados);
		} else {
			setGenerosSeleccionados([...generosSeleccionados, genero]);
			//console.log('Añadiendo el genero: ' + genero + ' del array.');
			//console.log(generosSeleccionados);
		}
	};

	const handlePrecioMinChange = (precio: number) => {
		setPrecioMin(precio);
		//console.log('Precio minimo cambiado');
	};

	const handlePrecioMaxChange = (precio: number) => {
		setPrecioMax(precio);
		//console.log('Precio maximo cambiado');
	};

	const handleFechaIniChange = (date: Date | null) => {
		setFechaInicio(date);
		//console.log('Date ini cambiado');
	};

	const handleFechaFinChange = (date: Date | null) => {
		setFechaFin(date);
		//console.log('Fecha fin cambiado');
	};

	const handleOrderDireccion = (direccion: string) => {
		setOrderDirection(direccion);
		//console.log('Dirección cambiada a: ' + direccion);
	};

	const handleOrderBy = (order: string) => {
		setOrderBy(order);
		//console.log('Orden cambiado a: ' + order);
	};

	const handleQuery = (query: string) => {
		setQuery(query);
	};

	/*const handlePage = (newPage: number) => {
		setPage(page + newPage)
	}*/

	return (
		<div className="flex flex-row w-full">
			<Filters
				generosDisponibles={generos}
				generosSeleccionados={generosSeleccionados}
				generoOnChange={handleGeneroChange}
				precioMinOnChange={handlePrecioMinChange}
				precioMaxOnChange={handlePrecioMaxChange}
				fechaIniOnChange={handleFechaIniChange}
				fechaFinOnChange={handleFechaFinChange}
			/>
			<div className="flex flex-col gap-2">
				<SearchProduct queryOnChange={handleQuery}></SearchProduct>
				<div className="flex flex-row justify-around">
					<OrderBy
						orderBy={handleOrderBy}
						orderDirection={handleOrderDireccion}
					></OrderBy>
					<p>Mostrando {result !== undefined ? result.total : 0} articulos</p>
				</div>
				<div className="flex justify-end pr-15">
					<div className="join">
						<button className="join-item btn">«</button>
						<button className="join-item btn">Page </button>
						<button className="join-item btn">»</button>
					</div>
				</div>
				<div className="card shadow-sm pt-4 flex flex-row w-fit flex-wrap gap-4 p-2">
					{result !== undefined &&
						result.items.map((item) =>
							item !== undefined ? <ProductCard item={item}></ProductCard> : '',
						)}
				</div>
			</div>
		</div>
	);
}

export default Catalog;
