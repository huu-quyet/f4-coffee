import React, { useEffect } from "react";

const Privacy = () => {
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "auto" });
	}, []);
	return (
		<div className="pt-20">
			<h2 className="text-center text-3xl uppercase font-bold pt-8">
				Chính sách bảo mật thông tin
			</h2>
			<section className="container-fluid xl mx-4 my-8 lg:mx-44 rounded-xl">
				<div>
					<p className="border-b-2 pb-4">
						<span className="font-bold"> F4-COFFEE</span> (đơn vị chủ quản hệ thống
						website www.f4coffee.vn) cam kết tôn trọng, bảo mật những thông tin mang
						tính riêng tư của bạn. Chúng tôi hiểu rằng bạn cần biết chúng tôi quản lý
						những thông tin cá nhân được tập hợp từ website như thế nào. Hãy đọc và
						tìm hiểu về “Chính Sách Bảo Mật Thông Tin” dưới đây trước khi truy cập
						những nội dung khác để hiểu hơn những cam kết mà chúng tôi thực hiện, nhằm
						tôn trọng và bảo vệ quyền lợi của người dùng. Việc bạn truy cập, đăng ký,
						sử dụng website Ananas.vn có nghĩa rằng bạn đồng ý và chấp nhận ràng buộc
						bởi các điều khoản của bản quy định bảo mật của chúng tôi.
					</p>
				</div>
				<div className="py-8 border-b-2 border-dashed">
					<h3 className="my-4 text-xl font-bold uppercase">1. Thông tin cá nhân</h3>
					<p>F4-COFFEE chỉ yêu cầu các thông tin cá nhân của bạn như:</p>
					<ul className="pl-8 my-2">
						<li>- Họ và Tên</li>
						<li>- Ngày, tháng, năm sinh</li>
						<li>- Địa chỉ email</li>
						<li>- Số điện thoại</li>
						<li>- Địa chỉ (dùng cho mục đích quản lý đơn hàng, giao nhận)</li>
					</ul>
					<p>
						Cùng các thông tin không bắt buộc khác khi bạn muốn tương tác với một số
						nội dung trên <span className="font-bold"> F4-COFFEE</span>. Các thông tin
						cá nhân của bạn sẽ được
						<span className="font-bold"> F4-COFFEE</span> sử dụng để nhận diện và liên
						hệ với bạn khi cần.
					</p>
				</div>
				<div className="py-8 border-b-2 border-dashed">
					<h3 className="my-4 text-xl font-bold uppercase">
						2. Cách thức sử dụng thông tin
					</h3>
					<p>
						Thông thường, chúng tôi sử dụng các thông tin bạn cung cấp chỉ để liên hệ,
						hồi đáp những câu hỏi hay xác nhận thông tin đơn hàng theo tên, địa chỉ và
						số điện thoại mà bạn đã cung cấp. Chúng tôi cam kết thông tin cá nhân của
						bạn sẽ không bị chia sẻ với bất kỳ một bên thứ ba nào khi chưa có sự đồng
						ý. Chúng tôi chỉ có thể được phép chia sẻ thông tin với các đối tác giao
						nhận hoặc với các đối tác trong các chương trình, dự án liên kết khác. Dữ
						liệu khách hàng của <span className="font-bold"> F4-COFFEE</span>
						có thể được chuyển nhượng cho người kế thừa hay người được chỉ định theo
						thỏa thuận để quản lý khi công ty có sự mua bán, sát nhập hay tuyên bố phá
						sản.
					</p>
				</div>
				<div className="py-8 border-b-2 border-dashed">
					<h3 className="my-4 text-xl font-bold uppercase">
						3. Đảm bảo an toàn với các thông tin được thu thập
					</h3>
					<p>
						<span className="font-bold"> F4-COFFEE</span> chỉ tập hợp lại các thông
						tin cá nhân của bạn trong phạm vi phù hợp và cần thiết cho mục đích cải
						thiện chất lượng phục vụ cũng như nâng cao trải nghiệm các dịch vụ được{" "}
						<span className="font-bold"> F4-COFFEE</span> cung cấp. Chúng tôi cam kết
						tôn trọng và luôn duy trì các biện pháp thích hợp nhằm đảm bảo tính an
						toàn, vẹn nguyên, độ chính xác cùng tính bảo mật về các thông tin mà bạn
						đã tin tưởng để cung cấp cho chúng tôi. Ngoài ra,
						<span className="font-bold"> F4-COFFEE</span> cũng cam kết có những biện
						pháp thích hợp nhằm đảm bảo tính an toàn, tính bảo mật về mọi thông tin mà
						bạn đã cung cấp cho chúng tôi trong các chương trình hay sự liên kết với
						các đối tác, các bên thứ ba.
					</p>
				</div>
				<div className="py-8 border-b-2 border-dashed">
					<h3 className="my-4 text-xl font-bold uppercase">4. Cookies</h3>
					<p>
						Cookies là những tệp nhỏ phát sinh trong quá trình bạn truy cập, hoạt động
						trên Website được <span className="font-bold"> F4-COFFEE</span> ghi chép
						lại nhằm mục đích đáp ứng các nhu cầu của người sử dụng và nhiều mục đích
						khác.
					</p>
				</div>
				<div className="py-8 border-b-2 border-dashed">
					<h3 className="my-4 text-xl font-bold uppercase">
						5. Liên kết với các website khác
					</h3>
					<p>
						Nếu bạn nhấn đường liên kết sang Website của bên thứ ba, bạn sẽ tạm rời
						khỏi <span className="font-bold"> F4-COFFEE</span> để đến trang Web mà bạn
						đã chọn. <span className="font-bold"> F4-COFFEE</span>
						không thể kiểm soát các hoạt động của bên thứ ba và không chịu trách nhiệm
						về sự an toàn hay bất kể những nội dung gì có trên website đó.
					</p>
				</div>
				<div className="py-8">
					<h3 className="my-4 text-xl font-bold uppercase">
						6. Điều khoản thay đổi
					</h3>
					<p>
						Chúng tôi có toàn quyền thay đổi, bổ sung nội dung của các điều khoản này.
						Bạn có thể thường xuyên kiểm tra nhằm nắm được các điều khoản thay đổi
						trong{" "}
						<span className="font-bold">
							“Chính Sách Bảo Mật Thông Tin” của chúng tôi.
						</span>
						Thêm vào đó, đối với những thay đổi quan trọng về cách sử dụng liên quan
						đến các thông tin cá nhân mà bạn cung cấp cho{" "}
						<span className="font-bold"> F4-COFFEE</span>, chúng tôi sẽ gửi thông báo
						cho bạn bằng Email hoặc thông báo trên các kênh truyền thông chính thức
						khác của <span className="font-bold"> F4-COFFEE</span>. Trong trường hợp
						bạn có thắc mắc về các điều khoản hay cách sử dụng liên quan đến các thông
						tin cá nhân của bạn tại website f4coffee.vn, xin liên hệ với chúng tôi
						theo địa chỉ Email: support@f4coffee.vn.
					</p>
				</div>
			</section>
		</div>
	);
};

export default Privacy;
