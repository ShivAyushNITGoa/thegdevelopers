import React from 'react';
import Header from '../../components/Header';
import Link from 'next/link';

// Pricing data
const pricingTiers = [
  {
    id: 1,
    name: 'Basic',
    description: 'Perfect for small businesses getting started',
    price: '$899',
    features: [
      'Responsive website design',
      'Up to 5 pages',
      'Contact form',
      'Basic SEO optimization',
      '1 month of support',
      'Mobile-friendly design',
    ],
    isPopular: false,
    callToAction: 'Get Started'
  },
  {
    id: 2,
    name: 'Professional',
    description: 'Ideal for growing businesses',
    price: '$1,899',
    features: [
      'Responsive website design',
      'Up to 10 pages',
      'Contact form with custom fields',
      'Advanced SEO optimization',
      'Content Management System',
      '3 months of support',
      'Google Analytics setup',
      'Basic e-commerce functionality',
    ],
    isPopular: true,
    callToAction: 'Get Started'
  },
  {
    id: 3,
    name: 'Enterprise',
    description: 'For established businesses with complex needs',
    price: 'Custom',
    features: [
      'Responsive website design',
      'Unlimited pages',
      'Custom functionality',
      'Full e-commerce capabilities',
      'Advanced SEO & marketing tools',
      'Priority support (1 year)',
      'Performance optimization',
      'Security hardening',
      'API integrations',
    ],
    isPopular: false,
    callToAction: 'Contact Us'
  },
];

// FAQs
const faqs = [
  {
    question: 'Are there any hidden fees?',
    answer: 'No, we believe in complete transparency. The price you see is what you pay, with no hidden costs. For the Enterprise plan, we provide a custom quote based on your specific requirements.'
  },
  {
    question: 'Can I upgrade my plan later?',
    answer: 'Yes, you can upgrade your plan at any time. We\'ll simply charge the difference in price and add the additional features to your website.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a satisfaction guarantee. If you\'re not happy with our work, we\'ll revise it according to the initially agreed requirements at no extra cost. However, due to the custom nature of web development, we don\'t offer refunds after development has begun.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers. For Enterprise plans, we can also arrange other payment options.'
  }
];

export const metadata = {
  title: 'Pricing | GDevelopers',
  description: 'Explore our pricing plans for web development services. Affordable solutions for businesses of all sizes.'
};

/**
 * The PricingPage component renders the pricing page with its various sections.
 *
 * @returns {React.ReactElement} The rendered component.
 */
export default function PricingPage(): React.ReactElement {
  return (
    <>
      <Header 
        title="Simple, Transparent Pricing" 
        subtitle="Choose the perfect plan for your business needs" 
        height="small"
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.id}
              className={`relative rounded-lg border ${
                tier.isPopular 
                  ? 'border-blue-600 shadow-lg' 
                  : 'border-gray-200 dark:border-gray-700'
              } bg-white dark:bg-gray-800 overflow-hidden`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className={`px-6 pt-6 ${tier.isPopular ? 'pt-8' : ''}`}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{tier.name}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{tier.description}</p>
                <p className="mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">{tier.price}</span>
                  {tier.price !== 'Custom' && <span className="text-gray-500"> / project</span>}
                </p>
              </div>
              <div className="px-6 pt-6 pb-8">
                <ul className="mt-4 space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-700 dark:text-gray-300">{feature}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href={tier.name === 'Enterprise' ? '/contact' : '/contact'}
                    className={`block w-full text-center px-6 py-3 rounded-md font-medium ${
                      tier.isPopular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    {tier.callToAction}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Divider */}
        <div className="max-w-3xl mx-auto mt-16 mb-12">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white dark:bg-gray-900 px-4 text-gray-500 dark:text-gray-400 text-lg">
                Frequently Asked Questions
              </span>
            </div>
          </div>
        </div>
        
        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <dl className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index}>
                <dt className="text-lg font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
          
          <div className="mt-12 text-center">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Need a custom solution?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Contact us for a tailored package that meets your specific requirements.
            </p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 