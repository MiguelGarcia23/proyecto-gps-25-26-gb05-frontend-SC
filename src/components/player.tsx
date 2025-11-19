import {
	MdArrowRight,
	MdArrowUpward,
	MdClose,
	MdFastForward,
	MdFastRewind,
	MdMoveUp,
	MdPause,
	MdPlayArrow,
	MdPlaylistPlay,
	MdVolumeUp,
} from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { type TracklistItem, usePlayer } from '../contexts/player.context.tsx';

const TracklistDropdownItem = ({
	item,
	isCurrent,
}: {
	item: TracklistItem;
	isCurrent: boolean;
}) => {
	return (
		<li className="list-row items-center">
			<img
				src={item.cover}
				alt="Carátula de canción"
				className="w-15 h-15 rounded-box"
			/>
			<div className="flex flex-col gap-2">
				<div className="flex gap-2 items-center">
					<p className="text-lg font-semibold">{item.title}</p>
					{isCurrent && <span className="badge badge-primary">Reproduciendo</span>}
				</div>
				<p>{item.authorName}</p>
			</div>
		</li>
	);
};

const TracklistDropdown = () => {
	const player = usePlayer();

	return (
		<div
			className={`fixed bottom-0 right-0 m-5 mb-28 pt-2.5 px-2.5 bg-base-100 h-fit max-h-1/2 overflow-auto rounded-box w-1/2 ${player.tracklistVisible ? '' : 'hidden'}`}
		>
			<ul className="list">
				<p className="text-xl font-bold pl-3.5">Cola</p>
				{player.tracklist.map((track, index) => (
					<TracklistDropdownItem
						item={track}
						key={index}
						isCurrent={index === player.currentTrack}
					/>
				))}
			</ul>
		</div>
	);
};

const Player = () => {
	const player = usePlayer();

	if (player.tracklist.length === 0 || player.currentTrack == -1) return <></>;
	return (
		<>
			<TracklistDropdown />
			<div className="fixed bottom-0 right-0 left-0 m-5 py-5 px-2.5 bg-base-100 h-20 rounded-box flex gap-5 items-center justify-between">
				<img
					src={player.tracklist[player.currentTrack].cover}
					alt="Imagen del reproductor"
					className="w-15 h-15 rounded-box"
				/>
				<div className="flex flex-col items-start justify-center">
					<p className="text-lg font-bold min-w-50">
						{player.tracklist[player.currentTrack].title}
					</p>
					<p>{player.tracklist[player.currentTrack].authorName}</p>
				</div>
				<div className="flex gap-2">
					<button className="btn btn-ghost btn-square" onClick={player.pastTrack}>
						<MdFastRewind className="w-7 h-7" />
					</button>
					<button className="btn btn-ghost btn-square" onClick={player.playPause}>
						{player.playing && <MdPause className="w-7 h-7" />}
						{!player.playing && <MdPlayArrow className="w-7 h-7" />}
					</button>
					<button className="btn btn-ghost btn-square" onClick={player.nextTrack}>
						<MdFastForward className="w-7 h-7" />
					</button>
				</div>
				<input
					type="range"
					min="0"
					max={player.duration}
					value={player.progress}
					className="range range-accent range-xs grow"
					onChange={player.changeProgress}
				/>
				<div className="flex gap-2 items-center">
					<MdVolumeUp className="w-6 h-6" />
					<input
						type="range"
						min="0"
						max="1"
						step="0.05"
						value={player.volume}
						className="range range-neutral range-xs grow"
						onChange={player.changeVolume}
					/>
				</div>

				<div className="flex gap-2">
					<div className="tooltip" data-tip="Cola">
						<button
							className="btn btn-ghost btn-square"
							onClick={() => player.setTracklistVisible(!player.tracklistVisible)}
						>
							<MdPlaylistPlay className="w-6 h-6" />
						</button>
					</div>

					<div className="tooltip" data-tip="Cerrar">
						<button className="btn btn-ghost btn-square" onClick={player.reset}>
							<MdClose className="w-6 h-6" />
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Player;
