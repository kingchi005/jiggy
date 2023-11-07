// showLastCommitMessageForThisLibrary.js
import { create } from "apisauce";
import Store from "./Store";
import qs from "qs";

// define the api
let apiKey;
Store.getApiKey().then((key) => (apiKey = key));

const api = create({
	baseURL: "https://jiggy-backend.vercel.app",
	Authorization: `Token ${apiKey}`,
});

// start making calls

// GET REQUESTS
const getSchools = async () =>
	await api.get("/account/registration/annoyuser/");

const getPosts = async () => await api.get("/annon/posts/paginated/?page=1");

const getPostPage = async (page) =>
	await api.get(`/annon/posts/paginated/?${page}`);

`https://jiggybackend.com.ng/annon/posts/paginated/`;

const getNotifications = async () => {};

const getUserDetails = async () => {
	const res = await api.get(`/account/annonyuser/`);
	return res;
};

// POST REQUESTS
const creatPost = async (apiKey, post) => {
	const res = await api.post(
		`/annon/posts/create/?Authorization=Token ${apiKey}`,
		post,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Token ${apiKey}`,
			},
		}
	);
	return res;
};

const likePost = async (apiKey, post_id) => {
	const res = await api.post(
		`/annon/posts/${post_id}/increase-likes/`,
		{},
		{ headers: { Authorization: `Token ${apiKey}` } }
	);
	return res;
	// {"message": "Likes increased successfully"}
};

const commentOnPost = async (apiKey, data) => {
	console.log("API", apiKey);
	const body = qs.stringify(data);

	const res = await api.post(
		`/annon/posts/comment/?Authorization=Token ${apiKey}`,
		body,
		{
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Token ${apiKey}`,
			},
		}
	);

	// 	{
	//     "content": "comenting",
	//     "post": 9
	// }

	return res;
};

const replyComment = async (apiKey, data) => {
	console.log("API", apiKey);
	const body = qs.stringify(data);

	const res = await api.post(
		`/annon/posts/comment/?Authorization=Token ${apiKey}`,
		body,
		{
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Token ${apiKey}`,
			},
		}
	);
};

export default {
	getPosts,
	getPostPage,
	getSchools,
	getUserDetails,
	getNotifications,
	creatPost,
	likePost,
	commentOnPost,
	replyComment,
};
