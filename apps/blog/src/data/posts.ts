export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  categories: string[];
  tags: string[];
}

export const posts: Post[] = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    slug: "getting-started-with-nextjs",
    excerpt: "Learn how to build modern web applications with Next.js, React, and TypeScript.",
    content: "# Getting Started with Next.js\n\nNext.js is a React framework that enables functionality such as server-side rendering and static site generation.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    date: "2023-04-15",
    author: {
      name: "Jane Smith",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    categories: ["Web Development", "React"],
    tags: ["Next.js", "React", "JavaScript", "TypeScript"],
  },
  {
    id: "2",
    title: "Building a UI Component Library",
    slug: "building-ui-component-library",
    excerpt: "Learn how to create a reusable UI component library using React, TypeScript, and Tailwind CSS.",
    content: "# Building a UI Component Library\n\nA well-designed component library can significantly speed up development and ensure consistency across your applications.",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    date: "2023-05-20",
    author: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    },
    categories: ["UI/UX", "React"],
    tags: ["React", "TypeScript", "Component Library", "UI Design"],
  },
  {
    id: "3",
    title: "Optimizing React Performance",
    slug: "optimizing-react-performance",
    excerpt: "Discover techniques to improve the performance of your React applications.",
    content: "# Optimizing React Performance\n\nPerformance optimization is crucial for providing a good user experience in React applications.",
    coverImage: "https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8",
    date: "2023-06-10",
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    },
    categories: ["Performance", "React"],
    tags: ["React", "Performance", "Optimization", "Web Development"],
  },
  {
    id: "4",
    title: "Introduction to TypeScript",
    slug: "introduction-to-typescript",
    excerpt: "Learn the basics of TypeScript and how it improves JavaScript development.",
    content: "# Introduction to TypeScript\n\nTypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
    coverImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713",
    date: "2023-07-05",
    author: {
      name: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79",
    },
    categories: ["TypeScript", "JavaScript"],
    tags: ["TypeScript", "JavaScript", "Programming", "Web Development"],
  },
  {
    id: "5",
    title: "Tailwind CSS Fundamentals",
    slug: "tailwind-css-fundamentals",
    excerpt: "Learn how to create beautiful, responsive user interfaces using Tailwind CSS.",
    content: "# Tailwind CSS Fundamentals\n\nTailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML.",
    coverImage: "https://images.unsplash.com/photo-1555066931-bf19f8fd1085",
    date: "2023-08-12",
    author: {
      name: "Emily Chen",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
    },
    categories: ["CSS", "UI/UX"],
    tags: ["Tailwind CSS", "Responsive Design", "CSS", "Frontend"],
  },
];

// Get all unique categories
export const categories = Array.from(
  new Set(posts.flatMap((post) => post.categories))
);

// Get all unique tags
export const tags = Array.from(
  new Set(posts.flatMap((post) => post.tags))
);

// Get posts by category
export const getPostsByCategory = (category: string): Post[] => {
  return posts.filter((post) => post.categories.includes(category));
};

// Get posts by tag
export const getPostsByTag = (tag: string): Post[] => {
  return posts.filter((post) => post.tags.includes(tag));
};

// Get post by slug
export const getPostBySlug = (slug: string): Post | undefined => {
  return posts.find((post) => post.slug === slug);
}; 