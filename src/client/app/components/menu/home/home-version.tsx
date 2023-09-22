import Roact from "@rbxts/roact";
import { Text } from "client/app/common/text";
import { useRem } from "client/app/hooks";
import { fonts } from "client/app/utils/fonts";
import { $git, $package } from "rbxts-transform-debug";
import { palette } from "shared/data/palette";

interface HomeVersionProps {
	readonly position: UDim2;
}

const DIVIDER = `  <font transparency="0.75">—</font>  `;
const VERSION = $package.version;
const TIMESTAMP = DateTime.fromIsoDate($git().ISODate)?.FormatLocalTime("LLL", "en-us") ?? "unknown";

export function HomeVersion({ position }: HomeVersionProps) {
	const rem = useRem();

	return (
		<Text
			richText
			font={fonts.inter.medium}
			text={VERSION + DIVIDER + TIMESTAMP}
			textSize={rem(1.25)}
			textColor={palette.text}
			textTransparency={0.5}
			textXAlignment="Center"
			textYAlignment="Top"
			position={position}
		/>
	);
}
