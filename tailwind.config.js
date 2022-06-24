module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				mainBgSvg: "url('../src/assets/bg.svg')",
			},
		},
	},
	plugins: [require('daisyui')],
}
