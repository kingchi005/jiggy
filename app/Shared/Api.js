// showLastCommitMessageForThisLibrary.js
import { create } from "apisauce";
import Store from "./Store";

// define the api
const apiKey = Store.getApiKey();

const api = create({
	baseURL: "https://jiggy-backend.vercel.app",
	Authorization: `Token ${apiKey}`,
});

// start making calls

// GET REQUESTS
const getSchools = async () =>
	await api.get("/account/registration/annoyuser/");

const getPosts = async () => await api.get("/annon/posts/");

const getUserDetails = async () => {
	const res = await api.get(`/account/annonyuser/?Authorization=${apiKey}`);
	return res;
};
// POST REQUESTS

export default {
	getPosts,
	getSchools,
	getUserDetails,
};
