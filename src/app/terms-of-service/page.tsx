import React from 'react';
import Header from '../../components/Header';

export default function TermsOfServicePage() {
  return (
    <>
      <Header 
        title="Terms of Service" 
        subtitle="Please read these terms carefully before using our services" 
        height="small"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
            <p>
              <strong>Last Updated: June 17, 2023</strong>
            </p>
            
            <p>
              Welcome to GDevelopers. These Terms of Service govern your use of our website and services. By accessing or using our website and services, you agree to be bound by these Terms.
            </p>
            
            <h2>1. Acceptance of Terms</h2>
            
            <p>
              By accessing our website or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
            
            <h2>2. Use License</h2>
            
            <p>
              Permission is granted to temporarily download one copy of the materials on GDevelopers's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on GDevelopers's website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
            
            <h2>3. Service Description</h2>
            
            <p>
              GDevelopers provides web development and related services as described on our website. We reserve the right to modify, suspend, or discontinue our services at any time without notice.
            </p>
            
            <h2>4. Payment and Billing</h2>
            
            <p>
              For services that require payment, you agree to provide accurate and complete billing information. All payments are non-refundable unless otherwise specified in a separate agreement.
            </p>
            
            <h2>5. Intellectual Property</h2>
            
            <p>
              The content, organization, graphics, design, compilation, and other matters related to the Website are protected under applicable copyrights, trademarks, and other proprietary rights. Copying, redistribution, use, or publication by you of any such content or any part of the Website is prohibited without express written permission from GDevelopers.
            </p>
            
            <h2>6. Disclaimer</h2>
            
            <p>
              The materials on GDevelopers's website are provided on an 'as is' basis. GDevelopers makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            
            <h2>7. Limitation of Liability</h2>
            
            <p>
              In no event shall GDevelopers or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on GDevelopers's website, even if GDevelopers or a GDevelopers authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
            
            <h2>8. Changes to Terms</h2>
            
            <p>
              GDevelopers reserves the right to revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>
            
            <h2>9. Contact Information</h2>
            
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            
            <p>
              GDevelopers<br />
              123 Web Development Lane<br />
              Tech City, TC 12345<br />
              info@gdevelopers.com<br />
              (555) 123-4567
            </p>
          </div>
        </div>
      </div>
    </>
  );
} 