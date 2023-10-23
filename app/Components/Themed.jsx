/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

/**
 * @typedef {Object} ThemeProps
 * @property {string} [lightColor] - The light color for the theme.
 * @property {string} [darkColor] - The dark color for the theme.
 */

/**
 * @typedef {ThemeProps & DefaultText["props"]} TextProps
 */

/**
 * @typedef {ThemeProps & DefaultView["props"]} ViewProps
 */

import {
	Text as DefaultText,
	useColorScheme,
	View as DefaultView,
} from "react-native";

import Colors, { brandColor } from "../Shared/Colors";
import { StyleSheet } from "react-native";

/** @type {import("../../types").TUseTheme}*/
export function useThemeColor(props, colorName) {
	const theme = useColorScheme() ?? "light";
	const colorFromProps = props[theme];

	if (colorFromProps) {
		return colorFromProps;
	} else {
		return Colors[theme][colorName];
	}
}

/** @param {TextProps} props   */
export function Text(props) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

	return <DefaultText style={[{ color: "#ddd" }, style]} {...otherProps} />;
}

/** @param {ViewProps} props   */
export function View(props) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		"background"
	);

	return (
		<DefaultView
			style={[{ backgroundColor: brandColor.bg }, style]}
			{...otherProps}
		/>
	);
}

export const customStyles = StyleSheet.create({
	header: {
		position: "fixed",
		backgroundColor: brandColor.bg,
		top: 0,
		zIndex: 999,
		width: "100%",
	},
});

export const authStyles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 30,
		paddingTop: 20,
		// justifyContent: "center",
	},
	TextInput: {
		marginTop: 15,
		backgroundColor: brandColor.bg,
	},
	// ---------------------------------------
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
	button: {
		// marginBottom: ,
		backgroundColor: brandColor.app,
		borderRadius: 10,
		marginTop: 15,
	},
	WloginWith: { flexDirection: "row", gap: 10 },
	loginWith: {
		paddingVertical: 8,
		paddingHorizontal: 38,
		width: "auto",
		marginVertical: 5,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#99a",
	},
	linkText: {
		color: "#6234e1",
	},
	gradientText: {
		color: "transparent",
		backgroundColor: "linear-gradient(130deg,blue,red)",
		backgroundClip: "text",
	},
});
