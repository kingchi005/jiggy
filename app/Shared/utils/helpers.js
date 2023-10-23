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
