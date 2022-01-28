import React from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import styles from "./status.module.css";
import { FC } from "react";
interface Iprops {
	isCompleted?: boolean;
}
const StatusStep: FC<Iprops> = ({ isCompleted }) => {
	return (
		<div className={styles.wFull}>
			<div className={styles.relative}>
				<hr
					className={`${styles.horizontal} ${isCompleted && "border-green-700"}`}
				/>
				<CheckCircleIcon
					className={`${styles.checkIcon} bg-white ${
						isCompleted && "text-green-700"
					} h-5 w-5 md:h-7 md:w-7`}
				/>
			</div>
		</div>
	);
};

export default StatusStep;
