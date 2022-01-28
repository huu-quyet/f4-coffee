import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./Home/index";
import Policy from "./Policy/Policy";
import FranchisePolicy from "./Policy/Franchise.Policy";
import Privacy from "./Policy/Privacy";
import ScrollToUp from "../../components/UI/ScrollToUp";
import Menu from "./Menu";
import Cart from "./Cart";
import Header from "./Header/Header";

import {
	apiGetAllCategories,
	apiGetAllProducts,
} from "../../action/actionCreator";
import { useDispatch } from "react-redux";
import Footer from "./Footer/Footer";
import ProductDetails from "./ProductDetails/index";
import About from "./About";
interface dataCart {
	products: [];
	totalAmount: number;
}
const cartSessionStorage: any = window.sessionStorage.getItem("cart");
const dataCart: dataCart =
	typeof cartSessionStorage === "string"
		? JSON.parse(cartSessionStorage)
		: { products: [], totalAmount: 0 };

window.sessionStorage.setItem("cart", JSON.stringify(dataCart));

const CustomerPage: React.FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(apiGetAllCategories());
		dispatch(apiGetAllProducts());
	}, []);

	return (
		<div className="relative min-w-full pb-[50rem] sm:pb-[30rem] lg:pb-80 min-h-screen bg-gradient-to-tl from-white to-green-50">
			<Header data={dataCart.totalAmount} />
			<Switch>
				<Route exact path="/">
					<Redirect to="/home" />
				</Route>
				<Route exact path="/home">
					<Home />
				</Route>
				<Route exact path="/menu">
					<Redirect to="/menu/all" />
				</Route>
				<Route exact path="/menu/:id">
					<Menu />
				</Route>
				<Route exact path="/menu/:id/:slug">
					<ProductDetails />
				</Route>
				<Route exact path="/about">
					<About />
				</Route>
				<Route path="/cart">
					<Cart />
				</Route>
				<Route exact path="/privacy">
					<Privacy />
				</Route>
				<Route exact path="/policy">
					<Policy />
				</Route>
				<Route exact path="/franchise-policy">
					<FranchisePolicy />
				</Route>
			</Switch>
			<Footer />
			<ScrollToUp />
		</div>
	);
};

export default CustomerPage;
