import { Appbar, Button, Snackbar } from "react-native-paper";
import { View, Text } from "../Components/Themed";
import React, { useContext, useEffect, useState } from "react";
import { brandColor } from "../Shared/Colors";
import Store from "../Shared/Store";
import { AuthContext } from "../Context/authContext";
import Api from "../Shared/Api";
import { ToastAndroid } from "react-native";
import ThreadCardList from "../Components/ThreadCardList";

export default function HomeScreen() {
	const { setApiKey, setUserData, userData, apiKey, fetchGlobalPostList } =
		useContext(AuthContext);

	useEffect(() => {
		fetchGlobalPostList();
	}, []);

	const logout = async () => {
		await Store.logout();
		setApiKey(null);
		setUserData(null);
	};
	return (
		<View style={{ flex: 1 }}>
			<ThreadCardList />
		</View>
	);
}
