"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-16 md:py-24">
        {/* Animated gradient background */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950 dark:via-gray-900 dark:to-purple-950" />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
              The GDevelopers
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Transforming ideas into exceptional digital experiences through innovative development and design.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Link
              href="/projects"
              className="px-8 py-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
            >
              View Our Projects
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What We Do
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We specialize in building exceptional digital experiences through a combination of cutting-edge technology and creative design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Modern Web Development",
                description: "Building responsive, accessible, and performant websites and web applications using the latest technologies.",
                icon: "🌐",
              },
              {
                title: "Mobile Applications",
                description: "Creating native and cross-platform mobile experiences that delight users and drive engagement.",
                icon: "📱",
              },
              {
                title: "UI/UX Design",
                description: "Crafting beautiful, intuitive user interfaces and experiences that put users first.",
                icon: "🎨",
              },
              {
                title: "Cloud Solutions",
                description: "Implementing scalable, secure cloud infrastructures that grow with your business needs.",
                icon: "☁️",
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Take a look at some of our recent work that showcases our expertise and creativity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-Commerce Platform",
                description: "A fully-featured e-commerce platform with custom CMS, payment processing, and analytics dashboard.",
                link: "/projects/ecommerce-platform",
              },
              {
                title: "Mobile Banking App",
                description: "Secure and intuitive mobile banking application with biometric authentication and real-time notifications.",
                link: "/projects/mobile-banking",
              },
              {
                title: "Healthcare Portal",
                description: "Patient management system with telemedicine features, appointment scheduling, and medical records storage.",
                link: "/projects/healthcare-portal",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-80 z-10" />
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-4xl">🖼️</span>
                  </div>
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      href={project.link}
                      className="px-4 py-2 bg-white dark:bg-gray-800 rounded-md text-blue-600 dark:text-blue-400 font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* App Sections Showcase */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Explore Our Multi-App Platform
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our platform consists of multiple specialized applications, all working together under one cohesive experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">Blog</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Explore our insights, tutorials, and updates about the latest in technology and development.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                Visit the Blog →
              </Link>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3">Team</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Meet our talented team of developers, designers, and strategists who bring your ideas to life.
              </p>
              <Link
                href="/team"
                className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:underline"
              >
                Meet the Team →
              </Link>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">Contact</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Ready to start your next project? Get in touch with our team to discuss your requirements.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your digital presence?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Let's work together to create something amazing that delivers real results for your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 border-2 border-white rounded-lg text-lg font-medium bg-transparent hover:bg-white hover:text-blue-600 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
} 