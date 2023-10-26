import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Text, View } from "../Components/Themed";
import { Appbar, Avatar, Button, Divider } from "react-native-paper";
import { brandColor } from "../Shared/Colors";
import { useNavigation } from "@react-navigation/native";
import NotificationCardList from "../Components/NotificationCardList";

export default function NotificationScreen() {
	const navigation = useNavigation();
	const [selectedItems, setSelectedItems] = useState([]);

	const handleItemLongPress = (itemIndex) => {
		const updatedSelectedItems = [...selectedItems];
		const itemIndexInSelected = updatedSelectedItems.indexOf(itemIndex);

		if (itemIndexInSelected > -1) {
			updatedSelectedItems.splice(itemIndexInSelected, 1);
		} else {
			updatedSelectedItems.push(itemIndex);
		}

		setSelectedItems(updatedSelectedItems);
	};

	const handleUnSelect = (itemIndex) => {
		const updatedSelectedItems = [...selectedItems];

		const itemIndexInSelected = updatedSelectedItems.indexOf(itemIndex);

		if (selectedItems.includes(itemIndex)) {
			updatedSelectedItems.splice(itemIndexInSelected, 1);
		}
		setSelectedItems(updatedSelectedItems);
	};
	const unreadColor = "#bf232319";
	return (
		<View style={{ flex: 1 }}>
			<Appbar.Header style={[{ backgroundColor: brandColor.bg }]}>
				<Button
					onPress={(e) => navigation.goBack()}
					textColor={`${brandColor.app}`}
				>
					Back
				</Button>
				<Appbar.Content color={`${brandColor.app}`} title="Notifications" />
				<Button textColor={`${brandColor.app}`} onPress={() => router.push("")}>
					Mark as read
				</Button>
				{/* <Appbar.Action
					icon={"mouse"}
					onPress={() => {
						console.log("marked as read");
					}}
				/> */}
			</Appbar.Header>
			<View
				style={{
					backgroundColor: brandColor.bg,
				}}
			>
				<NotificationCardList />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({});
