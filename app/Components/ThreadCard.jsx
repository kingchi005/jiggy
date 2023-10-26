import {
	Dimensions,
	Pressable,
	TouchableNativeFeedback,
	View,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import {
	Avatar,
	IconButton,
	Button,
	Divider,
	Card,
	Menu,
	Chip,
	TouchableRipple,
	ToggleButton,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "../Components/Themed";

import { _formaDate, formatDate } from "./../Shared/utils/helpers";
import Animated from "react-native-reanimated";
import { brandColor } from "../Shared/Colors";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../Context/authContext";
import Api from "../Shared/Api";

/**@param {{post:import("../../types").TPost}} props */
export default function ThreadCard({ post }) {
	const { userData, fetchGlobalPostList, apiKey } = useContext(AuthContext);
	const [menuVisible, setMenuVisible] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const openMenu = () => setMenuVisible(true);
	const closeMenu = () => setMenuVisible(false);
	// console.log("Post from card", post);

	const navigation = useNavigation();

	// const isLiked = () => {
	// const yes = post.likes.find((p) => p.user.id == userData?.user?.id);

	// 	return !!yes;
	// };

	useEffect(() => {
		checkIfLiked();
	}, []);

	const checkIfLiked = () => {
		const yes = post.likes.find((p) => p.user.id == userData?.user?.id);
		if (yes) setIsLiked(true);
		else setIsLiked(false);
	};

	return (
		<Pressable
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
					{post.user.picture ? (
						<Avatar.Image size={25} source={post.user.picture} />
					) : (
						<Avatar.Text
							label={post?.user?.generated_username?.charAt(0)}
							size={25}
						/>
					)}
					<Text>{post?.user?.generated_username} </Text>
					<Text style={{ color: "#777" }}>
						{post?.user?.school?.school_acronym}
					</Text>
					<Text style={{ color: "#777", marginStart: 8 }}>
						{/* {post?.created_at} */}
						{_formaDate(post?.created_at)}
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
							<Menu.Item
								onPress={closeMenu}
								title="Dm"
								titleStyle={{ color: "#ccc" }}
								style={{}}
							/>
							<Divider style={{ borderWidth: 1 }} />
							<Menu.Item
								onPress={closeMenu}
								titleStyle={{ color: "#ccc" }}
								title="Report account"
							/>
						</View>
					</Menu>
				</View>
			</View>
			<View style={{ flexDirection: "row" }}>
				{post.post_type && (
					<Text
						style={{
							backgroundColor: brandColor[post?.post_type],
							borderRadius: 30,
							paddingVertical: 1,
							paddingHorizontal: 10,
							marginBottom: 5,
							fontSize: 12,
							borderWidth: 1,
							borderColor: brandColor[post?.post_type],
							color: "#ccc",
						}}
					>
						{post?.post_type.toUpperCase()}
					</Text>
				)}
			</View>
			<Text style={{}}>{post.content}</Text>
			{post?.images && (
				<>
					<TouchableRipple
						style={{ marginVertical: 10 }}
						onPress={() =>
							navigation.navigate("Image-view", { url: post.images })
						}
						// href={{
						// 	pathname: "/ViewPictureModal/url",
						// 	params: { url: post.images },
						// }}
						asChild
					>
						<Animated.Image
							source={{ uri: `${post.images}` }}
							style={{
								resizeMode: "cover",
								// width: Dimensions.get("screen").width,
								height: 200,
							}}
							sharedTransitionTag="postPicture"
						/>
					</TouchableRipple>
				</>
			)}
			{
				// false && (
				// 	<>
				// 		<Poll polls={polls} />
				// 		<View style={{ flexDirection: "row" }}>
				// 			<View style={{ flex: 1 }} />
				// 			<TouchableOpacity
				// 				activeOpacity={0.7}
				// 				onPress={() => console.log("skipped voting")}
				// 			>
				// 				<Chip mode="outlined">Skip Voting</Chip>
				// 				{/* <Button mode="outlined" style={{}}>
				// 				</Button> */}
				// 			</TouchableOpacity>
				// 		</View>
				// 	</>
				// )
			}
			<View
				style={{
					flexDirection: "row",
					alignItems: "flex-end",
					justifyContent: "space-around",
					padding: 0,
				}}
			>
				<Button
					textColor={isLiked ? "#d50e0e" : "#ccc"}
					icon={isLiked ? "heart" : "heart-outline"}
					onPress={() => {
						if (!isLiked) {
							post.likes.push(userData);
							setIsLiked(true);
							// Api.likePost(apiKey,post.id).then((res) => {
							// 	console.log("Like", res.data);
							// 	fetchGlobalPostList();
							// });
						}
					}}
				>
					<Text>{post?.likes?.length}</Text>
				</Button>
				<Button
					textColor="#ccc"
					icon="chat-outline"
					style={{}}
					onPress={() => {
						navigation.navigate("Comments", { post: post });
					}}
				>
					<Text>{post?.comments?.length}</Text>
				</Button>
				<Button
					textColor="#ccc"
					icon="eye-outline"
					style={{}}
					onPress={() => console.log("Pressed")}
				>
					<Text>{post?.views}</Text>
				</Button>
				{/* <Button
					textColor="#ccc"
					icon="share"
					style={{ alignSelf: "center" }}
					onPress={() => console.log("Pressed")}
				></Button> */}
				<IconButton
					iconColor="#ccc"
					icon="share"
					size={16}
					style={{ alignSelf: "center" }}
					onPress={() => console.log("Pressed")}
				/>
			</View>
		</Pressable>
	);
}
