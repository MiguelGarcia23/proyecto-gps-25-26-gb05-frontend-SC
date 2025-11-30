import { useState } from 'react';
import UserDigitalProducts from './library/digital-products.component.tsx';
import { MdAdd } from 'react-icons/md';

const UserLibrary = () => {
	const [currentTab, setCurrentTab] = useState('library');

	const tabChange = (e: any) => {
		setCurrentTab(e.target.value);
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-between">
				<h1 className="text-3xl font-bold">Biblioteca</h1>
				<button className="btn btn-primary">
					<MdAdd /> Crear lista de reproducción
				</button>
			</div>
			<div className="tabs tabs-box">
				<input
					type="radio"
					name="library-tab"
					className="tab"
					aria-label="Productos digitales"
					value="library"
					checked={currentTab === 'library'}
					onChange={tabChange}
				/>
				<input
					type="radio"
					name="library-tab"
					className="tab"
					aria-label="Listas de reproducción"
					value="playlists"
					checked={currentTab === 'playlists'}
					onChange={tabChange}
				/>
			</div>
			{currentTab === 'library' && <UserDigitalProducts />}
		</div>
	);
};

export default UserLibrary;
