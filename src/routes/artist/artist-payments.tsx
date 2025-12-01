import {
	type ArtistWallet,
	useArtist,
} from '../../contexts/artist.context.tsx';
import { useEffect, useState } from 'react';
import { MdDownload, MdMonetizationOn, MdMoney } from 'react-icons/md';
import { useToast } from '../../contexts/toast.context.tsx';

const ArtistPayments = () => {
	const artist = useArtist();
	const toast = useToast();
	const [wallet, setWallet] = useState<ArtistWallet | undefined>(undefined);
	const [iban, setIban] = useState<string>('');

	useEffect(() => {
		artist.getWallet()
			.then(w => setWallet(w));
	}, [])

	const update = async () => {
		if (iban === '') {
			toast.showToast('Debes escribir un IBAN nuevo', 'error', 5000);
			return;
		}
		await artist.updateWallet({ iban });
		window.location.reload();
	}

	if (wallet === undefined) return <div className="skeleton w-full h-96" />

	return (
		<div className="flex flex-col gap-2">
			<h1 className="text-3xl font-bold">Pagos</h1>
			<div className="flex gap-5">
				<div className="rounded-box w-full border-2 border-gray-200 bg-base-300 p-5 flex-1 flex flex-col gap-5 justify-between">
					<div className="flex justify-between">
						<p className="text-3xl">Balance</p>
						<button
							className="btn btn-primary"
							onClick={async () => {
								await artist.withdrawWallet();
								window.location.reload();
							}}
						>
							<MdMonetizationOn />
							Retirar
						</button>
					</div>
					<p className="text-5xl font-bold">{(wallet.balance / 100).toFixed(2)} <span className="text-3xl">€</span></p>
				</div>
				<div className="flex flex-col flex-1 gap-5">
					<p className="text-xl">Información de pagos</p>
					<div className="flex flex-col gap-2">
						<label className="label">IBAN</label>
						<input
							className="input w-full"
							placeholder={wallet.iban}
							onChange={(e) => setIban(e.target.value)}
						/>
						<button
							className="btn btn-accent"
							onClick={update}
						>Actualizar</button>
					</div>
				</div>
			</div>

			<div className="flex flex-col mt-5">
				<p className="text-xl">Historial de retiros</p>
				<table className="table">
					<thead>
						<tr>
							<th>Fecha</th>
							<th>Cantidad</th>
							<th>Factura</th>
						</tr>
					</thead>
					<tbody>
					{
						wallet.withdrawHistory.map((item, index) => (
							<tr key={index}>
								<th>{(new Date(item.date)).toLocaleDateString()}</th>
								<th className="w-full">{(item.amount / 100).toFixed(2)} €</th>
								<th>
									<button
										className="btn btn-primary"
										onClick={() => {
											window.location.href = item.invoice;
										}}
									>
										<MdDownload />
										Descargar
									</button>
								</th>
							</tr>
						))
					}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ArtistPayments;