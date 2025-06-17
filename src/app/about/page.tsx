import React from 'react';

export const metadata = {
  title: 'About Us | GDevelopers',
  description: 'Learn about the GDevelopers team, our mission, and our vision.'
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">About GDevelopers</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg mb-4">
          At GDevelopers, we're on a mission to create cutting-edge web applications that transform the digital landscape. 
          We believe in building technology that is accessible, performant, and user-friendly.
        </p>
        <p className="text-lg mb-4">
          Our team of expert developers and designers work together to deliver exceptional digital experiences 
          that help businesses grow and succeed in today's competitive market.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
        <p className="text-lg mb-4">
          We envision a world where technology enhances human capabilities and creates meaningful connections. 
          Our goal is to be at the forefront of this transformation, developing solutions that empower users 
          and businesses alike.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium mb-2">Innovation</h3>
            <p>We constantly push boundaries to create novel solutions to complex problems.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium mb-2">Quality</h3>
            <p>We're committed to delivering high-quality products that exceed expectations.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium mb-2">Accessibility</h3>
            <p>We believe technology should be accessible to everyone, regardless of ability.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium mb-2">Collaboration</h3>
            <p>We work together with our clients to achieve the best possible results.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium mb-2">Integrity</h3>
            <p>We conduct our business with honesty, transparency, and ethical practices.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium mb-2">Growth</h3>
            <p>We're dedicated to continuous learning and personal development.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Our History</h2>
        <p className="text-lg mb-4">
          Founded in 2020, GDevelopers started as a small team of passionate developers with a dream to create 
          exceptional web experiences. Over the years, we've grown into a full-service development agency, 
          working with clients across various industries and delivering projects that make a real difference.
        </p>
        <p className="text-lg">
          Today, we continue to expand our horizons, embracing new technologies and methodologies to stay 
          at the cutting edge of web development.
        </p>
      </section>
    </div>
  );
} 