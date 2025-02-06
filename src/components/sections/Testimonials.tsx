'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { testimonials } from '@/data/testimonials';

interface Testimonial {
	name: string;
	role: string;
	image: string;
	text: string;
	company?: string;
	date: string;
	verified: boolean;
}

const slideVariants = {
	enter: (direction: number) => ({
		x: direction > 0 ? '100%' : '-100%',
		opacity: 0,
		scale: 0.95,
	}),
	center: {
		x: 0,
		opacity: 1,
		scale: 1,
		transition: {
			duration: 1.2,
			ease: [0.22, 1, 0.36, 1],
		},
	},
	exit: (direction: number) => ({
		x: direction < 0 ? '100%' : '-100%',
		opacity: 0,
		scale: 0.95,
		transition: {
			duration: 1.2,
			ease: [0.22, 1, 0.36, 1],
		},
	}),
};

const fadeInVariants = {
	initial: { opacity: 0, y: 20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 1.5,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
	return Math.abs(offset) * velocity;
};

const TestimonialAvatar = ({
	image,
	name,
}: {
	image: string;
	name: string;
}) => {
	const [imageError, setImageError] = useState(false);

	const initials = name
		.split(' ')
		.map((n) => n[0])
		.join('');

	const InitialsPlaceholder = () => (
		<div
			className="w-full h-full rounded-full bg-primary/10 border-2 border-primary 
				flex items-center justify-center text-2xl font-bold text-primary"
		>
			{initials}
		</div>
	);

	if (imageError || !image) {
		return <InitialsPlaceholder />;
	}

	return (
		<div className="relative w-24 h-24">
			<Image
				src={image}
				alt={name}
				fill
				className="rounded-full object-cover border-2 border-primary"
				onError={() => setImageError(true)}
			/>
		</div>
	);
};

export default function Testimonials() {
	const [[page, direction], setPage] = useState([0, 0]);
	const [isPaused, setIsPaused] = useState(false);

	const testimonialIndex = Math.abs(page % testimonials.length);

	const paginate = (newDirection: number) => {
		setPage([page + newDirection, newDirection]);
	};

	useEffect(() => {
		if (!isPaused) {
			const timer = setTimeout(() => {
				paginate(1);
			}, 6000);
			return () => clearTimeout(timer);
		}
	}, [page, isPaused]);

	return (
		<section id="testimonials" className="py-20 bg-black">
			<div className="container mx-auto px-4">
				<motion.h2
					variants={fadeInVariants}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
					className="text-4xl font-bold text-gradient text-center mb-16"
				>
					Client Testimonials
				</motion.h2>

				<div
					className="relative max-w-4xl mx-auto"
					onMouseEnter={() => setIsPaused(true)}
					onMouseLeave={() => setIsPaused(false)}
				>
					{/* Navigation Buttons */}
					<motion.button
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
						onClick={() => paginate(-1)}
						className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-24
              text-primary/50 hover:text-primary transition-colors z-10"
						aria-label="Previous testimonial"
					>
						<FaChevronLeft className="w-8 h-8" />
					</motion.button>

					<motion.button
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
						onClick={() => paginate(1)}
						className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-24
              text-primary/50 hover:text-primary transition-colors z-10"
						aria-label="Next testimonial"
					>
						<FaChevronRight className="w-8 h-8" />
					</motion.button>

					{/* Testimonial Cards */}
					<div className="overflow-hidden">
						<AnimatePresence
							initial={false}
							custom={direction}
							mode="wait"
						>
							<motion.div
								key={page}
								custom={direction}
								variants={slideVariants}
								initial="enter"
								animate="center"
								exit="exit"
								className="gradient-border glass-effect p-8"
							>
								<div className="flex flex-col items-center text-center space-y-6">
									<motion.div
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{
											duration: 0.8,
											delay: 0.2,
										}}
									>
										<FaQuoteLeft className="w-8 h-8 text-primary/40" />
									</motion.div>

									<motion.div
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{
											duration: 0.8,
											delay: 0.3,
										}}
										className="relative w-24 h-24"
									>
										<TestimonialAvatar
											image={
												testimonials[testimonialIndex]
													.image
											}
											name={
												testimonials[testimonialIndex]
													.name
											}
										/>
									</motion.div>

									<motion.blockquote
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{
											duration: 0.8,
											delay: 0.4,
										}}
										className="text-lg text-foreground/80 max-w-2xl"
									>
										{testimonials[testimonialIndex].text}
									</motion.blockquote>

									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{
											duration: 0.8,
											delay: 0.5,
										}}
									>
										<cite className="not-italic">
											<div className="font-semibold text-gradient">
												{
													testimonials[
														testimonialIndex
													].name
												}
											</div>
											<div className="text-sm text-foreground/60">
												{
													testimonials[
														testimonialIndex
													].role
												}
											</div>
										</cite>
									</motion.div>
								</div>
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Dots Indicator */}
					<div className="flex justify-center space-x-2 mt-8">
						{testimonials.map((_, index) => (
							<motion.button
								key={index}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{
									opacity: 1,
									scale: 1,
									width:
										index === testimonialIndex
											? '2rem'
											: '0.5rem',
								}}
								transition={{
									duration: 0.8,
									ease: [0.22, 1, 0.36, 1],
								}}
								onClick={() =>
									setPage([
										index,
										index > testimonialIndex ? 1 : -1,
									])
								}
								className={`h-2 rounded-full transition-all duration-500 ${
									index === testimonialIndex
										? 'bg-primary'
										: 'bg-primary/30'
								}`}
								aria-label={`Go to testimonial ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
