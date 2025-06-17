import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'GDevelopers Documentation',
  description: 'Documentation for GDevelopers platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-xl font-bold">GDevelopers Documentation</h1>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-100 p-4 mt-8">
          <p className="text-center text-gray-600">© {new Date().getFullYear()} GDevelopers. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
