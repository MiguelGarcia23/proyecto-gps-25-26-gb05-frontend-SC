import { MdError } from 'react-icons/md';
import { useNavigate } from 'react-router';

const CheckoutCancel = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-center">
			<MdError className="w-72 h-72"/>
			<p className="font-semibold text-2xl">Se produjo un error en el pago</p>
			<button className="btn btn-primary mt-5" onClick={() => navigate('/user/dashboard/orders')}>
				Ir a mis pedidos
			</button>
		</div>
	)
}

export default CheckoutCancel;