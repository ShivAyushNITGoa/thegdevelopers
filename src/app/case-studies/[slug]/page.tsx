import React from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';

// Mock database of case studies
const caseStudiesData = {
  'e-commerce-platform-redesign': {
    title: 'E-commerce Platform Redesign',
    client: 'StyleShop Inc.',
    industry: 'Retail',
    timeframe: 'March 2023 - July 2023',
    heroImage: 'https://via.placeholder.com/1600x900',
    logo: 'https://via.placeholder.com/200',
    challenge: `
      StyleShop Inc., a growing fashion retailer, was struggling with an outdated e-commerce platform that was causing high cart abandonment rates and limiting their growth potential. The existing website had several critical issues:
      
      * Poor mobile responsiveness, despite 70% of their traffic coming from mobile devices
      * Slow page load times, particularly on product pages with multiple images
      * Confusing checkout process leading to a 65% cart abandonment rate
      * Limited product filtering and search capabilities
      * Outdated visual design that didn't align with their brand identity
      
      They needed a complete redesign of their platform to improve the user experience, increase conversions, and support their expanding product catalog.
    `,
    approach: `
      We took a comprehensive, user-centered approach to redesigning StyleShop's e-commerce platform:
      
      1. **Discovery & Research**: We conducted thorough user research, including interviews with current customers, usability testing of the existing platform, and competitive analysis to identify best practices and opportunities for innovation.
      
      2. **Strategy & Planning**: Based on our research findings, we developed a detailed strategy for the new platform, including user personas, customer journey maps, and a clear information architecture.
      
      3. **Design & Prototyping**: Our design team created wireframes and interactive prototypes, focusing on creating an intuitive shopping experience across all devices. We incorporated StyleShop's brand elements while modernizing the overall aesthetic.
      
      4. **Development**: We built the new platform using Next.js for the frontend and implemented a headless CMS solution for flexible content management. The development process included:
         * Building a responsive design system with Tailwind CSS
         * Optimizing images and implementing lazy loading for faster page speeds
         * Developing an intuitive product filtering system
         * Streamlining the checkout process to minimize friction
         * Integrating with their existing inventory and order management systems
      
      5. **Testing & Optimization**: Before launch, we conducted extensive testing across devices and browsers, as well as performance optimization to ensure fast loading times.
    `,
    solution: `
      The redesigned e-commerce platform delivered a seamless shopping experience with several key features:
      
      * **Responsive Design**: A fully responsive layout that provides an optimal shopping experience on any device, with special attention to mobile user flows.
      
      * **Enhanced Product Discovery**: Advanced filtering options, intuitive category navigation, and an improved search function with autocomplete and visual search results.
      
      * **Streamlined Checkout**: A simplified 3-step checkout process with progress indicators, saved shipping information, and multiple payment options.
      
      * **Performance Optimizations**: Implemented image optimization, code splitting, and server-side rendering to significantly improve page load times.
      
      * **Personalization**: Added personalized product recommendations based on browsing history and purchase behavior.
      
      * **Visual Enhancements**: High-quality product imagery with zoom functionality, product videos, and an improved color/size selection interface.
    `,
    results: [
      'Increased conversion rate by 35% within the first three months',
      'Reduced cart abandonment rate from 65% to 37%',
      'Improved average page load speed by 40%',
      'Increased mobile traffic by 45% and mobile conversions by 60%',
      'Boosted average order value by 22% through improved product recommendations'
    ],
    testimonial: {
      quote: "GDevelopers completely transformed our online shopping experience. The new platform not only looks beautiful but has significantly improved our conversion rates and customer feedback. Their team took the time to understand our business and delivered a solution that exceeded our expectations.",
      author: "Sarah Johnson",
      position: "CEO, StyleShop Inc."
    },
    technologies: [
      'Next.js',
      'React',
      'Tailwind CSS',
      'Node.js',
      'MongoDB',
      'Stripe API',
      'AWS S3',
      'Cloudinary'
    ],
    services: [
      'UX Research & Strategy',
      'UI Design',
      'Frontend Development',
      'Backend Development',
      'E-commerce Implementation',
      'Performance Optimization',
      'Integration Services'
    ],
    images: [
      {
        url: 'https://via.placeholder.com/800x600',
        caption: 'Homepage redesign with improved product categories and featured items'
      },
      {
        url: 'https://via.placeholder.com/800x600',
        caption: 'Product page with enhanced image gallery and detailed information'
      },
      {
        url: 'https://via.placeholder.com/800x600',
        caption: 'Streamlined checkout process with progress indicators'
      },
      {
        url: 'https://via.placeholder.com/800x600',
        caption: 'Mobile view of the shopping cart experience'
      }
    ],
    relatedCaseStudies: [
      {
        title: 'Fitness Tracking App',
        slug: 'fitness-tracking-app',
        excerpt: 'Building a cross-platform fitness app that increased member engagement by 40%.'
      },
      {
        title: 'Restaurant Ordering System',
        slug: 'restaurant-ordering-system',
        excerpt: 'Creating a seamless ordering experience that reduced order processing time by 60%.'
      }
    ]
  },
  // Other case studies would be defined here
};

// Type definition for the page params
type CaseStudyPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = params;
  const caseStudy = caseStudiesData[slug as keyof typeof caseStudiesData];
  
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | GDevelopers',
      description: 'The requested case study could not be found.'
    };
  }
  
  return {
    title: `${caseStudy.title} | GDevelopers Case Study`,
    description: `Learn how GDevelopers helped ${caseStudy.client} achieve significant business results through innovative web development solutions.`
  };
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = params;
  const caseStudy = caseStudiesData[slug as keyof typeof caseStudiesData];
  
  if (!caseStudy) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Case Study Not Found</h1>
        <p className="text-lg mb-8">The case study you're looking for doesn't exist or has been moved.</p>
        <Link 
          href="/case-studies" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          View All Case Studies
        </Link>
      </div>
    );
  }
  
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src={caseStudy.heroImage} 
            alt={caseStudy.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/90"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <div className="flex items-center mb-6">
              <img 
                src={caseStudy.logo} 
                alt={caseStudy.client} 
                className="h-12 w-auto mr-4 bg-white rounded-md p-1"
              />
              <div>
                <span className="text-blue-400 font-medium">{caseStudy.industry}</span>
                <h1 className="text-4xl font-bold mt-1">{caseStudy.title}</h1>
              </div>
            </div>
            <p className="text-xl text-gray-300 mb-8">
              A case study on how we helped {caseStudy.client} achieve remarkable business results through innovative web solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/contact" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
              >
                Start Your Project
              </Link>
              <Link 
                href="#challenge" 
                className="bg-transparent border border-white hover:bg-white/10 text-white px-6 py-3 rounded-md transition-colors"
              >
                Read Case Study
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold">35%</p>
              <p className="text-lg">Increase in Conversion Rate</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">40%</p>
              <p className="text-lg">Faster Page Load Speed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">28%</p>
              <p className="text-lg">Reduction in Cart Abandonment</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Project Overview */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Client</h3>
                <p className="text-gray-600 dark:text-gray-300">{caseStudy.client}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Industry</h3>
                <p className="text-gray-600 dark:text-gray-300">{caseStudy.industry}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Timeframe</h3>
                <p className="text-gray-600 dark:text-gray-300">{caseStudy.timeframe}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Services</h3>
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                  {caseStudy.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Challenge Section */}
          <div id="challenge" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">The Challenge</h2>
            <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
              {caseStudy.challenge.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          
          {/* Approach Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Approach</h2>
            <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
              {caseStudy.approach.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          
          {/* Image Gallery */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">The Solution</h2>
            <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300 mb-8">
              {caseStudy.solution.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudy.images.map((image, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={image.url} 
                    alt={image.caption} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Results Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">The Results</h2>
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-8 mb-8">
              <ul className="space-y-4">
                {caseStudy.results.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-lg text-gray-700 dark:text-gray-200">{result}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Testimonial */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <blockquote className="text-xl italic text-gray-600 dark:text-gray-300 mb-6">
                "{caseStudy.testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <div className="ml-4">
                  <p className="font-bold text-gray-900 dark:text-white">{caseStudy.testimonial.author}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{caseStudy.testimonial.position}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Case Studies */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Explore Related Case Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudy.relatedCaseStudies.map((relatedStudy, index) => (
                <Link 
                  key={index} 
                  href={`/case-studies/${relatedStudy.slug}`}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{relatedStudy.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{relatedStudy.excerpt}</p>
                  <span className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium inline-flex items-center">
                    Read Case Study
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="bg-blue-600 rounded-xl overflow-hidden shadow-xl">
            <div className="px-6 py-12 md:p-12 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Ready to achieve similar results?</h2>
              <p className="text-lg text-blue-100 mb-8">
                Contact us today to discuss your project and discover how we can help you reach your business goals.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-medium shadow-md hover:bg-blue-50 transition duration-200"
              >
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 