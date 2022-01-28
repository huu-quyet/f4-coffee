import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addProductsToCart } from "../../../action/actionCreator";
import ButtonAddToCart from "../../../components/UI/Button.addToCart";
import OutStock from "../../../components/UI/OutStock";
import Sale from "../../../components/UI/Sale";
import { TypeProductData } from "../../../types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import {
	addProductToCart,
	formatPrice,
	formatPriceProduct,
	removeVietnameseTones,
} from "../../../utils";
import Button from "../../../components/UI/Button";

type TProps = {
	data: TypeProductData[];
};

SwiperCore.use([Autoplay, Navigation]);

const HotSale: React.FC<TProps> = (props) => {
	const dispatch = useDispatch();
	const onAddProductToCart = (id: string) => {
		const productAddToCart = addProductToCart(id, props.data);
		dispatch(addProductsToCart(productAddToCart));
		toast.success(
			`Bạn đã thêm ${productAddToCart.title} vào giỏ hàng 🎉🎉🎉`,
			{}
		);
	};
	return (
		<React.Fragment>
			<section className="sm:mx-4 lg:mx-44">
				<h2 className="text-center text-2xl sm:text-4xl font-bold my-8 lg:my-0 lg:mb-8">
					Giá sốc
				</h2>
				<Swiper
					slidesPerView={4}
					spaceBetween={30}
					centeredSlides={false}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
					}}
					navigation={false}
					className="mySwiper hidden sm:block"
				>
					{props.data?.map((product: TypeProductData, index: number) => {
						return (
							<SwiperSlide key={index}>
								<div
									key={index}
									className="relative grid grid-cols-2 sm:grid-cols-1 gap-8 sm:gap-0"
								>
									<div className="relative shadow-xl rounded-xl drop-shadow-xl cursor-pointer">
										<Link
											to={`menu/${removeVietnameseTones(
												product.category
											)}/${removeVietnameseTones(product.title)}-${product._id}`}
										>
											<img
												src={product.img}
												alt={product.title}
												className="w-full h-full rounded-xl"
											></img>
											{product.discount !== 1 && <Sale />}
											{!product.inStock && <OutStock />}
										</Link>
										<div
											onClick={() => onAddProductToCart(product._id)}
											className="btn--add"
										>
											<ButtonAddToCart />
										</div>
									</div>
									<div className="mt-4 sm:mt-0 ml-8 sm:ml-0">
										<p className="font-bold mt-4">{product.title}</p>
										{product.discount !== 1 && (
											<p className="text-red-500 font-bold">
												{formatPrice(product.size[0].price, product.discount)} đ
											</p>
										)}
										<p className={`${product.discount !== 1 && "line-through text-sm"}`}>
											{new Intl.NumberFormat("vn").format(product.size[0].price)} đ
										</p>
										<button
											onClick={() => onAddProductToCart(product._id)}
											className="mt-4 text-secondary sm:hidden"
										>
											Thêm vào giỏ hàng +
										</button>
									</div>
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
				<div className="grid sm:hidden gap-8 mb-8 mx-4">
					{props.data?.map((product: TypeProductData, index: number) => {
						return (
							<div
								key={index}
								className="relative grid grid-cols-2 sm:grid-cols-1 gap-4 sm:gap-0"
							>
								<div className="relative shadow-xl rounded-xl drop-shadow-xl cursor-pointer">
									<Link
										to={`menu/${removeVietnameseTones(
											product.category
										)}/${removeVietnameseTones(product.title)}-${product._id}`}
									>
										<img
											src={product.img}
											alt={product.title}
											className="w-full h-full rounded-xl"
										></img>
										{product.discount !== 1 && <Sale />}
										{!product.inStock && <OutStock />}
									</Link>
									<div
										onClick={() => onAddProductToCart(product._id)}
										className="btn--add"
									>
										<ButtonAddToCart />
									</div>
								</div>
								<div className="sm:mt-0 ml-4 sm:ml-0">
									<p className="font-bold mt-4">{product.title}</p>
									{product.discount !== 1 && (
										<p className="text-red-500 font-bold">
											{formatPrice(product.size[0].price, product.discount)} đ
										</p>
									)}
									<p className={`${product.discount !== 1 && "line-through text-sm"}`}>
										{formatPriceProduct(product.size[0].price)} đ
									</p>
									<button
										onClick={() => onAddProductToCart(product._id)}
										className="order--now"
									>
										Thêm vào giỏ hàng
									</button>
								</div>
							</div>
						);
					})}
				</div>
				<Link
					className="text-white relative left-1/2 translate-x-[-50%] my-8 py-2 px-4 rounded-sm inline-block"
					to="/menu/all"
				>
					<Button type="MORE" text="Sản phẩm khác" />
				</Link>
			</section>
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
		</React.Fragment>
	);
};

export default HotSale;
