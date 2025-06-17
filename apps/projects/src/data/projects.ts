export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  category: string;
  technologies: string[];
  features: string[];
  demoUrl: string;
  repoUrl: string;
  clientName: string;
  completionDate: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform built with Next.js, React, and Stripe.",
    fullDescription: `
      This comprehensive e-commerce platform provides businesses with a complete solution for selling products online. 
      
      Key features include:
      • Responsive product catalog with advanced filtering
      • Secure checkout process with Stripe integration
      • User authentication and account management
      • Order tracking and history
      • Admin dashboard for inventory management
      • Analytics and reporting tools
      
      The platform is built with performance and scalability in mind, utilizing Next.js for server-side rendering and optimized client-side navigation. The codebase follows best practices for maintainability and extensibility.
    `,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
    gallery: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
      "https://images.unsplash.com/photo-1556740758-90de374c12ad",
    ],
    category: "Web Development",
    technologies: ["Next.js", "React", "TypeScript", "Stripe", "Tailwind CSS", "MongoDB", "Redux"],
    features: [
      "Responsive design",
      "Server-side rendering",
      "Secure payment processing",
      "User authentication",
      "Product search and filtering",
      "Admin dashboard",
    ],
    demoUrl: "#",
    repoUrl: "#",
    clientName: "RetailTech Inc.",
    completionDate: "March 2023",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    fullDescription: `
      This collaborative task management application helps teams organize and track their work efficiently. The app features real-time updates, allowing team members to see changes as they happen.
      
      Key features include:
      • Task creation, assignment, and tracking
      • Project organization with boards and lists
      • Real-time collaboration and updates
      • File attachments and comments
      • Due date reminders and notifications
      • Time tracking and reporting
      
      Built with React and Firebase, the application provides a smooth and responsive user experience with instant data synchronization across devices.
    `,
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b",
    gallery: [
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b",
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d",
      "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23",
    ],
    category: "Web Application",
    technologies: ["React", "Firebase", "Material UI", "Redux", "Node.js", "Express"],
    features: [
      "Drag-and-drop interface",
      "Real-time updates",
      "User permissions",
      "File attachments",
      "Activity tracking",
      "Mobile responsive design",
    ],
    demoUrl: "#",
    repoUrl: "#",
    clientName: "ProductivityPro LLC",
    completionDate: "November 2022",
  },
  {
    id: "3",
    title: "Mobile Fitness Tracker",
    description: "A cross-platform mobile app for tracking workouts and nutrition.",
    fullDescription: `
      This fitness tracking application helps users monitor their health and fitness goals across multiple devices. The app provides comprehensive tracking for workouts, nutrition, and overall wellness.
      
      Key features include:
      • Workout planning and tracking
      • Nutrition logging and calorie counting
      • Progress visualization with charts and graphs
      • Custom fitness goals and milestones
      • Integration with fitness devices and wearables
      • Social sharing and community features
      
      Built with React Native and Expo, the application offers a native-like experience on both iOS and Android platforms with a single codebase.
    `,
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
    gallery: [
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    ],
    category: "Mobile Development",
    technologies: ["React Native", "Expo", "Firebase", "Redux", "TypeScript"],
    features: [
      "Cross-platform compatibility",
      "Offline functionality",
      "Push notifications",
      "Data visualization",
      "Social sharing",
      "Health device integration",
    ],
    demoUrl: "#",
    repoUrl: "#",
    clientName: "FitLife Technologies",
    completionDate: "June 2023",
  },
  {
    id: "4",
    title: "AI Content Generator",
    description: "An AI-powered tool for generating marketing content and blog posts.",
    fullDescription: `
      This AI-powered content generation platform helps marketers and content creators produce high-quality written content efficiently. The system uses advanced natural language processing to generate human-like text for various purposes.
      
      Key features include:
      • Blog post generation and outlines
      • Social media content creation
      • Email marketing copy
      • Product descriptions
      • SEO optimization suggestions
      • Content performance analytics
      
      The platform leverages state-of-the-art language models while providing an intuitive interface for users to guide and refine the generated content.
    `,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    gallery: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      "https://images.unsplash.com/photo-1526378722484-bd91ca387e72",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    ],
    category: "AI/ML",
    technologies: ["Python", "TensorFlow", "OpenAI API", "Flask", "React", "MongoDB"],
    features: [
      "AI-powered content generation",
      "Topic research and suggestions",
      "SEO optimization",
      "Multi-language support",
      "Content templates",
      "Performance analytics",
    ],
    demoUrl: "#",
    repoUrl: "#",
    clientName: "ContentGenius Inc.",
    completionDate: "January 2024",
  },
  {
    id: "5",
    title: "Real Estate Marketplace",
    description: "A platform for buying, selling, and renting properties with virtual tours.",
    fullDescription: `
      This comprehensive real estate platform connects buyers, sellers, and renters in a modern digital marketplace. The platform features advanced search capabilities and immersive property viewing experiences.
      
      Key features include:
      • Property listings with detailed information
      • Advanced search and filtering options
      • Virtual 3D tours of properties
      • Mortgage calculator and financing tools
      • Agent and agency profiles
      • Appointment scheduling system
      
      The platform utilizes Three.js for immersive 3D property tours, providing users with a realistic view of properties without requiring in-person visits.
    `,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    gallery: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716",
    ],
    category: "Web Development",
    technologies: ["Next.js", "MongoDB", "Express", "Three.js", "Node.js", "Tailwind CSS"],
    features: [
      "Virtual property tours",
      "Advanced property search",
      "User accounts and saved listings",
      "Mortgage calculator",
      "Agent directory",
      "Appointment scheduling",
    ],
    demoUrl: "#",
    repoUrl: "#",
    clientName: "HomeVista Realty",
    completionDate: "September 2023",
  },
  {
    id: "6",
    title: "Social Media Dashboard",
    description: "A dashboard for managing and analyzing social media accounts.",
    fullDescription: `
      This comprehensive social media management dashboard helps businesses and marketers manage their social media presence across multiple platforms from a single interface. The dashboard provides powerful analytics and scheduling capabilities.
      
      Key features include:
      • Multi-platform content scheduling
      • Performance analytics and reporting
      • Audience insights and demographics
      • Engagement monitoring and response management
      • Competitor analysis
      • Content calendar and planning tools
      
      The dashboard integrates with major social media platforms through their APIs, providing a unified interface for managing social media marketing efforts.
    `,
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
    gallery: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4",
    ],
    category: "Data Visualization",
    technologies: ["React", "D3.js", "Node.js", "Express", "MongoDB", "Social Media APIs"],
    features: [
      "Cross-platform management",
      "Advanced analytics",
      "Content scheduling",
      "Engagement tracking",
      "Automated reporting",
      "Team collaboration",
    ],
    demoUrl: "#",
    repoUrl: "#",
    clientName: "SocialBoost Marketing",
    completionDate: "April 2023",
  },
];

// Get all unique categories
export const categories = Array.from(new Set(projects.map((project) => project.category)));

// Get all unique technologies across all projects
export const technologies = Array.from(
  new Set(projects.flatMap((project) => project.technologies))
).sort();

// API functions for data fetching
export async function getAllProjects(): Promise<Project[]> {
  // In a real app, this would fetch from an API or database
  return Promise.resolve(projects);
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  // In a real app, this would fetch from an API or database
  return Promise.resolve(projects.find((project) => project.id === id));
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  // In a real app, this would fetch from an API or database
  return Promise.resolve(
    projects.filter((project) => project.category.toLowerCase() === category.toLowerCase())
  );
}

export async function getProjectsByTechnology(technology: string): Promise<Project[]> {
  // In a real app, this would fetch from an API or database
  return Promise.resolve(
    projects.filter((project) =>
      project.technologies.some((tech) => tech.toLowerCase() === technology.toLowerCase())
    )
  );
}

export async function getRelatedProjects(projectId: string, limit = 3): Promise<Project[]> {
  const currentProject = projects.find((p) => p.id === projectId);
  if (!currentProject) return Promise.resolve([]);

  // Find projects in the same category
  const relatedProjects = projects
    .filter(
      (p) => p.id !== projectId && p.category.toLowerCase() === currentProject.category.toLowerCase()
    )
    .slice(0, limit);

  // If we don't have enough related projects by category, add some based on shared technologies
  if (relatedProjects.length < limit) {
    const remainingCount = limit - relatedProjects.length;
    const projectsByTech = projects.filter(
      (p) =>
        p.id !== projectId &&
        !relatedProjects.some((rp) => rp.id === p.id) &&
        p.technologies.some((tech) => currentProject.technologies.includes(tech))
    );

    relatedProjects.push(...projectsByTech.slice(0, remainingCount));
  }

  return Promise.resolve(relatedProjects);
} 