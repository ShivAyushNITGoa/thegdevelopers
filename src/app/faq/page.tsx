'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';

// FAQ data
const faqs = [
  {
    id: 1,
    question: 'What services does GDevelopers offer?',
    answer: 'GDevelopers provides a wide range of web development services including custom website development, web application development, e-commerce solutions, responsive design, content management systems, and API integrations. We also offer UI/UX design, performance optimization, and ongoing maintenance and support.'
  },
  {
    id: 2,
    question: 'How much does it cost to build a website?',
    answer: 'The cost of building a website varies depending on your specific requirements, complexity, and scope. We offer tailored solutions to fit different budgets and needs. After understanding your project requirements, we provide a detailed quote. Contact us for a free consultation and estimate.'
  },
  {
    id: 3,
    question: 'How long does it take to build a website?',
    answer: 'The timeline for building a website depends on its complexity, features, and content requirements. A simple informational website might take 2-4 weeks, while a complex web application could take several months. During our initial consultation, we\'ll provide you with a realistic timeline based on your specific project needs.'
  },
  {
    id: 4,
    question: 'Do you provide website maintenance services?',
    answer: 'Yes, we offer ongoing website maintenance and support services to ensure your website remains secure, up-to-date, and functioning optimally. Our maintenance packages include regular updates, security monitoring, performance optimization, content updates, and technical support.'
  },
  {
    id: 5,
    question: 'Can you help with Search Engine Optimization (SEO)?',
    answer: 'Absolutely! We implement SEO best practices in all our website projects. This includes optimizing site structure, improving page load speed, implementing proper meta tags, creating SEO-friendly URLs, and ensuring mobile responsiveness. We can also provide ongoing SEO services to help improve your search engine rankings.'
  },
  {
    id: 6,
    question: 'What technology stack do you use?',
    answer: 'We work with a variety of modern technologies to deliver the best solutions for our clients. Our primary stack includes React, Next.js, Node.js, and various databases like MongoDB and PostgreSQL. We also have experience with WordPress, Shopify, and other platforms. We select the most appropriate technology based on your specific project requirements.'
  },
  {
    id: 7,
    question: 'Do you design mobile-responsive websites?',
    answer: 'Yes, all websites we develop are fully responsive and optimized for all device sizes. We follow a mobile-first approach to ensure excellent user experience across desktops, tablets, and smartphones.'
  },
  {
    id: 8,
    question: 'How do we get started on a project?',
    answer: 'The process begins with an initial consultation where we discuss your requirements, goals, and vision. We then provide a detailed proposal including timeline and pricing. Once approved, we start with project planning, design mockups, development, testing, and finally, deployment. Throughout the process, we maintain clear communication and regular updates.'
  }
];

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  
  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <>
      <Header 
        title="Frequently Asked Questions" 
        subtitle="Find answers to common questions about our services and process" 
        height="small"
        showCTA={false}
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div 
                key={faq.id} 
                className="border border-gray-200 rounded-lg overflow-hidden dark:border-gray-700"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="flex justify-between items-center w-full px-6 py-4 text-left bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <span className="text-lg font-medium text-gray-900 dark:text-white">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      openItem === faq.id ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openItem === faq.id && (
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                    <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">Didn't find what you're looking for?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Contact our friendly team for personalized assistance with your project needs.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
} 