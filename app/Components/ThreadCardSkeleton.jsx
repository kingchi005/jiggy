import React from "react";
import { View } from "react-native";

function ThreadCardSkeleton() {
	return (
		<View style={{ marginBottom: 20 }}>
			<View
				style={{
					marginBottom: 10,
					backgroundColor: "#222",
					width: "10%",
					height: 13,
				}}
			></View>
			<View
				style={{
					marginBottom: 10,
					backgroundColor: "#222",
					width: "50%",
					height: 13,
				}}
			></View>
			<View
				style={{
					marginBottom: 10,
					backgroundColor: "#222",
					width: "90%",
					height: 13,
				}}
			></View>
			<View
				style={{
					marginBottom: 10,
					backgroundColor: "#222",
					width: "80%",
					height: 13,
				}}
			></View>
			<View
				style={{
					marginBottom: 10,
					backgroundColor: "#222",
					width: "40%",
					height: 13,
				}}
			></View>
		</View>
	);
}

export default ThreadCardSkeleton;
