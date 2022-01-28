import React from "react";

type TPropsError = {
	message: string;
};

const Error: React.FC<TPropsError> = (props) => {
	return (
		<div className="pt-40 text-xl text-red-500 relative">
			<span className="absolute left-1/2 translate-x-[-50%]">
				Error: {props.message}
			</span>
		</div>
	);
};

export default Error;
