import React, { useEffect, useState } from "react";

const Sale = () => {
	const [textColor, setTextColor] = useState("text-white bg-red-500");

	useEffect(() => {
		const setTimer = setInterval(() => {
			if (textColor === "text-white bg-red-500") {
				setTextColor("text-red-500 bg-amber-300");
			} else {
				setTextColor("text-white bg-red-500");
			}
		}, 2000);

		return () => {
			clearInterval(setTimer);
		};
	});

	return (
		<div
			className={`absolute top-0 left-0 text-base 2xl:text-xl font-bold px-2 rounded-tl-xl rounded-br-xl ${textColor}`}
		>
			Hot
		</div>
	);
};

export default Sale;
