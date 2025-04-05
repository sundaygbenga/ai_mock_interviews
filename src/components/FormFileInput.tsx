import Image from "next/image";
import { useRef } from "react";
import Spinner from "./Spinner";
import { HiPencilSquare } from "react-icons/hi2";
import { cn } from "@/lib/utils";

export const FormFileInput = ({
	onChange,
	onDrop,
	file,
	preview,
	localError,
	label,
	loading,
}: {
	onChange: React.ChangeEventHandler<HTMLDivElement> | undefined;
	onDrop: React.DragEventHandler<HTMLDivElement> | undefined;
	file: {
		name: string;
		size: number;
		type: string;
	} | null;
	localError?: string | null;
	label?: string;
	preview: string | null;
	loading?: boolean;
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const previewMessage = "Profile picture preview tiles.";

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleLabelClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<div className={`flex flex-col `}>
			<label
				className={`hidden text-[0.875rem] md:text-[0.875rem] text-white font-[600]`}
			>
				{label ? label : "File"}
			</label>
			<div
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={onDrop}
				className={` border-[#C6CCD2]  blue-gradient-dark
				relative text-[16px] text-[#808080] font-[600] border-[1px] h-[230px] w-full flex flex-col md:flex-row  gap-3 justify-center items-center rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]  `}
			>
				<div
					className={` flex flex-col w-full gap-3 justify-center items-center rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]  `}
				>
					{file ? (
						<div className="relative h-40 w-40 rounded-full place-self-center-">
							<Image
								src={preview || "/upload.svg"}
								alt="Upload profile"
								className="object-fill rounded-full"
								fill
							/>
						</div>
					) : (
						<Image
							src="/upload.svg"
							alt="Upload profile"
							height={48}
							width={52}
							className="object-contain"
						/>
					)}

					{file !== null && file?.name !== undefined ? (
						<div className="flex flex-col items-center">
							{/* <label htmlFor="userImage" className="cursor-pointer">
								{file?.name}
							</label> */}
							<label
								onClick={handleLabelClick}
								className="text-primary cursor-pointer"
							>
								{loading ? (
									<Spinner />
								) : (
									<span>
										{file ? (
											<span className="flex gap-1 items-center">
												{"Change"}
												<HiPencilSquare size={22} />{" "}
											</span>
										) : (
											" Browse image"
										)}
									</span>
								)}
							</label>
						</div>
					) : (
						<div className="flex flex-col items-center">
							<p>Drag image here</p>
							<p>Or</p>
							<label
								onClick={handleLabelClick}
								className="text-primary cursor-pointer"
							>
								{loading ? (
									<Spinner />
								) : (
									`${file ? "Change image" : " Browse image"}`
								)}
							</label>
						</div>
					)}
					<input
						type="file"
						accept=".jpg,.jpeg,.png"
						className=" opacity-0 absolute"
						onChange={onChange}
						ref={fileInputRef}
					/>
				</div>
				<div className="flex flex-col gap-5 w-full max-md:hidden px-2">
					<div className="flex gap-1 items-center justify-center w-full">
						<div className="relative h-32 w-32 rounded-full place-self-center-">
							<Image
								src={preview || "/upload.svg"}
								alt="Upload profile"
								className="object-fill rounded-full"
								fill
							/>
						</div>
						<div className="relative h-24 w-24 rounded-full place-self-center-">
							<Image
								src={preview || "/upload.svg"}
								alt="Upload profile"
								className="object-fill rounded-full"
								fill
							/>
						</div>
						<div className="relative h-16 w-16 rounded-full place-self-center-">
							<Image
								src={preview || "/upload.svg"}
								alt="Upload profile"
								className="object-fill rounded-full"
								fill
							/>
						</div>
						<div className="relative h-10 w-10 rounded-full place-self-center-">
							<Image
								src={preview || "/upload.svg"}
								alt="Upload profile"
								className="object-fill rounded-full"
								fill
							/>
						</div>
					</div>
					{/* <div className="transcript-border-">
						<div className="transcript">
							<p
								key={previewMessage}
								className={cn(
									"transition-opacity duration-500 opacity-0",
									"animate-fadeIn opacity-100"
								)}
							>
								{previewMessage}
							</p>
						</div>
					</div> */}
					<div className="flex items-center justify-center">
						<p
							key={previewMessage}
							className={cn(
								"transition-opacity duration-500 opacity-0",
								"animate-fadeIn opacity-100"
							)}
						>
							{previewMessage}
						</p>
					</div>
				</div>
			</div>
			{localError && (
				<p className=" text-red text-[0.75rem] mt-[8px]">{localError}</p>
			)}
		</div>
	);
};
