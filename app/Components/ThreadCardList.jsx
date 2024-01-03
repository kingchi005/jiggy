import { useEffect, useState, useCallback } from "react";
import {
	FlatList,
	View,
	ActivityIndicator,
	RefreshControl,
	ToastAndroid,
	InteractionManager,
} from "react-native";
import { usePostList } from "../Hooks/usePostList";
import ThreadCard from "./ThreadCard";
import { Button, Divider } from "react-native-paper";
import { useContext } from "react";
import { brandColor } from "../Shared/Colors";
import { PostContext } from "./../Context/postContext";
import Api from "../Shared/Api";
import { Text } from "./Themed";
import { debounce } from "lodash";
import { ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../Context/authContext";
import ThreadCardSkeleton from "./ThreadCardSkeleton";

// Separate module or hook for fetching posts

export default function ThreadCardList() {
	const { posts, updatepostData } = useContext(PostContext);
	const { userData } = useContext(AuthContext);
	const [page, setPage] = useState(0);
	const [refreshing, setRefreshing] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		// Simulating API call to fetch initial data
		try {
			const post = (await Api.getPosts()).data;
			updatepostData([...post.results]);
			setPage(2);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchMorePost = async () => {
		if (!page) return;
		try {
			const morePost = (await Api.getPostPage(page)).data;
			updatepostData([...posts, ...morePost.results]);
			if (!morePost?.next) setPage(null);
			setPage((p) => p + 1);
		} catch (error) {
			console.log(error);
		}
	};
	const debouncedFetchMoreData = debounce(fetchMorePost, 500);

	const handleRefresh = () => {
		setRefreshing(true);
		fetchData();
		setRefreshing(false);
	};

	const handleEndReached = () => {
		setLoadingMore(true);
		InteractionManager.runAfterInteractions(() => {
			debouncedFetchMoreData();
		});
		setLoadingMore(false);
	};

	if (refreshing || posts.length == 0)
		return [1, 2, 3, 4, 5].map((i) => <ThreadCardSkeleton key={i} />);
	// return (
	// 	<ScrollView>
	// 		<Text>{JSON.stringify(posts, null, 2)}</Text>
	// 		<Button onPress={handleRefresh}>Refresh</Button>
	// 		<Button onPress={handleEndReached}>Loadmore</Button>
	// 		{loadingMore && (
	// 			<View style={{ bottom: 30 }}>
	// 				<ActivityIndicator size={"large"} />
	// 			</View>
	// 		)}
	// 	</ScrollView>
	// );

	return (
		<View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
			{/* <Text>{JSON.stringify(posts, null, 2)}</Text> */}
			{posts.length > 0 ? (
				<FlatList
					data={posts}
					indicatorStyle="white"
					keyExtractor={(item, i) => i.toString()}
					renderItem={({ item }) => (
						<ThreadCard
							isLike={item?.likes.includes(userData?.user?.generated_username)}
							post={item}
						/>
					)}
					refreshControl={<RefreshControl refreshing={refreshing} />}
					onEndReached={handleEndReached}
					onEndReachedThreshold={0.5}
					ItemSeparatorComponent={
						<Divider style={{ backgroundColor: "#555", marginVertical: 15 }} />
					}
				/>
			) : (
				// <FlatList
				// 	ItemSeparatorComponent={
				// 		<Divider style={{ backgroundColor: "#555" }} />
				// 	}
				// 	onEndReached={() => {
				// 		console.log("fetch more here");
				// 		getMorePost();
				// 	}}
				// 	onEndReachedThreshold={0.7}
				// 	ListFooterComponent={() => (
				// 		<View>{fetchingMore && <ActivityIndicator />}</View>
				// 	)}
				// 	data={posts}
				// 	renderItem={({ item: post, index: i }) => (
				// <View
				// 	key={i}
				// 	style={[
				// 		{
				// 			// backgroundColor:
				// 			// 	brandColor[
				// 			// 		post?.post_type?.toLocaleLowerCase() || "others"
				// 			// 	] + "45",
				// 			padding: 12,
				// 			// borderRadius: 20,
				// 			marginHorizontal: 10,
				// 			marginVertical: 10,
				// 		},
				// 	]}
				// >
				// 	<ThreadCard post={post} />
				// </View>
				// 	)}
				// />
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
			)}
			{loadingMore && (
				<View style={{ bottom: 30 }}>
					<ActivityIndicator size={"large"} />
				</View>
			)}
		</View>
	);
}

{
	/* <FlatList
					// enableEmptySections={true}
					// refreshControl={
					// 	<RefreshControl refreshing={refreshing} onRefresh={getPostList} />
					// }
					data={posts}
					ItemSeparatorComponent={
						<Divider style={{ backgroundColor: "#555" }} />
					}
					// ListFooterComponent={() => (
					// 	<View>{fetchingMore && <ActivityIndicator />}</View>
					// )}
					renderItem={({ item: post, index: i }) => (
						<View key={i} style={{ marginVertical: 15 }}>
							<ThreadCard post={post} />
						</View>
					)}
					// onEndReached={getMorePost}
					// onEndReachedThreshold={2}
				/> */
}
