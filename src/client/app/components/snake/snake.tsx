import { Spring, useMotor, useViewport } from "@rbxts/pretty-react-hooks";
import { useSelectorCreator } from "@rbxts/react-reflex";
import Roact, { useEffect, useMemo } from "@rbxts/roact";
import { Group } from "client/app/common/group";
import { useRem } from "client/app/hooks";
import { getSegmentRadius, selectSnakeById } from "shared/store/snakes";
import { SnakeHead } from "./snake-head";
import { SnakeSegment } from "./snake-segment";

interface SnakeProps {
	readonly id: string;
	readonly offset: Vector2;
	readonly scale: number;
}

export function Snake({ id, offset, scale }: SnakeProps) {
	const rem = useRem();
	const viewport = useViewport();
	const snake = useSelectorCreator(selectSnakeById, id);
	const [smoothOffset, setSmoothOffset] = useMotor({ x: offset.X, y: offset.Y });

	useEffect(() => {
		setSmoothOffset({
			x: new Spring(offset.X),
			y: new Spring(offset.Y),
		});
	}, [offset]);

	if (!snake) {
		return <></>;
	}

	const size = getSegmentRadius(snake.score) * 2;

	const isOnScreen = (segment: Vector2) => {
		const screen = viewport.getValue();
		const positionNotCentered = segment.mul(rem * scale).add(offset.mul(rem * scale));
		const position = positionNotCentered.add(screen.mul(0.5));

		return position.X >= 0 && position.X <= screen.X && position.Y >= 0 && position.Y <= screen.Y;
	};

	const segments = useMemo(() => {
		return snake.segments.mapFiltered((segment, index) => {
			if (!isOnScreen(segment)) {
				return;
			}

			const previous = snake.segments[index - 1] || snake.head;
			const direction = previous !== segment ? previous.sub(segment).Unit : Vector2.zero;
			const angle = math.atan2(direction.Y, direction.X);

			return (
				<SnakeSegment
					key={`segment-${index}`}
					size={size * scale}
					position={segment.mul(scale)}
					angle={angle}
					index={index}
				/>
			);
		});
	}, [snake.segments, scale]);

	return (
		<Group
			position={smoothOffset.map((offset) => new UDim2(0.5, offset.x * rem * scale, 0.5, offset.y * rem * scale))}
		>
			<SnakeHead
				key="head"
				size={size * scale}
				position={snake.head.mul(scale)}
				angle={snake.angle}
				targetAngle={snake.targetAngle}
			/>

			{segments}
		</Group>
	);
}