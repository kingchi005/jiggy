// import "react-native-gesture-handler";
import { StyleSheet, useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { View } from "./app/Components/Themed";
import { brandColor } from "./app/Shared/Colors";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { AuthContext } from "./app/Context/authContext";
import { useEffect, useState } from "react";
import Store from "./app/Shared/Store";
import HomeStack from "./app/Navigations/HomeStack";
import AuthStack from "./app/Navigations/AuthStack";

export default function App() {
	const colorScheme = useColorScheme();
	const [userData, setUserData] = useState(null);
	const [errMsg, setErrMsg] = useState("");
	const [snackBarVisible, setSnackBarVisible] = useState(false);
	const [apiKey, setApiKey] = useState(null);
	const [snackBarAlert, setSnackBarAlert] = useState({
		type: "error",
		show: false,
		msg: "this is a test ",
	});

	useEffect(() => {
		Store.getApiKey().then((res) => {
			console.log("Apikey", res);
			if (res) {
				setApiKey(res);
			} else {
				setApiKey(null);
			}
		});

		Store.getUserDetails().then((res) => {
			console.log("Apikey", res);
			if (res) {
				setUserData(res);
			} else {
				setUserData(null);
			}
		});
	}, []);

	return (
		<ThemeProvider value={DarkTheme}>
			<PaperProvider>
				<View style={styles.container}>
					<AuthContext.Provider
						value={{
							userData,
							errMsg,
							snackBarVisible,
							apiKey,
							snackBarAlert,
							setSnackBarAlert,
							setApiKey,
							setSnackBarVisible,
							setErrMsg,
							setUserData,
						}}
					>
						{apiKey ? <HomeStack /> : <AuthStack />}
					</AuthContext.Provider>
				</View>
			</PaperProvider>
		</ThemeProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: brandColor.bg,
	},
	view: { flexDirection: "row" },
});
