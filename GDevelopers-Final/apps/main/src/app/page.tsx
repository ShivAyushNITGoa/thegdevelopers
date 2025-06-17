import Link from "next/link";
import { Button } from "ui";

export default function Home() {
  const features = [
    {
      icon: "🚀",
      title: "Fast Development",
      description: "Build and deploy applications quickly with our modern tech stack."
    },
    {
      icon: "🔄",
      title: "Seamless Integration",
      description: "All our applications work together for a cohesive user experience."
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Optimized for all devices from mobile phones to large desktop screens."
    },
    {
      icon: "🔒",
      title: "Secure Architecture",
      description: "Built with security best practices to keep your data safe."
    }
  ];

  const projects = [
    {
      title: "Healthcare Portal",
      description: "Patient management system with telemedicine features.",
      image: "🏥",
      link: "#"
    },
    {
      title: "E-commerce Platform",
      description: "Full-featured online store with inventory management.",
      image: "🛒",
      link: "#"
    },
    {
      title: "Financial Dashboard",
      description: "Real-time analytics and reporting for financial data.",
      image: "📊",
      link: "#"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to The GDevelopers Portal
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              A modern multi-app platform built with Next.js, React, TypeScript, and Tailwind CSS.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="primary" asChild>
                <Link href="/blog">Explore Our Blog</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover what makes our platform stand out from the rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
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
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Take a look at some of our recent work that showcases our expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
              >
                <div className="h-48 bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-6xl">
                  {project.image}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>
                  <Link 
                    href={project.link} 
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" asChild>
              <Link href="/projects">View All Projects</Link>
            </Button>
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
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-8 shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">Blog</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Explore our insights, tutorials, and updates about the latest in technology and development.
              </p>
              <Link
                href="/blog"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Visit the Blog →
              </Link>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-8 shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3">Team</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Meet our talented team of developers, designers, and strategists who bring your ideas to life.
              </p>
              <Link
                href="/team"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                Meet the Team →
              </Link>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-8 shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">Contact</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Ready to start your next project? Get in touch with our team to discuss your requirements.
              </p>
              <Link
                href="/contact"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
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
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
} 