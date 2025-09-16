import { forwardRef } from "react";

const Input = ({ errors, ...props }, ref) => {
	return (
		<input
			ref={ref}
			{...props}
			className={`w-full px-4 py-2 bg-gray-800 text-white rounded-md placeholder-gray-500 focus:outline-none focus:ring-1 transition ${
				errors ? "border border-red-500 focus:ring-red-500" : "focus:ring-indigo-500"
			}`}
		/>
	);
};

Input.displayName = "Input";

export default forwardRef(Input);
