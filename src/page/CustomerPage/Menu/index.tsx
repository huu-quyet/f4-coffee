import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Error from "../../../components/UI/Error";
import Loading from "../../../components/UI/Loading";
import { RootState } from "../../../reducer/rootReducer";
import { IParam, TypeCategoryData, TypeProductData } from "../../../types";
import { removeVietnameseTones } from "../../../utils";
import LeftNav from "./LeftNav/LeftNav";
import MainMenuPage from "./MainMenuPage/MainMenuPage";

const Menu = () => {
	const loading = useSelector((state: RootState) => state.loading.isLoading);
	const products = useSelector((state: RootState) => state.product);
	const categories = useSelector((state: RootState) => state.category);
	const param: IParam = useParams();
	const [productsFilter, setProductsFilter] = useState({
		products: products.products,
		category: categories.categories,
	});

	const isFetchDataDone =
		products.products.length > 0 && categories.categories.length > 0;

	// Handle filter products by category
	const handleFilterDataProducts = (param: string) => {
		if (!isFetchDataDone) return;
		if (param.toLowerCase() === "all") {
			setProductsFilter({
				products: products.products,
				category: categories.categories,
			});
		} else {
			const dataProductsFilter = products.products.filter(
				(product: TypeProductData) => {
					return removeVietnameseTones(product.category) === param;
				}
			);
			const category = categories.categories.filter(
				(category: TypeCategoryData) => {
					return removeVietnameseTones(category.title) === param;
				}
			);
			setProductsFilter({
				products: dataProductsFilter,
				category: category,
			});
		}
	};

	// Handle filter product by value search
	const handleSearchProducts = (searchInput: string) => {
		const value = removeVietnameseTones(searchInput);
		const productsSearch = products.products.filter(
			(product: TypeProductData) => {
				const nameProduct = removeVietnameseTones(product.title);
				return nameProduct.includes(value);
			}
		);
		setProductsFilter({
			products: productsSearch,
			category: categories.categories,
		});
	};

	useEffect(() => {
		if (isFetchDataDone) {
			handleFilterDataProducts(param.id);
		}
	}, [isFetchDataDone, param.id]);

	// if (!isFetchDataDone && !(products.error.length > 0)) {
	// 	return <Loading />;
	// }

	if (!isFetchDataDone && products.error.length > 0) {
		return <Error message={products.error} />;
	}

	return (
		<section className="pt-14 w-full lg:flex">
			<LeftNav categories={categories.categories} search={handleSearchProducts} />
			<MainMenuPage data={productsFilter} />
			{loading ? <Loading /> : null}
		</section>
	);
};

export default Menu;
