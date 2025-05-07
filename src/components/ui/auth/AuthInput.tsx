import { ErrorMessage, Field } from 'formik';

interface ICustomInputProps {
	name: string;
	label?: string;
	type: 'email' | 'password' | 'text';
	placeholder?: string;
	error?: boolean;
	touched?: boolean;
};

export default function AuthInput({
	name,
	label,
	type,
	placeholder,
	error,
	touched,
	...props
}: ICustomInputProps) {
	return (
		<div className="flex  flex-col gap-0.5 items-start relative font-mono w-full min-h-14 autofill:font-mono my-2">
			<label
				className="block text-sm font-medium text-gray-700"
				htmlFor={name}
			>
				{label}
			</label>
			<Field
				className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#34495e] focus:border-[#34495e] data-[error=true]:border-red-500"
				type={type}
				id={name}
				name={name}
				placeholder={placeholder || ''}
				data-error={error && touched}
				{...props}
			/>
			<div className="h-3">
				<ErrorMessage
					className="text-red-500 text-xs pt-0.5"
					name={name}
					component="p"
				/>
			</div>
		</div>
	);
}
