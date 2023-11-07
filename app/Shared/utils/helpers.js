import { formatDistanceToNow } from "date-fns";

/** @param {string} date */
export const formatDate = (date) => {
	const distance = formatDistanceToNow(new Date(date), { addSuffix: false });

	if (distance === "just now") {
		return "Just now";
	} else if (distance.includes("seconds")) {
		return distance;
	} else if (distance.includes("minutes")) {
		const minutes = parseInt(distance.split(" ")[0]);
		return `${minutes} minutes ago`;
	} else if (distance.includes("days")) {
		const days = parseInt(distance.split(" ")[0]);
		return `${days} days ago`;
	} else {
		return distance;
	}
};

/** @param {string} date */
export const _formaDate = (date) => {
	const now = new Date();
	const diffInMs = now.getTime() - new Date(date).getTime();

	const diffInSecs = Math.floor(diffInMs / 1000);
	const diffInMins = Math.floor(diffInSecs / 60);
	const diffInHrs = Math.floor(diffInMins / 60);
	const diffInDays = Math.floor(diffInHrs / 24);

	if (diffInSecs < 4) {
		return "just now";
	} else if (diffInSecs < 60) {
		return diffInSecs + " secs";
	} else if (diffInMins < 60) {
		return diffInMins + " min";
	} else if (diffInHrs < 24) {
		return diffInHrs + " hrs";
	} else if (diffInDays === 1) {
		return "yesterday";
	} else if (diffInDays < 6) {
		return diffInDays + " days";
	} else {
		return new Date(date).toLocaleDateString();
	}
};

/**
 *
 * @param {number} views
 * @returns {string}
 */
export function formatViews(views) {
	if (views < 1000) {
		return views.toString(); // Return the original number if it's less than 1000
	} else if (views < 10000) {
		const thousands = Math.floor(views / 1000);
		const remainder = Math.floor((views % 1000) / 100);
		const decimal = remainder > 0 ? `.${remainder}` : "";
		return `${thousands}${decimal}k`;
	} else {
		const thousands = Math.floor(views / 1000);
		return `${thousands}k`;
	}
}
