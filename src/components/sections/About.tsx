'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
	FaReact,
	FaNodeJs,
	FaGitAlt,
	FaDownload,
	FaLaravel,
	FaDocker,
	FaDatabase,
} from 'react-icons/fa';
import {
	SiTypescript,
	SiTailwindcss,
	SiNextdotjs,
	SiSupabase,
	SiFirebase,
} from 'react-icons/si';

const skills = [
	{ icon: FaReact, name: 'React' },
	{ icon: SiNextdotjs, name: 'Next.js' },
	{ icon: SiTypescript, name: 'TypeScript' },
	{ icon: FaNodeJs, name: 'Node.js' },
	{ icon: SiTailwindcss, name: 'Tailwind' },
	{ icon: FaGitAlt, name: 'Git' },
	{ icon: FaLaravel, name: 'Laravel' },
	{ icon: FaDocker, name: 'Docker' },
	{ icon: FaDatabase, name: 'Databases' },
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
		},
	},
};

export default function About() {
	const handleDownloadCV = () => {
		const cvUrl = '/Kacper Margol DEV CV EN.pdf';
		window.open(cvUrl, '_blank');
	};

	return (
		<section id="about" className="py-20 bg-black">
			<div className="container mx-auto px-4">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					{/* Profile Image with Hover Effect */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="relative aspect-square max-w-md mx-auto group"
					>
						{/* Animated Border */}
						<div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse" />

						{/* Profile Image */}
						<div className="relative rounded-full overflow-hidden border-4 border-primary">
							<Image
								src="/Kacpru.jpg"
								alt="Profile"
								width={400}
								height={400}
								priority
								className="rounded-full object-cover transition-transform duration-700 group-hover:scale-110"
							/>

							{/* Overlay with Download Button */}
							<motion.div
								className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
								initial={{ opacity: 0 }}
								whileHover={{ opacity: 1 }}
							>
								<motion.button
									onClick={handleDownloadCV}
									className="flex flex-col items-center gap-3 text-white transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
									whileHover={{ scale: 1.1 }}
								>
									<motion.div
										className="p-4 rounded-full gradient-border glass-effect"
										whileHover={{
											boxShadow:
												'0 0 20px rgba(255,255,255,0.2)',
										}}
									>
										<FaDownload className="w-6 h-6" />
									</motion.div>
									<span className="font-medium text-sm">
										Download CV
									</span>
								</motion.button>
							</motion.div>
						</div>
					</motion.div>

					{/* Content */}
					<div className="space-y-8">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-4xl font-bold text-gradient"
						>
							About Me
						</motion.h2>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
							className="text-lg text-foreground/80"
						>
							I'm a passionate Full-Stack Developer with expertise
							in modern web technologies. I love creating
							beautiful, responsive, and user-friendly
							applications that solve real-world problems.
						</motion.p>

						{/* Skills Grid */}
						<motion.div
							variants={containerVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							className="grid grid-cols-3 gap-4"
						>
							{skills.map((skill) => (
								<motion.div
									key={skill.name}
									variants={itemVariants}
									className="flex flex-col items-center p-4 rounded-lg bg-secondary/50
                    border border-primary/20 hover:border-primary/50 transition-colors"
								>
									<skill.icon className="w-8 h-8 text-primary mb-2" />
									<span className="text-sm text-foreground/80">
										{skill.name}
									</span>
								</motion.div>
							))}
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
