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
import ReplyCard from "../Components/ReplyCard";

export default function CommentsScreen() {
	/**
	 * @type {{post:import("../../types").TPost}}
	 */
	const {
		post: { id: postId },
	} = useRoute().params;
	const navigation = useNavigation();
	const [content, setContent] = useState("");
	const [replyTo, setReplyTo] = useState("");
	const [replyToComment, setReplyToComment] = useState(null);
	const { userData, fetchGlobalPostList, apiKey } = useContext(AuthContext);

	const {
		addComment,
		posts,
		updatedComment: updateComment,
	} = useContext(PostContext);
	const onReplyClick = (comment) => {
		setReplyTo(comment.user);
		setReplyToComment(comment);
	};

	const post = posts.find((p) => p.id === postId);

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

		const comment = {
			content: data.content,
			created_at: new Date().toISOString(),
			id: post.comments.length + 1,
			replies: [],
			user: userData.user.generated_username,
		};
		// post.comments.push(comment);
		await addComment(post.id, comment);
		setContent("");

		Api.commentOnPost(apiKey, data).then((res) => {
			// console.log("Res coment", res.data);
			// if (res.data?.detail) {
			// 	ToastAndroid.showWithGravity(
			// 		res.data?.detail,
			// 		ToastAndroid.LONG,
			// 		ToastAndroid.TOP
			// 	);
			// } else if (res.data?.errors[0]?.detail) {
			// 	ToastAndroid.showWithGravity(
			// 		res.data?.errors[0]?.detail,
			// 		ToastAndroid.LONG,
			// 		ToastAndroid.TOP
			// 	);
			// } else if (res.data.content == data.content) {
			// 	console.log("commented");
			// 	setContent("");
			// 	// fetchGlobalPostList();
			// }
		});
	};

	/**
	 *
	 * @param {import("../../types").TComment} comment
	 * @returns
	 */
	const handleReply = async () => {
		// console.log(`Replying to ${replyTo}`);
		if (!replyTo) return;
		/**@type {import("../../types").TReply} */
		const reply = {
			comment: replyToComment.id,
			user: userData.user.generated_username,
			content,
		};
		const updatedComment = {
			...replyToComment,
			replies: [...replyToComment.replies, reply],
		};
		setReplyToComment(updatedComment);
		await updateComment(post.id, updatedComment);
		console.log(updatedComment);

		Api.replyComment(apiKey, { comment: reply.comment, content });
		setContent("");
	};
	// console.log(JSON.stringify(post, null, 2));
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
						<ThreadCard
							onReplyClick={() => setReplyTo("")}
							comment
							isLike={post?.likes.includes(userData?.user?.generated_username)}
							post={post}
						/>
						{post.comments.length > 0 && (
							<View
								style={{
									paddingLeft: 10,
									marginLeft: 10,
									paddingTop: 15,
									marginBottom: 10,
									borderLeftColor: "#888",
									borderWidth: 1,
								}}
							>
								{post.comments.map((cm, key) => (
									<View key={key}>
										<CommentCard onReplyClick={onReplyClick} comment={cm} />
										{cm.replies.length > 0 && (
											<View
												style={{
													paddingLeft: 10,
													marginLeft: 10,
													// paddingVertical: 15,
													borderLeftColor: "#888",
													borderWidth: 1,
												}}
											>
												{/* <Text>{JSON.stringify(cm, null, 2)}</Text> */}
												{cm.replies.map((reply, key) => (
													<ReplyCard key={key} reply={reply} />
												))}
											</View>
										)}
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
							width: "80%",
						}}
						value={content}
						onChangeText={setContent}
					/>
					<IconButton
						style={{ backgroundColor: !content ? "#555" : brandColor.app }}
						disabled={!content}
						icon={() => <Ionicons name="send" color={"white"} />}
						onPress={() => {
							if (replyTo) {
								handleReply();
							} else {
								handleCreateComment();
							}
						}}
					/>
				</View>
			</View>
		</View>
	);
}
