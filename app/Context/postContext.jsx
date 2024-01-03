import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "./authContext";

/**@type {React.Context<import("../../types").TPostContext>} */
export const PostContext = createContext();

export const PostProvider = ({ children }) => {
	const [postData, setPostData] = useState([]);
	const { userData } = useContext(AuthContext);

	const updatepostData = (newPost) => {
		setPostData(newPost);
	};

	const addLike = async (postId) => {
		/** @type {import("../../types").TPost[]}*/
		const _posts = postData;

		const updatedPost = _posts.map((post) => {
			if (post.id === postId) {
				return {
					...post,
					likes: [...post.likes, userData?.user?.generated_username],
				};
			}
			return post;
		});

		updatepostData(updatedPost);
	};

	/**
	 *
	 * @param {number} postId
	 * @param {import("../../types").TComment} comment
	 */
	const updatedComment = async (postId, comment) => {
		/** @type {import("../../types").TPost[]}*/
		const _posts = postData;

		const updatedPost = _posts.map((post) => {
			if (post.id === postId) {
				return {
					...post,
					comments: post.comments.map((cm) => {
						if (cm.id == comment.id) return comment;
						return cm;
					}),
				};
			}
			return post;
		});

		updatepostData(updatedPost);
	};

	/**
	 *
	 * @param {number} postId
	 * @param {import("../../types").TComment} comment
	 */
	const addComment = async (postId, comment) => {
		/** @type {import("../../types").TPost[]} */
		const _posts = postData;

		const updatedPost = _posts.map((post) => {
			if (post.id === postId) {
				return { ...post, comments: [...post.comments, comment] };
			}
			return post;
		});
		updatepostData(updatedPost);
	};

	return (
		<PostContext.Provider
			value={{
				posts: postData,
				updatepostData,
				addLike,
				addComment,
				updatedComment,
			}}
		>
			{children}
		</PostContext.Provider>
	);
};

// import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import Api from "../Shared/Api";
// import { ToastAndroid } from "react-native";

// // Create the PostContext
// /**@type {React.Context<import("../../types").TPostContext>} */
// export const PostContext = createContext();

// // Create the PostProvider component
// export function PostProvider({ children }) {
// 	const [posts, setPosts] = useState([]);
// 	const [nextPostPage, setNextPostPage] = useState(0);
// 	const [fetchingMore, setFetchingMore] = useState(false);
// 	const [refreshing, setRefreshing] = useState(true);

// 	const updatePost = (postId, newPost) => {
// 		setPosts((prevPosts) => {
// 			const updatedPosts = { ...prevPosts };

// 			if (updatedPosts.hasOwnProperty(postId)) {
// 				updatedPosts[postId] = newPost;
// 			}

// 			return updatedPosts;
// 		});

// 		console.log("updated post");
// 	};

// 	useEffect(() => {
// 		console.log(fetchingMore ? "fetchingMore..." : "");
// 		console.log(refreshing ? "refreshing..." : "");
// 	}, [fetchingMore, refreshing]);

// 	/**
// 	 * Fetches the initial list of posts.
// 	 * @returns {Promise} A promise that resolves when the API call is complete.
// 	 */
// 	const getPostList = async () => {
// 		if (fetchingMore) return;

// 		try {
// 			setRefreshing(true);

// 			const postList = (await Api.getPosts()).data;

// 			setPosts(postList.results);
// 			setNextPostPage(2);

// 			if (postList.results.length === 0) {
// 				ToastAndroid.showWithGravity(
// 					"Couldn't get Posts",
// 					ToastAndroid.LONG,
// 					ToastAndroid.TOP
// 				);
// 			}
// 		} catch (error) {
// 			console.error("Error fetching posts:", error);
// 		} finally {
// 			setRefreshing(false);
// 		}
// 	};

// 	/**
// 	 * Fetches more posts when the user reaches the end of the list.
// 	 * @returns {Promise} A promise that resolves when the API call is complete.
// 	 */
// 	const getMorePost = async () => {
// 		if (fetchingMore || refreshing) return;

// 		try {
// 			setFetchingMore(true);

// 			if (!nextPostPage) return;

// 			const morePosts = (await Api.getPostPage(`page=${nextPostPage}`)).data;
// 			if (morePosts?.results) {
// 				setPosts((prevPosts) => [...prevPosts, ...morePosts.results]);

// 				if (morePosts.next) {
// 					setNextPostPage((prevPage) => prevPage + 1);
// 				}
// 			} else {
// 				ToastAndroid.showWithGravity(
// 					"Couldn't get more Posts",
// 					ToastAndroid.LONG,
// 					ToastAndroid.TOP
// 				);
// 			}
// 		} catch (error) {
// 			console.error("Error fetching more posts:", error);
// 		} finally {
// 			setFetchingMore(false);
// 		}
// 	};

// 	useMemo(() => {
// 		getPostList();
// 	}, []);
// 	// Create the value object to provide in the context
// 	const value = {
// 		posts,
// 		fetchingMore,
// 		refreshing,
// 		getPostList,
// 		getMorePost,
// 		updatePost,
// 		// Add the remaining functions to the value object
// 	};

// 	return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
// }
