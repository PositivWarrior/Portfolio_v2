'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

const testimonials = [
	{
		content:
			"I have been using Kacper's services for quite some time now, and I can confidently recommend him to everyone. Kacper is truly committed to providing effective assistance to his clients. From the very beginning, our collaboration was clear, professional, and pleasant. If you're looking for a great deal and top-notch service, choose Kacper. I am extremely satisfied with our cooperation.",
		author: 'Magda Wykret',
		role: 'LukMeg',
	},
];

export default function Testimonials() {
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

				<div className="grid gap-8 max-w-4xl mx-auto">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={index}
							variants={fadeInUp}
							initial="initial"
							whileInView="animate"
							viewport={{ once: true }}
							className="bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-primary/10 hover:border-primary/20 transition-colors"
						>
							<p className="text-lg text-foreground/80 mb-6 italic">
								"{testimonial.content}"
							</p>
							<div className="flex items-center justify-end">
								<div className="text-right">
									<p className="font-semibold text-foreground">
										{testimonial.author}
									</p>
									<p className="text-sm text-foreground/60">
										{testimonial.role}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
