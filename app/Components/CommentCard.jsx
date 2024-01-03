import { Pressable, TouchableNativeFeedback } from "react-native";
import React, { useState } from "react";
import {
	Avatar,
	IconButton,
	Button,
	Divider,
	Card,
	Menu,
	Chip,
	TouchableRipple,
} from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { brandColor } from "../Shared/Colors";
import { _formaDate } from "../Shared/utils/helpers";
import { Text, View } from "./Themed";

/**
 * @param {{comment:import("../../types").TComment;onReplyClick:()=>void}} props
 */
export default function CommentCard({ comment, onReplyClick }) {
	const [menuVisible, setMenuVisible] = useState(false);
	const openMenu = () => setMenuVisible(true);
	const closeMenu = () => setMenuVisible(false);

	return (
		<Pressable
			style={{ marginVertical: 0 }}
			onPress={() => {
				setMenuVisible(false);
			}}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					marginTop: 5,
				}}
			>
				<View style={{ flexDirection: "row", gap: 5 }}>
					<Avatar.Text label={comment.user.charAt(0)} size={25} />
					<Text>{comment.user} </Text>
					{/* <Text style={{ color: "#777" }}>
						{comment.user.school.school_acronym}
					</Text> */}
					<Text style={{ color: "#777", marginStart: 8 }}>
						{_formaDate(comment.created_at)}
					</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						gap: 5,
					}}
				>
					<Menu
						visible={menuVisible}
						onDismiss={closeMenu}
						anchor={
							<IconButton
								onPress={openMenu}
								icon="dots-vertical"
								style={{ marginTop: -13 }}
								iconColor="#777"
							/>
						}
						contentStyle={{
							backgroundColor: brandColor.bg,
							borderColor: "#222",
							borderWidth: 1,
						}}
					>
						<View style={{ paddingHorizontal: 5 }}>
							<Menu.Item onPress={closeMenu} title="Dm" />
							<Divider style={{ borderWidth: 1 }} />
							<Menu.Item onPress={closeMenu} title="Report account" />
						</View>
					</Menu>
				</View>
			</View>
			{/* <View style={{ flexDirection: "row" }}>
				{comment && (
					<Text
						style={{
							backgroundColor: brandColor[comment],
							borderRadius: 30,
							paddingVertical: 1,
							paddingHorizontal: 10,
							marginBottom: 5,
							fontSize: 12,
							borderWidth: 1,
							borderColor: brandColor[comment],
							color: "#eee",
						}}
					>
						{comment.toUpperCase()}
					</Text>
				)}
			</View> */}
			<Text style={{}}>{comment.content}</Text>
			{
				// picture && (
				// 	<Card.Cover
				// 		source={{ uri: `${picture}` }}
				// 		style={{ borderRadius: 0, marginVertical: 10 }}
				// 	></Card.Cover>
				// )
			}
			{
				// polls && (
				// 	<>
				// 		<Poll polls={polls} />
				// 		<View style={{ flexDirection: "row" }}>
				// 			<View style={{ flex: 1 }} />
				// 			<TouchableOpacity
				// 				activeOpacity={0.7}
				// 				onPress={() => console.log("skipped voting")}
				// 			>
				// 				<Button mode="outlined" style={{}}>
				// 					Skip Voting
				// 				</Button>
				// 			</TouchableOpacity>
				// 		</View>
				// 	</>
				// )
			}
			<View
				style={{
					flexDirection: "row",
					alignItems: "flex-end",
					justifyContent: "flex-end",
					padding: 0,
				}}
			>
				<Button
					textColor="#eee"
					icon={() => (
						<Ionicons name="md-flame-outline" color={"#eee"} size={17} />
					)}
					style={{}}
					onPress={() => console.log("like")}
				>
					<Text>0 K</Text>
				</Button>

				<Button
					// color={"#eee"}
					icon="share"
					style={{ alignSelf: "center" }}
					onPress={() => onReplyClick(comment)}
				>
					Reply
				</Button>
			</View>
		</Pressable>
	);
}
