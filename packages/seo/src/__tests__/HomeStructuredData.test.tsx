import React from 'react';
import { render } from '@testing-library/react';
import { HomeStructuredData } from '../components/HomeStructuredData';

describe('HomeStructuredData', () => {
  const defaultProps = {
    siteUrl: 'https://gdevelopers.com',
    organizationName: 'The GDevelopers',
    organizationLogo: 'https://gdevelopers.com/logo.png',
    siteName: 'The GDevelopers Portal',
    siteDescription: 'A platform for developers to share knowledge and collaborate',
  };

  it('renders organization schema correctly', () => {
    const { container } = render(<HomeStructuredData {...defaultProps} />);
    
    // Get all script elements
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    
    // Check that we have two script elements (organization and website)
    expect(scripts.length).toBe(2);
    
    // Parse the first script content (organization schema)
    const organizationSchema = JSON.parse(scripts[0].innerHTML);
    
    // Check organization schema
    expect(organizationSchema['@context']).toBe('https://schema.org');
    expect(organizationSchema['@type']).toBe('Organization');
    expect(organizationSchema.name).toBe(defaultProps.organizationName);
    expect(organizationSchema.url).toBe(defaultProps.siteUrl);
    expect(organizationSchema.logo).toBe(defaultProps.organizationLogo);
  });

  it('renders website schema correctly', () => {
    const { container } = render(<HomeStructuredData {...defaultProps} />);
    
    // Get all script elements
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    
    // Parse the second script content (website schema)
    const websiteSchema = JSON.parse(scripts[1].innerHTML);
    
    // Check website schema
    expect(websiteSchema['@context']).toBe('https://schema.org');
    expect(websiteSchema['@type']).toBe('WebSite');
    expect(websiteSchema.name).toBe(defaultProps.siteName);
    expect(websiteSchema.url).toBe(defaultProps.siteUrl);
    expect(websiteSchema.description).toBe(defaultProps.siteDescription);
    
    // Should not have potentialAction when searchUrl is not provided
    expect(websiteSchema.potentialAction).toBeUndefined();
  });

  it('includes search action when searchUrl is provided', () => {
    const searchUrl = 'https://gdevelopers.com/search?q={search_term_string}';
    const { container } = render(
      <HomeStructuredData {...defaultProps} searchUrl={searchUrl} />
    );
    
    // Get all script elements
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    
    // Parse the second script content (website schema)
    const websiteSchema = JSON.parse(scripts[1].innerHTML);
    
    // Check search action
    expect(websiteSchema.potentialAction).toBeDefined();
    expect(websiteSchema.potentialAction['@type']).toBe('SearchAction');
    expect(websiteSchema.potentialAction.target.urlTemplate).toBe(searchUrl);
    expect(websiteSchema.potentialAction['query-input']).toBe('required name=search_term_string');
  });
}); 