import { useContext, useEffect } from "react";
import { View, Text } from "../Components/Themed";
import React from "react";
import Api from "../Shared/Api";
import { useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import ThreadCard from "./ThreadCard";
import { ActivityIndicator, Divider } from "react-native-paper";
import { ToastAndroid } from "react-native";
import { AuthContext } from "../Context/authContext";

export default function ThreadCardList() {
	// const [posts, setPosts] = useState([]);
	const { globalPostList: posts, setGlobalPostList: setPosts } =
		useContext(AuthContext);

	const [refreshing, setRefreshing] = useState(true);

	useEffect(() => {
		getPostLists();
		// setPosts(globalPostList);
	}, []);

	const getPostLists = async () => {
		const postList = (await Api.getPosts()).data;
		// console.log(postList);
		if (postList?.length > 0) {
			setRefreshing(false);

			setPosts(postList);
		} else {
			setRefreshing(false);

			ToastAndroid.TOP("Couldn't get Posts", ToastAndroid.LONG);
		}
		// console.log("Posts", postList);
		console.log("Refreshed");
	};

	return (
		<View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
			{refreshing && <ActivityIndicator />}
			{posts?.length > 0 && (
				<FlatList
					keyExtractor={(item, index) => index.toString()}
					enableEmptySections={true}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={() => {
								setRefreshing(true);
								getPostLists();
							}}
						/>
					}
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
			)}
		</View>
	);
}
