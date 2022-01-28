import React, { Fragment } from "react";
import { ShoppingCartIcon } from "@heroicons/react/solid";

const ButtonAddToCart: React.FC = () => {
	return (
		<Fragment>
			<ShoppingCartIcon className="md:h-6 md:w-6 h-4 w-4 ml-2 cursor-pointer" />
			<span className="text-base mr-2">+</span>
		</Fragment>
	);
};

export default ButtonAddToCart;
