import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import GenreFilter from './genre-filter.component.tsx';
import PriceFilter from './price-filter.component.tsx';
import ReleaseDateFilter from './release-date-filter.component.tsx';
import type { Album } from '../../contexts/album.context.tsx';
import type { Song } from '../../contexts/song.context.tsx';
import OrderFilter from './order-filter.component.tsx';
import ShopItem from './shop-item.component.tsx';
import { MdArrowBack, MdArrowLeft, MdArrowRight } from 'react-icons/md';

export interface SearchItem {
	type: 'album' | 'song';
	item: Album | Song;
}

interface Search {
	total: number;
	items: SearchItem[];
}

const Shop = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [query, setQuery] = useState<string>('');
	const [genres, setGenres] = useState<string[]>([]);

	const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
	const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

	const [minReleaseDate, setMinReleaseDate] = useState<Date | undefined>(
		undefined,
	);
	const [maxReleaseDate, setMaxReleaseDate] = useState<Date | undefined>(
		undefined,
	);

	const [page, setPage] = useState<number>(1);
	const [orderBy, setOrderBy] = useState<string>('releaseDate');
	const [orderDirection, setOrderDirection] = useState<string>('desc');

	const [result, setResult] = useState<Search | undefined>(undefined);

	useEffect(() => {
		if (searchParams.has('query')) {
			setQuery(searchParams.get('query')!);
		}
	}, [searchParams]);

	useEffect(() => {
		const url = new URL(`${window.location.origin}/api/v1/search`);

		if (query !== '') {
			url.searchParams.append('query', query);
		}

		if (genres.length > 0) {
			url.searchParams.append('genres', genres.join(','));
		}

		if (minPrice && minPrice > 0) {
			url.searchParams.append('minPrice', minPrice.toString());
		}
		if (maxPrice) {
			url.searchParams.append('maxPrice', maxPrice.toString());
		}

		if (minReleaseDate) {
			url.searchParams.append('minReleaseDate', minReleaseDate.toISOString());
		}
		if (maxReleaseDate) {
			url.searchParams.append('maxReleaseDate', maxReleaseDate.toISOString());
		}

		url.searchParams.append('page', page.toString());
		url.searchParams.append('orderBy', orderBy);
		url.searchParams.append('orderDirection', orderDirection);

		fetch(url, {
			method: 'GET',
			headers: {
				Content: 'application/json',
			},
		})
			.then((response) => response.json())
			.then((response) => setResult(response));
	}, [
		query,
		genres,
		minPrice,
		maxPrice,
		minReleaseDate,
		maxReleaseDate,
		page,
		orderDirection,
		orderBy,
	]);

	return (
		<div className="flex m-5 gap-5">
			<div className="flex flex-col bg-base-100 p-5 rounded-box w-1/4 h-fit gap-2">
				<GenreFilter genres={genres} setGenres={setGenres} />
				<div className="divider" />
				<PriceFilter
					minPrice={minPrice ?? 0}
					setMinPrice={setMinPrice}
					maxPrice={maxPrice ?? 0}
					setMaxPrice={setMaxPrice}
				/>
				<div className="divider" />
				<ReleaseDateFilter
					setMinReleaseDate={setMinReleaseDate}
					setMaxReleaseDate={setMaxReleaseDate}
				/>
			</div>

			<div className="flex flex-col grow">
				<OrderFilter
					setOrderBy={setOrderBy}
					setOrderDirection={setOrderDirection}
				/>

				{result?.total === 0 && (
					<p className="font-bold text-2xl mt-2">Sin resultados</p>
				)}

				{result?.total !== 0 && (
					<>
						<div className="flex gap-2 flex-wrap my-5 justify-center">
							{result?.items.map((item, index) => (
								<ShopItem item={item} key={index} />
							))}
						</div>

						<div className="flex gap-2 items-center justify-center">
							{page !== 1 && (
								<button
									className="btn btn-outline btn-square"
									onClick={() => setPage(page - 1)}
								>
									<MdArrowLeft className="w-8 h-8" />
								</button>
							)}

							<p>
								Página {page} de {Math.ceil((result?.total ?? 20) / 20)}
							</p>

							{page < Math.ceil((result?.total ?? 20) / 20) && (
								<button
									className="btn btn-outline btn-square"
									onClick={() => setPage(page + 1)}
								>
									<MdArrowRight className="w-8 h-8" />
								</button>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Shop;
