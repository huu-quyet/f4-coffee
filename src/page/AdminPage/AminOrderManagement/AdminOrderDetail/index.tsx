import React, { useCallback, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PhoneOutgoingIcon } from "@heroicons/react/solid";

import {
	apiGetAllOrders,
	apiGetOrderById,
} from "../../../../action/actionCreator";
import { RootState } from "../../../../reducer/rootReducer";
import {
	TypeOrderData,
	TypeProductData,
	TypeProductOrderedData,
	EnumStatusValues,
} from "../../../../types";
import { getProductFromId, getTotalPaymentOfOrder } from "../../../../utils";
import { formatMoney } from "../../../../utils/formatmethod";
import { formatDate, changeOrderStatus } from "../../../../utils";
import ConfirmAction from "../AdminOrderList/ConfirmAction";
import QuickCancelOrder from "../AdminOrderList/QuickCancelOrder";
import {
	successNotify,
	failNotify,
} from "../AdminOrderList/TableOfProcessingOrders";
import { socket } from "../../../../socket";

const tableHeadings = [
	"#",
	"Products",
	"Quantity x Price/unit",
	"Payment Amount",
];

const OrderDetail: React.FC = () => {
	const { orderId }: { orderId: string } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(apiGetOrderById(orderId));
	}, []);

	const orderRender: TypeOrderData = useSelector(
		(state: RootState) => state.orderHistory.orderHistory
	);

	const productsList: TypeProductData[] = useSelector(
		(state: RootState) => state.product.products
	);

	const isLoading: boolean = useSelector(
		(state: RootState) => state.loading.isLoading
	);

	const total =
		orderRender?.products?.length !== 0
			? getTotalPaymentOfOrder(orderRender?.products)
			: 0;
	const nextStatus =
		orderRender?.status === EnumStatusValues.PENDING
			? EnumStatusValues.PAID
			: orderRender?.status === EnumStatusValues.PAID
			? EnumStatusValues.SHIPPING
			: orderRender?.status === EnumStatusValues.SHIPPING
			? EnumStatusValues.DELIVERED
			: EnumStatusValues.COMPLETED;

	const orderedProductInfo = orderRender?.products.map(
		(productOrdered: TypeProductOrderedData) => {
			const product = getProductFromId(productsList, productOrdered.productId);
			return {
				productName: product?.title,
				img: product?.img,
				sizeType: productOrdered.size[0].types,
				price: productOrdered.size[0].price,
				quantity: productOrdered.quantity,
			};
		}
	);

	const handleBackToOrderPage = useCallback(() => {
		history.goBack();
	}, []);

	const [showConfirmBox, setShowConfirmBox] = useState(false);
	const handleShowConfirmBox = () => {
		setShowConfirmBox(true);
	};

	const handleCloseConfirmBox = useCallback(() => {
		setShowConfirmBox(false);
	}, []);

	const handleConfirmAction = useCallback(async () => {
		if (orderRender) {
			const changedData = {
				...orderRender,
				status: nextStatus,
			};
			const successChange = await changeOrderStatus(orderId, changedData);
			if (successChange) {
				setShowConfirmBox(false);
				history.goBack();
				socket.emit("apply order", {
					statusOrder: nextStatus,
					orderId: orderRender._id,
				});
				successNotify();
				dispatch(apiGetAllOrders());
			} else {
				failNotify();
			}
		}
	}, []);

	// For Quick cancel order
	const [showQuickCancel, setShowQuickCancel] = useState(false);

	const handleShowQuickCancelPopup = useCallback(() => {
		setShowQuickCancel(true);
	}, []);

	const handleCloseQuickCancelPopup = useCallback(() => {
		setShowQuickCancel(false);
	}, []);

	const handleCancelOrder = useCallback(async (cancelingReason: string) => {
		if (orderRender) {
			const changedData = {
				...orderRender,
				status: EnumStatusValues.CANCELED,
				reasonCancel: cancelingReason,
			};
			const successChange = await changeOrderStatus(orderId, changedData);
			if (successChange) {
				setShowQuickCancel(false);
				history.goBack();
				successNotify();
				socket.emit("reject order", {
					statusOrder: "canceled",
					orderId: orderRender._id,
				});
				dispatch(apiGetAllOrders());
			} else {
				failNotify();
			}
		}
	}, []);

	return (
		<>
			{!isLoading ? (
				<div className="container h-[calc(100vh_-_56px)] overflow-auto">
					<div className="bg-white p-4 m-4 rounded-lg border border-slate-300 shadow-lg">
						<div className="text-center text-2xl font-bold">
							{orderRender?.status !== "completed" &&
							orderRender?.status !== "canceled" ? (
								<>Details</>
							) : (
								<>Review</>
							)}
						</div>
						<div className="text-center text-slate-500">
							For order no: #{orderRender?._id}
						</div>
						<div className="pt-4">
							<div className="text-lg font-bold p-3">
								1. Customer&apos;s information:
							</div>
							<div className="pb-2 px-6 flex">
								<div className="basis-1/2">
									<span className="font-semibold">Customer&apos;s name:</span>{" "}
									<span className="capitalize">{orderRender?.name || ""}</span>
								</div>
								<div className="basis-1/2">
									<span className="font-semibold">Gender:</span>{" "}
									<span className="capitalize">{orderRender?.gender || ""}</span>
								</div>
							</div>
							<div className="pb-2 px-6 flex items-center">
								<span className="font-semibold">Phone: {orderRender?.phone || ""}</span>{" "}
								<a
									href={`tel:${orderRender?.phone}`}
									className="text-secondary opacity-80 inline-block ml-2 hover:opacity-100"
								>
									<PhoneOutgoingIcon className="h-4 w-4" />
								</a>
							</div>
							<div className="pb-2 px-6">
								<span className="font-semibold">Address:</span>{" "}
								<span className="capitalize">{orderRender?.address || ""}</span>
							</div>
							<div className="text-lg font-bold p-3">2. Order&apos;s details:</div>
							<div className="px-6 pb-2 flex justify-end">
								<span className="font-semibold basis-1/3 text-left">
									Ordering Time: {formatDate(orderRender?.createdAt || "")}
								</span>
							</div>
							<table className="table-auto w-full mx-auto bg-white text-center border border-slate-300 mb-5">
								<thead>
									<tr
										className={
											"border-t border-b border-slate-400 h-12" +
											(orderRender?.status === "pending"
												? " bg-primary"
												: orderRender?.status === "paid"
												? " bg-fuchsia-300"
												: orderRender?.status === "shipping"
												? " bg-indigo-300"
												: orderRender?.status === "delivered"
												? " bg-emerald-300"
												: " bg-slate-300")
										}
									>
										{tableHeadings.map((heading: string, index: number) => (
											<th
												className={
													"px-3 border-r border-slate-400" + (index === 0 ? " border-l" : "")
												}
												key={index}
											>
												{heading}
											</th>
										))}
									</tr>
								</thead>
								<tbody className="text-center">
									{orderedProductInfo?.map((item, index) => (
										<tr className="h-12 border-b border-slate-300" key={index}>
											<td className="border-r border-slate-300  p-2">{index + 1}</td>
											<td className="border-r border-slate-300 flex justify-start items-center  p-2">
												<div className="">
													<img
														src={`${item.img}`}
														alt="img"
														className="h-12 w-auto basis-1/4"
													/>
												</div>
												<div className="basis-3/4 capitalize">{item.productName || ""}</div>
											</td>
											<td className="border-r border-slate-300  p-2">
												{item.quantity} size{" "}
												<span className="capitalize">{item.sizeType || ""}</span> x{" "}
												{formatMoney(item.price)}&#8363;
											</td>
											<td className="p-2">
												<b>{formatMoney(item.quantity * item.price)}&#8363;</b>
											</td>
										</tr>
									))}
									<tr className="h-12 border-b border-slate-300">
										<td className="font-bold text-xl">Total</td>
										<td className=""></td>
										<td className=""></td>
										<td className="border border-l border-slate-300 font-bold text-xl">
											{formatMoney(total)}&#8363;
										</td>
									</tr>
								</tbody>
							</table>
							<div className="px-6 pb-2">
								<span className="font-semibold">Note: </span>
								{orderRender?.notes || ""}
							</div>
							<div className="px-6 pb-2">
								<span className="font-semibold capitalize">
									Status: {orderRender?.status || ""}
								</span>
							</div>
							{orderRender?.status === "canceled" && (
								<div className="px-6 pb-2">
									<span className="font-semibold">Reason for cancellation:</span>{" "}
									{orderRender?.reasonCancel || ""}
								</div>
							)}
							{(orderRender?.status === "completed" ||
								orderRender?.status === "canceled") && (
								<div className="px-6">
									<span className="font-semibold">Order&apos;s closed at:</span>{" "}
									{formatDate(orderRender?.updatedAt || "")}
								</div>
							)}

							<div className="flex justify-center pt-3">
								<button
									className="bg-slate-700 p-2 w-20 rounded-lg text-white opacity-75 hover:opacity-100"
									onClick={handleBackToOrderPage}
								>
									Back
								</button>
								{orderRender?.status !== "completed" &&
								orderRender?.status !== "canceled" ? (
									<>
										<button
											className="bg-secondary p-2 rounded-lg text-white mx-3 opacity-75 hover:opacity-100"
											onClick={handleShowConfirmBox}
										>
											Change status to{" "}
											{orderRender?.status === "pending"
												? "Paid"
												: orderRender?.status === "paid"
												? "Shipping"
												: orderRender?.status === "shipping"
												? "Delivered"
												: orderRender?.status === "delivered"
												? "Completed"
												: ""}
										</button>
										<button
											className="bg-delete p-2 rounded-lg text-white opacity-75 hover:opacity-100"
											onClick={handleShowQuickCancelPopup}
										>
											Cancel this order
										</button>
									</>
								) : null}
							</div>
						</div>
					</div>
					{showConfirmBox && (
						<ConfirmAction
							nextStatus={nextStatus}
							handleCancel={handleCloseConfirmBox}
							handleComfirm={handleConfirmAction}
						/>
					)}
					{showQuickCancel && (
						<QuickCancelOrder
							handleClosePopup={handleCloseQuickCancelPopup}
							handleCancelOrder={handleCancelOrder}
						/>
					)}
				</div>
			) : null}
		</>
	);
};

export default OrderDetail;
