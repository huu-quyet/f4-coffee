import React, { useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { BellIcon, ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";
import { useSocket } from "./useSocket";
import { TypeOrderData } from "../../../types";
import { formatDate, setNotifStorageForFirstLogin } from "../../../utils";
import {
	getTotalItems,
	getstorageNotifs,
	amountNotifsCameWhenOffline,
	getNewNotifOrders,
	sortNotifsOlder,
} from "./utilsForStorage";
import { RootState } from "../../../reducer/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { haveNotif, pushNewNotification } from "../../../action/actionCreator";
import { toastRequireConfig } from "../../../utils/toastConfig";

const toastRequireBack = () => {
	toast.info("Please click 'Back' to go back first!", toastRequireConfig);
};

const Notification: React.FC = () => {
	const ref = useRef(0);
	const dispatch = useDispatch();
	const history = useHistory();
	const { hasNewComingOrder, handleReadNotif } = useSocket();
	const allOrdersData = useSelector(
		(state: RootState) => state.orderHistory.allOrderHistory
	);
	const currentNotifs = useSelector(
		(state: RootState) => state.notification.currentNotifications
	);

	if (ref.current === 0) {
		setNotifStorageForFirstLogin(allOrdersData);
		ref.current++;
	}

	useEffect(() => {
		const totalNewNotif: number = amountNotifsCameWhenOffline(allOrdersData);
		if (totalNewNotif > 0) {
			const newNotifs: TypeOrderData[] = getNewNotifOrders(
				allOrdersData,
				totalNewNotif
			);
			dispatch(pushNewNotification(newNotifs));
			dispatch(haveNotif());
		}
	}, []);
	const savedNotifications: TypeOrderData[] = getstorageNotifs();

	const toOrderDetail = (orderId: string) => {
		if (location.pathname.includes("/admin/order-detail")) {
			toastRequireBack();
		} else {
			history.push(`/admin/order-detail/${orderId}`);
		}
	};
	return (
		<div className="h-full w-10 flex justify-center items-center relative group">
			<div className="relative">
				<BellIcon className="h-6 w-6 cursor-pointer text-sky-600" />
				{hasNewComingOrder && (
					<div className="absolute w-2 h-2 top-0 right-0 bg-delete rounded-full">
						<div className="absolute w-2 h-2 top-0 right-0 bg-delete rounded-full animate-ping"></div>
					</div>
				)}
				<div className="hidden group-hover:block w-fit h-fit notification-field">
					<div className="notif-box">
						<div className="pb-1 mt-1">
							<div className="text-black font-bold text-tiny mx-3 mb-1 border-b border-primary">
								New orders ({currentNotifs.length})
							</div>
							{currentNotifs.length > 0 ? (
								sortNotifsOlder(currentNotifs).map((orderDesc: TypeOrderData) => {
									return (
										<div
											className="pb-2 pt-1 px-2 ml-2 mr-1 hover:bg-gray hover:rounded-md"
											key={orderDesc._id}
											onClick={() => handleReadNotif(orderDesc)}
										>
											<div onClick={() => toOrderDetail(orderDesc._id)}>
												<div className="font-semibold">
													At: {formatDate(orderDesc.createdAt)}
												</div>
												<div className="text-slate-600 pt-1">
													Customer{" "}
													<span className="capitalize font-bold">{orderDesc.name}</span> has
													ordered <b>{getTotalItems(orderDesc)}</b> products from your store.{" "}
												</div>
											</div>
										</div>
									);
								})
							) : (
								<div className="text-center pb-2">
									You don&apos;t have any new orders right now.
								</div>
							)}
						</div>
						<div className="pt-2">
							<div className="flex justify-between mx-3 mb-1 border-b border-primary">
								<div className="text-black font-bold text-tiny">
									Recent orders ({savedNotifications.length}){" "}
								</div>
								<div
									className="text-sky-500 hover:font-bold flex items-center gap-1 
                hover:bg-gray px-1 hover:rounded-sm"
								>
									<Link to="/admin/orders-list/all-processing-orders">See more</Link>
									<ChevronDoubleRightIcon className="w-3 h-3" />
								</div>
							</div>
							{savedNotifications.length > 0 &&
								sortNotifsOlder(savedNotifications).map((orderDesc: TypeOrderData) => {
									return (
										<div
											className="pb-2 pt-1 px-2 ml-2 mr-1 hover:bg-gray hover:rounded-md"
											key={orderDesc._id}
										>
											<div
												onClick={() => toOrderDetail(orderDesc._id)}
												className="cursor-pointer"
											>
												<div className="font-semibold">
													At: {formatDate(orderDesc.createdAt)}
												</div>
												<div className="text-slate-600 pt-1">
													Customer{" "}
													<span className="capitalize font-bold">{orderDesc.name}</span> has
													ordered <b>{getTotalItems(orderDesc)}</b> products from your store.{" "}
												</div>
											</div>
										</div>
									);
								})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const NotificationMemo = React.memo(Notification);
