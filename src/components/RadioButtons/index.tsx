import { Field } from "formik";
import React, { FC } from "react";

const RadioButtons: FC<any> = (props) => {
	const { label, name, options, className, ...rest } = props;
	return (
		<div className={className}>
			<label className="text-xl font-bold uppercase text-orange-600">
				{label}
			</label>
			<br />
			<Field name={name} {...rest}>
				{({ field }: any) => {
					return options.map((option: any) => {
						return (
							<React.Fragment key={option.key}>
								<input
									className="mr-1"
									type="radio"
									id={option.value}
									{...field}
									value={option.value}
									checked={field.value === option.value}
								/>
								<label className="mr-3 capitalize" htmlFor={option.value}>
									{option.key}
								</label>
							</React.Fragment>
						);
					});
				}}
			</Field>
		</div>
	);
};

export default RadioButtons;
