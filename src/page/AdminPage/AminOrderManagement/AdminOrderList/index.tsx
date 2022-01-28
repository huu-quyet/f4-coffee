import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import { EnumStatusValues } from "../../../../types";
import TableOfProcessingOrders from "./TableOfProcessingOrders";
import { useOrderList } from "./useOrderList";

const OrderList: React.FC = () => {
	const {
		statusOnView,
		allProcessingOrders,
		productsList,
		pendingOrders,
		paidOrders,
		shippingOrders,
		deliveredOrders,
		handleOnChange,
		handleChangeStatusOnView,
	} = useOrderList();

	return (
		<div className="bg-white p-4 m-4 rounded-lg border border-slate-300 shadow-lg">
			<div className="pb-1 font-extrabold text-center uppercase text-xl">
				<span className="border-b-2 border-black ">Processing Orders</span>
			</div>
			<div className="text-left pt-3 pb-2">
				You have a total of{" "}
				<b>
					{pendingOrders.length +
						paidOrders.length +
						shippingOrders.length +
						deliveredOrders.length}
				</b>{" "}
				processing order(s) includes: <b>{pendingOrders.length}</b> pending
				order(s), <b>{paidOrders.length}</b> paid order(s),{" "}
				<b>{shippingOrders.length}</b> shipping order(s) and{" "}
				<b>{deliveredOrders.length}</b> delivered order(s).
			</div>
			<div className="flex justify-between py-3 gap-3">
				<div className="basis-1/2 flex items-center justify-center">
					{statusOnView === "all" && (
						<input
							type="text"
							placeholder="Find order by order's id or customer's name..."
							className="w-96 border border-slate-400 rounded-xl px-3 py-1 
              focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
							onChange={handleOnChange}
						/>
					)}
				</div>
				<div className="basis-1/2 flex justify-center gap-3">
					<NavLink
						to={"/admin/orders-list/all-processing-orders"}
						activeClassName="status-active"
						className="opacity-60 font-bold hover:opacity-100 p-2 relative group"
						onClick={() => handleChangeStatusOnView("all")}
					>
						All
						<span
							className="hidden group-hover:flex absolute w-5 h-5 bg-red-500 
            rounded-full -top-1 -right-2 justify-center items-center"
						>
							<span className="text-white font-normal text-xxs">
								{allProcessingOrders.length}
							</span>
						</span>
					</NavLink>
					<NavLink
						to={"/admin/orders-list/pending-orders"}
						activeClassName="status-active"
						className="opacity-60 font-bold hover:opacity-100 p-2 relative group"
						onClick={() => handleChangeStatusOnView("pending")}
					>
						Pending
						<span
							className="hidden group-hover:flex absolute w-5 h-5 bg-red-500
             rounded-full -top-1 -right-2 justify-center items-center"
						>
							<span className="text-white font-normal text-xxs">
								{pendingOrders.length}
							</span>
						</span>
					</NavLink>
					<NavLink
						to={"/admin/orders-list/paid-orders"}
						activeClassName="status-active"
						className="opacity-60 font-bold hover:opacity-100 p-2 relative group"
						onClick={() => handleChangeStatusOnView("paid")}
					>
						Paid
						<span
							className="hidden group-hover:flex absolute w-5 h-5 bg-red-500 
            rounded-full -top-1 -right-2 justify-center items-center"
						>
							<span className="text-white font-normal text-xxs">
								{paidOrders.length}
							</span>
						</span>
					</NavLink>
					<NavLink
						to={"/admin/orders-list/shipping-orders"}
						activeClassName="status-active"
						className="opacity-60 font-bold hover:opacity-100 p-2 relative group"
						onClick={() => handleChangeStatusOnView("shipping")}
					>
						Shipping
						<span
							className="hidden group-hover:flex absolute w-5 h-5 bg-red-500 
            rounded-full -top-1 -right-2 justify-center items-center"
						>
							<span className="text-white font-normal text-xxs">
								{shippingOrders.length}
							</span>
						</span>
					</NavLink>
					<NavLink
						to={"/admin/orders-list/delivered-orders"}
						activeClassName="status-active"
						className="opacity-60 font-bold hover:opacity-100 p-2 relative group"
						onClick={() => handleChangeStatusOnView("delivered")}
					>
						Delivered
						<span
							className="hidden group-hover:flex absolute w-5 h-5 bg-red-500 
            rounded-full -top-1 -right-2 justify-center items-center"
						>
							<span className="text-white font-normal text-xxs">
								{deliveredOrders.length}
							</span>
						</span>
					</NavLink>
				</div>
			</div>
			<div className="pt-3">
				<Switch>
					<Route path={"/admin/orders-list/all-processing-orders"}>
						<TableOfProcessingOrders
							ordersList={allProcessingOrders}
							productsList={productsList}
							status="all"
						/>
					</Route>
					<Route path={"/admin/orders-list/pending-orders"}>
						<TableOfProcessingOrders
							ordersList={pendingOrders}
							productsList={productsList}
							status={EnumStatusValues.PENDING}
						/>
					</Route>
					<Route path={"/admin/orders-list/paid-orders"}>
						<TableOfProcessingOrders
							ordersList={paidOrders}
							productsList={productsList}
							status={EnumStatusValues.PAID}
						/>
					</Route>
					<Route path={"/admin/orders-list/shipping-orders"}>
						<TableOfProcessingOrders
							ordersList={shippingOrders}
							productsList={productsList}
							status={EnumStatusValues.SHIPPING}
						/>
					</Route>
					<Route path={"/admin/orders-list/delivered-orders"}>
						<TableOfProcessingOrders
							ordersList={deliveredOrders}
							productsList={productsList}
							status={EnumStatusValues.DELIVERED}
						/>
					</Route>
				</Switch>
			</div>
		</div>
	);
};

export default OrderList;
