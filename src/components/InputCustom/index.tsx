import React, { FC } from "react";
import { ErrorMessage, Field } from "formik";

const InputCustom: FC<any> = (props) => {
	const { label, name, ...rest } = props;

	return (
		<div className="w-full mb-0 box-border">
			<label htmlFor={name} className="w-full">
				{label}
			</label>
			<Field
				id={name}
				name={name}
				{...rest}
				className="w-full box-border border-2 border-slate-200 outline-1 outline-green-500 rounded mt-2 py-1 indent-3"
			/>
			<ErrorMessage name={name}>
				{(msg) => <div className="text-red-600 capitalize text-sm">{msg}</div>}
			</ErrorMessage>
		</div>
	);
};

export default InputCustom;
