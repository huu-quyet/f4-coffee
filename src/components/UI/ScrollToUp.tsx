import { ArrowUpIcon } from "@heroicons/react/solid";
import React, { Fragment, useEffect, useState } from "react";

const ScrollToUp = () => {
	const [isScroll, setIsScroll] = useState(false);
	const onScroll = () => {
		if (window.scrollY > 100) {
			setIsScroll(true);
		} else {
			setIsScroll(false);
		}
	};

	const onToTop = () => {
		window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
	};

	useEffect(() => {
		window.addEventListener("scroll", onScroll);

		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, []);
	return (
		<Fragment>
			{isScroll && (
				<div
					onClick={onToTop}
					className="h-[60px] w-[60px] bg-secondary text-white rounded-full fixed bottom-24 right-6 cursor-pointer shadow-lg z-50"
				>
					<ArrowUpIcon className="h-6 w-6 relative top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" />
				</div>
			)}
		</Fragment>
	);
};

export default ScrollToUp;
