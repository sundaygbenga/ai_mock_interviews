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
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel className="label">{label}</FormLabel>
					<FormControl>
						<Input
							className="input"
							placeholder={placeholder}
							{...field}
							type={type}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default FormInput;
