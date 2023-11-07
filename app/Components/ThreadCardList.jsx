import { useEffect, useState, useCallback } from "react";
import {
	FlatList,
	View,
	ActivityIndicator,
	RefreshControl,
	ToastAndroid,
} from "react-native";
import { usePostList } from "../Hooks/usePostList";
import ThreadCard from "./ThreadCard";
import { Divider } from "react-native-paper";
import { useContext } from "react";
import { PostContext } from "../Context/postContext";
import { brandColor } from "../Shared/Colors";

// Separate module or hook for fetching posts

export default function ThreadCardList() {
	const { posts } = useContext(PostContext);

	// const [posts, setPosts] = useState([]);

	useEffect(() => {
		if (GPosts.length > 0) {
			setPosts(GPosts);
		}
	}, [GPosts]);

	return (
		<View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
			{posts?.length > 0 && (
				<FlatList
					Data={sortedPosts}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => <PostCard post={item} />}
				/>
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
				// 		<View
				// 			key={i}
				// 			style={[
				// 				{
				// 					// backgroundColor:
				// 					// 	brandColor[
				// 					// 		post?.post_type?.toLocaleLowerCase() || "others"
				// 					// 	] + "45",
				// 					padding: 12,
				// 					// borderRadius: 20,
				// 					marginHorizontal: 10,
				// 					marginVertical: 10,
				// 				},
				// 			]}
				// 		>
				// 			<ThreadCard post={post} />
				// 		</View>
				// 	)}
				// />
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
