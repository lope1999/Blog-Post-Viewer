import React from 'react';
import { ExternalLinkIcon } from '@heroicons/react/outline';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white p-4 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold">Blogger Blogger</h2>
          <p>&copy; 2024 Blogger Blogger. All rights reserved.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <ul className="flex space-x-4">
            <li>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition flex items-center space-x-1">
                <ExternalLinkIcon className="w-5 h-5" />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition flex items-center space-x-1">
                <ExternalLinkIcon className="w-5 h-5" />
                <span>Twitter</span>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition flex items-center space-x-1">
                <ExternalLinkIcon className="w-5 h-5" />
                <span>Instagram</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
