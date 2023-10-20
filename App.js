import { StatusBar } from "expo-status-bar";
import { StyleSheet, useColorScheme } from "react-native";
import { Appbar, PaperProvider } from "react-native-paper";
import { brandColor } from "./app/Shared/Colors";
import { Text, View } from "./app/Shared/Themed";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";

export default function App() {
	const colorScheme = useColorScheme();

	return (
		<PaperProvider>
			<Appbar.Header style={{ backgroundColor: "#222" }}>
				<Appbar.Content title="home" />
			</Appbar.Header>
			<View style={styles.container}>
				<Text>Open up App.js to start working on your app!</Text>
				<Text>Open up App.js to start working on your app!</Text>
				<Text>Open up App.js to start working on your app!</Text>
				<Text>this is the proto type!</Text>
				<Text>Open up App.js to start working on your app!</Text>
				<Text>Open up App.js to start working on your app!</Text>
				<Text>Open up App.js to start working on your app!</Text>
				<StatusBar style="auto" />
			</View>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: brandColor.bg,
		alignItems: "center",
		justifyContent: "center",
	},
	view: { flexDirection: "row" },
});
