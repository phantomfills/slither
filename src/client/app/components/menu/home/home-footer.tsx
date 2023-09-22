import Roact from "@rbxts/roact";
import { Text } from "client/app/common/text";
import { useRem } from "client/app/hooks";
import { fonts } from "client/app/utils/fonts";
import { palette } from "shared/data/palette";

export function HomeFooter() {
	const rem = useRem();

	return (
		<Text
			richText
			font={fonts.inter.medium}
			text={`Made with <font transparency="0">❤️</font> by <font transparency="0" color="#${palette.offwhite.ToHex()}">littensy</font>`}
			textColor={palette.text}
			textTransparency={0.5}
			textSize={rem(1.25)}
			textXAlignment="Center"
			textYAlignment="Bottom"
			position={new UDim2(0.5, 0, 1, -rem(3))}
		/>
	);
}
