import {
	type CartItemType,
	useCart,
} from '../../../contexts/pending/cart.context.tsx';
import { FaCartPlus } from 'react-icons/fa';

function AddToCartButton({ item }: { item: CartItemType }) {
	const cart = useCart();

	return (
		<div
			className="btn btn-primary h-15 w-15"
			onClick={() => cart.addItemToCart(item)}
		>
			<FaCartPlus />
		</div>
	);
}

export default AddToCartButton;
