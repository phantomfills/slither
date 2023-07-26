import Roact, { memo, useMemo } from "@rbxts/roact";
import { describeSnakeFromScore } from "shared/store/snakes";
import { SnakeHead } from "./snake-head";
import { SnakeNameTag } from "./snake-name-tag";
import { SnakeTracer } from "./snake-tracer";
import { useSnakeBindings } from "./use-snake-bindings";
import { SnakeOnScreen } from "./use-snakes-on-screen";

interface SnakeProps {
	readonly snakeOnScreen: SnakeOnScreen;
	readonly scale: number;
	readonly offset: Vector2;
	readonly offsetSmooth: Roact.Binding<{ x: number; y: number }>;
	readonly subject?: string;
}

function SnakeComponent({ snakeOnScreen, scale, offset, offsetSmooth, subject }: SnakeProps) {
	const snake = snakeOnScreen.snake;
	const snakeBindings = useSnakeBindings(snakeOnScreen, scale, snake.id === subject);

	const radius = describeSnakeFromScore(snake.score).radius;
	const distance = snake.head.sub(offset.mul(-1)).Magnitude;
	const showNameTag = snake.id !== subject && !snake.dead && distance < 16;

	const children = useMemo(() => {
		return snakeOnScreen.tracers.mapFiltered((tracer) => {
			const index = tracer.index;
			const bindings = snakeBindings.bindings.get(index);

			if (!bindings) {
				return;
			}

			return (
				<SnakeTracer
					key={`tracer-${index}`}
					line={bindings.line}
					effects={bindings.effects}
					index={index}
					skinId={snake.skin}
				/>
			);
		});
	}, [snakeOnScreen]);

	return (
		<>
			{snakeOnScreen.head && (
				<SnakeHead
					angle={snake.angle}
					desiredAngle={snake.desiredAngle}
					line={snakeBindings.head.line}
					effects={snakeBindings.head.effects}
					skinId={snake.skin}
					offsetSmooth={offsetSmooth}
					isSubject={snake.id === subject}
				>
					<SnakeNameTag
						key="name-tag"
						name={snake.name}
						head={snake.head}
						headOffset={offset}
						angle={snake.angle}
						radius={radius}
						scale={scale}
						skin={snake.skin}
						visible={showNameTag}
					/>
				</SnakeHead>
			)}
			{children}
		</>
	);
}

export const Snake = memo(SnakeComponent);