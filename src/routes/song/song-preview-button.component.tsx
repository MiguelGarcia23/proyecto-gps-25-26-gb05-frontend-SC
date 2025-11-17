import type {Song} from "../../contexts/song.context.tsx";
import {useEffect, useRef, useState} from "react";
import {MdPlayArrow, MdStop} from "react-icons/md";

const SongPreviewButton = ({ song }: { song: Song }) => {
	const previewRef = useRef<HTMLAudioElement>(null);
	const [playing, setPlaying] = useState(false);

	useEffect(() => {
		if ('mediaSession' in navigator) {
			navigator.mediaSession.metadata = new MediaMetadata({
				title: song.title,
				artist: song.author.artistName,
				artwork: [{ src: song.cover }],
			});
			navigator.mediaSession.setActionHandler('play', play);
			navigator.mediaSession.setActionHandler('pause', pause);
		}
	}, []);

	const play = () => {
		const preview = previewRef.current;
		if (!preview) return;
		preview.currentTime = 0;
		preview.play().then(() => {
			setPlaying(true);
			navigator.mediaSession.playbackState = 'playing';
		});
	};

	const pause = () => {
		const preview = previewRef.current;
		if (!preview) return;
		setPlaying(false);
		preview.pause();
		navigator.mediaSession.playbackState = 'paused';
	};

	const playPause = () => {
		if (playing) {
			pause();
		} else {
			play();
		}
	};

	return (
		<>
			<audio
				ref={previewRef}
				preload="none"
				src={`${window.location.origin}/api/v1/songs/${song.uuid}/preview`}
			/>

			<button className="btn btn-info w-52" onClick={playPause}>
				{!playing ? (
					<>
						<MdPlayArrow />
						Escuchar vista previa
					</>
				) : (
					<>
						<MdStop />
						Parar
					</>
				)}
			</button>
		</>
	);
};

export default SongPreviewButton;