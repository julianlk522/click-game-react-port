module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				mainBgSvg: "url('../src/assets/bg.svg')",
			},
			backgroundColor: {
				darkViolet: 'hsl(269, 100%, 20%)',
			},
			boxShadow: {
				actuallyXl: '0 5px 15px rgba(0, 0, 0, 0.5)',
			},
		},
	},
	plugins: [require('daisyui')],
}
