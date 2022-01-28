import React, { useEffect, useMemo, useCallback } from "react";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";
import {
	PresentationChartLineIcon,
	UserGroupIcon,
	GiftIcon,
} from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { LogoutIcon } from "@heroicons/react/outline";

import AdminCustomer from "./AdminCustomerPage/AdminCustomers";
import AdminDashboard from "./AdminDashBoard/AdminDashboard";
import AdminProduct from "./AdminProductPage/AdminProducts";
import OrderHistory from "./AminOrderManagement/AdminOrderHistory";
import OrderList from "./AminOrderManagement/AdminOrderList";
import OrderDetail from "./AminOrderManagement/AdminOrderDetail";
import { NotificationMemo } from "./Notification";
import logo from "../../assets/images/logoRectangle.png";
import * as actions from "../../action/actionCreator";
import OrderManagementField from "./AminOrderManagement/AdminOrderManagementField";
import { RootState } from "../../reducer/rootReducer";
import Loading from "../../components/UI/Loading";

const AdminPage: React.FC = () => {
	const history = useHistory();
	const loading = useSelector((state: RootState) => state.loading.isLoading);
	const dispatch = useDispatch();
	const allOrderData = useSelector(
		(state: RootState) => state.orderHistory.allOrderHistory
	);

	useEffect(() => {
		dispatch(actions.apiGetAllOrders());
		dispatch(actions.apiGetAllProducts());
	}, []);

	useEffect(() => {
		if (
			location.pathname === "/admin/orders-list" ||
			location.pathname === "/admin/orders-list/all-processing-orders" ||
			location.pathname === "/admin/orders-list/pending-orders"
		) {
			dispatch(actions.notHaveNotif());
			dispatch(actions.deleteAllNotifications());
		}
		if (location.pathname === "/admin/orders-list") {
			history.push("/admin/orders-list/all-processing-orders");
		}
	});

	const username = useMemo(
		() => JSON.parse(window.localStorage.getItem("username") || ""),
		[]
	);

	const handleLogout = useCallback(() => {
		window.localStorage.removeItem("accessToken");
		window.localStorage.removeItem("username");
		history.push("/login");
	}, []);

	return (
		<div className="container grid lg:grid-cols-12 h-screen">
			<div className="col-span-2 bg-slate-700 text-white">
				<div className="h-14 bg-white flex justify-center border-b border-b-slate-700">
					<img src={logo} alt="" className="object-cover h-full" />
				</div>
				<div className="grid">
					<NavLink
						to="/admin/dashboard"
						className="py-3 px-4 hover:bg-slate-500 transition-colors flex justify-start"
						activeClassName="active-admin"
					>
						<PresentationChartLineIcon className="h-6 w-6 pr-2" />
						Dashboard
					</NavLink>
					<NavLink
						to="/admin/customer"
						className="py-3 px-4 hover:bg-slate-500 transition-colors flex justify-start"
						activeClassName="active-admin"
					>
						<UserGroupIcon className="h-6 w-6 pr-2" />
						Customer
					</NavLink>
					<NavLink
						to="/admin/product"
						className="py-3 px-4 hover:bg-slate-500 transition-colors flex justify-start"
						activeClassName="active-admin"
					>
						<GiftIcon className="h-6 w-6 pr-2" />
						Product
					</NavLink>
					<div className="transition-colors cursor-pointer">
						<OrderManagementField />
					</div>
				</div>
			</div>
			<div className="col-span-10 bg-gray">
				<div className="h-14 w-full bg-white flex justify-end border-b border-b-zinc-300">
					<div className="h-full w-52 flex justify-evenly">
						{allOrderData.length > 0 && <NotificationMemo />}
						<div className="group w-36 p-1 flex items-center cursor-pointer relative hover:border-l hover:border-r hover:border-slate-300">
							<div className="w-24 text-sm text-center">Hi, {username}!</div>

							<div
								className="absolute top-full left-0 h-12 w-full text-sm justify-center items-center bg-white border border-slate-300 shadow-md hidden group-hover:flex hover:bg-slate-700 hover:text-white"
								onClick={handleLogout}
							>
								<LogoutIcon className="h-6 w-6" />
								Log out
							</div>
						</div>
					</div>
				</div>
				<div className="container h-[calc(100vh_-_56px)] overflow-auto">
					<Switch>
						<Route path="/admin/customer" component={AdminCustomer} strict={true} />
						<Route path="/admin/dashboard" component={AdminDashboard} />
						<Route path="/admin/product" component={AdminProduct} strict={true} />
						<Route path="/admin/order-detail/:orderId" component={OrderDetail} />
						<Route path="/admin/orders-history" component={OrderHistory} />
						<Route path="/admin/orders-list" component={OrderList} />
					</Switch>
				</div>
			</div>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				className="w-60"
			/>
			{loading ? <Loading /> : null}
		</div>
	);
};
export default AdminPage;
