import { MdCheck, MdPayment } from 'react-icons/md';
import { useNavigate } from 'react-router';

const CheckoutSuccess = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-center">
			<MdCheck className="w-72 h-72"/>
			<p className="font-semibold text-2xl">Pedido pagado con éxito</p>
			<button className="btn btn-primary mt-5" onClick={() => navigate('/user/dashboard/orders')}>
				Ir a mis pedidos
			</button>
		</div>
	)
}

export default CheckoutSuccess;