import { type Genre, useGenre } from '../../contexts/genre.context.tsx';
import { useEffect, useState } from 'react';

const GenreFilter = ({
	genres,
	setGenres,
}: {
	genres: string[];
	setGenres: (g: string[]) => void;
}) => {
	const genre = useGenre();
	const [genreList, setGenreList] = useState<Genre[] | undefined>(undefined);

	useEffect(() => {
		genre.getGenres().then((g) => setGenreList(g));
	}, []);

	const genreSelect = (e: any) => {
		if (genres.some((g) => g === e.target.value)) {
			setGenres([...genres.filter((g) => g !== e.target.value)]);
		} else {
			setGenres([...genres, e.target.value]);
		}
	};

	return (
		<>
			<p className="font-semibold text-xl">Géneros</p>
			<form className="flex gap-2 flex-wrap">
				{genreList?.map((genre) => (
					<input
						key={genre.uuid}
						className="btn grow"
						type="checkbox"
						name="shop-genres"
						aria-label={genre.name}
						value={genre.name}
						checked={genres.some((g) => g === genre.name)}
						onChange={genreSelect}
					/>
				))}
				<input
					className="btn btn-square grow"
					type="reset"
					value="×"
					onClick={() => setGenres([])}
				/>
			</form>
		</>
	);
};

export default GenreFilter;
