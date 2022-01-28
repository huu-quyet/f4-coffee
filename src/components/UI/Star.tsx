import React, { Fragment } from "react";
import { StarIcon } from "@heroicons/react/solid";

const Star = () => {
	return (
		<Fragment>
			<StarIcon className="h-5 w-5 text-yellow" />
			<StarIcon className="h-5 w-5 text-yellow" />
			<StarIcon className="h-5 w-5 text-yellow" />
			<StarIcon className="h-5 w-5 text-yellow" />
			<StarIcon className="h-5 w-5 text-yellow" />
		</Fragment>
	);
};

export default Star;
