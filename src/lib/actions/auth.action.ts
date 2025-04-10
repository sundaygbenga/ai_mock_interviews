"use server";

import { db, auth } from "@/firebase/admin";
import { auth as clientAuth, db as clientDB } from "@/firebase/client";
import { collection, doc, updateDoc } from "firebase/firestore";
import { cookies } from "next/headers";

// Session duration (1 week)
const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
	const { uid, name, email } = params;

	try {
		// Check if user exists in db
		const userRecord = await db.collection("users").doc(uid).get();
		if (userRecord.exists) {
			return {
				success: false,
				message: "User already exists. Please sign in instead",
			};
		}

		// Save user to db
		await db.collection("users").doc(uid).set({
			name,
			email,
		});

		return {
			success: true,
			message: "Account created successfully. Please sign in.",
		};
	} catch (e: unknown) {
		console.error("Error creating user:", e);

		if (
			e instanceof Error &&
			(e as { code?: string }).code === "auth/email-alreay-in-use"
		) {
			return {
				success: false,
				message: "This email is already in use.",
			};
		}
		return {
			success: false,
			message: "Failed to create an account",
		};
	}
}
export async function signIn(params: SignInParams) {
	const { email, idToken } = params;

	try {
		const userRecord = await auth.getUserByEmail(email);

		if (!userRecord) {
			return {
				success: false,
				message: "User does not exist. Create an account instead",
			};
		}

		await setSessionCookie(idToken);
	} catch (error) {
		console.error("Error creating user:", error);
		return {
			success: false,
			message: "Failed to login to account",
		};
	}
}

export async function setSessionCookie(idToken: string) {
	const cookieStore = await cookies();

	const sessionCookie = await auth.createSessionCookie(idToken, {
		expiresIn: ONE_WEEK * 1000, // 7 days
	});

	cookieStore.set("session", sessionCookie, {
		httpOnly: true,
		maxAge: ONE_WEEK,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		sameSite: "lax",
	});
}

export async function getCurrentUser(): Promise<User | null> {
	const cookieStore = await cookies();
	const sessionCookie = cookieStore.get("session")?.value;
	if (!sessionCookie) return null;

	try {
		const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
		// const { uid } = decodedClaims;
		const userRecord = await db
			.collection("users")
			.doc(decodedClaims?.uid)
			.get();
		if (!userRecord.exists) return null;

		return {
			...userRecord.data(),
			id: userRecord.id,
		} as User;
	} catch (e) {
		console.error("Error getting user:", e);
		return null;
	}
}

export async function isAuthenticated() {
	const user = await getCurrentUser();
	return !!user;
}

// export async function logUserOut() {
// 	try {
// 		return clientAuth.signOut();
// 	} catch (error) {
// 		console.error("Error signing out with Google", error);
// 	}
// }
export async function logUserOut() {
	const cookieStore = await cookies();
	cookieStore.delete("session");
}
// export async function uploadProfileImage() {
// 	const uploadTask = Storage.ref(`images/${image.name}`).put(image);
// 	uploadTask.on("state_changed");
// }
export async function updateProfileImageReference(params: {
	userId: string;
	publicImageUrl: string;
}) {
	const { userId, publicImageUrl } = params;
	console.log("IMAGE URL FROM ACTIONS:", publicImageUrl);
	const userRef = doc(collection(clientDB, "users"), userId);
	if (userRef) {
		await updateDoc(userRef, { photo: publicImageUrl });
	}
}
