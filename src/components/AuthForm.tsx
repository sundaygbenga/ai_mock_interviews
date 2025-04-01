"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { authFormSchema } from "@/lib/Validations";
import { toast } from "sonner";
import FormInput from "./FormInput";
import { useRouter } from "next/navigation";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";
import Spinner from "./Spinner";

const AuthForm = ({ type }: { type: FormType }) => {
	const router = useRouter();
	const formSchema = authFormSchema(type);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = form;

	async function onSubmit(data: z.infer<typeof formSchema>) {
		try {
			if (type === "sign-up") {
				const { name, email, password } = data;

				const userCredentials = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);

				const result = await signUp({
					uid: userCredentials.user.uid,
					name: name!,
					email,
					password,
				});

				if (!result?.success) {
					toast.error(result?.message);
					return;
				}

				toast.success("Account created successfully. Please sign in");
				router.push("/sign-in");
			} else {
				const { email, password } = data;
				const userCredentials = await signInWithEmailAndPassword(
					auth,
					email,
					password
				);

				const idToken = await userCredentials.user.getIdToken();

				if (!idToken) {
					toast.error("Sign in failed. Please try again.");
					return;
				}

				await signIn({ email, idToken });
				toast.success("Sign in successfully.");
				router.push("/");
			}
		} catch (e: any) {
			console.error(e.code);
			toast.error(`Something went wrong: ${e.message}`);
		}
	}

	const isSignIn = type === "sign-in";
	return (
		<div className="card-border lg:min[35.375rem]">
			<div className="flex flex-col gap-6 card py-14 px-10">
				<div className="flex gap-2 justify-center">
					<Image src="/logo.svg" alt="Logo" width={38} height={32} />
					<h2 className="text-primary-100">PrePpy</h2>
				</div>

				<h3>Practice job interview with AI</h3>

				<Form {...form}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="w-full space-y-6 mt-4 form"
					>
						{!isSignIn && (
							<FormInput
								control={control}
								name="name"
								label="Name"
								placeholder="Your Name"
							/>
						)}
						<FormInput
							control={control}
							name="email"
							label="Email"
							placeholder="Your email address"
							type="email"
						/>
						<FormInput
							control={control}
							name="password"
							label="Password"
							placeholder="Enter your password"
							type="password"
						/>
						<Button className="btn" type="submit">
							{isSubmitting ? (
								<Spinner />
							) : (
								<span>{isSignIn ? "Sign in" : "Create an Account"}</span>
							)}
						</Button>
					</form>
				</Form>

				<p className="text-center">
					{isSignIn ? "Don't have an account?" : "Already have an account?"}
					<Link
						href={isSignIn ? "/sign-up" : "/sign-in"}
						className="font-bold text-user-primary ml-1"
					>
						{isSignIn ? "Sign up" : "Sign in"}
					</Link>
				</p>
			</div>
		</div>
	);
};

export default AuthForm;
