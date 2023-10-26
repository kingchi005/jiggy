import React, { useContext } from "react";
import { View, Text } from "../Components/Themed";
import { NavigationContainer } from "@react-navigation/native";
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from "@react-navigation/drawer";
import StackNavigation from "./StackNavigation";
import UserDetailsDrawer from "../Components/UserDetailsDrawer";
import { brandColor } from "../Shared/Colors";
import { Button, Divider } from "react-native-paper";
import { AuthContext } from "../Context/authContext";
import Store from "../Shared/Store";
import NotificationScreen from "../Screens/Notification.screen";

function Feed() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Feed Screen</Text>
		</View>
	);
}

function Article() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Article Screen</Text>
		</View>
	);
}

function CustomDrawerContent(props) {
	const { setApiKey, setUserData } = useContext(AuthContext);
	const logout = async () => {
		await Store.logout();
		setApiKey(null);
		setUserData(null);
	};
	return (
		<DrawerContentScrollView {...props} style={{ backgroundColor: "#111" }}>
			<UserDetailsDrawer />
			<DrawerItemList {...props} />

			<Divider style={{ backgroundColor: "#555" }} />
			{/* <DrawerItem label="Help" onPress={() => alert("Link to help")} /> */}
			<Button style={{ padding: 10 }} onPress={logout}>
				Logout
			</Button>
		</DrawerContentScrollView>
	);
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
	return (
		<Drawer.Navigator
			screenOptions={{ headerShown: false }}
			drawerContent={(props) => <CustomDrawerContent {...props} />}
		>
			<Drawer.Screen name="default" component={StackNavigation} />
			{/* <Drawer.Screen name="Notification" component={NotificationScreen} /> */}
		</Drawer.Navigator>
	);
}
