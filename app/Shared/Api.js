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

const getPosts = async () => await api.get("/annon/posts/");

const getNotifications = async () => {};

const getUserDetails = async () => {
	const res = await api.get(`/account/annonyuser/`);
	return res;
};

// POST REQUESTS
const creatPost = async (apiKey, post) => {
	const body = qs.stringify(post);
	// `content=${encodeURIComponent(
	// 	post.content
	// )}&post_type=${encodeURIComponent(
	// 	post.post_type
	// )}&images=${encodeURIComponent(post.images + "")}`;

	const res = await api.post(
		`/annon/posts/create/?Authorization=Token ${apiKey}`,
		body,
		{
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Token ${apiKey}`,
			},
		}
	);
	return res;
};

const likePost = async (apiKey, post_id) => {
	const res = await api.post(
		`/annon/posts/${post_id}/increase-likes/?Authorization=Token ${apiKey}`,
		null,
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

export default {
	getPosts,
	getSchools,
	getUserDetails,
	getNotifications,
	creatPost,
	likePost,
	commentOnPost,
};
