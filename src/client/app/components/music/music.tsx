import { useEventListener } from "@rbxts/pretty-react-hooks";
import { useSelector } from "@rbxts/react-reflex";
import Roact, { useEffect, useState } from "@rbxts/roact";
import { selectMusicEnabled } from "client/store/menu";
import { createSound } from "shared/assets";
import { shuffle } from "shared/utils/object-utils";

const MUSIC = [
	"rbxassetid://9046863253", // Poolside
	"rbxassetid://9046863960", // Beachwave
	"rbxassetid://9039767824", // Confession
	"rbxassetid://9039769202", // Santa Ervilio
	"rbxassetid://9039768724", // Friends
	"rbxassetid://9047050075", // Lo Fi Dreams Hip Hop
];

export function Music() {
	const enabled = useSelector(selectMusicEnabled);

	const [queue, setQueue] = useState(() => shuffle(MUSIC));
	const [index, setIndex] = useState(0);
	const [sound, setSound] = useState<Sound>();

	// Advance the queue when the song ends
	useEventListener(sound?.Ended, () => {
		setIndex(index + 1);
	});

	// Create the next song when the index changes
	useEffect(() => {
		if (index >= queue.size()) {
			// Shuffle the queue if we've reached the end
			setQueue(shuffle(MUSIC));
			setIndex(0);
			return;
		}

		const newSound = createSound(queue[index], { volume: 0.2 });

		setSound(newSound);

		return () => {
			newSound.Destroy();
		};
	}, [index]);

	// Pause/resume the sound when the enabled state changes
	// or when the sound changes
	useEffect(() => {
		if (enabled) {
			sound?.Resume();
		} else {
			sound?.Pause();
		}
	}, [enabled, sound]);

	// Destroy sounds not in use
	useEffect(() => {
		return () => {
			sound?.Destroy();
		};
	}, [sound]);

	return <></>;
}