import { useState, useEffect, ChangeEvent, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reducer/rootReducer";
import {
	TypeOrderData,
	TypeProductData,
	EnumStatusValues,
} from "../../../../types";

const getOrdersByStatus = (
	allOrders: TypeOrderData[],
	status: EnumStatusValues
) => [
	...allOrders
		.filter((orderData: TypeOrderData) => orderData.status === status)
		.reverse(),
];

const getAllProcessingOrders = (allOrders: TypeOrderData[]) => [
	...allOrders
		.filter(
			(orderData: TypeOrderData) =>
				orderData.status !== EnumStatusValues.CANCELED &&
				orderData.status !== EnumStatusValues.COMPLETED
		)
		.reverse(),
];

export const useOrderList = () => {

	const [statusOnView, setStatusOnView] = useState("all");
	const [searchKey, setSearchKey] = useState("");
	const allOrderData: TypeOrderData[] = useSelector(
		(state: RootState) => state.orderHistory.allOrderHistory
	);
	const productsList: TypeProductData[] = useSelector(
		(state: RootState) => state.product.products
	);

	const [allProcessingOrders, setAllProcessingOrders] = useState<
		TypeOrderData[]
	>(() => getAllProcessingOrders(allOrderData));
	const [pendingOrders, setPendingOrders] = useState<TypeOrderData[]>(() =>
		getOrdersByStatus(allOrderData, EnumStatusValues.PENDING)
	);
	const [paidOrders, setPaidOrders] = useState<TypeOrderData[]>(() =>
		getOrdersByStatus(allOrderData, EnumStatusValues.PAID)
	);
	const [shippingOrders, setShippingOrders] = useState<TypeOrderData[]>(() =>
		getOrdersByStatus(allOrderData, EnumStatusValues.SHIPPING)
	);
	const [deliveredOrders, setDeliveredOrders] = useState<TypeOrderData[]>(() =>
		getOrdersByStatus(allOrderData, EnumStatusValues.DELIVERED)
	);

	useEffect(() => {
		setAllProcessingOrders(() => getAllProcessingOrders(allOrderData));
		setPendingOrders(() =>
			getOrdersByStatus(allOrderData, EnumStatusValues.PENDING)
		);
		setPaidOrders(() => getOrdersByStatus(allOrderData, EnumStatusValues.PAID));
		setShippingOrders(() =>
			getOrdersByStatus(allOrderData, EnumStatusValues.SHIPPING)
		);
		setDeliveredOrders(() =>
			getOrdersByStatus(allOrderData, EnumStatusValues.DELIVERED)
		);
	}, [allOrderData]);

	const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const key = e.target.value.toLowerCase();
		setSearchKey(key);
	}, []);

	useEffect(() => {
		setSearchKey("");
	}, [statusOnView]);

	useEffect(() => {
		if (searchKey === "") {
			setAllProcessingOrders(() => getAllProcessingOrders(allOrderData));
		} else {
			const temp = allOrderData
				.filter((order: TypeOrderData) => {
					return (order._id.includes(searchKey) ||
						order.name.toLowerCase().includes(searchKey)) &&
						order.status !== EnumStatusValues.CANCELED &&
						order.status !== EnumStatusValues.COMPLETED
						? true
						: false;
				})
				.reverse();
			setAllProcessingOrders([...temp]);
		}
	}, [searchKey]);

	const handleChangeStatusOnView = useCallback((value: string) => {
		setStatusOnView(value);
	}, []);

	return {
		statusOnView,
		allProcessingOrders,
		productsList,
		pendingOrders,
		paidOrders,
		shippingOrders,
		deliveredOrders,
		handleOnChange,
		handleChangeStatusOnView,
	};
};
