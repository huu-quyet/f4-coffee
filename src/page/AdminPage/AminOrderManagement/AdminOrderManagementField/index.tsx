import React, { useState, useCallback } from "react";
import {
	ClipboardListIcon,
	ChevronDownIcon,
	ClipboardCopyIcon,
	ClipboardCheckIcon,
} from "@heroicons/react/solid";
import { NavLink } from "react-router-dom";

const OrderManagementField: React.FC = () => {
	const [showOrderField, setShowOrderField] = useState(false);
	const handleShowOrderField = useCallback(() => {
		setShowOrderField(() => !showOrderField);
	}, [showOrderField]);
	return (
		<>
			<div
				className={
					(!showOrderField &&
						(location.pathname.includes("/admin/orders-list") ||
							location.pathname === "/admin/orders-history")) ||
					location.pathname.includes("/admin/order-detail")
						? "py-3 flex justify-start items-center pl-4 active-holder"
						: "py-3 flex justify-start items-center pl-4"
				}
				onClick={handleShowOrderField}
			>
				<ClipboardListIcon className="h-6 w-6 pr-2" />
				<span>Order Management</span>
				<ChevronDownIcon className="h-6 w-6 pl-2" />
			</div>
			{showOrderField && (
				<>
					<NavLink
						to="/admin/orders-list"
						className="py-3 pl-8 hover:bg-slate-500 transition-colors flex justify-start"
						activeClassName="active-admin"
					>
						<ClipboardCopyIcon className="h-6 w-6 pr-2" />
						Processing Orders
					</NavLink>
					<NavLink
						to="/admin/orders-history"
						className="py-3 pl-8 hover:bg-slate-500 transition-colors flex justify-start"
						activeClassName="active-admin"
					>
						<ClipboardCheckIcon className="h-6 w-6 pr-2" />
						Order History
					</NavLink>
				</>
			)}
		</>
	);
};

export default OrderManagementField;
