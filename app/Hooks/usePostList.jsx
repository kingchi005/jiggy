import { createContext, useContext, useEffect, useState } from "react";
import Api from "../Shared/Api";
import { ToastAndroid } from "react-native";

// Create the PostContext
/**@type {React.Context<import("../../types").TPostContext>} */
const PostContext = createContext();

// Create the PostProvider component
export function PostProvider({ children }) {
	const [posts, setPosts] = useState([]);
	const [nextPostPage, setNextPostPage] = useState(0);
	const [fetchingMore, setFetchingMore] = useState(false);
	const [refreshing, setRefreshing] = useState(true);

	const addLike = ({ post_id, username }) => {
		setPosts((prevPost) =>
			prevPost.map((currentPost) => {
				if (currentPost.id == post_id) {
					currentPost.likes.push(username);
					return currentPost;
				}
				return currentPost;
			})
		);
	};
	const addPost = ({ post_id }) => {};
	const addComment = ({ post_id, comment }) => {};
	const addReply = ({ post_id, comment_id, reply }) => {};

	useEffect(() => {
		console.log(fetchingMore ? "fetchingMore..." : "");
		console.log(refreshing ? "refreshing..." : "");
	}, [fetchingMore, refreshing]);

	/**
	 * Fetches the initial list of posts.
	 * @returns {Promise} A promise that resolves when the API call is complete.
	 */
	const getPostList = async () => {
		if (fetchingMore) return;

		try {
			setRefreshing(true);
			const postList = (await Api.getPosts()).data;
			setPosts(postList.results);
			console.log("res", postList);
			setRefreshing(false);
			setNextPostPage(2);
			console.log("Refreshed");
			if (postList?.results?.length > 0) {
			} else {
				setRefreshing(false);
				ToastAndroid.showWithGravity(
					"Couldn't get Posts",
					ToastAndroid.LONG,
					ToastAndroid.TOP
				);
				console.log("Couldn't get Posts");
			}
		} catch (error) {
			console.error("Error fetching posts:", error);
			setRefreshing(false);
		}
	};

	/**
	 * Fetches more posts when the user reaches the end of the list.
	 * @returns {Promise} A promise that resolves when the API call is complete.
	 */
	const getMorePost = async () => {
		if (fetchingMore || refreshing) return;
		try {
			setFetchingMore(true);
			if (!nextPostPage) return;
			const morePosts = (await Api.getPostPage(`page=${nextPostPage}`)).data;
			setPosts((p) => [...p, ...morePosts.results]);
			console.log("res", morePosts);

			if (morePosts.next) setNextPostPage((c) => c + 1);
			console.log("Got more");
			if (morePosts?.results?.length > 0) {
			} else {
				console.log("Couldn't get more Posts");
				ToastAndroid.showWithGravity(
					"Couldn't get more Posts",
					ToastAndroid.LONG,
					ToastAndroid.TOP
				);
			}
		} catch (error) {
			console.error("Error fetching more posts:", error);
		} finally {
			setFetchingMore(false);
		}
	};

	// Create the value object to provide in the context
	const value = {
		posts,
		fetchingMore,
		refreshing,
		getPostList,
		getMorePost,
		addLike,
		// Add the remaining functions to the value object
	};

	return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

// Create a custom hook to access the PostContext
export function usePostList() {
	return useContext(PostContext);
}
