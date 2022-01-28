import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { RootState } from "../../../reducer/rootReducer";
import { TypeCategoryData } from "../../../types";
import logo from "../../../assets/images/logoRectangle.svg";
import {
	addStyleHeader,
	hiddenMenuMobile,
	removeVietnameseTones,
} from "../../../utils/index";
import PreViewCart from "./PreViewCart";
import {
	ShoppingCartIcon,
	MenuIcon,
	ChevronDownIcon,
	XIcon,
	ChevronRightIcon,
	ChevronLeftIcon,
	LoginIcon,
} from "@heroicons/react/solid";

type TProps = {
	data: number;
};

const Header: React.FC<TProps> = (props) => {
	const history = useHistory();
	const categories = useSelector((state: RootState) => state.category);
	const cart = useSelector((state: RootState) => state.cart);

	useEffect(() => {
		hiddenMenuMobile();
		window.addEventListener("scroll", addStyleHeader);
		return () => {
			window.removeEventListener("scroll", addStyleHeader);
		};
	});

	const onChooseMenu = (param?: string) => {
		history.push(`/menu/${param}`);
		hiddenMenuMobile();
	};

	const onCheckoutHandle = () => {
		history.push("/cart");
	};

	const toggleMenuMobile = () => {
		document.querySelector(".menu--mobile")?.classList.toggle("hidden--mobile");
	};

	const toggleNavMenuMobile = () => {
		document.querySelector(".nav--mobile")?.classList.toggle("hidden--mobile");
		document.querySelector(".menu--mobile")?.classList.add("hidden--mobile");
	};

	const hiddenMenu = () => {
		document.querySelector(".nav--mobile")?.classList.add("hidden--mobile");
	};

	return (
		<header className="h-14 lg:px-14 flex justify-between md:justify-between text-xl font-bold absolute z-50 min-w-full">
			<div className="flex w-4/5 md:w-4/5">
				<div className="w-40 sm:w-60 overflow-hidden relative left-1/2 lg:left-0">
					<Link to="/home">
						<img
							src={logo}
							className="min-h-[3.5rem] ml-[-2rem] h-10 w-3/4 lg:min-w-full relative top-1/2 translate-y-[-50%] cursor-pointer"
						/>
					</Link>
				</div>
				<div className="hidden lg:flex lg:justify-evenly lg:items-center">
					<NavLink
						activeClassName="active"
						to="/home"
						className="mx-6 transition-all hover:text-secondary"
					>
						Trang chủ
					</NavLink>
					<div className="dropdown">
						<NavLink
							activeClassName="active"
							to="/menu"
							className="my-8 flex items-center transition-all hover:text-secondary"
						>
							<div className="inline-block">
								<span>Menu</span>
							</div>
							<ChevronDownIcon className="h-4 w-4" />
						</NavLink>
						<div className="dropdown-content">
							<span onClick={() => onChooseMenu("all")}>Tất cả</span>
							{categories.categories.map((category: TypeCategoryData, i: number) => {
								return (
									<span
										onClick={() => onChooseMenu(removeVietnameseTones(category.title))}
										key={i}
									>
										{category.title}
									</span>
								);
							})}
						</div>
					</div>
					<NavLink
						activeClassName="active"
						to="/about"
						className="mx-6 transition-all hover:text-secondary"
					>
						Vê chúng tôi
					</NavLink>
				</div>
			</div>
			<div className="cart flex items-center mr-8 md:mr-0">
				<div
					onClick={onCheckoutHandle}
					className="text-secondary flex items-center px-2 cursor-pointer mr-[-2rem] lg:mr-4"
				>
					<ShoppingCartIcon className="md:h-8 md:w-8 h-6 w-6 mx-2 cursor-pointer" />
					<div className="w-6 h-6 text-base border-l mr-2">
						<span className="px-2 bg-amber-100 text-tiny sm:text-base">
							{cart?.totalAmount || props.data}
						</span>
					</div>
				</div>
				<PreViewCart />
			</div>
			<Link
				to="/login"
				className="hidden lg:flex lg:items-center bg-orange-400 my-4 px-2 rounded-sm cursor-pointer"
			>
				<span className="text-tiny mr-2">Login</span>
				<LoginIcon className="h-4 w-4" />
			</Link>
			<div
				onClick={toggleNavMenuMobile}
				className="lg:hidden block z-50 cursor-pointer"
			>
				<MenuIcon className="sm:h-8 sm:w-8 h-6 w-6 absolute top-1/2 translate-y-[-50%] left-4" />
			</div>
			{/* Navbar menu mobile */}
			<div className="nav--mobile hidden--mobile">
				<div
					onClick={toggleNavMenuMobile}
					className="cursor-pointer border-b-[1px] border-slate-200"
				>
					<XIcon className="h-8 w-8 ml-6 my-4 " />
				</div>

				<div className="pl-4">
					<NavLink
						onClick={hiddenMenu}
						className="block sm:ml-8 py-4 pr-8 border-b-[1px] border-slate-200"
						to="/home"
					>
						Trang chủ
					</NavLink>
					<div
						onClick={toggleMenuMobile}
						className="sm:ml-8 flex items-center py-2 pr-8 cursor-pointer border-b-[1px] border-slate-300"
					>
						<span className="flex-grow">Menu</span>
						<ChevronRightIcon className="sm:h-12 sm:w-12 h-8 w-8 mr-4" />
					</div>
					<NavLink
						onClick={hiddenMenu}
						className="block sm:ml-8 py-4 pr-8 border-b-[1px] border-slate-300"
						to="/about"
					>
						Về chúng tôi
					</NavLink>
					<NavLink
						onClick={hiddenMenu}
						className="block sm:ml-8 py-4 pr-8 border-b-[1px] border-slate-300"
						to="/login"
					>
						Login
					</NavLink>
				</div>
			</div>
			<div className="menu--mobile hidden--mobile">
				<div
					onClick={toggleMenuMobile}
					className="sm:text-3xl text-2xl flex items-center uppercase py-2 border-b-[1px] border-slate-200 text-center cursor-pointer"
				>
					<ChevronLeftIcon className="sm:h-12 sm:w-12 h-8 w-8 mr-4" />
					<span> Menu</span>
				</div>
				<span
					className="block sm:ml-12 ml-4 py-2 border-b-[1px] border-slate-200 cursor-pointer"
					onClick={() => onChooseMenu("all")}
				>
					Tất cả
				</span>
				<div className="sm:ml-12 ml-4">
					{categories.categories.map((category: TypeCategoryData, i: number) => {
						return (
							<span
								onClick={() => onChooseMenu(removeVietnameseTones(category.title))}
								key={i}
								className="block py-2 border-b-[1px] border-slate-200 cursor-pointer"
							>
								{category.title}
							</span>
						);
					})}
				</div>
			</div>
		</header>
	);
};

export default React.memo(Header, (prevProps, nextProps) => {
	return prevProps.data === nextProps.data;
});
