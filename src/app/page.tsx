'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Typewriter from 'typewriter-effect';
import { Dancing_Script, Eagle_Lake } from 'next/font/google';

const dancingScript = Dancing_Script({
	subsets: ['latin'],
	weight: '700',
	display: 'swap',
});

const eagleLake = Eagle_Lake({
	subsets: ['latin'],
	weight: '400',
	display: 'swap',
});

const fadeInUp = {
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

const staggerContainer = {
	initial: {},
	animate: {
		transition: {
			staggerChildren: 0.4,
			delayChildren: 0.6,
		},
	},
};

const fadeIn = {
	initial: {
		opacity: 0,
		scale: 0.95,
	},
	animate: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 2.5,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

export default function Home() {
	return (
		<>
			<Navigation />
			<main className="min-h-screen bg-black">
				{/* Hero Section */}
				<section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
					{/* Background Image */}
					<div className="absolute inset-0 overflow-hidden">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{
								duration: 2.5,
								ease: [0.22, 1, 0.36, 1],
							}}
							className="absolute inset-0 bg-black/80 z-10"
						/>
						<motion.div
							initial={{ scale: 1.2 }}
							animate={{ scale: 1 }}
							transition={{
								duration: 3,
								ease: [0.22, 1, 0.36, 1],
							}}
							className="relative w-full h-full hero-image-mask"
						>
							{/* <Image
                src="/bg.jpg"
                alt="Background"
                fill
                sizes="100vw"
                className="object-cover object-center opacity-40"
                priority
              /> */}
						</motion.div>
					</div>

					{/* Background Gradients */}
					<div className="absolute inset-0 overflow-hidden">
						<motion.div
							initial={{ opacity: 0, scale: 1.2 }}
							animate={{ opacity: 0.4, scale: 1 }}
							transition={{
								duration: 3,
								ease: [0.22, 1, 0.36, 1],
							}}
							className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/30 via-transparent to-transparent blur-3xl"
						/>
						<motion.div
							initial={{ opacity: 0, scale: 1.2 }}
							animate={{ opacity: 0.4, scale: 1 }}
							transition={{
								duration: 3,
								delay: 0.3,
								ease: [0.22, 1, 0.36, 1],
							}}
							className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/30 via-transparent to-transparent blur-3xl"
						/>
					</div>

					<motion.div
						variants={staggerContainer}
						initial="initial"
						animate="animate"
						className="relative z-10 container mx-auto px-4"
					>
						<div className="flex flex-col lg:flex-row items-center justify-between gap-12">
							{/* Text Content */}
							<div className="flex-1 text-center lg:text-left space-y-8 max-w-2xl">
								<div className="space-y-2">
									<motion.h1
										variants={fadeInUp}
										className="text-6xl md:text-8xl text-gradient mt-24 md:mt-32 p-10 name-title"
									>
										Kacper Margol
									</motion.h1>

									<motion.div
										variants={fadeInUp}
										className="text-xl md:text-2xl text-foreground/90 h-20"
									>
										<Typewriter
											options={{
												strings: [
													'Turning Problems into Solutions',
													'Where Code Meets Design',
													'React & Next.js Developer',
													'Crafting Clean Code',
													'Building Interactive Experiences',
													'Driven by Curiosity and Code',
													'Transforming Ideas into Reality',
													'Your Friendly Debugging Expert',
												],
												autoStart: true,
												loop: true,
												delay: 40,
												deleteSpeed: 20,
											}}
										/>
									</motion.div>
								</div>

								<motion.div
									variants={fadeInUp}
									className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-6"
								>
									<Link
										href="#projects"
										onClick={(e) => {
											e.preventDefault();
											document
												.querySelector('#projects')
												?.scrollIntoView({
													behavior: 'smooth',
												});
										}}
										className="px-8 py-3 text-lg font-semibold gradient-border glass-effect
                      transition-all duration-1000 hover:scale-105 hover:shadow-lg hover:shadow-primary/20
                      group relative overflow-hidden"
									>
										<span className="relative z-10">
											View My Work
										</span>
										<motion.div
											className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
											initial={{ x: '-100%' }}
											whileHover={{ x: '100%' }}
											transition={{
												duration: 1.5,
												ease: [0.22, 1, 0.36, 1],
											}}
										/>
									</Link>
									<Link
										href="#contact"
										onClick={(e) => {
											e.preventDefault();
											document
												.querySelector('#contact')
												?.scrollIntoView({
													behavior: 'smooth',
												});
										}}
										className="px-8 py-3 text-lg font-semibold text-primary hover:text-accent
                      transition-all duration-1000"
									>
										Get in Touch
									</Link>
								</motion.div>
							</div>

							{/* Profile Image */}
							<motion.div
								variants={fadeIn}
								className="relative w-64 h-64 md:w-96 md:h-96"
							>
								<div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse" />
								<div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary">
									<Image
										src="/Profile.jpg"
										alt="Kacper Margol"
										fill
										sizes="(max-width: 768px) 256px, 384px"
										className="object-cover"
										priority
									/>
									<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
								</div>
								<motion.div
									className="absolute -inset-4 rounded-full border border-primary/20"
									animate={{
										scale: [1, 1.05, 1],
										opacity: [0.3, 0.5, 0.3],
									}}
									transition={{
										duration: 3,
										repeat: Infinity,
										ease: 'easeInOut',
									}}
								/>
							</motion.div>
						</div>
					</motion.div>

					{/* Scroll Indicator */}
					<motion.div
						variants={fadeIn}
						initial="initial"
						animate="animate"
						className="absolute bottom-8 left-1/2 -translate-x-1/2"
					>
						<motion.div
							animate={{
								y: [0, 8, 0],
								opacity: [0.3, 1, 0.3],
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
								ease: 'easeInOut',
								times: [0, 0.5, 1],
							}}
							className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2"
						>
							<div className="w-1 h-2 rounded-full bg-primary" />
						</motion.div>
					</motion.div>
				</section>

				{/* Other Sections */}
				<About />
				<Projects />
				<Testimonials />
				<Contact />
			</main>
		</>
	);
}
