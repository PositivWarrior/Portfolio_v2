export const fadeIn = {
	initial: {
		opacity: 0,
		y: 20,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 1.5,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

export const fadeInUp = {
	initial: {
		opacity: 0,
		y: 40,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 2,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

export const staggerContainer = {
	initial: {},
	animate: {
		transition: {
			staggerChildren: 0.4,
			delayChildren: 0.6,
		},
	},
};
