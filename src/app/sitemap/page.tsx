import React from 'react';
import Link from 'next/link';

export default function SitemapPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">Sitemap</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Main</h2>
          <ul className="space-y-2">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li><Link href="/services" className="text-blue-600 hover:underline">Services</Link></li>
            <li><Link href="/projects" className="text-blue-600 hover:underline">Projects</Link></li>
            <li><Link href="/about" className="text-blue-600 hover:underline">About</Link></li>
            <li><Link href="/contact" className="text-blue-600 hover:underline">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Company</h2>
          <ul className="space-y-2">
            <li><Link href="/team" className="text-blue-600 hover:underline">Team</Link></li>
            <li><Link href="/careers" className="text-blue-600 hover:underline">Careers</Link></li>
            <li><Link href="/blog" className="text-blue-600 hover:underline">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Legal</h2>
          <ul className="space-y-2">
            <li><Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</Link></li>
            <li><Link href="/accessibility" className="text-blue-600 hover:underline">Accessibility</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
