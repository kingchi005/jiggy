import { FlatList, TouchableOpacity, View } from "react-native";
import { Text } from "../Components/Themed";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Divider } from "react-native-paper";

const unreadColor = "#bf232319";

export default function NotificationCardList() {
	const [selectedItems, setSelectedItems] = useState([]);

	/**@type {import("../../types").TNotification} */
	const notications = [
		{
			title: "Trending",
			message:
				"fort excellent heard suppose attempt extra because am pilot tank loss her organized key ",
			createdAt: "7:48 AM",
		},
		{
			title: "Testing",
			message:
				"property felt whose mud grade exchange primitive force disease stomach nearby movement sport solution ",
			createdAt: "6:7 AM",
		},
		{
			title: "Booking",
			message:
				"screen that no plain chosen soap chest laid storm gun when show riding pitch ",
			createdAt: "5:23 AM",
		},
		{
			title: "Welcoming",
			message:
				"trade accept outer planning foreign during even blue remove handsome movie good improve audience ",
			createdAt: "3:23 AM",
		},
		{
			title: "Booking",
			message:
				"screen that no plain chosen soap chest laid storm gun when show riding pitch ",
			createdAt: "5:23 AM",
		},
		{
			title: "Welcoming",
			message:
				"trade accept outer planning foreign during even blue remove handsome movie good improve audience ",
			createdAt: "3:23 AM",
		},
		{
			title: "Booking",
			message:
				"screen that no plain chosen soap chest laid storm gun when show riding pitch ",
			createdAt: "5:23 AM",
		},
		{
			title: "Welcoming",
			message:
				"trade accept outer planning foreign during even blue remove handsome movie good improve audience ",
			createdAt: "3:23 AM",
		},
		{
			title: "Booking",
			message:
				"screen that no plain chosen soap chest laid storm gun when show riding pitch ",
			createdAt: "5:23 AM",
		},
		{
			title: "Welcoming",
			message:
				"trade accept outer planning foreign during even blue remove handsome movie good improve audience ",
			createdAt: "3:23 AM",
		},
		{
			title: "Booking",
			message:
				"screen that no plain chosen soap chest laid storm gun when show riding pitch ",
			createdAt: "5:23 AM",
		},
		{
			title: "Welcoming",
			message:
				"trade accept outer planning foreign during even blue remove handsome movie good improve audience ",
			createdAt: "3:23 AM",
		},
		{
			title: "Trending",
			message:
				"village without tape combination halfway swung area oil ran birthday rush nor stuck port ",
			createdAt: "7:39 AM",
		},
	];
	return (
		<FlatList
			data={notications}
			renderItem={({ item, index: i }) => (
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => {
						// handleUnSelect(i);
					}}
					onLongPress={() => {
						// handleItemLongPress(i);
					}}
				>
					<View
						style={{
							flexDirection: "row",
							gap: 10,
							paddingVertical: 10,
							backgroundColor:
								i <= 1
									? unreadColor
									: selectedItems.includes(i)
									? "#00576a8b"
									: "",
							paddingHorizontal: 10,
						}}
					>
						<Ionicons name="flame" color={"orange"} size={30} />
						<View style={{ flex: 1 }}>
							<Text style={{ fontWeight: "bold", paddingVertical: 10 }}>
								{item.title}
							</Text>
							<Text style={{ color: "grey" }}>{item.message}</Text>
						</View>
						<View>
							<Text style={{}}>{item.createdAt}</Text>
						</View>
					</View>
					<Divider />
				</TouchableOpacity>
			)}
		/>
	);
}
