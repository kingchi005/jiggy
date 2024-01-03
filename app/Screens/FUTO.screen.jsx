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

export default function FUTOScreen() {
	const { userData } = useContext(AuthContext);
	const { posts: GPosts } = useContext(PostContext);

	const posts = [...GPosts].filter(
		(post) => post?.user?.school?.school_acronym == "FUTO"
	);

	// console.log("futo", posts[0]);

	useEffect(() => {
		// Api.getPosts()
		// 	.then((res) => {
		// 		/**@type {import("../../types").TPost[]} */
		// 		if (res.data) {
		// 			const postList = res.data.results;
		// 			// return console.log(postList);
		// 			const futoPosts = postList.filter(
		// 				(post) => post?.user?.school?.school_acronym == "FUTO"
		// 			);
		// 			// console.log("futoPosts",);
		// 			// (d, i) => d?.user?.school?.school_acronym == "FUTO"
		// 			setPosts(futoPosts);
		// 		}
		// 	})
		// 	.catch((err) => console.log(err));
	}, []);
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
							<ThreadCard
								isLike={post?.likes.includes(
									userData?.user?.generated_username
								)}
								post={post}
							/>
						</View>
					)}
				/>
			)}
		</View>
	);
}
