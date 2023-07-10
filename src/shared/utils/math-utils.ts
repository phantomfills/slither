export function lerp(a: number, b: number, t: number) {
	return a + (b - a) * t;
}

export function lerpStrict(a: number, b: number, t: number) {
	return math.clamp(lerp(a, b, t), math.min(a, b), math.max(a, b));
}

export function subtractRadians(a: number, b: number) {
	return math.atan2(math.sin(a - b), math.cos(a - b));
}

export function lerpRadians(a: number, b: number, t: number) {
	return a + subtractRadians(b, a) * t;
}