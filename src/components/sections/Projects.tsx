'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
	{
		title: 'Marblogger',
		description:
			'MERN stack blog app with authentication, user management, and CRUD operations for blog posts.',
		image: '/marblogger.png',
		github: 'https://github.com/PositivWarrior/mern-blog',
		live: 'https://marblogger.onrender.com/',
		tags: [
			'React',
			'Redux',
			'Node.js',
			'Express',
			'MongoDB',
			'JWT',
			'Firebase',
			'Mongoose',
			'bcrypt.js',
		],
	},
	{
		title: 'MLVri',
		description:
			'A simple page for a moving/renovation company with smooth animations and email integration.',
		image: '/MLVri.png',
		github: 'https://github.com/PositivWarrior/mlvri',
		live: 'https://mlvri.vercel.app/',
		tags: [
			'React.js',
			'Tailwind CSS',
			'Framer Motion',
			'EmailJS',
			'Heroicons',
		],
	},
	{
		title: 'AI Content Generator',
		description: 'An AI-powered content generation tool using OpenAI API.',
		image: '',
		github: '#',
		live: '#',
		tags: ['React', 'Python', 'OpenAI'],
	},
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
	},
};

export default function Projects() {
	return (
		<section id="projects" className="relative py-20 overflow-hidden">
			{/* Background gradient */}
			<div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-primary/10">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
			</div>

			<div className="container relative mx-auto px-4">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-4xl font-bold text-gradient text-center mb-12"
				>
					Featured Projects
				</motion.h2>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					{projects.map((project) => (
						<motion.div
							key={project.title}
							variants={itemVariants}
							className="group relative backdrop-blur-sm rounded-xl overflow-hidden
                gradient-border glass-effect hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
						>
							{/* Project Image */}
							<div className="relative h-48">
								<Image
									src={project.image}
									alt={project.title}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									className="object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</div>

							{/* Project Info */}
							<div className="p-6 space-y-4">
								<h3 className="text-xl font-semibold text-gradient">
									{project.title}
								</h3>
								<p className="text-foreground/80">
									{project.description}
								</p>

								{/* Tags */}
								<div className="flex flex-wrap gap-2">
									{project.tags.map((tag) => (
										<span
											key={tag}
											className="px-3 py-1 text-xs bg-primary/10 text-primary/90 rounded-full
                        border border-primary/20 whitespace-nowrap"
										>
											{tag}
										</span>
									))}
								</div>

								{/* Links */}
								<div className="flex gap-4 pt-4">
									<a
										href={project.github}
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary/80 hover:text-primary transition-colors"
									>
										<FaGithub className="w-6 h-6" />
									</a>
									<a
										href={project.live}
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary/80 hover:text-primary transition-colors"
									>
										<FaExternalLinkAlt className="w-5 h-5" />
									</a>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
