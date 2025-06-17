import React from 'react';
import Header from '../../components/Header';

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO, StyleShop Inc.',
    image: 'https://via.placeholder.com/150',
    content: 'GDevelopers completely transformed our online presence. Our e-commerce platform now handles high traffic seamlessly, and the user experience has received overwhelmingly positive feedback from our customers. The team was professional, responsive, and delivered ahead of schedule.',
    rating: 5,
    project: 'E-commerce Platform'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO, MediCare Group',
    image: 'https://via.placeholder.com/150',
    content: 'Working with GDevelopers on our healthcare portal was a fantastic experience. They understood the unique challenges of building a secure, HIPAA-compliant system and delivered an elegant solution that our staff and patients love. Their technical expertise is outstanding.',
    rating: 5,
    project: 'Healthcare Portal'
  },
  {
    id: 3,
    name: 'David Rodriguez',
    role: 'Director, PropertyFinder LLC',
    image: 'https://via.placeholder.com/150',
    content: 'The real estate application GDevelopers built for us has been a game-changer. The search functionality and virtual tour features have significantly increased our conversions. Their team took the time to understand our business needs and delivered a solution that exceeded our expectations.',
    rating: 4,
    project: 'Real Estate Application'
  },
  {
    id: 4,
    name: 'Emily Taylor',
    role: 'Marketing Director, InvestSmart Co.',
    image: 'https://via.placeholder.com/150',
    content: 'Our financial dashboard project with GDevelopers was completed on time and within budget. The data visualization tools they implemented have made complex financial information accessible to our clients. Their attention to detail and commitment to quality is impressive.',
    rating: 5,
    project: 'Financial Dashboard'
  },
  {
    id: 5,
    name: 'Alex Wong',
    role: 'Owner, FoodDelight Chain',
    image: 'https://via.placeholder.com/150',
    content: 'GDevelopers revolutionized our restaurant operations with their custom ordering system. The integration with our kitchen display and inventory management has streamlined our entire workflow. Their support during implementation was exceptional.',
    rating: 5,
    project: 'Restaurant Ordering System'
  },
  {
    id: 6,
    name: 'Jessica Adams',
    role: 'Fitness Director, FitLife Gym',
    image: 'https://via.placeholder.com/150',
    content: 'The fitness tracking app developed by GDevelopers has been a hit with our members. The intuitive UI and comprehensive tracking features have helped improve member engagement and retention. Their team was collaborative and receptive to feedback throughout the process.',
    rating: 4,
    project: 'Fitness Tracking App'
  },
  {
    id: 7,
    name: 'Robert Kim',
    role: 'Founder, EduLearn Platform',
    image: 'https://via.placeholder.com/150',
    content: 'GDevelopers built an exceptional learning management system for our educational platform. Their expertise in creating engaging, accessible interfaces has made a significant impact on our student engagement metrics. They were true partners in our success.',
    rating: 5,
    project: 'Learning Management System'
  },
  {
    id: 8,
    name: 'Olivia Martinez',
    role: 'VP of Digital, TravelWise Agency',
    image: 'https://via.placeholder.com/150',
    content: 'Our travel booking platform needed a complete overhaul, and GDevelopers delivered beyond our expectations. The new system has improved booking completion rates by 45% and provided a seamless experience across all devices. Their team is truly top-notch.',
    rating: 5,
    project: 'Travel Booking Platform'
  }
];

// Case studies data
const caseStudies = [
  {
    id: 1,
    client: 'StyleShop Inc.',
    title: 'E-commerce Platform Redesign',
    description: 'How we helped StyleShop increase conversion rates by 35% with a responsive, user-centered design.',
    image: 'https://via.placeholder.com/600x400',
    link: '/portfolio/e-commerce-platform'
  },
  {
    id: 2,
    client: 'MediCare Group',
    title: 'Healthcare Portal Development',
    description: 'Building a secure, HIPAA-compliant patient portal that improved appointment scheduling efficiency by 40%.',
    image: 'https://via.placeholder.com/600x400',
    link: '/portfolio/healthcare-portal'
  },
  {
    id: 3,
    client: 'FoodDelight Chain',
    title: 'Restaurant Ordering System',
    description: 'Creating a seamless ordering experience that reduced order processing time by 60% and increased average order value.',
    image: 'https://via.placeholder.com/600x400',
    link: '/portfolio/restaurant-ordering'
  }
];

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${
            index < rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      ))}
    </div>
  );
};

export const metadata = {
  title: 'Testimonials | GDevelopers',
  description: "Read what our clients have to say about working with GDevelopers. Discover how we've helped businesses succeed with our web development solutions."
};

export default function TestimonialsPage() {
  return (
    <>
      <Header 
        title="Client Success Stories" 
        subtitle="Hear what our clients have to say about working with us" 
        height="small"
      />
      
      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We're proud of the relationships we've built with our clients and the success they've achieved with our solutions. 
            Here are some thoughts from the companies we've had the pleasure of working with.
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="mb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 flex flex-col h-full"
            >
              <div className="mb-6">
                <StarRating rating={testimonial.rating} />
              </div>
              <blockquote className="text-gray-600 dark:text-gray-300 italic mb-6 flex-grow">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center mt-auto">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">{testimonial.project}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Featured Case Studies */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Featured Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy) => (
              <div 
                key={caseStudy.id} 
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img 
                  src={caseStudy.image} 
                  alt={caseStudy.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{caseStudy.client}</p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{caseStudy.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{caseStudy.description}</p>
                  <a 
                    href={caseStudy.link} 
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium inline-flex items-center"
                  >
                    Read Case Study
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mb-24 bg-gray-50 dark:bg-gray-900 py-16 px-4 rounded-xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Success by the Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">98%</p>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Client Satisfaction</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">50+</p>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Successful Projects</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">35%</p>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Avg. Conversion Increase</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">40%</p>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Avg. Performance Improvement</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to Join Our Success Stories?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Let's discuss how we can help your business achieve its digital goals with our custom web development solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/contact" 
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Schedule a Consultation
            </a>
            <a 
              href="/portfolio" 
              className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition-colors"
            >
              View Our Portfolio
            </a>
          </div>
        </div>
      </div>
    </>
  );
} 