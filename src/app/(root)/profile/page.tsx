"use client";
import { FormFileInput } from "@/components/FormFileInput";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { updateProfileImage } from "@/lib/storage";
import { assignLocalError, removeLocalError } from "@/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodIssue } from "zod";

type FormValues = {
	profile_file: File;
};

const Profile = () => {
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [localErrors, setLocalErrors] = useState<ZodIssue[]>([]);

	const { handleSubmit, setValue } = useForm<FormValues>({
		defaultValues: {
			profile_file: undefined,
		},
	});

	// async function handleProfileImage(e: React.ChangeEvent<HTMLInputElement>) {
	// 	const user = await getCurrentUser();
	// 	const userId = user?.id || "";

	// 	const image = e.target.files ? e.target.files[0] : null;
	// 	if (!image) return;

	// 	// const imageUrl = await updateProfileImage({ userId, image });
	// 	await updateProfileImage({ userId, image });
	// }

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files !== null ? e.target.files?.[0] : null;

		if (selectedFile) {
			setFile(selectedFile);
			setValue("profile_file", selectedFile);
			// Generate a preview
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(selectedFile);
		}
		removeLocalError("file", localErrors, setLocalErrors);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (e.dataTransfer.files?.[0]) {
			const droppedFile = e.dataTransfer.files?.[0] || null;
			// e.dataTransfer.files !== null ? e.dataTransfer.files?.[0] : null;
			if (droppedFile) {
				setFile(droppedFile);
				// Generate a preview
				const reader = new FileReader();
				reader.onloadend = () => {
					setPreview(reader.result as string);
				};
				reader.readAsDataURL(droppedFile);
			}
			removeLocalError("file", localErrors, setLocalErrors);
		} else {
			toast.error("Invalid file format!");
		}
	};
	async function handleImageUpload(data: FormValues) {
		console.log("PROFILE 81:", data);
		console.log("PROFILE 81:", data.profile_file);
		console.log("PROFILE 81:", data.profile_file.name);
		const { profile_file } = data;

		const user = await getCurrentUser();
		const userId = user?.id || "";
		try {
			const image = profile_file;
			if (!image) return;

			// const imageUrl = await updateProfileImage({ userId, image });
			await updateProfileImage({ userId, image });
			console.log("UPLOADING IMAGE");
		} catch (error) {
			console.error(error);
			toast.error(`File upload error:${error}`);
		}
	}
	return (
		<div className="mt-[5rem]">
			<form action="submit" onSubmit={handleSubmit(handleImageUpload)}>
				<div className=" flex flex-col gap-10">
					<FormFileInput
						onChange={handleFileChange}
						onDrop={handleDrop}
						file={file}
						preview={preview}
						localError={assignLocalError("file", localErrors)}
					/>
					<Button
						className="btn-primary disabled:cursor-not-allowed place-self-center md:place-self-end w-40 h-12 text-lg"
						disabled={!file}
					>
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Profile;
