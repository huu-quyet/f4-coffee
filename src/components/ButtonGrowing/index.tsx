import React from "react";
import styles from "./index.module.css";
import { NewspaperIcon } from "@heroicons/react/solid";
function ButtonGrowing() {
	return (
		<div className={styles.btnContainer}>
			<a href="#" className={styles.btn}>
				<NewspaperIcon className="h-5 w-5" />
			</a>
		</div>
	);
}

export default ButtonGrowing;
