import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORE_KEYS = Object.freeze({
	HAS_ONBOARDED: "@hasOnboarded",
	API_AUTH_KEY: "@apiAuthenticationKey",
	USER_DETAILS: "@userDetails",
	USER_PREFERENCE: "@userPreference",
});

// STORE GETTERS
// /**@returns {string} */
const getApiKey = async () => {
	const value = await AsyncStorage.getItem(STORE_KEYS.API_AUTH_KEY);
	return value;
};

/**@returns {string} */
const getOnboarded = async () => {
	const value = await AsyncStorage.getItem(STORE_KEYS.HAS_ONBOARDED);
	return value;
};

/**@returns {import("../../types").TUserDetails} */
const getUserDetails = async () => {
	const value = await AsyncStorage.getItem(STORE_KEYS.USER_DETAILS);
	return value ?? JSON.parse(value);
};

// STORE SETTERS
/**@param {string} value */
const setApiKey = async (value) =>
	await AsyncStorage.setItem(STORE_KEYS.API_AUTH_KEY, value);

/**@param {boolean} value */
const setOnboarded = async (value) =>
	await AsyncStorage.setItem(STORE_KEYS.HAS_ONBOARDED, value);

/**@param {import("../../types").TUserDetails} value */
const setUserDetails = async (value) =>
	await AsyncStorage.setItem(STORE_KEYS.HAS_ONBOARDED, JSON.stringify(value));

// STORE REMOVE ITEM
const logout = async () => {
	await AsyncStorage.removeItem(STORE_KEYS.API_AUTH_KEY);
	await AsyncStorage.removeItem(STORE_KEYS.USER_DETAILS);
};

export const API_HOST_NAME = "https://jiggy-backend.vercel.app";
export default {
	getApiKey,
	getOnboarded,
	setApiKey,
	setOnboarded,
	getUserDetails,
	setUserDetails,
	logout,
};
