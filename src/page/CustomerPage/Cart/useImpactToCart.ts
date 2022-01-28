import { useDispatch } from "react-redux";
import { deleteProductInCart } from "../../../action/actionCreator";

const useImpactToCart = () => {
	const dispatch = useDispatch();
	const removeProduct = (productId: string, index: number) => {
		dispatch(deleteProductInCart(productId, index));
	};
	return { removeProduct };
};

export default useImpactToCart;
