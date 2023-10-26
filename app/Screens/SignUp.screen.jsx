import { View, Text } from "../Components/Themed";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Pressable, ToastAndroid } from "react-native";
import { authStyles } from "../Components/Themed";

import { regFormDataSchema } from "../Shared/utils/validation";
import {
	ActivityIndicator,
	Button,
	Divider,
	Menu,
	TextInput,
	TouchableRipple,
} from "react-native-paper";
import { brandColor } from "../Shared/Colors";
import { AuthContext } from "../Context/authContext";
import Api from "../Shared/Api";
import { API_HOST_NAME } from "../Shared/Store";

export default function SignUpScreen({ route, navigation }) {
	const [formData, setFormData] = useState({
		// full_name: "",
		email: "",
		password: "",
		ConfirmPassword: "",
		school: "",
	});

	const { snackBarAlert, setSnackBarAlert } = useContext(AuthContext);

	const [securePasswordTextEntry, setSecurePasswordTextEntry] = useState(true);
	const [secureCpasswordTextEntry, setSecureCpasswordTextEntry] =
		useState(true);
	const [selcteVisisblr, setSelcteVisisblr] = useState(false);
	const [schoolsLoading, setSchoolsLoading] = useState(false);
	const [schools, setSchools] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useLayoutEffect(() => {
		getSchools();
	}, []);

	const getSchools = async () => {
		try {
			setSchoolsLoading(true);
			const schls = (await Api.getSchools()).data;
			setSchools(schls);
			console.log("Schools", schls);
		} catch (error) {
			setSnackBarAlert((prev) => ({
				type: "error",
				msg: error?.message,
				show: true,
			}));
		} finally {
			setSchoolsLoading(false);
		}
	};
	const openMenu = () => setSelcteVisisblr(true);

	const closeMenu = () => setSelcteVisisblr(false);

	const handleSignup = async (data) => {
		try {
			const result = await fetch(
				`${API_HOST_NAME}/account/registration/annoyuser/`,
				{
					method: "POST",
					headers: {
						// Authorization: `${apiKey}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);
			const res = await result.json();
			if (res?.error) {
				setSnackBarAlert((prev) => ({
					type: "error",
					msg: res.error,
					show: true,
				}));
			} else if (res?.non_field_errors) {
				setSnackBarAlert((prev) => ({
					type: "error",
					msg: res?.non_field_errors,
					show: true,
				}));
			} else if (res?.generated_username) {
				ToastAndroid.show(
					"Registration Successful. You can now login",
					ToastAndroid.LONG
				);

				navigation.navigate("Sign in");
			}
			console.log("Reg res", res);
		} catch (error) {
			setSnackBarAlert((prev) => ({
				type: "error",
				msg: error.message,
				show: true,
			}));

			console.log("Error", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = () => {
		setIsLoading(true);

		regFormDataSchema
			.validate(formData, { abortEarly: false })
			.then(() => {
				if (formData.ConfirmPassword !== formData.password) {
					setSnackBarAlert((prev) => ({
						type: "error",
						msg: "Passwords don't match",
						show: true,
					}));
					console.log("passwords don't match");
					setIsLoading(false);
				} else {
					const { ConfirmPassword, ...regData } = formData;
					console.log("Data is valid:", regData);
					// register here
					handleSignup(regData);
				}
			})
			.catch((error) => {
				console.log(error.errors.join(", "));
				setSnackBarAlert((prev) => ({
					type: "error",
					msg: error.errors.join(", "),
					show: true,
				}));

				setIsLoading(false);
			});
	};

	const textInputProps = {
		placeholderTextColor: "#666",
		style: { ...authStyles.TextInput },
		mode: "outlined",
		outlineColor: "#333",
		textColor: "#ccc",
	};

	return (
		<View style={authStyles.container}>
			{/* <TextInput
				label="Your Full Nmae"
				placeholder="your name"
				{...(textInputProps)}
				value={formData.full_name}
				onChangeText={(v) => setFormData((prev) => ({ ...prev, full_name: v }))}
			/> */}
			<TextInput
				label="Email/Phone"
				placeholder="Type your email/phone"
				{...textInputProps}
				value={formData.email}
				onChangeText={(v) => setFormData((prev) => ({ ...prev, email: v }))}
			/>
			<TextInput
				secureTextEntry={securePasswordTextEntry}
				label="Password"
				placeholder="Type your password"
				{...textInputProps}
				value={formData.password}
				onChangeText={(v) => setFormData((prev) => ({ ...prev, password: v }))}
				right={
					<TextInput.Icon
						onPress={() => setSecurePasswordTextEntry(!securePasswordTextEntry)}
						icon={securePasswordTextEntry ? "eye" : "eye-off"}
					/>
				}
			/>
			<TextInput
				secureTextEntry={secureCpasswordTextEntry}
				label="Confirm Password"
				placeholder="Retype your password"
				{...textInputProps}
				value={formData.ConfirmPassword}
				onChangeText={(v) =>
					setFormData((prev) => ({ ...prev, ConfirmPassword: v }))
				}
				right={
					<TextInput.Icon
						onPress={() =>
							setSecureCpasswordTextEntry(!secureCpasswordTextEntry)
						}
						icon={secureCpasswordTextEntry ? "eye" : "eye-off"}
					/>
				}
			/>

			<Menu
				style={{}}
				visible={selcteVisisblr}
				onDismiss={closeMenu}
				anchor={
					<Pressable
						onPress={openMenu}
						style={{
							alignItems: "flex-start",
							width: "100%",
							marginTop: 30,
							borderRadius: 5,
							backgroundColor: brandColor.bg,
							borderColor: "#333",

							borderWidth: 1,
						}}
					>
						<Text
							style={{
								color: "#ddd",
								paddingVertical: 15,
								paddingStart: 15,
							}}
						>
							{schools?.find(
								({ school_acronym }) => formData.school == school_acronym
							)?.name || "Select your University"}
						</Text>
					</Pressable>
				}
			>
				{schoolsLoading && schools?.length == 0 && (
					<View style={{ paddingVertical: 10 }}>
						<ActivityIndicator size={"small"} />
					</View>
				)}
				{schools?.map((item, i) => (
					<Menu.Item
						key={i}
						onPress={() => {
							setFormData((prev) => ({
								...prev,
								school: item.school_acronym,
							}));
							closeMenu();
						}}
						title={item.name}
					/>
				))}
			</Menu>

			<TouchableRipple
				style={{
					...authStyles.button,
				}}
				onPress={handleSubmit}
			>
				<Button
					style={{}}
					// mode="contained"
					textColor="#ccc"
					loading={isLoading}
					disabled={isLoading}
				>
					Join Now
				</Button>
			</TouchableRipple>
			<View style={{ marginVertical: 20 }}>
				<Divider bold={true} style={{ marginTop: 15, marginBottom: 8 }} />
				<Text
					style={{
						textAlign: "center",
						marginTop: -18,
						backgroundColor: brandColor.bg,
						paddingHorizontal: 5,
						alignSelf: "center",
						// width: "auto",
					}}
				>
					Or signin with
				</Text>
			</View>
			<View
				style={{
					marginBottom: 10,
					marginTop: 5,
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
						padding: 10,
						marginTop: 10,
					}}
					textColor="#ccc"
				>
					Google
				</Button>
			</View>
			{/* <Button onPress={() => navigation.navigate("Sign in")}>Login here</Button> */}
			<View style={{ alignItems: "center" }}>
				<Text>By Using thispp you agree with the </Text>
				<Text style={authStyles.linkText}>Terms of Service</Text>
			</View>
		</View>
	);
}
