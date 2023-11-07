import { View, Text } from "../Components/Themed";

import React, { useState } from "react";
import { Appbar, Divider, IconButton, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, ToastAndroid } from "react-native";
import { brandColor } from "../Shared/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import ThreadCard from "../Components/ThreadCard";
import CommentCard from "../Components/CommentCard";
import Api from "../Shared/Api";
import { useContext } from "react";
import { AuthContext } from "../Context/authContext";
import { useEffect } from "react";
import { PostContext } from "../Context/postContext";

export default function CommentsScreen() {
	/**
	 * @type {{post:import("../../types").TPost}}
	 */
	const { post } = useRoute().params;
	const navigation = useNavigation();
	const [content, setContent] = useState("");
	const [replyTo, setReplyTo] = useState("");
	const { userData, fetchGlobalPostList, apiKey } = useContext(AuthContext);
	const { updatePost } = useContext(PostContext);
	const onReplyClick = (to) => {
		setReplyTo(to);
	};

	const handleCreateComment = async () => {
		if (!content) {
			ToastAndroid.showWithGravity(
				"Enter a comment",
				ToastAndroid.LONG,
				ToastAndroid.TOP
			);
		}
		const data = {
			content,
			post: post.id,
		};
		post.comments.push({
			content: data.content,
			created_at: new Date(),
			id: post.comments.length + 1,
			replies: [],
			user: userData.user.generated_username,
		});
		setContent("");

		// Api.commentOnPost(apiKey, data).then((res) => {
		// 	console.log("Res coment", res.data);
		// 	if (res.data?.detail) {
		// 		ToastAndroid.showWithGravity(
		// 			res.data?.detail,
		// 			ToastAndroid.LONG,
		// 			ToastAndroid.TOP
		// 		);
		// 	} else if (res.data.content == data.content) {
		// 		console.log("commented");
		// 		setContent("");

		// 		// fetchGlobalPostList();
		// 	}
		// });
		// console.log("Commenting", data);
	};

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
					iconColor="#ccc"
					onPress={() => navigation.goBack()}
				/>
				<Appbar.Content
					style={{}}
					titleStyle={{ color: "#ccc" }}
					title="Comments"
				/>

				<Divider />
			</Appbar.Header>
			<View
				style={{
					backgroundColor: brandColor.bg,
					flex: 1,
					paddingHorizontal: 10,
					paddingTop: 10,
				}}
			>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View>
						<ThreadCard post={post} />
						{post.comments.length > 0 && (
							<View
								style={{
									paddingLeft: 10,
									marginLeft: 10,
									paddingTop: 15,
									marginBottom: 10,
									borderLeftColor: "#ccc",
									borderWidth: 1,
								}}
							>
								{post.comments.map((cm, key) => (
									<View key={key}>
										<CommentCard onReplyClick={onReplyClick} comment={cm} />
										{
											// cm.reply && (
											// 	<View
											// 		style={{
											// 			paddingLeft: 10,
											// 			marginLeft: 10,
											// 			paddingVertical: 15,
											// 			borderLeftColor: "#ccc",
											// 			borderWidth: 1,
											// 		}}
											// 	>
											// 		{cm.reply.map((reply, key) => (
											// 			<CommentCard
											// 				onReplyClick={onReplyClick}
											// 				key={key}
											// 				{...reply}
											// 			/>
											// 		))}
											// 	</View>
											// )
										}
									</View>
								))}
							</View>
						)}
					</View>
				</ScrollView>
			</View>
			<View
				style={{ borderBlockColor: "white", borderWidth: 1, paddingTop: 5 }}
			>
				{replyTo && (
					<Text style={{ paddingStart: 10 }}>Replying to @{replyTo + ""}</Text>
				)}
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<TextInput
						placeholder="Comment your thought"
						textColor="#ccc"
						placeholderTextColor={brandColor.grey}
						mode="flat"
						style={{
							backgroundColor: brandColor.bg,
						}}
						value={content}
						onChangeText={setContent}
					/>
					<IconButton
						style={{ backgroundColor: !content ? "#555" : brandColor.app }}
						disabled={!content}
						icon={() => <Ionicons name="send" color={"white"} />}
						onPress={handleCreateComment}
					/>
				</View>
			</View>
		</View>
	);
}
