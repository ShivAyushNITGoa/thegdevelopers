import React from "react";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "About Us | The GDevelopers",
  description: "Learn more about The GDevelopers team and our mission.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About The GDevelopers</h1>
        
        <div className="prose dark:prose-invert max-w-none mb-12">
          <p className="text-lg mb-6">
            The GDevelopers is a collective of passionate developers, designers, and creators
            dedicated to building exceptional digital experiences. Founded in 2023, our team
            brings together diverse expertise to solve complex problems with elegant solutions.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
          <p>
            We believe in the power of technology to transform businesses and improve lives.
            Our mission is to create innovative, user-centered applications that make a
            meaningful impact. We're committed to quality, accessibility, and sustainable
            development practices.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Approach</h2>
          <p>
            We take a collaborative approach to every project, working closely with our clients
            to understand their unique challenges and goals. Our development process emphasizes:
          </p>
          
          <ul className="list-disc pl-6 mb-6">
            <li>User-centered design thinking</li>
            <li>Agile development methodologies</li>
            <li>Robust, maintainable code</li>
            <li>Transparent communication</li>
            <li>Continuous learning and improvement</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Technologies</h2>
          <p>
            We specialize in modern web and mobile technologies, including:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
              <span className="font-medium">React</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
              <span className="font-medium">Next.js</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
              <span className="font-medium">TypeScript</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
              <span className="font-medium">Tailwind CSS</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
              <span className="font-medium">Node.js</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
              <span className="font-medium">GraphQL</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
              <span className="font-medium">React Native</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
              <span className="font-medium">AWS</span>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Get In Touch</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
} 