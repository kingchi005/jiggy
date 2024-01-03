import { FlatList, ScrollView } from "react-native";
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
	const { userData } = useContext(AuthContext);
	// const [posts, setPosts] = useState([]);
	const { posts: GPosts } = useContext(PostContext);

	const posts = filterHot(GPosts.slice());

	/**
	 *
	 * @param {import("../../types").TPost[]} arr
	 * @returns {import("../../types").TPost[]}
	 */
	function filterHot(arr) {
		return arr.sort((a, b) => {
			const aLikesAndComments = a?.likes?.length + a?.comments?.length;
			const bLikesAndComments = b?.likes?.length + b?.comments?.length;

			return bLikesAndComments - aLikesAndComments;
		});
	}

	// return (
	// 	<ScrollView>
	// 		<Text>{JSON.stringify(posts, null, 2)}</Text>
	// 	</ScrollView>
	// );

	return (
		<View style={{ flex: 1 }}>
			{posts?.length > 0 && (
				// <ScrollView>
				// 	{posts.map((post, i) => (
				// 		<View
				// 			key={i}
				// 			style={[
				// 				{
				// 					backgroundColor:
				// 						brandColor[
				// 							post?.post_type?.toLocaleLowerCase() || "others"
				// 						] + "45",
				// 					padding: 12,
				// 					borderRadius: 20,
				// 					marginHorizontal: 10,
				// 					marginBottom: 15,
				// 				},
				// 			]}
				// 		>
				// 			<ThreadCard post={post} />
				// 		</View>
				// 	))}
				// </ScrollView>
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
