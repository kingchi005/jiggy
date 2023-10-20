export type ThemeProps = {
	lightColor?: string;
	darkColor?: string;
};
export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export type TUseTheme = (
	props: { light?: string; dark?: string },
	colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) => any;
