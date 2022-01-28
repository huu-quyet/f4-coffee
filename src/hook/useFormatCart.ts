import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducer/rootReducer";
import {
	findCartInitial,
	findtotalCost,
	Product,
} from "../page/CustomerPage/Cart/Cart";

function useFormatCart() {
	const cart: any = useSelector((state: RootState) => state.cart);
	const productInCart: Product[] = findCartInitial(cart);

	const totalCost: string = useMemo(
		() => findtotalCost([...productInCart]),
		[productInCart]
	);

	return { productInCart, totalCost };
}

export default useFormatCart;
