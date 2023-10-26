import {
	Appbar,
	Button,
	TextInput,
	ToggleButton,
	TouchableRipple,
} from "react-native-paper";
import { View, Text } from "../Components/Themed";
import React, { useContext, useState } from "react";
import { brandColor } from "../Shared/Colors";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView, ToastAndroid } from "react-native";
import Api from "../Shared/Api";
import { AuthContext } from "./../Context/authContext";

export default function CreatePostScreen() {
	const navigation = useNavigation();
	const { fetchGlobalPostList, apiKey } = useContext(AuthContext);

	const [btnToggle, setBtnToggle] = useState("question");

	const calculateHeight = () => {
		const lineHeight = 20; // Adjust this value based on your font size and line height
		const lines = Math.ceil(formData.content.length / 40); // Adjust the character count per line as needed
		const minHeight = 40; // Adjust this value as the minimum height you want
		const height = Math.max(minHeight, lines * lineHeight);
		return height;
	};

	const [formData, setFormData] = useState({
		content: "",
		headLine: "",
		post_type: "Question",
		images: "",
	});

	const handlePostCreate = () => {
		// console.log("create post", formData);
		Api.creatPost(apiKey, formData)
			.then((res) => {
				console.log("CP res", res.data);
				if (res.data?.post_type == formData.post_type) {
					fetchGlobalPostList();
					ToastAndroid.show("Post created", ToastAndroid.LONG);
					navigation.goBack();
				} else if (res.data?.detail) {
					console.log(res.data?.detail);
					ToastAndroid.show(res.data?.detail, ToastAndroid.LONG);
				}
			})
			.catch((err) => console.log("Create Post Error: ", err));
	};
	return (
		<View style={{ flex: 1 }}>
			<Appbar.Header style={[{ backgroundColor: brandColor.bg }]}>
				<Button
					onPress={(e) => navigation.goBack()}
					textColor={`${brandColor.app}`}
				>
					Back
				</Button>
				<Appbar.Content color={`${brandColor.app}`} title="Create Post" />
				<Button textColor={`${brandColor.app}`} onPress={handlePostCreate}>
					Post
				</Button>
				{/* <Appbar.Action
					icon={"mouse"}
					onPress={() => {
						console.log("marked as read");
					}}
				/> */}
			</Appbar.Header>
			<View style={{ flex: 1 }}>
				<TextInput
					placeholder="Headline {Optional} "
					placeholderTextColor={brandColor.grey}
					mode="flat"
					textColor="#ccc"
					style={{
						backgroundColor: brandColor.bg,
					}}
					value={formData.headLine}
					onChangeText={(headLine) =>
						setFormData((prev) => ({ ...prev, headLine }))
					}
				/>
				<KeyboardAvoidingView
					style={{
						flex: 1,
						justifyContent: "center",
						paddingHorizontal: 20,
						backgroundColor: brandColor.bg,
					}}
				>
					<TextInput
						multiline
						textColor="#ccc"
						placeholder=" Secret crush ? Confession ? Share what's on your mind "
						placeholderTextColor={brandColor.grey}
						mode="flat"
						style={{
							backgroundColor: brandColor.bg,
							flex: 1,
						}}
						value={formData.content}
						onChangeText={(content) =>
							setFormData((prev) => ({ ...prev, content }))
						}
					/>
				</KeyboardAvoidingView>
				<View
					style={{
						flexDirection: "row",
						gap: 5,
						marginTop: 10,
						justifyContent: "space-around",
					}}
				>
					{["Question", "Confession", "Crush"].map((item, i) => (
						<TouchableRipple
							key={i}
							onPress={(content) =>
								setFormData((prev) => ({ ...prev, post_type: item }))
							}
						>
							<Text
								// mode="outlined"
								style={{
									backgroundColor:
										formData.post_type == item
											? brandColor[item.toLocaleLowerCase()] || "#fff"
											: brandColor.bg,
									borderRadius: 30,
									paddingVertical: 3,
									marginBottom: 10,
									paddingHorizontal: 10,
									fontSize: 12,
									borderWidth: 1,
									borderColor: brandColor[item.toLocaleLowerCase()],
									color:
										formData.post_type == item
											? "#eee"
											: brandColor[item.toLocaleLowerCase()],
								}}
							>
								{item.toLocaleUpperCase()}
							</Text>
						</TouchableRipple>
					))}
				</View>
				<ToggleButton.Row
					onValueChange={(btnToggle) => setBtnToggle(btnToggle)}
					value={btnToggle}
				>
					{
						// ["question", "confession", "crush", "dm me", "advise"].map(
						// 	(item) => (
						// 	)
						// )
					}
				</ToggleButton.Row>
			</View>
			<View
				style={{
					backgroundColor: brandColor.bg,
				}}
			></View>
		</View>
	);
}
