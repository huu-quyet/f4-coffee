import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
	const time = new Date();
	const year = time.getFullYear();
	return (
		<footer className="w-full h[40rem] sm:h-[30rem] lg:h-80 absolute left-0 right-0 bottom-0text-white p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-0">
			<div className="text-base sm:text-xl font-bold uppercase lg:ml-20">
				<div className="sm:mb-6"> F4-COFFEE social</div>
				<div>
					<a href="https://www.facebook.com/F4-Coffee-105431812042431">
						<i className="fab fa-facebook-square m-4 text-xl sm:text-3xl hover:text-primary cursor-pointer"></i>
					</a>
					<a href="https://www.instagram.com/f4.coffee.vn">
						<i className="fab fa-instagram-square hover:text-primary text-xl sm:text-3xl cursor-pointer"></i>
					</a>
				</div>
			</div>
			<div className="">
				<div className="text-base sm:text-xl font-bold uppercase mb-2 sm:mb-6">
					Hỗ trợ
				</div>
				<Link to="/privacy">
					<div className="hover:text-primary text-tiny sm:text-base">
						Bảo mật thông tin
					</div>
				</Link>
				<Link to="/policy">
					<div className="my-2 hover:text-primary text-tiny sm:text-base">
						Chính sách chung
					</div>
				</Link>
				<Link to="/franchise-policy">
					<div className="hover:text-primary text-tiny sm:text-base">
						Liên hệ nhượng quyền
					</div>
				</Link>
			</div>
			<div className="">
				<div className="font-bold uppercase mb-2 lg:mb-6 text-base sm:text-xl">
					Liên hệ
				</div>
				<div className="hover:text-primary inline-block cursor-pointer text-tiny sm:text-base">
					<a href="mailto:huuquyet498@gmail.com"> Email góp ý</a>
				</div>
				<div className="my-2 text-tiny sm:text-base">Hotline</div>
				<div className="text-tiny sm:text-base">1800 6868</div>
			</div>
			<div className="flex flex-col justify-between mt-4 lg:mt-0">
				<p className="mb-4">Địa chỉ: Số 1, Cầu Giấy, Hà Nội </p>
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8688.191180556712!2d105.78679765099433!3d21.034705252130653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab5756f91033%3A0x576917442d674bfd!2zQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1641884465777!5m2!1svi!2s"
					width="200"
					height="200"
					className="border:0"
					loading="lazy"
				></iframe>
				<p>
					Copyright <i className="far fa-copyright mt-4"></i> {year}
				</p>
			</div>
		</footer>
	);
};

export default Footer;
