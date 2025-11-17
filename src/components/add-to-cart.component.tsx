import {useToast} from "../contexts/toast.context.tsx";
import {useState} from "react";
import {MdShoppingCart} from "react-icons/md";
import type {Album} from "../contexts/album.context.tsx";
import type {Song} from "../contexts/song.context.tsx";

const AddToCart = ({ item }: { item: Song | Album }) => {
	const toast = useToast();
	const [format, setFormat] = useState<string | undefined>(undefined);

	const formatChange = (e: any) => {
		setFormat(e.target.value);
	};

	const addToCart = () => {
		if (format === undefined) {
			toast.showToast('Escoge un formato', 'error', 2000);
		}
		// TODO añadir al carrito
	};

	return (
		<div className="w-56 flex flex-col gap-2">
			<select
				defaultValue="Escoge un formato"
				className="select w-full"
				onChange={formatChange}
			>
				<option disabled={true}>Escoge un formato</option>
				<option value="digital">
					Digital {(item.pricing.digital / 100).toFixed(2)} €
				</option>
				<option value="cd">
					CD {(item.pricing.cd / 100).toFixed(2)} €
				</option>
				<option value="vinyl">
					Vinilo {(item.pricing.vinyl / 100).toFixed(2)} €
				</option>
				<option value="cassette">
					Cassette {(item.pricing.cassette / 100).toFixed(2)} €
				</option>
			</select>
			<button className="btn btn-primary w-full" onClick={addToCart}>
				<MdShoppingCart />
				Añadir al carrito
			</button>
		</div>
	)
}

export default AddToCart;