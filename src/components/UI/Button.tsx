import React from "react";

interface IProps {
	type: string;
	text: string;
}

const Button: React.FC<IProps> = (props) => {
	let styled = "";
	switch (props.type) {
		case "MORE":
			styled = "btn text-white bg-red-500";
			break;
		case "ADD":
			styled = "btn text-white bg-secondary";
			break;
		case "DELETE":
			styled = "btn text-white bg-red-500";
			break;
	}
	return <button className={styled}>{props.text}</button>;
};

export default Button;
