import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroSection from '../components/HeroSection';

// Testimonials data
const testimonials = [
  {
    id: 1,
    content: "GDevelopers transformed our outdated website into a modern, responsive platform that has significantly increased our customer engagement.",
    author: "Sarah Johnson",
    role: "CEO, TechSolutions Inc.",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: 2,
    content: "The team at GDevelopers delivered our e-commerce site ahead of schedule and with all the features we requested. Our sales have increased by 40% since launch.",
    author: "Michael Chen",
    role: "Founder, StyleShop",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    id: 3,
    content: "Working with GDevelopers was a breeze. They understood our needs perfectly and built us a website that truly represents our brand.",
    author: "Emily Rodriguez",
    role: "Marketing Director, CreativeMinds",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

// Recent projects
const recentProjects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured online store with inventory management and payment processing",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    tags: ["Next.js", "Stripe", "MongoDB"]
  },
  {
    id: 2,
    title: "Healthcare Portal",
    description: "Patient management system with secure data handling and appointment scheduling",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    tags: ["React", "Node.js", "PostgreSQL"]
  },
  {
    id: 3,
    title: "Real Estate Application",
    description: "Property listing and management application with advanced search features",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80",
    tags: ["Next.js", "GraphQL", "Tailwind CSS"]
  }
];

// Statistics
const stats = [
  { id: 1, value: '500+', label: 'Completed Projects' },
  { id: 2, value: '98%', label: 'Client Satisfaction' },
  { id: 3, value: '24/7', label: 'Technical Support' },
  { id: 4, value: '15+', label: 'Years of Experience' },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection />
      
      <div className="space-y-32 py-16">
        {/* Stats Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center mb-16">
              <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">Company Achievements</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Delivering Excellence in Web Development
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div 
                  key={stat.id} 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          {/* Decorative blob */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-400/10 rounded-full filter blur-3xl"></div>
          <div className="relative">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">Our Services</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Comprehensive Web Development Solutions
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                From concept to deployment, we provide end-to-end services to bring your vision to life.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600 dark:text-blue-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </div>
                    Custom Web Development
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">
                      Tailor-made websites and web applications designed to meet your specific business requirements.
                    </p>
                    <p className="mt-6">
                      <Link href="/services" className="text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400 inline-flex items-center group">
                        Learn more 
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600 dark:text-blue-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                      </svg>
                    </div>
                    E-commerce Development
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">
                      Powerful online stores with secure payment processing, inventory management, and optimized for conversions.
                    </p>
                    <p className="mt-6">
                      <Link href="/services" className="text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400 inline-flex items-center group">
                        Learn more 
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600 dark:text-blue-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                      </svg>
                    </div>
                    Responsive Web Design
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">
                      Mobile-first designs that provide an optimal viewing experience across all devices and screen sizes.
                    </p>
                    <p className="mt-6">
                      <Link href="/services" className="text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400 inline-flex items-center group">
                        Learn more 
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
        
        {/* Recent Projects */}
        <section className="bg-gray-50 dark:bg-gray-800 py-20 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-300/10 rounded-full filter blur-3xl"></div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">Recent Projects</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Our Latest Work
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Take a look at some of our recent projects and see how we've helped businesses achieve their goals.
              </p>
            </div>
            
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex flex-col overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-700 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="flex-shrink-0 relative h-60 w-full">
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover" 
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:text-blue-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                      <p className="mt-3 text-base text-gray-500 dark:text-gray-300">{project.description}</p>
                    </div>
                    <div className="mt-6">
                      <Link 
                        href={`/projects/${project.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 inline-flex items-center group"
                      >
                        View details
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Link
                href="/projects"
                className="inline-flex items-center rounded-lg border-2 border-blue-600 bg-transparent px-6 py-3 text-base font-medium text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-600/30 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                View all projects
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          {/* Decorative blob */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-400/10 rounded-full filter blur-3xl"></div>
          
          <div className="relative">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">Testimonials</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Trusted by Businesses
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Don't just take our word for it - here's what our clients have to say about working with us.
              </p>
            </div>
            
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="flex flex-col justify-between rounded-xl bg-white dark:bg-gray-800 p-8 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div>
                    <div className="flex gap-x-2 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">"{testimonial.content}"</p>
                  </div>
                  <div className="mt-8 flex items-center">
                    <div className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <Image 
                        src={testimonial.avatar} 
                        alt={testimonial.author}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700"></div>
          <div className="absolute inset-0 bg-grid-white/[0.1] bg-[length:16px_16px]"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to transform your digital presence?
              </h2>
              <p className="mt-6 text-lg leading-8 text-blue-100">
                Schedule a free consultation with our experts to discuss how we can help your business grow online.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/contact"
                  className="rounded-lg bg-white px-4 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Get Started
                </Link>
                <Link 
                  href="/services" 
                  className="text-base font-semibold leading-6 text-white flex items-center group"
                >
                  Learn more 
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 