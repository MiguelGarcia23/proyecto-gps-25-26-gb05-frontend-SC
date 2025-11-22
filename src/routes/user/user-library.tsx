import { type LibraryItem, useUser } from '../../contexts/user.context.tsx';
import { useEffect, useState } from 'react';
import {
	MdArrowDownward,
	MdArrowDropDown,
	MdDownload,
	MdPlayArrow,
	MdPlaylistAdd,
	MdQueueMusic,
	MdQueuePlayNext,
} from 'react-icons/md';
import { usePlayer } from '../../contexts/player.context.tsx';
import { type Song, useSong } from '../../contexts/song.context.tsx';
import { useNavigate } from 'react-router';
import UserDigitalProducts from './library/digital-products.component.tsx';

const UserLibrary = () => {
	const [currentTab, setCurrentTab] = useState('library');

	const tabChange = (e: any) => {
		setCurrentTab(e.target.value);
	};

	return (
		<div className="flex flex-col gap-2">
			<h1 className="text-3xl font-bold">Biblioteca</h1>
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
