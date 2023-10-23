import * as z from "yup";

export const loginFormDataSchema = z.object().shape({
	email: z.string().email().required(),
	password: z.string().required(),
});

export const regFormDataSchema = z.object().shape({
	email: z.string().email().required(),
	password: z.string().required(),
	school: z.string().required(),
});

export const createPostSchema = z.object().shape({
	content: z.string().email().required(),
	post_type: z.string().required(),
	images: z.string(),
});

/* 
export type TLoginFormDataSchema = z.InferType<typeof loginFormDataSchema>;
export type TRegFormDataSchema = z.InferType<typeof regFormDataSchema>;
export type TCreatePostSchema = z.InferType<typeof createPostSchema>;
*/
