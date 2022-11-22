/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode : '',
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#0FCFEC",

					secondary: "#19D3AE",

					accent: "#3A4256",

					neutral: "#3D4451",

					"base-100": "#E6E4EC",

					
				},
			},
		],
	},
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
};
