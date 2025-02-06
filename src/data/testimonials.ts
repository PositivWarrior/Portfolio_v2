export interface Testimonial {
	id: string;
	name: string;
	role: string;
	company?: string;
	image: string;
	text: string;
	date: string;
	verified: boolean;
}

export const testimonials: Testimonial[] = [
	{
		id: '1',
		name: 'John Smith',
		role: 'Project Owner',
		company: 'Local Business',
		image: '', // Empty string for initials
		text: 'Kacper helped transform our business idea into reality. His technical skills and attention to detail were exactly what we needed.',
		date: '2024-01',
		verified: true,
	},
	{
		id: '2',
		name: 'Sarah Johnson',
		role: 'CEO at TechStart',
		image: '',
		text: 'Working with this developer was an absolute pleasure. Their attention to detail and technical expertise helped bring our vision to life.',
		date: '2023-12',
		verified: true,
	},
	{
		id: '3',
		name: 'Michael Chen',
		role: 'Product Manager',
		image: '',
		text: 'Exceptional problem-solving skills and great communication throughout the project. Delivered everything on time and exceeded our expectations.',
		date: '2023-11',
		verified: true,
	},
];
