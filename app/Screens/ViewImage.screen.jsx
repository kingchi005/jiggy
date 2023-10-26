import { View, Text } from "../Components/Themed";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Appbar, Card, Divider } from "react-native-paper";
import Animated from "react-native-reanimated";
import { brandColor } from "../Shared/Colors";
import { Dimensions } from "react-native";

export default function ViewImageScreen() {
	const { url } = useRoute().params;

	const navigation = useNavigation();

	return (
		<View style={{ flex: 1, flexDirection: "column" }}>
			<Appbar.Header
				style={[
					{
						borderBottomWidth: 1,
						borderBottomColor: "#eee",
						backgroundColor: brandColor.bg,
					},
				]}
			>
				<Appbar.BackAction
					onPress={() => navigation.goBack()}
					iconColor="#ccc"
				/>
				<Appbar.Content
					style={{}}
					titleStyle={{ color: "#ccc" }}
					title="Image"
				/>

				<Divider />
			</Appbar.Header>
			<View
				style={{
					backgroundColor: brandColor.bg,
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					// paddingHorizontal: 10,
					// paddingTop: 10,
				}}
			>
				<Animated.Image
					source={{ uri: url }}
					style={{
						resizeMode: "contain",
						width: Dimensions.get("screen").width,
						height: "100%",
					}}
					sharedTransitionTag="postPicture"
				/>
			</View>
			{/* <View
				style={{ borderBlockColor: "white", borderWidth: 1, paddingTop: 5 }}
			></View> */}
		</View>
	);
}
