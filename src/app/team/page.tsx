import React from 'react';

export const metadata = {
  title: 'Our Team | GDevelopers',
  description: 'Meet the talented team behind GDevelopers.'
};

const teamMembers = [
  {
    id: 1,
    name: 'John Smith',
    position: 'CEO & Founder',
    bio: 'John has over 15 years of experience in web development and software engineering. He founded GDevelopers with a vision to create innovative digital solutions.',
    social: {
      twitter: 'https://twitter.com/johnsmith',
      linkedin: 'https://linkedin.com/in/johnsmith',
      github: 'https://github.com/johnsmith'
    }
  },
  {
    id: 2,
    name: 'Emily Chen',
    position: 'CTO',
    bio: 'Emily is a tech enthusiast with extensive experience in architecting scalable applications. She oversees all technical aspects and ensures the highest quality standards.',
    social: {
      twitter: 'https://twitter.com/emilychen',
      linkedin: 'https://linkedin.com/in/emilychen',
      github: 'https://github.com/emilychen'
    }
  },
  {
    id: 3,
    name: 'Michael Johnson',
    position: 'Lead Frontend Developer',
    bio: 'Michael specializes in creating beautiful and responsive user interfaces using React and Next.js. He is passionate about creating accessible web experiences.',
    social: {
      twitter: 'https://twitter.com/michaelj',
      linkedin: 'https://linkedin.com/in/michaelj',
      github: 'https://github.com/michaelj'
    }
  },
  {
    id: 4,
    name: 'Sophia Rodriguez',
    position: 'Backend Developer',
    bio: 'Sophia has deep expertise in Node.js and database design. She builds robust and scalable APIs that power our web applications.',
    social: {
      twitter: 'https://twitter.com/sophiar',
      linkedin: 'https://linkedin.com/in/sophiar',
      github: 'https://github.com/sophiar'
    }
  },
  {
    id: 5,
    name: 'David Kim',
    position: 'UI/UX Designer',
    bio: 'David combines creativity with technical knowledge to design intuitive user experiences. His designs are both beautiful and functional.',
    social: {
      twitter: 'https://twitter.com/davidk',
      linkedin: 'https://linkedin.com/in/davidk',
      github: 'https://github.com/davidk'
    }
  },
  {
    id: 6,
    name: 'Priya Patel',
    position: 'DevOps Engineer',
    bio: 'Priya ensures our deployment pipelines run smoothly and our infrastructure is always optimized. She has expertise in AWS and Docker.',
    social: {
      twitter: 'https://twitter.com/priyap',
      linkedin: 'https://linkedin.com/in/priyap',
      github: 'https://github.com/priyap'
    }
  },
  {
    id: 7,
    name: 'James Wilson',
    position: 'QA Engineer',
    bio: 'James is passionate about quality and ensures that all our applications are thoroughly tested before release. He is a champion of test automation.',
    social: {
      twitter: 'https://twitter.com/jamesw',
      linkedin: 'https://linkedin.com/in/jamesw',
      github: 'https://github.com/jamesw'
    }
  },
  {
    id: 8,
    name: 'Anna Nguyen',
    position: 'Project Manager',
    bio: 'Anna coordinates our development efforts and ensures projects are delivered on time. She is an expert in agile methodologies.',
    social: {
      twitter: 'https://twitter.com/annan',
      linkedin: 'https://linkedin.com/in/annan',
      github: 'https://github.com/annan'
    }
  }
];

export default function TeamPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Meet Our Team</h1>
        <p className="text-lg max-w-2xl mx-auto">
          We are a group of passionate individuals dedicated to creating exceptional web experiences.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-lg overflow-hidden shadow-md text-center">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-1">{member.name}</h2>
              <p className="text-blue-600 mb-3">{member.position}</p>
              <p className="text-gray-600 mb-4">{member.bio}</p>
              <div className="flex justify-center space-x-4">
                <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500">
                  Twitter
                </a>
                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700">
                  LinkedIn
                </a>
                <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Join Our Team</h2>
        <p className="max-w-2xl mx-auto mb-6">
          We're always looking for talented individuals to join our team. Check out our open positions.
        </p>
        <a 
          href="/careers" 
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          View Open Positions
        </a>
      </div>
    </div>
  );
} 