'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { useState, useEffect } from 'react';

const testimonials = [
	{
		content:
			"I have been using Kacper's services for quite some time now, and I can confidently recommend him to everyone. Kacper is truly committed to providing effective assistance to his clients. From the very beginning, our collaboration was clear, professional, and pleasant. If you're looking for a great deal and top-notch service, choose Kacper. I am extremely satisfied with our cooperation.",
		author: 'Magda Wykret',
		role: 'LukMeg',
	},
	{
		content:
			"Super happy with website made by Kacper. Looks professional, it's easy to navigate and really satisfies my needs. I didn't need to budge a finger- Kacper really captured everything I was hoping for and provided insightful advice. The cooperation was smooth, Kacper followed my requests / wishes on the specifications and the final results are super cool! He's passionate about his work and really listens to the customers. He did great!",
		author: 'Dawid Siedlec',
		role: 'FotoDS',
	},
	{
		content:
			"Words can't fully express how positive my experience was working with Kacper. His remarkable professionalism combined with flawless professional intuition ensures that anyone who gets the chance to work with him will be pleasantly surprised. Kacper's creativity, along with his positive attitude, is a guaranteed recipe for success and satisfaction with the final product. I wholeheartedly recommend him and sincerely thank him for such a pleasant collaboration.",
		author: 'Robert Gawlak',
		role: 'Gawlaktrans',
	},
];

export default function Testimonials() {
	const [current, setCurrent] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	useEffect(() => {
		if (!isAutoPlaying) return;

		const timer = setInterval(() => {
			setCurrent((prev) => (prev + 1) % testimonials.length);
		}, 5000); // Change slide every 5 seconds

		return () => clearInterval(timer);
	}, [isAutoPlaying]);

	const next = () => {
		setIsAutoPlaying(false);
		setCurrent((prev) => (prev + 1) % testimonials.length);
	};

	const prev = () => {
		setIsAutoPlaying(false);
		setCurrent(
			(prev) => (prev - 1 + testimonials.length) % testimonials.length,
		);
	};

	return (
		<section
			id="testimonials"
			className="py-20 bg-black relative overflow-hidden"
		>
			<div className="container mx-auto px-4">
				<motion.h2
					variants={fadeInUp}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
					className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient"
				>
					Testimonials
				</motion.h2>

				<div className="relative max-w-4xl mx-auto">
					<div className="overflow-hidden">
						<motion.div
							key={current}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5 }}
							className="bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-primary/10 hover:border-primary/20 transition-colors"
						>
							<p className="text-lg text-foreground/80 mb-6 italic">
								"{testimonials[current].content}"
							</p>
							<div className="flex items-center justify-end">
								<div className="text-right">
									<p className="font-semibold text-foreground">
										{testimonials[current].author}
									</p>
									<p className="text-sm text-foreground/60">
										{testimonials[current].role}
									</p>
								</div>
							</div>
						</motion.div>
					</div>

					{/* Updated Navigation Dots */}
					<div className="flex justify-center items-center gap-4 mt-8">
						{testimonials.map((_, index) => (
							<button
								key={index}
								onClick={() => {
									setIsAutoPlaying(false);
									setCurrent(index);
								}}
								className="group relative"
								aria-label={`Go to testimonial ${index + 1}`}
							>
								<div
									className={`w-2 h-2 rounded-full transition-all duration-300 ${
										current === index
											? 'w-8 bg-primary'
											: 'bg-primary/30 group-hover:bg-primary/50'
									}`}
								/>
							</button>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
