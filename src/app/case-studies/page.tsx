import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

// Case studies data
const caseStudies = [
  {
    id: 1,
    title: 'E-commerce Platform Redesign',
    client: 'StyleShop Inc.',
    industry: 'Retail',
    image: 'https://via.placeholder.com/800x600',
    excerpt: 'How we helped StyleShop increase conversion rates by 35% with a responsive, user-centered design.',
    results: [
      'Increased conversion rates by 35%',
      'Reduced cart abandonment by 28%',
      'Improved page load speed by 40%',
      'Increased mobile traffic by 45%'
    ],
    services: ['Web Design', 'UX/UI', 'Frontend Development', 'E-commerce'],
    link: '/case-studies/e-commerce-platform-redesign'
  },
  {
    id: 2,
    title: 'Healthcare Portal Development',
    client: 'MediCare Group',
    industry: 'Healthcare',
    image: 'https://via.placeholder.com/800x600',
    excerpt: 'Building a secure, HIPAA-compliant patient portal that improved appointment scheduling efficiency by 40%.',
    results: [
      'Reduced appointment scheduling time by 40%',
      'Increased patient satisfaction scores by 25%',
      'Streamlined administrative workflows by 30%',
      'Ensured full HIPAA compliance'
    ],
    services: ['Web Application', 'Backend Development', 'UX/UI', 'Security'],
    link: '/case-studies/healthcare-portal-development'
  },
  {
    id: 3,
    title: 'Restaurant Ordering System',
    client: 'FoodDelight Chain',
    industry: 'Food & Beverage',
    image: 'https://via.placeholder.com/800x600',
    excerpt: 'Creating a seamless ordering experience that reduced order processing time by 60% and increased average order value.',
    results: [
      'Reduced order processing time by 60%',
      'Increased average order value by 15%',
      'Improved kitchen efficiency by 25%',
      'Enhanced customer satisfaction with real-time updates'
    ],
    services: ['Web Application', 'Mobile App', 'UX/UI', 'Integration'],
    link: '/case-studies/restaurant-ordering-system'
  },
  {
    id: 4,
    title: 'Real Estate Application',
    client: 'PropertyFinder LLC',
    industry: 'Real Estate',
    image: 'https://via.placeholder.com/800x600',
    excerpt: 'Developing a property search platform with virtual tours that increased lead generation by 50%.',
    results: [
      'Increased lead generation by 50%',
      'Reduced property viewing time by implementing virtual tours',
      'Improved search functionality with advanced filters',
      'Integrated with multiple listing services'
    ],
    services: ['Web Application', 'Frontend Development', 'Backend Development', 'API Integration'],
    link: '/case-studies/real-estate-application'
  },
  {
    id: 5,
    title: 'Financial Dashboard',
    client: 'InvestSmart Co.',
    industry: 'Finance',
    image: 'https://via.placeholder.com/800x600',
    excerpt: 'Creating an interactive financial analytics dashboard with real-time data visualization and reporting.',
    results: [
      'Reduced financial analysis time by 65%',
      'Improved data accuracy by implementing real-time updates',
      'Created customizable reports for different user roles',
      'Enhanced security for sensitive financial data'
    ],
    services: ['Web Application', 'Data Visualization', 'Frontend Development', 'Backend Development'],
    link: '/case-studies/financial-dashboard'
  },
  {
    id: 6,
    title: 'Fitness Tracking App',
    client: 'FitLife Gym',
    industry: 'Health & Fitness',
    image: 'https://via.placeholder.com/800x600',
    excerpt: 'Building a cross-platform fitness app that increased member engagement by 40% and improved retention rates.',
    results: [
      'Increased member engagement by 40%',
      'Improved member retention rates by 25%',
      'Enhanced workout tracking and progress visualization',
      'Implemented social features for community building'
    ],
    services: ['Mobile App', 'Web Application', 'UX/UI', 'Backend Development'],
    link: '/case-studies/fitness-tracking-app'
  }
];

// Industries for filtering
const industries = ['All Industries', 'Retail', 'Healthcare', 'Food & Beverage', 'Real Estate', 'Finance', 'Health & Fitness'];

// Services for filtering
const services = ['All Services', 'Web Design', 'Web Application', 'Mobile App', 'UX/UI', 'Frontend Development', 'Backend Development', 'E-commerce', 'Integration', 'Security', 'Data Visualization'];

export const metadata = {
  title: 'Case Studies | GDevelopers',
  description: 'Explore our client success stories and discover how our web development solutions have helped businesses achieve their goals.'
};

export default function CaseStudiesPage() {
  return (
    <>
      <Header 
        title="Case Studies" 
        subtitle="Real results for real businesses" 
        height="small"
      />
      
      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explore our collection of case studies to see how we've helped businesses across various industries 
            solve complex challenges and achieve meaningful results with our web development solutions.
          </p>
        </div>
        
        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="w-full md:w-auto">
              <label htmlFor="industry-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Filter by Industry
              </label>
              <select 
                id="industry-filter" 
                className="w-full md:w-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-900 dark:text-white"
              >
                {industries.map((industry, index) => (
                  <option key={index} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-auto">
              <label htmlFor="service-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Filter by Service
              </label>
              <select 
                id="service-filter" 
                className="w-full md:w-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-gray-900 dark:text-white"
              >
                {services.map((service, index) => (
                  <option key={index} value={service}>{service}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {caseStudies.map((study) => (
            <div 
              key={study.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={study.image} 
                  alt={study.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {study.industry}
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{study.client}</p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{study.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{study.excerpt}</p>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Key Results:</p>
                  <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {study.results.slice(0, 2).map((result, index) => (
                      <li key={index}>{result}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {study.services.slice(0, 3).map((service, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300"
                    >
                      {service}
                    </span>
                  ))}
                  {study.services.length > 3 && (
                    <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-700 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                      +{study.services.length - 3} more
                    </span>
                  )}
                </div>
                
                <Link 
                  href={study.link} 
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Case Study
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="max-w-4xl mx-auto bg-blue-600 rounded-xl overflow-hidden shadow-xl">
          <div className="px-6 py-12 md:p-12 md:flex md:items-center md:justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-white">Ready to achieve similar results?</h2>
              <p className="mt-2 text-blue-100">
                Contact us today to discuss your project and discover how we can help you reach your business goals.
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