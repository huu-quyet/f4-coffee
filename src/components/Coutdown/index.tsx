import React, { FC, useState, useEffect } from "react";
interface IPropCoutDown {
	initialMinute: number;
	initialSeconds: number;
	setIslogin: (isLogin: boolean) => void;
}
const Coutdown: FC<IPropCoutDown> = ({
	initialMinute = 0,
	initialSeconds = 0,
	setIslogin,
}) => {
	const [minutes, setMinutes] = useState(initialMinute);
	const [seconds, setSeconds] = useState(initialSeconds);
	useEffect(() => {
		const myInterval = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			}
			if (seconds === 0) {
				if (minutes === 0) {
					setIslogin(true);
					clearInterval(myInterval);
				} else {
					setMinutes(minutes - 1);
					setSeconds(59);
				}
			}
		}, 1000);
		return () => {
			clearInterval(myInterval);
		};
	});

	return (
		<div>
			{minutes === 0 && seconds === 0 ? (
				"Login Now"
			) : (
				<h1>
					{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
				</h1>
			)}
		</div>
	);
};

export default Coutdown;
