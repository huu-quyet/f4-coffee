import React from "react";
import { useHistory } from "react-router-dom";
import { TProductCartReducer } from "../../../types";

const PreViewCart: React.FC = () => {
	const history = useHistory();
	const cart: any = sessionStorage.getItem("cart");
	const productInCart = JSON.parse(cart);

	if (productInCart.products.length === 0)
		return (
			<div className="show--cart p-4 text-tiny md:text-base hidden">
				Không có sản phẩm nào trong giỏ hàng của bạn.
			</div>
		);

	const checkoutHandle = () => {
		history.push("/cart");
	};

	return (
		<div className="show--cart px-2 z-50 p-4 text-tiny md:text-base">
			{productInCart.products.map(
				(product: TProductCartReducer, index: number) => {
					return (
						<div
							key={index}
							className="flex items-center justify-evenly text-tiny pb-2 mt-4 border-b"
						>
							<p className="mr-4">STT: {index + 1}</p>
							<p className="w-1/3">{product.title}</p>
							<img src={product.img} alt={product.title} className="w-12 h-12 mr-4" />
							<p className="mr-4">Size: {product.type?.toUpperCase()}</p>
							<p>Số lượng: {product.quantity}</p>
						</div>
					);
				}
			)}

			<button
				onClick={checkoutHandle}
				className="bg-secondary w-2/3 p-2 capitalize text-white font-bold mt-6 rounded-sm relative left-1/2 translate-x-[-50%]"
			>
				thanh toán
			</button>
		</div>
	);
};

export default PreViewCart;
