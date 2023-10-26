import { Appbar, Snackbar } from "react-native-paper";
import React, { useContext, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { brandColor } from "../Shared/Colors";
import { View, Text } from "../Components/Themed";
import SignUpScreen from "./../Screens/SignUp.screen";
import LoginScreen from "./../Screens/Login.screen";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../Context/authContext";
import { Ionicons } from "@expo/vector-icons";

const TopBarNav = createMaterialTopTabNavigator();

export default function AuthStack() {
	const { errMsg, snackBarAlert, setSnackBarAlert, internetReachable } =
		useContext(AuthContext);
	const handleSBdismiss = () => {
		setSnackBarAlert((prev) => ({ ...prev, show: false }));
	};

	return (
		<View style={{ flex: 1, backgroundColor: brandColor.bg }}>
			<Appbar.Header
				style={{
					backgroundColor: brandColor.bg,
					paddingVertical: 10,
					marginVertical: 20,
					justifyContent: "center",
				}}
			>
				<View style={{ alignItems: "center" }}>
					<Text style={{ fontSize: 30, alignItems: "center" }}>JIGGY</Text>
				</View>
			</Appbar.Header>
			{/* <NavigationContainer> */}
			<TopBarNav.Navigator
				screenOptions={{
					// swipeEnabled: false,
					tabBarActiveTintColor: "#ccc",
					tabBarInactiveTintColor: brandColor.grey,
					tabBarIndicatorStyle: { backgroundColor: brandColor.app },
					tabBarAllowFontScaling: true,
					tabBarStyle: { backgroundColor: brandColor.bg },
					tabBarLabelStyle: { fontWeight: "bold" },
				}}
			>
				<TopBarNav.Screen name="Sign in" component={LoginScreen} />
				<TopBarNav.Screen
					name="SIgn up"
					navigationKey="signup"
					component={SignUpScreen}
				/>
			</TopBarNav.Navigator>
			{/* </NavigationContainer> */}

			<Snackbar
				visible={snackBarAlert.show}
				theme={{ dark: true }}
				onDismiss={handleSBdismiss}
				duration={2000}
				elevation={5}
				style={{
					borderRadius: 10,
					bottom: 20,
					backgroundColor:
						snackBarAlert.type == "error" ? "#3b0000" : "#26ff00",
					borderColor: "#ff0a0a",
					borderWidth: 1,
				}}
				action={{
					label: "",
					icon: () => <Ionicons name="close" size={25} color={"#ccc"} />,
					onPress: () => {
						setSnackBarAlert((prev) => ({ ...prev, show: false }));
					},
				}}
			>
				<Text style={{ fontWeight: "600" }}>
					{snackBarAlert.msg + "" || "."}
				</Text>
			</Snackbar>
			<Snackbar
				style={{
					// borderRadius: 10,
					bottom: 60,
					height: 20,
					backgroundColor: "#3b0000",
					// backgroundColor: "#5e5602",
					borderColor: "#baaa01",
					// borderWidth: 1,
				}}
				visible={!internetReachable}
				// action={{
				// 	label: "Retry",
				// 	textColor: "yellow",
				// 	onPress() {
				// 		console.log("retrying...");
				// 	},
				// }}
				onDismiss={() => {}}
				duration={50 * 60 * 1000}
			>
				<Text style={{ color: "yellow" }}>
					Oops... it seems you are offline
				</Text>
			</Snackbar>
		</View>
	);
}
