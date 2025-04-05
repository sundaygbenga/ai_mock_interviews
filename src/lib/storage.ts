import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfileImageReference } from "./actions/auth.action";
import { storage } from "@/firebase/client";
import { db } from "@/firebase/admin";

export async function updateProfileImage(params: ProfileUploadParams) {
	const { userId, image } = params;

	try {
		if (!userId) throw new Error("No user ID has been proided.");
		if (!image || !image.name)
			throw new Error("A valid image has not been provided");

		const publicImageUrl = await uploadImage(userId, image);
		await updateProfileImageReference({ userId, publicImageUrl });
		return publicImageUrl;
	} catch (error) {
		console.error("Error processing request:", error);
	}
}

async function uploadImage(userId: string, image: File) {
	const filePath = `image/${userId}/${image.name}`;
	const newImageRef = ref(storage, filePath);
	await uploadBytesResumable(newImageRef, image);
	return await getDownloadURL(newImageRef);
}
