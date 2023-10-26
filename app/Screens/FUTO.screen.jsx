import { FlatList } from "react-native";
import { View, Text } from "../Components/Themed";
import React, { useEffect, useState } from "react";
import { brandColor } from "../Shared/Colors";
import ThreadCard from "../Components/ThreadCard";
import Api from "../Shared/Api";
import { useContext } from "react";
import { AuthContext } from "../Context/authContext";

export default function FUTOScreen() {
	const { fetchGlobalPostList, globalPostList, setGlobalPostList } =
		useContext(AuthContext);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		// const futoPosts = globalPostList?.filter(
		// 	(post) => post?.user?.school?.school_acronym == "FUTO"
		// );
		// // console.log("futoPosts", futoPosts);
		// // (d, i) => d?.user?.school?.school_acronym == "FUTO"
		// setPosts(futoPosts);

		Api.getPosts()
			.then((res) => {
				/**@type {import("../../types").TPost[]} */

				if (res.data) {
					const postList = res.data;

					const futoPosts = postList.filter(
						(post) => post?.user?.school?.school_acronym == "FUTO"
					);
					// console.log("futoPosts",);
					// (d, i) => d?.user?.school?.school_acronym == "FUTO"
					setPosts(futoPosts);
				}
			})
			.catch((err) => console.log(err));
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
											(post?.post_type?.toLocaleLowerCase() || "others") +
												"Card"
										] + "25",
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
