import React, { Fragment, useEffect, useRef } from "react";
import img1 from "../../../assets/images/menu1.png";
import img2 from "../../../assets/images/menu2.png";
import img3 from "../../../assets/images/menu3.png";
import img4 from "../../../assets/images/menu4.png";
import { Link } from "react-router-dom";
import ClientFeedback from "./ClientFeedback";
import HotSale from "./HotSale";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducer/rootReducer";
import { TypeProductData } from "../../../types";
import { Swiper, SwiperSlide } from "swiper/react";
import bg_url from "../../../assets/images/background.jpg";
import "swiper/css";
import "swiper/css/effect-cards";
import SwiperCore, { EffectCards } from "swiper";
import { removeVietnameseTones } from "../../../utils";
import LoadingBar from "react-top-loading-bar";
import Button from "../../../components/UI/Button";

SwiperCore.use([EffectCards]);

const Home: React.FC = () => {
	const products = useSelector((state: RootState) => state.product);
	const ref: any = useRef(null);
	const productsSale = products.products.filter(
		(product: TypeProductData) => product.discount !== 1
	);
	useEffect(() => {
		window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
		if (!ref.current) return;
		ref.current.continuousStart();
	}, []);

	return (
		<Fragment>
			{products.products.length === 0 && (
				<LoadingBar color="#f11946" shadow={true} ref={ref} />
			)}
			<section className="slide lg:h-[90vh] md:flex md:items-center relative">
				<img src={bg_url} className="lg:hidden" />
				<div className="ml-4 sm:pl-12 lg:pl-20 xl:pl-40 lg:relative absolute mt-4 top-1/2 lg:top-[20%] translate-y-[-50%]">
					<h3 className="text-2xl sm:text-4xl lg:text-6xl text-dark md:text-6xl font-black block">
						F4-COFFEE
					</h3>
					<p className="text-2xl sm:text-4xl text-dark md:text-5xl font-extrabold block">
						Đánh thức mọi giác quan
					</p>
					<Link to="/menu">
						<Button type="ADD" text="ĐẶT HÀNG NGAY" />
					</Link>
				</div>
				<Swiper
					effect={"cards"}
					grabCursor={true}
					className="mySwiper drop-shadow-xl lg:w-[280px]
					lg:h-[380px] sm:w-[240px]
					sm:h-[320px] w-[120px]
					h-[200px] hidden lg:block relative left-[-4rem]"
				>
					{products.products.map((product: TypeProductData, index: number) => {
						return (
							<SwiperSlide
								key={index}
								className="flex flex-wrap bg-green-600 font-bold"
							>
								<Link
									to={`menu/${removeVietnameseTones(
										product.category
									)}/${removeVietnameseTones(product.title)}-${product._id}`}
								>
									<img src={product.img}></img>
									<p className="text-center mt-4 text-white text-tiny sm:text-xl">
										{product.title}
									</p>
								</Link>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</section>
			<HotSale data={productsSale} />
			<section className="mx-0 sm:mx-4 my-0 sm:my-16 lg:mx-44">
				<h2 className="text-center text-2xl sm:text-4xl font-bold my-8">Dịch vụ</h2>
				<div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 mb-16 mx-4">
					<div className="bg-primary p-6 rounded-2xl drop-shadow-xl hove:drop-shadow-2xl hover:translate-y-[-0.5rem] transition-all ease-linear duration-300">
						<img src={img1} alt="delivery" />
						<h4 className="text-xl my-2 sm:my-6 font-bold">Giao hàng siêu tốc</h4>
						<p className="my-2 sm:my-6">
							Giao hàng miễn phí khu vực nội thành Hà Nội
						</p>
						<Link to="/menu">
							<Button type="ADD" text="Mua ngay" />
						</Link>
					</div>
					<div className="bg-primary p-6 rounded-2xl drop-shadow-xl hove:drop-shadow-2xl hover:translate-y-[-0.5rem] transition-all ease-linear duration-300">
						<img src={img2} alt="quality" />
						<h4 className="text-xl my-2 sm:my-6 font-bold">Chất lượng vượt trội</h4>
						<p className="my-2 sm:my-6">
							Nguyên liệu được lựa chọn từ những hạt cà phê thơm ngon nhất
						</p>
						<Link to="/menu">
							<Button type="ADD" text="Mua ngay" />
						</Link>
					</div>
					<div className="bg-primary p-6 rounded-2xl drop-shadow-xl hove:drop-shadow-2xl hover:translate-y-[-0.5rem] transition-all ease-linear duration-300">
						<img src={img3} alt="delivery" />
						<h4 className="text-xl my-2 sm:my-6 font-bold">Chính sách hoàn tiền</h4>
						<p className="my-2 sm:my-6">
							Hoàn tiền 100% với những đơn hàng do lỗi của cửa hàng
						</p>
						<Link to="/menu">
							<Button type="ADD" text="Mua ngay" />
						</Link>
					</div>
					<div className="bg-primary p-6 rounded-2xl drop-shadow-xl hove:drop-shadow-2xl hover:translate-y-[-0.5rem] transition-all ease-linear duration-300">
						<img src={img4} alt="delivery" />
						<h4 className="text-xl my-2 sm:my-6 font-bold">Thực đơn hấp dẫn</h4>
						<p className="my-2 sm:my-6">
							Đem tới cho bạn những thức uống tràn đầy năng lượng
						</p>
						<Link to="/menu">
							<Button type="ADD" text="Mua ngay" />
						</Link>
					</div>
				</div>
			</section>
			<section className="sm:my-16 sm:mx-8 lg:mx-48 mx-4">
				<h2 className="text-center text-2xl sm:text-4xl my-8 font-bold">
					Giờ phục vụ
				</h2>
				<div className="sm:w-2/3 mb-8 relative left-1/2 translate-x-[-50%] font-semibold bg-primary drop-shadow-xl rounded-2xl">
					<div className="grid grid-cols-3 py-4 border-b border-slate-100">
						<i className="flex justify-center far fa-calendar-alt text-3xl text-red-500"></i>
						<i className="flex justify-center fas fa-door-open text-3xl text-red-500"></i>
						<i className="flex justify-center fas fa-door-closed text-3xl text-red-500"></i>
					</div>
					<div className="grid grid-cols-3 py-4 border-b border-slate-100 sm:mx-8">
						<div className="pl-2">Thứ hai</div>
						<div className="text-center">7h:00</div>
						<div className="text-center">22h:00</div>
					</div>
					<div className="grid grid-cols-3 py-4 border-b border-slate-100 sm:mx-8">
						<div className="pl-2">Thứ ba</div>
						<div className="text-center">7h:00</div>
						<div className="text-center">22h:00</div>
					</div>
					<div className="grid grid-cols-3 py-4 border-b border-slate-100 sm:mx-8">
						<div className="pl-2">Thứ tư</div>
						<div className="text-center">7h:00</div>
						<div className="text-center">22h:00</div>
					</div>
					<div className="grid grid-cols-3 py-4 border-b border-slate-100 sm:mx-8">
						<div className="pl-2">Thứ năm</div>
						<div className="text-center">7h:00</div>
						<div className="text-center">22h:00</div>
					</div>
					<div className="grid grid-cols-3 py-4 border-b border-slate-100 sm:mx-8">
						<div className="pl-2">Thứ sáu</div>
						<div className="text-center">7h:00</div>
						<div className="text-center">22h:00</div>
					</div>
					<div className="grid grid-cols-3 py-4 border-b border-slate-100 sm:mx-8 text-secondary">
						<div className="pl-2">Thứ bảy</div>
						<div className="text-center">6h:30</div>
						<div className="text-center">23h:00</div>
					</div>
					<div className="grid grid-cols-3 py-4 border-b border-slate-100 sm:mx-8 text-secondary">
						<div className="pl-2">Chủ nhật</div>
						<div className="text-center">6h:30</div>
						<div className="text-center">23h:00</div>
					</div>
				</div>
			</section>
			<ClientFeedback />
		</Fragment>
	);
};

export default Home;
