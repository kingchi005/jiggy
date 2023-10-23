import { View, Text } from "../Components/Themed";
import React, { useContext, useState, useEffect } from "react";
import {
	Button,
	Divider,
	TextInput,
	TouchableRipple,
} from "react-native-paper";
import { authStyles } from "../Components/Themed";
import { loginFormDataSchema } from "../Shared/utils/validation";
import { brandColor } from "../Shared/Colors";
import Store, { API_HOST_NAME } from "../Shared/Store";
import Api from "../Shared/Api";
import { AuthContext } from "../Context/authContext";

const placeholholerTextColor = "#666";
export default function LoginScreen({ route, navigation }) {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [secureTextEntry, setSecureTextEntry] = useState(true);
	const [response, setResponse] = useState(null);

	const { setUserData, setApiKey, setSnackBarAlert } = useContext(AuthContext);

	const handleLogin = async () => {
		try {
			const result = await fetch(`${API_HOST_NAME}/account/rest-auth/login/`, {
				method: "POST",
				headers: {
					// Authorization: `${}`,
					"Content-Type": "application/x-www-form-urlencoded",
				},
				credentials: "include",
				body: `email=${encodeURIComponent(
					formData.email
				)}&password=${encodeURIComponent(formData.password)}`,
				redirect: "follow",
			});
			const res = await result.json();
			setResponse(res);
		} catch (error) {
			setSnackBarAlert((prev) => ({
				show: true,
				type: "error",
				msg: error.message,
			}));

			console.log("Error", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (response?.key) {
			Store.setApiKey(response.key);
			setApiKey(response?.key);
			getUserData();
		} else if (response?.non_field_errors) {
			setSnackBarAlert((prev) => ({
				show: true,
				type: "error",
				msg: response?.non_field_errors,
			}));
		} else if (response?.error) {
			setSnackBarAlert((prev) => ({
				show: true,
				type: "error",
				msg: response?.error,
			}));
		}
	}, [response]);

	const getUserData = async () => {
		try {
			const result = await fetch(
				`${API_HOST_NAME}/account/annonyuser/?Authorization=${response?.key}`,
				{
					method: "GET",
					headers: {
						Authorization: `Token ${response?.key}`,
					},
				}
			);
			/**@type {import("../../types").TUserDetails} */
			const user = await result.json();
			if (user?.id) {
				setUserData(user);
				await Store.setUserDetails(user);
			}
			console.log("user details", user);
		} catch (error) {
			setSnackBarAlert((prev) => ({
				show: true,
				type: "error",
				msg: error.message,
			}));

			console.log("Error", error);
		}
	};

	const handleSubmit = () => {
		setIsLoading(true);
		loginFormDataSchema
			.validate(formData, { abortEarly: false })
			.then((validatedData) => {
				console.log("Data is valid:", validatedData);
				handleLogin();
			})
			.catch((error) => {
				console.log(error.errors.join(", "));
				setSnackBarAlert((prev) => ({
					show: true,
					type: "error",
					msg: error.errors.join(", "),
				}));

				setIsLoading(false);
			});
	};
	const textInputProps = {
		placeholderTextColor: placeholholerTextColor,
		style: { ...authStyles.TextInput },
		mode: "outlined",
		outlineColor: "#333",
		textColor: "#ccc",
	};
	return (
		<View style={authStyles.container}>
			<TextInput
				label="Email/Phone"
				placeholder="Type your email/phone"
				value={formData.email}
				onChangeText={(v) => setFormData((prev) => ({ ...prev, email: v }))}
				{...textInputProps}
			/>

			<TextInput
				label="Password"
				placeholder="Type your password"
				secureTextEntry={secureTextEntry}
				value={formData.password}
				onChangeText={(v) => setFormData((prev) => ({ ...prev, password: v }))}
				right={
					<TextInput.Icon
						onPress={() => setSecureTextEntry(!secureTextEntry)}
						icon={secureTextEntry ? "eye" : "eye-off"}
					/>
				}
				{...textInputProps}
			/>
			<TouchableRipple>
				<Button
					style={{ ...authStyles.button, marginBottom: 10 }}
					onPress={handleSubmit}
					mode="contained"
					textColor="#ccc"
					loading={isLoading}
					disabled={isLoading}
				>
					Login
				</Button>
			</TouchableRipple>
			<Text style={{ textAlign: "right", marginBottom: 30 }}>
				Forget Password?
			</Text>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Divider bold={true} style={{ marginTop: 20, marginBottom: 8 }} />
				<Text>Or signin with</Text>
				<Divider bold={true} style={{ marginTop: 20, marginBottom: 8 }} />
			</View>
			<View
				style={{
					paddingVertical: 10,
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					gap: 10,
				}}
			>
				<Button
					mode="outlined"
					icon="google"
					style={{
						backgroundColor: brandColor.bg,
						borderRadius: 5,
						flex: 1,
					}}
					textColor="#ccc"
				>
					Google
				</Button>
				<Button
					mode="outlined"
					icon="microsoft"
					style={{
						backgroundColor: brandColor.bg,
						borderRadius: 5,
						flex: 1,
					}}
					textColor="#ccc"
				>
					Microsoft
				</Button>
			</View>
			<View
				style={{
					alignItems: "center",
					flexDirection: "row",
					justifyContent: "center",
					marginVertical: 20,
				}}
			>
				<Text>Don't have an Account? </Text>
				<Button
					textColor="white"
					onPress={() => {
						navigation.navigate("SIgn up");
					}}
				>
					Sign up
				</Button>
				{/* <Link >
					<Text style={{ fontWeight: "bold", ...authStyles.linkText }}>
						Sign up
					</Text>
				</Link> */}
			</View>
			<View style={{ alignItems: "center", marginTop: 10 }}>
				<Text>By Using this app you agree with the </Text>
				<Text style={authStyles.linkText}>Terms of Service</Text>
			</View>
		</View>
	);
}
