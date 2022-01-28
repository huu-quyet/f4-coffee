import { Field } from "formik";
import React, { FC } from "react";

const TextArea: FC<any> = (props) => {
	const { label, name, ...rest } = props;
	return (
		<div className="w-full">
			<label
				htmlFor={name}
				className="text-md md:text-xl font-bold uppercase text-blue-600"
			>
				{label}
			</label>
			<Field
				as="textarea"
				id={name}
				name={name}
				className="w-full box-border  border-2 border-slate-200   outline-1 outline-green-500 rounded mt-2 py-1 indent-3"
				{...rest}
			/>
		</div>
	);
};

export default TextArea;
