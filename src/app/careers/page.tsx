import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

// Job listings data
const jobListings = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    location: 'Remote',
    type: 'Full-time',
    department: 'Engineering',
    description: 'We are looking for an experienced Frontend Developer to join our team and help build exceptional user interfaces for our clients.',
    requirements: [
      'At least 5 years of experience with React and modern JavaScript',
      'Experience with Next.js, TypeScript, and state management libraries',
      'Strong understanding of responsive design and cross-browser compatibility',
      'Experience with CSS preprocessors and modern CSS frameworks',
      'Knowledge of performance optimization and accessibility standards'
    ],
    link: '/careers/senior-frontend-developer'
  },
  {
    id: 2,
    title: 'Backend Developer',
    location: 'Remote',
    type: 'Full-time',
    department: 'Engineering',
    description: 'Join our backend team to build robust APIs and server-side applications that power our client solutions.',
    requirements: [
      'At least 3 years of experience with Node.js and Express',
      'Experience with database design and management (MongoDB, PostgreSQL)',
      'Knowledge of RESTful API design principles',
      'Understanding of authentication and authorization mechanisms',
      'Experience with cloud services (AWS, Azure, or GCP)'
    ],
    link: '/careers/backend-developer'
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    location: 'Remote',
    type: 'Full-time',
    department: 'Design',
    description: "We're seeking a talented UI/UX Designer to create beautiful, intuitive interfaces that provide exceptional user experiences.",
    requirements: [
      'At least 3 years of experience in UI/UX design for web applications',
      'Proficiency in design tools such as Figma, Sketch, or Adobe XD',
      'Strong portfolio demonstrating your design process and solutions',
      'Understanding of user-centered design principles',
      'Experience collaborating with development teams'
    ],
    link: '/careers/ui-ux-designer'
  },
  {
    id: 4,
    title: 'Project Manager',
    location: 'Remote',
    type: 'Full-time',
    department: 'Operations',
    description: 'Lead project teams to deliver high-quality web solutions on time and within budget while ensuring client satisfaction.',
    requirements: [
      'At least 4 years of experience managing web development projects',
      'Strong understanding of agile methodologies',
      'Excellent communication and client management skills',
      'Experience with project management tools',
      'Technical background in web development is a plus'
    ],
    link: '/careers/project-manager'
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    location: 'Remote',
    type: 'Full-time',
    department: 'Engineering',
    description: 'Help us build and maintain our CI/CD pipelines and infrastructure to ensure smooth deployment and operation of our applications.',
    requirements: [
      'At least 3 years of experience in DevOps or similar role',
      'Experience with containerization (Docker) and orchestration (Kubernetes)',
      'Knowledge of CI/CD pipelines and tools (GitHub Actions, Jenkins)',
      'Experience with cloud platforms (AWS, Azure, or GCP)',
      'Understanding of infrastructure as code (Terraform, CloudFormation)'
    ],
    link: '/careers/devops-engineer'
  }
];

// Benefits data
const benefits = [
  {
    title: 'Remote-First Culture',
    description: 'Work from anywhere in the world with flexible hours that fit your lifestyle.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Competitive Compensation',
    description: 'We offer competitive salaries, equity options, and performance bonuses.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Health & Wellness',
    description: 'Comprehensive health insurance, wellness programs, and mental health support.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    title: 'Professional Growth',
    description: 'Learning stipend, conference attendance, and career development opportunities.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    title: 'Work-Life Balance',
    description: 'Generous PTO, paid holidays, and parental leave to help you recharge.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Team Retreats',
    description: 'Annual company retreats to connect, collaborate, and celebrate together.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  }
];

// Values data
const values = [
  {
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from code quality to client communication.'
  },
  {
    title: 'Innovation',
    description: 'We embrace new technologies and approaches to solve complex problems creatively.'
  },
  {
    title: 'Collaboration',
    description: 'We believe the best solutions come from diverse teams working together effectively.'
  },
  {
    title: 'Transparency',
    description: 'We maintain open and honest communication with our team members and clients.'
  },
  {
    title: 'Growth',
    description: 'We encourage continuous learning and professional development for all team members.'
  }
];

export const metadata = {
  title: 'Careers | GDevelopers',
  description: 'Join our team of talented developers, designers, and project managers. Explore current job openings and learn about our company culture.'
};

export default function CareersPage() {
  return (
    <>
      <Header 
        title="Join Our Team" 
        subtitle="Build your career with passionate professionals creating exceptional web experiences" 
        height="small"
      />
      
      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Why Work With Us?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            At GDevelopers, we're building a team of exceptional individuals who are passionate about creating 
            innovative web solutions. We offer a collaborative, remote-first environment where you can grow 
            your skills while working on challenging projects for clients across various industries.
          </p>
        </div>
        
        {/* Company Values */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Benefits */}
        <div className="mb-24 bg-gray-50 dark:bg-gray-900 py-16 px-4 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Benefits & Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex">
                <div className="flex-shrink-0 mr-4 text-blue-600 dark:text-blue-400">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Open Positions */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Open Positions</h2>
          <div className="max-w-4xl mx-auto">
            {jobListings.map((job) => (
              <div key={job.id} className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 md:mb-0">{job.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                        {job.department}
                      </span>
                      <span className="inline-flex items-center rounded-md bg-green-50 dark:bg-green-900 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300">
                        {job.type}
                      </span>
                      <span className="inline-flex items-center rounded-md bg-purple-50 dark:bg-purple-900 px-2 py-1 text-xs font-medium text-purple-700 dark:text-purple-300">
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{job.description}</p>
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Requirements:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <Link 
                    href={job.link} 
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View Details & Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Application Process */}
        <div className="max-w-4xl mx-auto mb-24">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Hiring Process</h2>
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/4">
                <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto">
                  <span className="text-2xl font-bold">1</span>
                </div>
              </div>
              <div className="w-full md:w-3/4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Application Review</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We review your application, resume, and portfolio to assess your skills and experience relative to the position requirements.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/4">
                <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto">
                  <span className="text-2xl font-bold">2</span>
                </div>
              </div>
              <div className="w-full md:w-3/4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Initial Interview</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  A video call with our hiring team to discuss your experience, skills, and assess cultural fit.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/4">
                <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto">
                  <span className="text-2xl font-bold">3</span>
                </div>
              </div>
              <div className="w-full md:w-3/4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Technical Assessment</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Depending on the role, you may be asked to complete a technical challenge or assignment to demonstrate your skills.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/4">
                <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto">
                  <span className="text-2xl font-bold">4</span>
                </div>
              </div>
              <div className="w-full md:w-3/4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Final Interview</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Meet with team members and leadership to discuss the role in more detail and answer any questions you may have.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/4">
                <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto">
                  <span className="text-2xl font-bold">5</span>
                </div>
              </div>
              <div className="w-full md:w-3/4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Offer & Onboarding</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  If selected, you'll receive an offer letter. Once accepted, our team will guide you through the onboarding process.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Don't See a Position That Fits?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            We're always interested in connecting with talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
} 