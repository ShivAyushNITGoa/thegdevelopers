import React from 'react';

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <p className="mb-8">
        Explore our range of developer tools and services.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Developer SDK</h2>
          <p className="mb-4">A comprehensive software development kit for building applications.</p>
          <a href="/products/developer-sdk" className="text-blue-600 hover:underline">Learn more</a>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">API Gateway</h2>
          <p className="mb-4">Secure and manage your API endpoints with our gateway solution.</p>
          <a href="/products/api-gateway" className="text-blue-600 hover:underline">Learn more</a>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Analytics Platform</h2>
          <p className="mb-4">Track and analyze user behavior with our powerful analytics tools.</p>
          <a href="/products/analytics" className="text-blue-600 hover:underline">Learn more</a>
        </div>
      </div>
    </div>
  );
} 