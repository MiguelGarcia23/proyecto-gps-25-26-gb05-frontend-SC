import CreateEditHelpArticle from './dashboard/create-edit-help-article.tsx';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useEffect, useState } from 'react';
import {
	type HelpArticle,
	useHelpArticles,
} from '../../contexts/help.context.tsx';

interface HelpArticleModalProps {
	article: HelpArticle;
	open: boolean;
	onClose: () => void;
}

const HelpArticleModal: React.FC<HelpArticleModalProps> = ({ article, open, onClose }) => {
	return (
		<dialog className={`modal ${open ? 'modal-open' : ''}`}>
			<div className="modal-box">
				<form method="dialog">
					<button
						className="btn btn-ghost btn-square btn-sm absolute top-5 right-5"
						onClick={onClose}
					>
						✕
					</button>
				</form>

				<div className="flex flex-col gap-5">
					<h2 className="text-xl font-bold pr-6">{article.title}</h2>
					<p className="text-gray-500 capitalize">{article.category} - {article.date.slice(0, 10)}</p>
					<p>{article.content}</p>
				</div>
			</div>
		</dialog>
	);
};

const AdminHelp = () => {
	const article = useHelpArticles();
	const [helpArticles, setHelpArticles] = useState<HelpArticle[]>([]);
	const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [editArticle, setEditArticle] = useState<HelpArticle | null>(null);

	useEffect(() => {
		article.getHelpArticles()
			.then(a => setHelpArticles(a));
	}, [article]);

	return (
		<div>
			<div className="flex justify-between">
				<h1 className="font-bold text-3xl">Artículos de ayuda</h1>
				<button
					className="btn btn-primary"
					onClick={() => {
						setEditArticle(null);
						setIsEditModalOpen(true);
					}}
				>
					+ Crear artículo
				</button>
			</div>

			<table className="table">
				<thead>
				<tr>
					<th>UUID</th>
					<th>Nombre</th>
					<th>Categoría</th>
					<th>Acciones</th>
				</tr>
				</thead>

				<tbody>
				{
					helpArticles.map(a => (
						<tr key={a.uuid} onClick={() => setSelectedArticle(a)}>
							<td>{a.uuid}</td>
							<td>{a.title}</td>
							<td className='capitalize'>{a.category}</td>

							<td className="flex gap-5">
								<button
									className="btn btn-primary btn-square"
									onClick={(e) => {
										e.stopPropagation(); // No abrir vista al hacer click
										setEditArticle(a);
										setIsEditModalOpen(true);
									}}
								>
									<MdEdit />
								</button>
								<button
									className="btn btn-error btn-square"
									onClick={async (e) => {
										e.stopPropagation(); // No abrir vista al hacer click
										await article.deleteHelpArticle(a.uuid);
										window.location.reload();
									}}
								>
									<MdDelete />
								</button>
							</td>
						</tr>
					))
				}
				</tbody>
			</table>

			{/* Modal de detalle */}
			{selectedArticle && (
				<HelpArticleModal
					article={selectedArticle}
					open={Boolean(selectedArticle)}
					onClose={() => setSelectedArticle(null)}
				/>
			)}

			{/* Modal de Crear/Editar */}
			{isEditModalOpen && (
				<CreateEditHelpArticle
					article={editArticle}
					onClose={() => setIsEditModalOpen(false)}
				/>
			)}

		</div>
	)
}

export default AdminHelp;