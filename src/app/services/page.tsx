import React from 'react';
import Header from '../../components/Header';
import Link from 'next/link';

// Services data
const services = [
  {
    id: 1,
    title: "Custom Web Development",
    description: "We build tailor-made websites and web applications designed specifically for your business needs, ensuring they're scalable, secure, and maintainable.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    features: [
      "Custom design and development",
      "Responsive across all devices",
      "Integration with third-party systems",
      "Performance optimization",
      "Ongoing maintenance and support"
    ]
  },
  {
    id: 2,
    title: "E-commerce Development",
    description: "Transform your business with a powerful online store that drives sales, streamlines operations, and delivers exceptional customer experiences.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
    features: [
      "Custom shopping cart development",
      "Secure payment gateway integration",
      "Inventory management systems",
      "Order processing workflows",
      "Mobile commerce optimization"
    ]
  },
  {
    id: 3,
    title: "Responsive Web Design",
    description: "Create visually stunning websites that adapt perfectly to all devices, ensuring an optimal user experience for your visitors wherever they are.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    features: [
      "Mobile-first design approach",
      "Cross-browser compatibility",
      "Fluid grid layouts",
      "Touch-friendly navigation",
      "Optimized images and assets"
    ]
  },
  {
    id: 4,
    title: "Web Application Development",
    description: "Build powerful, feature-rich web applications that solve complex business problems and streamline operations.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    features: [
      "Custom application development",
      "User authentication & authorization",
      "Database design and optimization", 
      "API development and integration",
      "Real-time features and updates"
    ]
  },
  {
    id: 5,
    title: "Search Engine Optimization",
    description: "Improve your website's visibility in search results and drive more organic traffic with our comprehensive SEO strategies.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    features: [
      "Keyword research & strategy",
      "On-page SEO optimization",
      "Technical SEO improvements",
      "Content optimization",
      "Performance monitoring & reporting"
    ]
  },
  {
    id: 6,
    title: "Website Maintenance & Support",
    description: "Keep your website secure, up-to-date, and performing optimally with our comprehensive maintenance and support services.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    features: [
      "Regular software updates",
      "Security monitoring & patches",
      "Performance optimization",
      "Content updates",
      "Technical support & troubleshooting"
    ]
  },
];

export const metadata = {
  title: 'Services | GDevelopers',
  description: 'Explore our comprehensive web development services including custom websites, e-commerce solutions, and more.'
};

export default function ServicesPage() {
  return (
    <>
      <Header 
        title="Our Services" 
        subtitle="Comprehensive web development solutions tailored to your needs" 
        height="small"
      />
      
      <div className="container mx-auto px-4 py-16">
        {/* Services Intro */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            At GDevelopers, we provide a full range of web development services to help businesses of all sizes establish a strong online presence. 
            Our team of experienced developers, designers, and digital strategists work together to deliver solutions that drive real business results.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        {/* Process Section */}
        <div className="max-w-4xl mx-auto mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Development Process</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We follow a structured approach to ensure every project is delivered on time, within budget, and to your complete satisfaction.
            </p>
          </div>
          
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3">
                <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto">
                  <span className="text-3xl font-bold">1</span>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Discovery & Planning</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We begin by understanding your business goals, target audience, and project requirements. Our team conducts thorough research and creates a detailed project plan with timelines and deliverables.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3">
                <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto">
                  <span className="text-3xl font-bold">2</span>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Design & Prototyping</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our designers create wireframes and mockups that visualize the user interface and experience. You'll have the opportunity to review and provide feedback before development begins.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3">
                <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto">
                  <span className="text-3xl font-bold">3</span>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Development</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our development team brings the design to life using modern technologies and best practices. We build with scalability, security, and performance in mind.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3">
                <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto">
                  <span className="text-3xl font-bold">4</span>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Testing & Quality Assurance</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We rigorously test every aspect of your website or application to ensure it functions correctly across all devices and browsers and is free of bugs.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3">
                <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto">
                  <span className="text-3xl font-bold">5</span>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Deployment & Launch</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Once approved, we deploy your website or application to your hosting environment and ensure everything is working properly.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3">
                <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto">
                  <span className="text-3xl font-bold">6</span>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ongoing Support & Maintenance</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We provide ongoing support and maintenance to ensure your website or application remains secure, up-to-date, and performing optimally.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="max-w-5xl mx-auto mt-24 bg-blue-600 rounded-xl overflow-hidden shadow-xl">
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