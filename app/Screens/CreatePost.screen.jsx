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
import { Dimensions, KeyboardAvoidingView, ToastAndroid } from "react-native";
import Api from "../Shared/Api";
import { AuthContext } from "./../Context/authContext";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import * as RNImagePicker from "react-native-image-picker";
import { ActivityIndicator, StyleSheet } from "react-native";

const imgDir = FileSystem.documentDirectory + "jiggy/images/";

const FullScreenActivityIndicator = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color="#0000ff" />
		</View>
	);
};

const ensureDirExists = async () => {
	const dirInfo = await FileSystem.getInfoAsync(imgDir);
	if (!dirInfo.exists) {
		await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
	}
};

const ImgPickerComp = ({ setFormData, setImage }) => {
	const selectImage = async () => {
		const options = {
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			// aspect: [4, 3],
			// base64: true,
			allowsEditing: true,
			quality: 0.75,
		};

		await ImagePicker.requestCameraPermissionsAsync();
		const result = await ImagePicker.launchCameraAsync(options);
		// }
		if (!result.canceled) {
			const blob = await (await fetch(result.assets[0].uri)).blob();
			setImage(result.assets[0].uri);
			setFormData((prev) => ({ ...prev, images: blob }));
			console.log(result.assets[0].uri);
			// console.log(blob);
			// console.log(JSON.stringify(result.assets));
		}
	};

	const selectPhoto = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "flex-start",
				gap: 10,
				paddingVertical: 10,
			}}
		>
			{/* <Text>Image Picker</Text> */}
			<Ionicons
				size={40}
				color={brandColor.question}
				onPress={() => selectPhoto()}
				name="image"
			/>
			<Ionicons
				size={40}
				color={brandColor.question}
				onPress={() => selectImage()}
				name="camera"
			/>
		</View>
	);
};
export default function CreatePostScreen() {
	const navigation = useNavigation();
	const { fetchGlobalPostList, apiKey } = useContext(AuthContext);

	const [btnToggle, setBtnToggle] = useState("question");
	const [image, setImage] = useState("");

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
		images: {},
	});

	const handlePostCreate = async () => {
		const _formData = new FormData();
		_formData.append("images", {
			uri: image,
			type: formData.images._data.type,
			name: formData.images._data.name,
		});

		_formData.append("content", formData.content);
		_formData.append("post_type", formData.post_type);
		_formData.append("school", 1);

		Api.creatPost(apiKey, _formData)
			.then((res) => {
				console.log("CP res", res.data);

				if (res.data?.post_type == formData.post_type) {
					// fetchGlobalPostList();
					ToastAndroid.show("Post created", ToastAndroid.LONG);
					navigation.goBack();
				} else if (res.data?.detail) {
					console.log(res.data?.detail);
					ToastAndroid.showWithGravity(
						res.data?.detail,
						ToastAndroid.LONG,
						ToastAndroid.TOP
					);
				} else if (res.data?.errors[0]?.detail) {
					console.log(res.data?.errors[0]?.detail);
					ToastAndroid.showWithGravity(
						res.data?.errors[0]?.detail,
						ToastAndroid.LONG,
						ToastAndroid.TOP
					);
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

				<View
					style={{ marginTop: 10, bottom: 5, left: 0, position: "relative" }}
				>
					<ImgPickerComp setImage={setImage} setFormData={setFormData} />

					{image && (
						<Image
							// width={Dimensions.get("screen").width*}
							width={150}
							height={150}
							style={{ borderRadius: 10 }}
							resizeMode="center"
							source={{ uri: image }}
						/>
					)}
				</View>
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
						gap: 10,
						marginTop: 10,
						flexWrap: "wrap",
						paddingHorizontal: 10,
						marginHorizontal: "auto",
						alignSelf: "center",
					}}
				>
					{[
						"Confession",
						"Question",
						"Crush",
						// "Dm",
						"Advice",
						"Cruise",
						"Talk",
						"Others",
					].map((item, i) => (
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
									paddingVertical: 5,
									marginBottom: 10,
									paddingHorizontal: 10,
									fontSize: 14,
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
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
});
