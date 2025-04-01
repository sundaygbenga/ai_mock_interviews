"use client";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { useState } from "react";
import ViewPassword from "./ViewPassword";

interface FormFieldProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	label: string;
	placeholder?: string;
	type?: "text" | "email" | "password" | "file";
}

const FormInput = <T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	type = "text",
}: FormFieldProps<T>) => {
	const [open, setOpen] = useState(false);

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="relative">
					<FormLabel className="label">{label}</FormLabel>
					<FormControl>
						<Input
							className="input"
							placeholder={placeholder}
							{...field}
							type={type === "password" && open ? "text" : type}
						/>
					</FormControl>
					<FormMessage />
					{type === "password" && (
						<ViewPassword
							open={open}
							setOpen={setOpen}
							styles={"absolute right-3 top-3/5 -translate-y-1/2"}
						/>
					)}
				</FormItem>
			)}
		/>
	);
};

export default FormInput;
