const PriceFilter = ({
	minPrice,
	setMinPrice,
	maxPrice,
	setMaxPrice,
}: {
	minPrice: number;
	setMinPrice: (p: number) => void;
	maxPrice: number;
	setMaxPrice: (p: number) => void;
}) => {
	return (
		<>
			<p className="font-semibold text-xl">Precio</p>
			<div className="flex gap-2 items-center">
				<input
					type="number"
					className="input"
					placeholder={minPrice.toString() + ' €'}
					onChange={(e: any) => setMinPrice(parseFloat(e.target.value))}
				/>
				<div className="divider divider-vertical w-10" />
				<input
					type="number"
					className="input"
					placeholder={maxPrice === -1 ? '0 €' : maxPrice.toString() + ' €'}
					onChange={(e: any) => setMaxPrice(parseFloat(e.target.value))}
				/>
			</div>
		</>
	);
};

export default PriceFilter;
