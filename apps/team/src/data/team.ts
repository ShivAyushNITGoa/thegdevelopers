export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
  skills: string[];
  education: string[];
  experience: {
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "Alex has over 15 years of experience in software development and technology leadership. Before founding The GDevelopers, he led engineering teams at several Fortune 500 companies and startups. He is passionate about creating innovative solutions that solve real-world problems.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    socialLinks: {
      linkedin: "https://linkedin.com/in/alexjohnson",
      twitter: "https://twitter.com/alexjohnson",
      github: "https://github.com/alexjohnson",
      website: "https://alexjohnson.dev",
    },
    skills: ["Leadership", "Strategic Planning", "Software Architecture", "Full-Stack Development", "Product Management"],
    education: [
      "MBA, Harvard Business School",
      "MS in Computer Science, Stanford University",
      "BS in Computer Engineering, MIT",
    ],
    experience: [
      {
        company: "TechCorp Inc.",
        role: "VP of Engineering",
        duration: "2015-2020",
        description: "Led a team of 50+ engineers across multiple product lines. Implemented agile methodologies that increased delivery speed by 40%.",
      },
      {
        company: "InnovateSoft",
        role: "Senior Software Architect",
        duration: "2010-2015",
        description: "Designed and implemented scalable cloud architecture supporting millions of users. Reduced infrastructure costs by 35%.",
      },
    ],
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "CTO",
    bio: "Sarah is a technology visionary with expertise in cloud architecture, AI, and distributed systems. She previously worked at Google and Amazon, where she led the development of several key infrastructure projects. Sarah holds multiple patents in distributed computing.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    socialLinks: {
      linkedin: "https://linkedin.com/in/sarahchen",
      twitter: "https://twitter.com/sarahchen",
      github: "https://github.com/sarahchen",
    },
    skills: ["Cloud Architecture", "AI/ML", "Distributed Systems", "System Design", "DevOps"],
    education: [
      "PhD in Computer Science, UC Berkeley",
      "BS in Computer Science, Caltech",
    ],
    experience: [
      {
        company: "Google",
        role: "Senior Engineering Manager",
        duration: "2016-2021",
        description: "Led the development of core infrastructure services supporting Google's cloud platform. Improved system reliability by 99.99%.",
      },
      {
        company: "Amazon Web Services",
        role: "Principal Engineer",
        duration: "2012-2016",
        description: "Designed key components of AWS Lambda and EC2. Contributed to the architecture of several high-availability services.",
      },
    ],
  },
  {
    id: "3",
    name: "Marcus Williams",
    role: "Lead Frontend Developer",
    bio: "Marcus specializes in creating beautiful, intuitive user interfaces with a focus on accessibility and performance. He has worked with React and other modern frontend frameworks since their early days and is a frequent speaker at web development conferences.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    socialLinks: {
      linkedin: "https://linkedin.com/in/marcuswilliams",
      twitter: "https://twitter.com/marcuswilliams",
      github: "https://github.com/marcuswilliams",
    },
    skills: ["React", "TypeScript", "CSS/SCSS", "UI/UX Design", "Performance Optimization", "Accessibility"],
    education: [
      "BS in Computer Science, University of Washington",
      "Certificate in User Experience Design, Nielsen Norman Group",
    ],
    experience: [
      {
        company: "Frontend Masters Inc.",
        role: "Senior Frontend Engineer",
        duration: "2017-2022",
        description: "Led the development of a component library used by over 200 internal projects. Reduced bundle sizes by 45% through optimization techniques.",
      },
      {
        company: "UX Solutions",
        role: "UI Developer",
        duration: "2014-2017",
        description: "Developed responsive web applications for enterprise clients. Implemented design systems that improved development velocity by 30%.",
      },
    ],
  },
  {
    id: "4",
    name: "Priya Patel",
    role: "Lead Backend Developer",
    bio: "Priya is an expert in scalable backend systems and database optimization. She has built high-performance APIs and services that handle millions of requests per day. Her focus is on creating robust, maintainable code that can scale with business needs.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    socialLinks: {
      linkedin: "https://linkedin.com/in/priyapatel",
      github: "https://github.com/priyapatel",
    },
    skills: ["Node.js", "Python", "Go", "Database Design", "API Development", "Microservices"],
    education: [
      "MS in Computer Science, Georgia Tech",
      "BS in Information Technology, University of Mumbai",
    ],
    experience: [
      {
        company: "ScaleTech Solutions",
        role: "Principal Backend Engineer",
        duration: "2018-2022",
        description: "Architected microservices infrastructure handling 5M+ daily transactions. Improved API response times by 60% through caching and optimization.",
      },
      {
        company: "DataSystems Inc.",
        role: "Software Engineer",
        duration: "2015-2018",
        description: "Developed data processing pipelines for financial services clients. Implemented systems that reduced data processing time from hours to minutes.",
      },
    ],
  },
  {
    id: "5",
    name: "David Kim",
    role: "DevOps Engineer",
    bio: "David is a DevOps specialist with extensive experience in automating deployment pipelines and managing cloud infrastructure. He is passionate about creating efficient, self-healing systems that enable development teams to deliver features rapidly and reliably.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    socialLinks: {
      linkedin: "https://linkedin.com/in/davidkim",
      github: "https://github.com/davidkim",
    },
    skills: ["AWS", "Kubernetes", "Docker", "CI/CD", "Infrastructure as Code", "Monitoring"],
    education: [
      "BS in Systems Engineering, Virginia Tech",
      "AWS Certified Solutions Architect",
      "Kubernetes Certified Administrator",
    ],
    experience: [
      {
        company: "CloudOps Inc.",
        role: "Senior DevOps Engineer",
        duration: "2019-2022",
        description: "Implemented infrastructure as code practices that reduced deployment times by 80%. Set up monitoring systems that improved incident response time by 65%.",
      },
      {
        company: "NetSystems",
        role: "Systems Administrator",
        duration: "2016-2019",
        description: "Managed on-premise and cloud infrastructure for enterprise clients. Led the migration of legacy systems to AWS, reducing operational costs by 40%.",
      },
    ],
  },
  {
    id: "6",
    name: "Olivia Martinez",
    role: "UX/UI Designer",
    bio: "Olivia combines her background in psychology with design expertise to create user-centered digital experiences. She specializes in user research, interaction design, and creating design systems that bridge the gap between user needs and business goals.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    socialLinks: {
      linkedin: "https://linkedin.com/in/oliviamartinez",
      twitter: "https://twitter.com/oliviamartinez",
      website: "https://oliviamartinez.design",
    },
    skills: ["User Research", "Interaction Design", "Figma", "Adobe Creative Suite", "Design Systems", "Prototyping"],
    education: [
      "MFA in Interaction Design, Rhode Island School of Design",
      "BA in Psychology, UCLA",
    ],
    experience: [
      {
        company: "DesignForward Agency",
        role: "Senior UX Designer",
        duration: "2018-2022",
        description: "Led UX design for enterprise SaaS products. Conducted user research that increased product adoption by 35% and reduced support tickets by 28%.",
      },
      {
        company: "CreativeLabs",
        role: "UI Designer",
        duration: "2015-2018",
        description: "Designed mobile applications for startups and established brands. Created design systems that improved design consistency and development efficiency.",
      },
    ],
  },
];

export const departments = [
  "Leadership",
  "Engineering",
  "Design",
  "Product",
  "Marketing",
];

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  // In a real app, this would fetch from an API or database
  return Promise.resolve(teamMembers);
}

export async function getTeamMemberById(id: string): Promise<TeamMember | undefined> {
  // In a real app, this would fetch from an API or database
  return Promise.resolve(teamMembers.find((member) => member.id === id));
}

export async function getTeamMembersByDepartment(department: string): Promise<TeamMember[]> {
  // This is a simplified implementation
  switch (department.toLowerCase()) {
    case "leadership":
      return Promise.resolve(teamMembers.filter(member => 
        member.role.includes("Founder") || 
        member.role.includes("CEO") || 
        member.role.includes("CTO")
      ));
    case "engineering":
      return Promise.resolve(teamMembers.filter(member => 
        member.role.includes("Developer") || 
        member.role.includes("Engineer") || 
        member.role.includes("DevOps")
      ));
    case "design":
      return Promise.resolve(teamMembers.filter(member => 
        member.role.includes("Design") || 
        member.role.includes("UX") || 
        member.role.includes("UI")
      ));
    default:
      return Promise.resolve([]);
  }
} 