import React from "react";
import ReactLoading from "react-loading";

const Loading: React.FC = () => {
	return (
		<div className="text-slate-900 pt-64 fixed z-[100] w-screen h-screen bg-white/50">
			<h3 className="mb-8 text-2xl font-semibold text-center">Loading...</h3>
			<ReactLoading
				className="absolute top-1/2 left-1/2 translate-x-[-50%]"
				type="spinningBubbles"
				color="#000"
			/>
		</div>
	);
};

export default Loading;
