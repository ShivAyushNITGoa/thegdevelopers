export default function DocsHomePage() {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Welcome to GDevelopers Documentation</h1>
        <p className="text-lg text-gray-700 mb-4">
          Find comprehensive guides and documentation to help you start working with
          GDevelopers platform as quickly as possible.
        </p>
        
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
            <p className="text-gray-600">Learn the fundamentals of GDevelopers platform</p>
          </div>
          
          <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">API Reference</h2>
            <p className="text-gray-600">Detailed information about our API endpoints</p>
          </div>
          
          <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Components</h2>
            <p className="text-gray-600">Explore our UI component library</p>
          </div>
          
          <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Tutorials</h2>
            <p className="text-gray-600">Step-by-step tutorials for common use cases</p>
          </div>
        </div>
      </div>
    </div>
  );
}
