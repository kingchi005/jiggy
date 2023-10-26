import {
	Text as DefaultText,
	useColorScheme,
	View as DefaultView,
} from "react-native";

export type ThemeProps = {
	lightColor?: string;
	darkColor?: string;
};
export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export type TUseTheme = (
	props: { light?: string; dark?: string },
	colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) => any;

interface TPost {
	id: number;
	user: TUser;
	content: string;
	images?: any;
	post_type: string;
	created_at: string;
	views: number;
	likes: TUserDetails[];
	shared: any[];
	comments: TComment[];
}

interface TComment {
	id: number;
	user: User2;
	content: string;
	created_at: string;
}

interface User2 {
	id: number;
	password: string;
	last_login: string;
	email: string;
	generated_username: string;
	is_staff: boolean;
	is_superuser: boolean;
	is_active: boolean;
	school: TSchool;
	groups: any[];
	user_permissions: any[];
}

interface TSchool {
	id: number;
	name: string;
	school_acronym: string;
}

interface TUser {
	id: number;
	picture?: any;
	generated_username: string;
	school: TSchool;
}

interface TUserDetails {
	id: number;
	user: TUser;
	Level?: any;
	picture?: any;
}

type tSBA = {
	type: string;
	show: boolean;
	msg: string;
};

type TAuthContext = {
	userData: TUserDetails;
	errMsg: string;
	snackBarVisible: boolean;
	apiKey: string;
	snackBarAlert: tSBA;
	globalPostList: TPost[];
	internetReachable: boolean;
	fetchGlobalPostList: () => void;
	setGlobalPostList: React.Dispatch<React.SetStateAction<TPost[]>>;
	setSnackBarAlert: React.Dispatch<React.SetStateAction<tSBA>>;
	setApiKey: React.Dispatch<React.SetStateAction<string>>;
	setSnackBarVisible: React.Dispatch<React.SetStateAction<boolean>>;
	setErrMsg: React.Dispatch<React.SetStateAction<string>>;
	setUserData: React.Dispatch<React.SetStateAction<TUserDetails>>;
};

interface TNotification {
	title: string;
	message: string;
	createdAt: string;
}
