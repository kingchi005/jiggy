import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeStack from "./HomeStack";
import NotificationScreen from "../Screens/Notification.screen";
import CreatePostScreen from "../Screens/CreatePost.screen";
import ViewImageScreen from "../Screens/ViewImage.screen";
import CommentsScreen from "../Screens/Comments.screen";
import { Snackbar } from "react-native-paper";
import { Dimensions } from "react-native";
import { Text } from "../Components/Themed";

const Stack = createStackNavigator();

function SettingsScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Button title="Go back" onPress={() => navigation.goBack()} />
		</View>
	);
}

export default function StackNavigation() {
	return (
		<>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={HomeStack} />
				<Stack.Screen
					name="Notifications"
					component={NotificationScreen}
					options={{
						animationEnabled: true,
						presentation: "modal",
					}}
				/>
				<Stack.Screen
					name="Create-post"
					component={CreatePostScreen}
					options={{
						animationEnabled: true,
						presentation: "modal",
					}}
				/>
				<Stack.Screen
					name="Image-view"
					component={ViewImageScreen}
					options={{
						presentation: "modal",
					}}
				/>
				<Stack.Screen
					name="Comments"
					component={CommentsScreen}
					options={{
						presentation: "modal",
					}}
				/>
				{/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
			</Stack.Navigator>
			<Snackbar
				style={{
					// borderRadius: 10,
					bottom: 60,
					backgroundColor: "#3b0000",
					// backgroundColor: "#5e5602",
					borderColor: "#baaa01",
					// borderWidth: 1,
				}}
				visible={true}
				action={{
					label: "Retry",
					textColor: "yellow",
					onPress() {
						console.log("retrying...");
					},
				}}
				onDismiss={() => {}}
				duration={5 * 60 * 1000}
			>
				<Text style={{ color: "yellow" }}>
					Oops... it seems you are offline
				</Text>
			</Snackbar>
		</>
	);
}
