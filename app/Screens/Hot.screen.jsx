import { FlatList } from "react-native";
import { View, Text } from "../Components/Themed";
import React, { useEffect, useState } from "react";
import { brandColor } from "../Shared/Colors";
import ThreadCard from "../Components/ThreadCard";
import Api from "../Shared/Api";
import { useContext } from "react";
import { AuthContext } from "../Context/authContext";
import { usePostList } from "../Hooks/usePostList";
import { PostContext } from "../Context/postContext";

export default function HotScreen() {
	// const { fetchGlobalPostList, globalPostList, setGlobalPostList } =
	// 	useContext(AuthContext);
	const [posts, setPosts] = useState([]);
	const {
		posts: GPosts,
		fetchingMore,
		refreshing,
		getPostList,
		getMorePost,
	} = useContext(PostContext);
	useEffect(() => {
		if (GPosts.length > 0) {
			const HotPosts = filterHot([...GPosts]);
			setPosts(HotPosts);
		}
	}, [GPosts]);

	// console.log("hot", posts[0]);
	useEffect(() => {
		// Api.getPosts()
		// 	.then((res) => {
		// 		/**@type {import("../../types").TPost[]} */
		// 		if (res.data) {
		// 			const postList = res.data.results;
		// 			const HotPosts = filterHot(postList);
		// 			// console.log("futoPosts",);
		// 			// (d, i) => d?.user?.school?.school_acronym == "FUTO"
		// 			setPosts(HotPosts);
		// 		}
		// 	})
		// 	.catch((err) => console.log(err));
	}, []);

	/**
	 *
	 * @param {import("../../types").TPost} arr
	 * @returns {import("../../types").TPost}
	 */
	function filterHot(arr) {
		return arr.sort((a, b) => {
			const aLikesAndComments = a.likes.length + a.comments.length;
			const bLikesAndComments = b.likes.length + b.comments.length;

			return bLikesAndComments - aLikesAndComments;
		});
	}
	return (
		<View style={{ flex: 1 }}>
			{posts?.length > 0 && (
				<FlatList
					data={posts}
					renderItem={({ item: post, index: i }) => (
						<View
							key={i}
							style={[
								{
									backgroundColor:
										brandColor[
											post?.post_type?.toLocaleLowerCase() || "others"
										] + "45",
									padding: 12,
									borderRadius: 20,
									marginHorizontal: 10,
									marginBottom: 15,
								},
							]}
						>
							<ThreadCard post={post} />
						</View>
					)}
				/>
			)}
		</View>
	);
}
