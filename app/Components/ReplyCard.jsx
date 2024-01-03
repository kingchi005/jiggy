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
 * @param {{reply:import("../../types").TReply;onReplyClick:()=>void}} props
 */
export default function ReplyCard({ reply, onReplyClick }) {
	const [menuVisible, setMenuVisible] = useState(false);
	const openMenu = () => setMenuVisible(true);
	const closeMenu = () => setMenuVisible(false);

	return (
		<Pressable
			style={{ marginVertical: 10 }}
			onPress={() => {
				setMenuVisible(false);
			}}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					marginTop: 0,
				}}
			>
				<View style={{ flexDirection: "row", gap: 5 }}>
					<Avatar.Text label={reply.user.charAt(0)} size={25} />
					<Text>{reply.user} </Text>
					{/* <Text style={{ color: "#777" }}>
						{reply.user.school.school_acronym}
					</Text> */}
					<Text style={{ color: "#777", marginStart: 8 }}>
						{/* {_formaDate(reply.created_at)} */}
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

			<Text style={{}}>{reply.content}</Text>
		</Pressable>
	);
}
