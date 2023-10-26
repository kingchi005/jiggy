import { useContext, useEffect } from "react";
import { View, Text } from "../Components/Themed";
import React from "react";
import Api from "../Shared/Api";
import { useState } from "react";
import { FlatList } from "react-native";
import ThreadCard from "./ThreadCard";
import { Divider } from "react-native-paper";
import { ToastAndroid } from "react-native";
import { AuthContext } from "../Context/authContext";

export default function ThreadCardList() {
	// const [posts, setPosts] = useState([]);
	const { globalPostList: posts, setGlobalPostList: setPosts } =
		useContext(AuthContext);
	useEffect(() => {
		getPostLists();
		// setPosts(globalPostList);
	}, []);

	const getPostLists = async () => {
		const postList = (await Api.getPosts()).data;
		// console.log(postList);
		if (postList?.length > 0) {
			setPosts(postList);
		} else {
			ToastAndroid.TOP("Couldn't get Posts", ToastAndroid.LONG);
		}
		// console.log("Posts", postList);
	};

	return (
		<View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
			{posts?.length > 0 ? (
				<FlatList
					data={posts}
					renderItem={({ item: post, index: i }) => (
						<>
							<View style={{ marginVertical: 15 }}>
								<ThreadCard post={post} />
							</View>
							<Divider style={{ backgroundColor: "#555" }} />
						</>
					)}
				/>
			) : (
				<View>
					{[...Array(6)].map((item, key) => (
						<View key={key}>
							<View key={key} style={{ marginBottom: 20 }}>
								<View
									style={{
										marginBottom: 10,
										backgroundColor: "#222",
										width: "10%",
										height: 13,
									}}
								></View>
								<View
									style={{
										marginBottom: 10,
										backgroundColor: "#222",
										width: "50%",
										height: 13,
									}}
								></View>
								<View
									style={{
										marginBottom: 10,
										backgroundColor: "#222",
										width: "90%",
										height: 13,
									}}
								></View>
								<View
									style={{
										marginBottom: 10,
										backgroundColor: "#222",
										width: "80%",
										height: 13,
									}}
								></View>
								<View
									style={{
										marginBottom: 10,
										backgroundColor: "#222",
										width: "40%",
										height: 13,
									}}
								></View>
							</View>
							<Divider style={{ backgroundColor: "#555" }} />
						</View>
					))}
				</View>
			)}
		</View>
	);
}
