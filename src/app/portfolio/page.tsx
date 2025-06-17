import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

// Portfolio project data
const portfolioProjects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured online store with inventory management, payment processing, and customer accounts.',
    image: 'https://via.placeholder.com/800x600',
    category: 'Web Application',
    client: 'StyleShop Inc.',
    technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Stripe'],
    link: '/portfolio/e-commerce-platform'
  },
  {
    id: 2,
    title: 'Healthcare Portal',
    description: 'Patient management system with secure data handling, appointment scheduling, and telehealth integration.',
    image: 'https://via.placeholder.com/800x600',
    category: 'Web Application',
    client: 'MediCare Group',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'WebRTC', 'AWS'],
    link: '/portfolio/healthcare-portal'
  },
  {
    id: 3,
    title: 'Real Estate Application',
    description: 'Property listing and management application with advanced search features and virtual tours.',
    image: 'https://via.placeholder.com/800x600',
    category: 'Web Application',
    client: 'PropertyFinder LLC',
    technologies: ['Next.js', 'GraphQL', 'PostgreSQL', 'Google Maps API', 'AWS S3'],
    link: '/portfolio/real-estate-app'
  },
  {
    id: 4,
    title: 'Financial Dashboard',
    description: 'Interactive financial analytics dashboard with real-time data visualization and reporting.',
    image: 'https://via.placeholder.com/800x600',
    category: 'Dashboard',
    client: 'InvestSmart Co.',
    technologies: ['React', 'D3.js', 'Node.js', 'Express', 'MongoDB'],
    link: '/portfolio/financial-dashboard'
  },
  {
    id: 5,
    title: 'Restaurant Ordering System',
    description: 'Online ordering system with inventory tracking, kitchen display, and customer notifications.',
    image: 'https://via.placeholder.com/800x600',
    category: 'Web Application',
    client: 'FoodDelight Chain',
    technologies: ['React', 'Firebase', 'Node.js', 'Twilio API', 'Stripe'],
    link: '/portfolio/restaurant-ordering'
  },
  {
    id: 6,
    title: 'Fitness Tracking App',
    description: 'Mobile-responsive web application for tracking workouts, nutrition, and fitness goals.',
    image: 'https://via.placeholder.com/800x600',
    category: 'Web Application',
    client: 'FitLife Gym',
    technologies: ['React Native', 'Firebase', 'Node.js', 'Express', 'MongoDB'],
    link: '/portfolio/fitness-tracking'
  }
];

// Filter categories
const categories = ['All', 'Web Application', 'Dashboard', 'E-commerce', 'Mobile App'];

export const metadata = {
  title: 'Portfolio | GDevelopers',
  description: 'Explore our portfolio of web development projects including custom websites, e-commerce solutions, and web applications.'
};

export default function PortfolioPage() {
  return (
    <>
      <Header 
        title="Our Portfolio" 
        subtitle="Explore our latest web development projects" 
        height="small"
      />
      
      <div className="container mx-auto px-4 py-16">
        {/* Portfolio Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            At GDevelopers, we take pride in delivering exceptional web solutions that help businesses achieve their goals. 
            Browse through our portfolio to see examples of our work and the diverse range of industries we've served.
          </p>
        </div>
        
        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                index === 0 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioProjects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {project.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium">Client:</span> {project.client}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Link 
                  href={project.link} 
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Project
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="max-w-4xl mx-auto mt-20 bg-blue-600 rounded-xl overflow-hidden shadow-xl">
          <div className="px-6 py-12 md:p-12 md:flex md:items-center md:justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-white">Ready to start your project?</h2>
              <p className="mt-2 text-blue-100">
                Contact us today for a free consultation and let's discuss how we can help bring your vision to life.
              </p>
            </div>
            <div className="md:w-1/3 text-right">
              <Link
                href="/contact"
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-medium shadow-md hover:bg-blue-50 transition duration-200"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 