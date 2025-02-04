'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const socialLinks = [
  {
    icon: FaGithub,
    href: 'https://github.com/yourusername',
    label: 'GitHub',
  },
  {
    icon: FaLinkedin,
    href: 'https://linkedin.com/in/yourusername',
    label: 'LinkedIn',
  },
  {
    icon: FaTwitter,
    href: 'https://twitter.com/yourusername',
    label: 'Twitter',
  },
]

const inputVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add form submission logic here
  }

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-gold text-center mb-12"
        >
          Get In Touch
        </motion.h2>

        <div className="max-w-2xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <motion.div variants={inputVariants}>
              <label htmlFor="name" className="block text-gold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-secondary/50 border border-gold/20 rounded-lg
                  text-gold placeholder-gold/50 focus:border-gold focus:outline-none
                  transition-colors"
                placeholder="Your name"
              />
            </motion.div>

            <motion.div variants={inputVariants}>
              <label htmlFor="email" className="block text-gold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-secondary/50 border border-gold/20 rounded-lg
                  text-gold placeholder-gold/50 focus:border-gold focus:outline-none
                  transition-colors"
                placeholder="your@email.com"
              />
            </motion.div>

            <motion.div variants={inputVariants}>
              <label htmlFor="message" className="block text-gold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 bg-secondary/50 border border-gold/20 rounded-lg
                  text-gold placeholder-gold/50 focus:border-gold focus:outline-none
                  transition-colors resize-none"
                placeholder="Your message..."
              />
            </motion.div>

            <motion.div variants={inputVariants}>
              <button
                type="submit"
                className="w-full py-3 px-8 bg-gold text-black font-semibold rounded-lg
                  hover:bg-gold/90 hover:shadow-[0_0_15px_rgba(255,215,0,0.5)]
                  transition-all duration-300"
              >
                Send Message
              </button>
            </motion.div>
          </motion.form>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex justify-center space-x-6 mt-12"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/80 hover:text-gold transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
} 