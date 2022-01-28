import React from "react";
import Start from "../../../components/UI/Star";
import avatar1 from "../../../assets/images/client-fb1.png";
import avatar2 from "../../../assets/images/client-fb2.png";
import avatar3 from "../../../assets/images/client-fb3.jpg";
import { TagIcon } from "@heroicons/react/solid";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

const ClientFeedback: React.FC = () => {
	return (
		<section className="my-16 sm:mx-4 lg:mx-44">
			<h2 className="text-center text-2xl sm:text-4xl font-bold my-8">
				Phản hồi
			</h2>
			<Swiper
				slidesPerView={1}
				spaceBetween={30}
				loop={true}
				pagination={{
					clickable: true,
				}}
				navigation={true}
				className="mySwiper"
			>
				<SwiperSlide>
					<div className="py-4 mb-8 bg-slate-200 w-[90%] sm:w-[80%] lg:px-2 lg:w-2/3 rounded-xl drop-shadow-xl inline-block relative left-1/2 translate-x-[-50%]">
						<div className="flex justify-between m-4">
							<img src={avatar1} className="h-16 w-16 rounded-full" />
							<div className="flex justify-start items-center w-4/5">
								<div className="flex flex-wrap mx-6">
									<p className="text-xl block w-full mb-2">Trang</p>
									<Start />
								</div>
							</div>
							<TagIcon className="h-8 w-8 text-secondary relative top-0" />
						</div>
						<div className="flex justify-between text-tiny sm:text-base flex-wrap sm:flex-nowrap mx-4">
							<p className="sm:w-2/3 mb-4 w-full sm:mt-8 mr-2">
								Đồ uống tại F4-COFFEE như là một nguồn năng lượng cho khởi đầu ngày mới
								của mình.
							</p>
							<img
								src="https://product.hstatic.net/1000075078/product/daovietquat_033985_400x400_20bfc56b971c47dca8734514a4765675_master.jpg"
								className="sm:h-36 sm:w-36 h-28 w-28 relative left-1/2 translate-x-[-50%] sm:translate-x-0 sm:static rounded-2xl"
							/>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="py-4 mb-8 bg-slate-200 w-[90%] sm:w-[80%] lg:px-2 lg:w-2/3 rounded-xl drop-shadow-xl inline-block relative left-1/2 translate-x-[-50%]">
						<div className="flex justify-between m-4">
							<div className="flex justify-start items-center w-4/5">
								<img src={avatar2} className="h-16 w-16 rounded-full" />
								<div className="flex flex-wrap mx-6 ">
									<p className="text-xl block w-full mb-2">Quyết</p>
									<Start />
								</div>
							</div>
							<TagIcon className="h-8 w-8 text-secondary relative top-0" />
						</div>
						<div className="flex justify-between text-tiny sm:text-base flex-wrap sm:flex-nowrap mx-4">
							<p className="sm:w-2/3 mb-4 w-full sm:mt-8 mr-2">
								Đỉnh của chóp... Mình là một người khó tính với coffee nhưng từ khi thử
								đồ uống tại F4-COFFEE mình thật sự đã thay đổi suy nghĩ về cà phê Việt
								Nam.
							</p>
							<img
								src="https://file.hstatic.net/1000075078/file/bac-xiu-da_52223c163d7e4bb7921811d9781b43de.jpg"
								className="sm:h-36 sm:w-36 h-28 w-28 relative left-1/2 translate-x-[-50%] sm:translate-x-0 sm:static rounded-2xl"
							/>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="py-4 mb-8 bg-slate-200 w-[90%] sm:w-[80%] lg:px-2 lg:w-2/3 rounded-xl drop-shadow-xl inline-block relative left-1/2 translate-x-[-50%]">
						<div className="flex justify-between m-4">
							<div className="flex justify-start items-center w-4/5">
								<img src={avatar3} className="h-16 w-16 rounded-full" />
								<div className="flex flex-wrap mx-6 ">
									<p className="text-xl block w-full mb-2">Hương</p>
									<Start />
								</div>
							</div>
							<TagIcon className="h-8 w-8 text-secondary relative top-0" />
						</div>
						<div className="flex justify-between text-tiny sm:text-base flex-wrap sm:flex-nowrap mx-4">
							<p className="sm:w-2/3 w-full mb-4 sm:mt-8 mr-2">
								Đồ uống ngon tuyệt, shop giao hàng siêu nhanh, sản phẩm chất lượng. Vote
								shop 5 sao
							</p>
							<img
								src="https://product.hstatic.net/1000075078/product/chocolate-ice-blended_183602_400x400_142587be6f4f4dd0885ba746fd4a8c1a_master.jpg"
								className="sm:h-36 sm:w-36 h-28 w-28 relative left-1/2 translate-x-[-50%] sm:translate-x-0 sm:static  rounded-2xl"
							/>
						</div>
					</div>
				</SwiperSlide>
			</Swiper>
		</section>
	);
};

export default ClientFeedback;
