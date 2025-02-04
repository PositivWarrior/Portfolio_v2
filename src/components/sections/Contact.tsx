'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

const socialLinks = [
  {
    icon: FaGithub,
    href: 'https://github.com/PositivWarrior',
    label: 'GitHub',
  },
  {
    icon: FaLinkedin,
    href: 'https://www.linkedin.com/in/kacper-margol-545493195/',
    label: 'LinkedIn',
  },
]

const inputVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    try {
      setIsSubmitting(true)
      setSubmitStatus('idle')

      // Replace these with your actual EmailJS credentials
      const result = await emailjs.sendForm(
        'service_kj3h7dp',
        'template_dewkewe',
        formRef.current,
        'ouIL0a7IpDVcizQLE'
      )

      if (result.text === 'OK') {
        setSubmitStatus('success')
        formRef.current.reset()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Failed to send email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section 
      id="contact" 
      className="relative py-20 overflow-hidden"
    >
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
          Get In Touch
        </motion.h2>

        <div className="max-w-2xl mx-auto backdrop-blur-sm rounded-xl p-8 border border-primary/10">
          <motion.form
            ref={formRef}
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
              <label htmlFor="name" className="block text-primary mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="user_name"
                required
                className="w-full px-4 py-3 bg-black/50 border border-primary/20 rounded-lg
                  text-foreground placeholder-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none
                  transition-all duration-300"
                placeholder="Your name"
              />
            </motion.div>

            <motion.div variants={inputVariants}>
              <label htmlFor="email" className="block text-primary mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="user_email"
                required
                className="w-full px-4 py-3 bg-black/50 border border-primary/20 rounded-lg
                  text-foreground placeholder-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none
                  transition-all duration-300"
                placeholder="your@email.com"
              />
            </motion.div>

            <motion.div variants={inputVariants}>
              <label htmlFor="message" className="block text-primary mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 bg-black/50 border border-primary/20 rounded-lg
                  text-foreground placeholder-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none
                  transition-all duration-300 resize-none"
                placeholder="Your message..."
              />
            </motion.div>

            <motion.div variants={inputVariants}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-8 font-bold text-white
                  bg-gradient-to-r from-primary to-primary/80
                  hover:from-primary/90 hover:to-primary/70
                  rounded-lg shadow-lg shadow-primary/20
                  transition-all duration-300 hover:scale-[1.02]
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                  relative overflow-hidden
                  before:absolute before:inset-0 before:bg-gradient-to-r 
                  before:from-white/20 before:to-transparent
                  before:translate-x-[-100%] hover:before:translate-x-[100%] 
                  before:transition-transform before:duration-500"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center text-primary font-semibold"
                >
                  Message sent successfully!
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center text-red-400 font-semibold"
                >
                  Failed to send message. Please try again.
                </motion.p>
              )}
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
                className="text-primary/80 hover:text-primary transition-colors"
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