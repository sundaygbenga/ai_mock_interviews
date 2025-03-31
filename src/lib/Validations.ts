import { z } from "zod";

export const formSchema = z.object({
	username: z.string().min(2).max(50),
});

export const authFormSchema = (type: FormType) => {
	return z.object({
		name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
		email: z.string().min(1).email(),
		password: z.string().min(3),
	});
};
