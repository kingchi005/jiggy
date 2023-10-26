import { Text } from "../Components/Themed";

import React, { useContext } from "react";
import { AuthContext } from "../Context/authContext";
import { Avatar } from "react-native-paper";
import { View } from "react-native";

export default function UserDetailsDrawer() {
	const { userData } = useContext(AuthContext);
	return (
		<View>
			<View style={{ alignItems: "center", marginVertical: 10 }}>
				<Text style={{ fontSize: 30 }}>Jiggy</Text>
			</View>
			<View style={{ alignItems: "center", marginTop: 30 }}>
				<Avatar.Image
					size={90}
					source={{ uri: userData?.picture || "https://picsum.photos/750" }}
				/>
				<Text style={{ fontSize: 20, marginVertical: 10 }}>
					{userData && userData?.user?.generated_username}
				</Text>
			</View>
		</View>
	);
}
