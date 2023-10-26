import { Pressable } from "react-native";
import React from "react";
import { Appbar, Avatar, Button, FAB } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { brandColor } from "../Shared/Colors";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../Screens/Home.screen";
import {
	DrawerActions,
	NavigationContainer,
	useNavigation,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "../Components/Themed";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NotificationScreen from "../Screens/Notification.screen";
import FUTOScreen from "../Screens/FUTO.screen";
import HotScreen from "../Screens/Hot.screen";
import { useContext } from "react";
import { AuthContext } from "../Context/authContext";

const TopBarNav = createMaterialTopTabNavigator();

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

function Index() {
	return (
		<TopBarNav.Navigator
			screenOptions={{
				// swipeEnabled: false,
				tabBarActiveTintColor: brandColor.app,
				tabBarInactiveTintColor: brandColor.grey,
				tabBarIndicatorStyle: { backgroundColor: brandColor.app },
				tabBarAllowFontScaling: true,
				tabBarStyle: { backgroundColor: brandColor.bg },
				tabBarLabelStyle: { fontWeight: "bold" },
			}}
		>
			<TopBarNav.Screen name="All" options={{}} component={HomeScreen} />
			<TopBarNav.Screen
				name="FUTO"
				component={FUTOScreen}
				// options={{ animationEnabled: true }}
			/>
			<TopBarNav.Screen name="Hot" component={HotScreen} />
		</TopBarNav.Navigator>
	);
}

export default function HomeStack() {
	const { userData } = useContext(AuthContext);
	const navigation = useNavigation();

	return (
		<View style={{ flex: 1 }}>
			<Appbar.Header
				theme={{ dark: true }}
				style={[{ backgroundColor: brandColor.bg }]}
			>
				<Pressable
					onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
				>
					{/* <Avatar.Image
						size={30}
						style={{ marginHorizontal: 15 }}
						source={require("../Assets/avataaars.svg")}
					/> */}
					{userData?.user?.picture ? (
						<Avatar.Image
							style={{ marginHorizontal: 15 }}
							size={35}
							source={userData.user.picture}
						/>
					) : (
						<Avatar.Text
							style={{ marginHorizontal: 15 }}
							label={userData?.user?.generated_username?.charAt(0)}
							size={35}
						/>
					)}
				</Pressable>
				<Appbar.Content
					titleStyle={[{ fontWeight: "bold", color: brandColor.app }]}
					theme={{ dark: true }}
					title={"Home"}
				/>

				<Appbar.Action
					icon={() => (
						<Ionicons name="notifications-outline" color={"#ccc"} size={25} />
					)}
					color="#ccc"
					onPress={() => {
						navigation.navigate("Notifications");
					}}
				/>
			</Appbar.Header>
			<Index />
			<FAB
				animated
				onPress={() => navigation.navigate("Create-post")}
				icon="plus"
				// size=""
				style={[
					{ backgroundColor: `${brandColor.app}` },
					{
						margin: 16,
						bottom: 0,
						right: 0,
						position: "absolute",
						borderRadius: 50,
					},
				]}
			/>
		</View>
	);
}
