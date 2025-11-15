import { useEffect, useState } from 'react';
import {
	type LibraryResponse,
	useLibrary,
} from '../../contexts/library.context.tsx';
import { FaPlay } from 'react-icons/fa';

import { useAuth } from '../../contexts/auth.context.tsx';

function UserLibraryBought() {
	const [library, setLibrary] = useState<LibraryResponse[]>([]);

	const products = useLibrary();
	const { session } = useAuth();

	useEffect(() => {
		if (!session) return;

		products.getProducts().then((result) => {setLibrary(result); console.log(result)});
		console.log(library)
	}, [session]);


	return (
		<div className="flex flex-wrap gap-7">
			{library.length === 0 ? <div>No has comprado ningun elemento digital</div> :
				library.map((product) => (
				<div className="card bg-base-100 w-70 shadow-sm">
					<figure>
						<img src={product.item.cover} alt="Imagen de producto digital comprado" />
					</figure>
					<div className="card-body">
						<h2 className="card-title">
							{product.item.title}
							<div className="badge badge-secondary text-white">{product.type}</div>
						</h2>
						<h1>{product.item.author.artistName}</h1>

						<div className="flex justify-end">
							<button className="btn h-15 w-15 rounded-full">
								<FaPlay />
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default UserLibraryBought;
