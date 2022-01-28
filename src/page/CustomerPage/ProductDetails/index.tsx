/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addProductsToCart } from "../../../action/actionCreator";
import { TypeProductData, TypeSizeData } from "../../../types";
import { toast, ToastContainer } from "react-toastify";
import { productServices } from "../../../services/product.services";
import Loading from "../../../components/UI/Loading";
import Error from "../../../components/UI/Error";
import {
	formatPrice,
	formatPriceProduct,
	toggleChoseSizeProduct,
} from "../../../utils";

type TParam = {
	id: string;
	slug: string;
};

type TPriceProduct = {
	price: number;
	type: string;
};

const ProductDetails: React.FC = () => {
	const [productDetail, setProductDetail] = useState<TypeProductData>();
	const [priceProduct, setPriceProduct] = useState<TPriceProduct>();
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState("");
	const dispatch = useDispatch();
	const history = useHistory();
	const param: TParam = useParams();
	const prodId = param.slug.split("-");

	useEffect(() => {
		window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
	}, []);

	useEffect(() => {
		(async () => {
			const resp = await productServices
				.product(prodId[prodId.length - 1])
				.catch((error) => {
					setIsLoading(false);
					setIsError(error);
				});
			if (!resp) return;
			const { data } = resp;
			setProductDetail(data);
			setPriceProduct({ price: data.size[0].price, type: data.size[0].types });
			setIsLoading(false);
			setIsError("");
		})();
	}, []);

	if (!productDetail || !priceProduct || isLoading) {
		return <Loading />;
	}

	if (isError) return <Error message={isError} />;

	const onChoseSizeProduct = (type: string, price: number) => {
		toggleChoseSizeProduct(type);
		setPriceProduct({
			type: type,
			price: price,
		});
	};

	const goBackMenu = () => {
		history.goBack();
	};

	const addProductToCart = (event: any) => {
		event.preventDefault();
		if (!productDetail.inStock) return;
		const newProduct = {
			id: productDetail._id,
			title: productDetail.title,
			desc: productDetail.desc,
			img: productDetail.img,
			type: priceProduct.type,
			quantity: 1,
			price: priceProduct.price,
			discount: productDetail.discount,
			category: productDetail.category,
		};

		dispatch(addProductsToCart(newProduct));
		toast.success(`Bạn đã thêm ${newProduct.title} vào giỏ hàng 🎉🎉🎉`, {});
	};

	return (
		<section className="container pt-20 mx-4 mb-8 md:mx-12 lg:mx-24 2xl:mx-64">
			<div className="my-8">
				<span className="font-bold">Menu </span>
				<span
					onClick={goBackMenu}
					className="capitalize font-bold cursor-pointer hover:text-orange-400"
				>
					{" "}
					/ {productDetail.category}
				</span>
				<span className="capitalize"> / {productDetail.title}</span>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4">
				<div>
					<img src={productDetail.img} alt={productDetail.title} />
				</div>
				<div>
					<h3 className="font-bold text-2xl mb-4">{productDetail.title}</h3>
					<p className="mb-4 ">{productDetail.desc}</p>
					<div className="font-bold text-3xl lg:text-4xl text-amber-600 flex flex-wrap">
						<span
							className={`${
								productDetail.discount !== 1 && "w-full lg:w-fit line-through text-gray"
							}`}
						>
							{productDetail.size && formatPriceProduct(priceProduct.price)}đ
						</span>
						{productDetail.discount !== 1 && (
							<div className="lg:ml-4 flex flex-nowrap items-start">
								<span className="relative">
									{productDetail.size &&
										formatPrice(priceProduct.price, productDetail.discount)}
									đ
								</span>
								<p className="ml-2 text-tiny border-[1px] bg-green-100 p-1 rounded-xl">
									Giảm {productDetail.discount * 100}%
								</p>
							</div>
						)}
						{!productDetail.inStock && (
							<div className="my-4">
								<p className="ml-2 p-2 text-base border-[1px] bg-green-100 rounded-xl">
									Sản phẩm đã hết hàng hôm nay. Xin quay lại vào ngày mai!
								</p>
							</div>
						)}
					</div>

					<p className="mt-4 md:mb-2 text-xl">Size</p>
					<div className="mb-8 hidden md:block">
						{productDetail.size?.map((type: TypeSizeData, index: number) => {
							const typeProduct = type.types.toLowerCase();
							const isOneType =
								productDetail.size?.length === 1 ||
								(productDetail.size?.length === 2 &&
									productDetail.size[0].types !== "s");
							return (
								<div
									onClick={() => onChoseSizeProduct(typeProduct, type.price)}
									className={
										typeProduct === "s" || (typeProduct === "m" && isOneType)
											? "type type--active"
											: "type"
									}
									data-type={typeProduct}
									key={index}
								>
									<span>
										<i className="fas fa-coffee mr-2" />
										{typeProduct === "s" && "Nhỏ"}
										{typeProduct === "m" && "Vừa"}
										{typeProduct === "l" && "Lớn"}
									</span>
									<span className="ml-2">
										{type.price - productDetail.size[0]?.price > 0
											? `+ ${type.price - productDetail.size[0]?.price}`
											: ""}
									</span>
								</div>
							);
						})}
						<button
							disabled={!productDetail.inStock}
							onClick={addProductToCart}
							className={`${
								!productDetail.inStock
									? "button--add--noAllowed"
									: "button--add--allowed"
							}`}
						>
							<i className="fa fa-shopping-cart mr-2"></i>
							Thêm vào giỏ hàng
						</button>
					</div>
					{/* Responsive mobile form add product to cart */}
					<form className="block md:hidden" onSubmit={addProductToCart}>
						{productDetail.size?.map((type: TypeSizeData, index: number) => {
							const typeProduct = type.types.toLowerCase();
							return (
								<div
									key={index}
									className="py-4 w-full border-b-[1px] border-slate-200 flex items-center"
								>
									<input
										type="radio"
										name="size"
										id={typeProduct}
										value={typeProduct}
										defaultChecked={priceProduct.type.toLowerCase() === typeProduct}
										onChange={() => onChoseSizeProduct(typeProduct, type.price)}
										className="mr-4 cursor-pointer h-4 w-4"
									/>
									<label htmlFor={typeProduct} className="flex-grow">
										{typeProduct === "s" && "Nhỏ"}
										{typeProduct === "m" && "Vừa"}
										{typeProduct === "l" && "Lớn"}
									</label>
									<span className="ml-2">
										{type.price - productDetail.size[0]?.price > 0
											? `+ ${formatPriceProduct(
													type.price - productDetail.size[0]?.price
											  )} đ`
											: ""}
									</span>
								</div>
							);
						})}
						<button
							disabled={!productDetail.inStock}
							className={`${
								!productDetail.inStock
									? "button--add--noAllowed--mobile"
									: "button--add--allowed--mobile"
							}`}
						>
							<i className="fa fa-shopping-cart mr-2"></i>
							Thêm vào giỏ hàng
						</button>
					</form>
				</div>
			</div>
			<ToastContainer
				position="bottom-left"
				autoClose={4000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				className="w-72 mb-4"
			/>
		</section>
	);
};

export default ProductDetails;
