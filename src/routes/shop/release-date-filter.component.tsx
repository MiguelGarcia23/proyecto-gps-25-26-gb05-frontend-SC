const ReleaseDateFilter = ({
	setMinReleaseDate,
	setMaxReleaseDate,
}: {
	setMinReleaseDate: (d: Date) => void;
	setMaxReleaseDate: (d: Date) => void;
}) => {
	return (
		<>
			<p className="font-semibold text-xl">Fecha de lanzamiento</p>
			<div className="flex gap-2 items-center">
				<input
					type="date"
					className="input"
					onChange={(e) => {
						const date = new Date(e.target.value);
						if (date.getFullYear() > 2000) {
							setMinReleaseDate(new Date(e.target.value));
						}
					}}
				/>
				<div className="divider divider-vertical w-10" />
				<input
					type="date"
					className="input"
					onChange={(e) => {
						const date = new Date(e.target.value);
						if (date.getFullYear() > 2000) {
							setMaxReleaseDate(new Date(e.target.value));
						}
					}}
				/>
			</div>
		</>
	);
};

export default ReleaseDateFilter;
