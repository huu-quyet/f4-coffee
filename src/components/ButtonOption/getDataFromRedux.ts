import { useSelector } from "react-redux";
import { RootState } from "../../reducer/rootReducer";
import { TypeProductData } from "../../types";

export const findProductById = (productId: string) => {
	const allProducts = useSelector((state: RootState) => state.product.products);
	return allProducts.find((product: TypeProductData) => {
		return product._id === productId;
	});
};
