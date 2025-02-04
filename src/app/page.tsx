'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'

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
    }
  }
}

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.6,
    }
  }
}

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
    }
  }
}

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
                ease: [0.22, 1, 0.36, 1]
              }}
              className="absolute inset-0 bg-black/80 z-10" 
            />
            <motion.div
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 3,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative w-full h-full hero-image-mask"
            >
              <Image
                src="/hero-bg.jpg"
                alt="Background"
                fill
                className="object-cover object-center opacity-40"
                priority
              />
            </motion.div>
          </div>

          {/* Background Gradients */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ 
                duration: 3,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/30 via-transparent to-transparent blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ 
                duration: 3,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/30 via-transparent to-transparent blur-3xl"
            />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="relative z-10 text-center space-y-8 max-w-4xl"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-6xl md:text-8xl font-bold text-gradient"
            >
              John Doe
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-foreground/90"
            >
              Full-Stack Developer with a passion for creating beautiful, user-centric digital experiences
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link 
                href="#projects"
                className="px-8 py-3 text-lg font-semibold gradient-border glass-effect
                  transition-all duration-1000 hover:scale-105 hover:shadow-lg hover:shadow-primary/20
                  group relative overflow-hidden"
              >
                <span className="relative z-10">View My Work</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ 
                    duration: 1.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                />
              </Link>
              <Link 
                href="#contact"
                className="px-8 py-3 text-lg font-semibold text-primary hover:text-accent
                  transition-all duration-1000"
              >
                Get in Touch
              </Link>
            </motion.div>
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
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1]
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
  )
} 