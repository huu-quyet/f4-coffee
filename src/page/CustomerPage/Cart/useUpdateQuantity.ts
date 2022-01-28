import { useDispatch } from "react-redux";
import { verifyQuantity } from "../../../action/actionCreator";

const useUpdateQuantity = () => {
	const dispatch = useDispatch();
	const updateQuantity = (mount: number, index: number) => {
		dispatch(verifyQuantity(mount, index));
	};

	return { updateQuantity };
};

export default useUpdateQuantity;
