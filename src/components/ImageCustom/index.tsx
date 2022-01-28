import React, { FC } from "react";
interface Iprops {
	imageUrl: string;
	imageSize: string;
	classCustom: string;
}
const ImageCustom: FC<Iprops> = ({ imageUrl, imageSize, classCustom }) => {
	return (
		<div className={classCustom}>
			<div className="h-full">
				<div
					className="h-full"
					style={{
						backgroundImage: `url(${imageUrl})`,
						backgroundSize: imageSize,
						backgroundPosition: "center center",
						backgroundRepeat: "no-repeat",
					}}
				/>
			</div>
		</div>
	);
};

export default ImageCustom;
