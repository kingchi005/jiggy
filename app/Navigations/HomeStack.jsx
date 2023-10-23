// import { View, Text, Pressable } from "react-native";
// import React from "react";
// import { Appbar, Avatar, FAB } from "react-native-paper";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { brandColor } from "../Shared/Colors";
// import { Ionicons } from "@expo/vector-icons";
// import HomeScreen from "../Screens/Home.screen";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

// const Stack = createStackNavigator();

// export default function HomeStack() {
// 	return (
// 		<View style={{ flex: 1 }}>
// 			<Appbar.Header
// 				theme={{ dark: true }}
// 				style={[{ backgroundColor: brandColor.bg }]}
// 			>
// 				{/* <DrawerToggleButton /> */}

// 				<Pressable
// 				// onPress={() =>}
// 				>
// 					<Avatar.Image
// 						size={30}
// 						style={{ marginHorizontal: 15 }}
// 						source={require("../Assets/avataaars.svg")}
// 					/>
// 				</Pressable>
// 				<Appbar.Content
// 					titleStyle={[{ fontWeight: "bold", color: brandColor.app }]}
// 					theme={{ dark: true }}
// 					title={"Home"}
// 				/>
// 				{/* <LinearTextGradient
// 					style={{ fontWeight: "bold", fontSize: 72 }}
// 					locations={[0, 1]}
// 					colors={["red", "blue"]}
// 					start={{ x: 0, y: 0 }}
// 					end={{ x: 1, y: 0 }}
// 				>
// 					THIS IS TEXT GRADIENT
// 				</LinearTextGradient> */}
// 				<Appbar.Action
// 					icon={() => (
// 						<Ionicons name="notifications-outline" color={"#ccc"} size={25} />
// 					)}
// 					color="#ccc"
// 					onPress={() => {
// 						// router.push("/(drawer)/Notifications");
// 					}}
// 				/>
// 			</Appbar.Header>
// 			<NavigationContainer>
// 				<Stack
// 					screenOptions={{
// 						headerShown: false,
// 					}}
// 				>
// 					<Stack.Screen name="home" component={HomeScreen} />
// 				</Stack>
// 			</NavigationContainer>
// 			<FAB
// 				animated
// 				// onPress={() => router.push("/(modals)/CreatePost")}
// 				icon="plus"
// 				size="small"
// 				style={[
// 					{ backgroundColor: `${brandColor.app}` },
// 					{
// 						margin: 16,
// 						bottom: 0,
// 						right: 0,
// 						position: "absolute",
// 						borderRadius: 50,
// 					},
// 				]}
// 			/>
// 		</View>
// 	);
// }

import * as React from "react";
import { Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function HomeScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Button
				title="Go to Profile"
				onPress={() => navigation.navigate("Profile")}
			/>
		</View>
	);
}

function ProfileScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Button
				title="Go to Notifications"
				onPress={() => navigation.navigate("Notifications")}
			/>
			<Button title="Go back" onPress={() => navigation.goBack()} />
		</View>
	);
}

function NotificationsScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Button
				title="Go to Settings"
				onPress={() => navigation.navigate("Settings")}
			/>
			<Button title="Go back" onPress={() => navigation.goBack()} />
		</View>
	);
}

function SettingsScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Button title="Go back" onPress={() => navigation.goBack()} />
		</View>
	);
}

const Stack = createNativeStackNavigator();

function MyStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="Notifications" component={NotificationsScreen} />
			<Stack.Screen name="Profile" component={ProfileScreen} />
			<Stack.Screen name="Settings" component={SettingsScreen} />
		</Stack.Navigator>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<MyStack />
		</NavigationContainer>
	);
}
