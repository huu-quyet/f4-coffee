import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { findProductById } from "./getDataFromRedux";
import { changeSizeProduct, mergeProduct } from "../../action/actionCreator";
import useFormatCart from "../../hook/useFormatCart";
interface Iprops {
	index: number;
	id: string;
	typeInitial: string;
}
type TSize = {
	types: string;
	price: number;
	_id: string;
};
const ButtonOption: FC<Iprops> = ({ index, id, typeInitial }) => {
	const [popupChangeSize, setPopupChangeSize] = useState(false);
	const dispatch = useDispatch();
	const { productInCart } = useFormatCart();
	const product: any = findProductById(id);
	const { size } = product || { size: [] };

	const changeSize = () => {
		setPopupChangeSize(!popupChangeSize);
	};

	const choiseSize = (types: string) => {
		let indexToMerge = -1;
		const checkHasProduct = productInCart.filter((product, indexProduct) => {
			if (
				product.productId === id &&
				product.size.types === types &&
				indexProduct !== index
			) {
				indexToMerge = indexProduct;
				return true;
			}
			return false;
		});
		const price = size.find((item: TSize) => item.types === types).price;

		if (checkHasProduct.length > 0) {
			dispatch(
				mergeProduct(
					{ id: id, sizeProduct: types, price: price },
					index,
					indexToMerge
				)
			);
		} else {
			dispatch(
				changeSizeProduct({ id: id, sizeProduct: types, price: price }, index)
			);
		}
		setPopupChangeSize(false);
	};

	return (
		<div className="relative">
			<button
				className="font-bold px-3 py-3 bg-gray shadow-lg text-secondary uppercase"
				onClick={changeSize}
			>
				{typeInitial}
			</button>
			{popupChangeSize && (
				<div className="absolute top-0 bg-secondary h-full shadow-lg flex rounded-lg ">
					{size.map((type: TSize) => {
						return (
							<button
								key={type._id}
								className="w-8 h-full uppercase font-bold text-white hover:bg-primary hover:text-black"
								onClick={() => choiseSize(type.types)}
							>
								{type.types}
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default React.memo(ButtonOption);
