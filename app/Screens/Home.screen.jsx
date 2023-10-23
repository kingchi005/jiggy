import { Appbar, Button } from "react-native-paper";
import { View, Text } from "../Components/Themed";
import React, { useContext, useEffect, useState } from "react";
import { brandColor } from "../Shared/Colors";
import Store from "../Shared/Store";
import { AuthContext } from "../Context/authContext";
import Api from "../Shared/Api";

export default function HomeScreen() {
	const { setApiKey, setUserData, userData, apiKey } = useContext(AuthContext);
	const [postList, setPostList] = useState([]);
	useEffect(() => {
		getPostLists();
	}, []);

	const getPostLists = async () => {
		const posts = (await Api.getPosts()).data;
		setPostList(posts);
		console.log("Posts", posts);
	};
	const logout = async () => {
		await Store.logout();
		setApiKey(null);
		setUserData(null);

		// await Store.setuse(null)
	};
	return (
		<View>
			<Appbar.Header
				style={{
					backgroundColor: brandColor.bg,
					paddingVertical: 10,
					marginVertical: 20,
					justifyContent: "center",
				}}
			>
				<Appbar.Content style={{}} color="#ccc" title="Home" />
			</Appbar.Header>
			<Text>HomeScreen</Text>
			<Text>
				{userData?.user?.generated_username || apiKey || "no userData"}
			</Text>
			<Text>Coming soon ...</Text>
			<Button onPress={logout}>Logout</Button>
		</View>
	);
}
