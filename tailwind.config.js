/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fontSizes = require("./src/styles/fontSize/fontSize");
const colors = require("./src/styles/colors/colors");

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		container: {
			center: true,
		},

		fontFamily: {
			sans: ["Nunito", "sans-serif"],
		},

		extend: {
			fontSize: fontSizes.fontSize,
			colors: colors.colors,
			screens: {
				lg: "968px",
				ssm: "320px",
			},
		},
	},
	plugins: [],
};
