import React, { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blogger Blogger</h1>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li>
              <button className="bg-blue-700 px-3 py-2 rounded hover:bg-blue-800 transition">Home</button>
            </li>
            <li>
              <button className="bg-blue-700 px-3 py-2 rounded hover:bg-blue-800 transition">About</button>
            </li>
            <li>
              <button className="bg-blue-700 px-3 py-2 rounded hover:bg-blue-800 transition">Contact</button>
            </li>
          </ul>
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden">
          <ul className="flex flex-col space-y-4 mt-4">
            <li>
              <button className="bg-blue-700 w-full px-3 py-2 rounded hover:bg-blue-800 transition">Home</button>
            </li>
            <li>
              <button className="bg-blue-700 w-full px-3 py-2 rounded hover:bg-blue-800 transition">About</button>
            </li>
            <li>
              <button className="bg-blue-700 w-full px-3 py-2 rounded hover:bg-blue-800 transition">Contact</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
