const OrderFilter = ({
	setOrderBy,
	setOrderDirection,
}: {
	setOrderBy: (o: string) => void;
	setOrderDirection: (o: string) => void;
}) => {
	const orderByChange = (e: any) => {
		setOrderBy(e.target.value === '×' ? 'releaseDate' : e.target.value);
	};

	return (
		<div className="flex items-center gap-2">
			<p>Ordenar por: </p>
			<form className="filter grow">
				<input
					className="btn btn-square"
					type="reset"
					value="×"
					onClick={orderByChange}
				/>
				<input
					className="btn"
					type="radio"
					name="shop-orderby"
					aria-label="Fecha de lanzamiento"
					value="releaseDate"
					onChange={orderByChange}
				/>
				<input
					className="btn"
					type="radio"
					name="shop-orderby"
					aria-label="Precio"
					value="price"
					onChange={orderByChange}
				/>
				<input
					className="btn"
					type="radio"
					name="shop-orderby"
					aria-label="Autor"
					value="author"
					onChange={orderByChange}
				/>
				<input
					className="btn"
					type="radio"
					name="shop-orderby"
					aria-label="Valoración"
					value="ratings"
					onChange={orderByChange}
				/>
			</form>
			<select
				className="select"
				defaultValue="desc"
				onChange={(e: any) => setOrderDirection(e.target.value)}
			>
				<option value="desc">Descendente</option>
				<option value="asc">Ascendente</option>
			</select>
		</div>
	);
};

export default OrderFilter;
