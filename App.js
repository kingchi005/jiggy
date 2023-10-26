// import "react-native-gesture-handler";
import { StyleSheet, useColorScheme } from "react-native";
import { PaperProvider, Snackbar } from "react-native-paper";
import { View } from "./app/Components/Themed";
import { brandColor } from "./app/Shared/Colors";
import {
	DarkTheme,
	NavigationContainer,
	ThemeProvider,
} from "@react-navigation/native";
import { AuthContext } from "./app/Context/authContext";
import { useEffect, useMemo, useState } from "react";
import Store from "./app/Shared/Store";
import AuthStack from "./app/Navigations/AuthStack";
import StackNavigation from "./app/Navigations/StackNavigation";
import * as SplashScreen from "expo-splash-screen";
import DrawerNavigation from "./app/Navigations/DrawerNavigation";
import Api from "./app/Shared/Api";
import { ToastAndroid } from "react-native";
import { StatusBar } from "react-native";
import NetInfo from "@react-native-community/netinfo";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function App() {
	const colorScheme = useColorScheme();
	const [userData, setUserData] = useState(null);
	const [errMsg, setErrMsg] = useState("");
	const [snackBarVisible, setSnackBarVisible] = useState(false);
	const [apiKey, setApiKey] = useState(null);
	const [globalPostList, setGlobalPostList] = useState([]);
	const [internetReachable, setInternetReachable] = useState(false);

	useEffect(() => {
		const netSubscribe = NetInfo.addEventListener((state) => {
			console.log("Connection type", state.type);
			console.log("Is connected?", state.isConnected);
			setInternetReachable(state.isInternetReachable);
		});

		// To subscribe to these update, just use:
		netSubscribe();
	}, []);

	const fetchGlobalPostList = () => {
		Api.getPosts().then((res) => {
			if (res.data) {
				setGlobalPostList(res.data);
			}
		});
	};
	const [snackBarAlert, setSnackBarAlert] = useState({
		type: "error",
		show: false,
		msg: "this is a test ",
	});

	useEffect(() => {
		initialiseApp().then((res) => SplashScreen.hideAsync());
	}, []);

	useEffect(() => {
		if (apiKey) {
			Api.getUserDetails().then((res) => {
				console.log("authed ", res.data);
				ToastAndroid.show(
					res?.data?.user?.generated_username,
					ToastAndroid.LONG
				);

				setUserData(res.data);
			});
		}
	}, [apiKey]);

	const initialiseApp = async () => {
		try {
			const key = await Store.getApiKey();

			console.log("Apikey", key);
			if (key) {
				setApiKey(key);
			} else {
				setApiKey(null);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ThemeProvider value={DarkTheme}>
			<PaperProvider>
				<AuthContext.Provider
					value={{
						userData,
						errMsg,
						snackBarVisible,
						apiKey,
						snackBarAlert,
						globalPostList,
						internetReachable,
						setGlobalPostList,
						fetchGlobalPostList,
						setSnackBarAlert,
						setApiKey,
						setSnackBarVisible,
						setErrMsg,
						setUserData,
					}}
				>
					<View style={styles.container}>
						<NavigationContainer>
							{apiKey ? <DrawerNavigation /> : <AuthStack />}
						</NavigationContainer>
					</View>

					<StatusBar style="auto" />
				</AuthContext.Provider>
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
