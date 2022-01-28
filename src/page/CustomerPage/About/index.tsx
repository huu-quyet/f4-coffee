import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import img from "../../../assets/images/page_not_found.png";

const About: React.FC = () => {
	const history = useHistory();
	const handleBackToHomePage = () => {
		history.push("/home");
	};

	useEffect(() => {
		window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
	});

	return (
		<section className="pt-20">
			<div className="mt-40 lg:mt-20 h-screen">
				<div className="relative w-full">
					<img src={img} className="relative left-1/2 translate-x-[-50%]" />
				</div>
				<button
					onClick={handleBackToHomePage}
					className="uppercase bg-red-700 text-white py-8 px-16 relative left-1/2 translate-x-[-50%] my-12 font-bold text-2xl"
				>
					Quay lại trang chủ
				</button>
			</div>
		</section>
	);
};

export default About;
