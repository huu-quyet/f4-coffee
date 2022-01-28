import React from "react";

const OutStock: React.FC = () => {
	return (
		<div className="fixed z-50 top-0 w-full h-full rounded-xl bg-white opacity-70">
			<p className="absolute text-center w-full top-1/2 font-bold text-base md:text-xl lg:text-base xl:text-xl">
				Hết hàng
			</p>
		</div>
	);
};

export default OutStock;
