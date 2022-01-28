import React, { FC, useState } from "react";

interface ICartItemVerify {
	mount: number;
	updateProductQuantity: (mount: number) => void;
}

const VerifyQuantity: FC<ICartItemVerify> = ({
	mount,
	updateProductQuantity,
}) => {
	const handleDecrease = () => {
		mount > 1 && updateProductQuantity(mount - 1);
	};
	const handleIncrease = () => {
		mount < 99 && updateProductQuantity(mount + 1);
	};
	return (
		<div className="flex items-center justify-between w-24 h-10 mx-auto">
			<button
				className={`font-semibold h-full outline-none w-5 bg-transparent ${
					mount > 1 ? "text-orange-500" : "text-gray"
				} font-bold text-xl shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200`}
				onClick={handleDecrease}
			>
				&lt;
			</button>
			<div className="h-full w-10 text-secondary font-semibold text-xl px-auto mx-2 flex flex-col justify-center text-center">
				{mount}
			</div>
			<button
				className={`font-semibold h-full outline-none w-5 bg-transparent ${
					mount < 99 ? "text-orange-500" : "text-gray"
				} font-bold text-xl shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200`}
				onClick={handleIncrease}
			>
				&gt;
			</button>
		</div>
	);
};

export default VerifyQuantity;
