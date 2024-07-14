import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-8 flex justify-center">
      <ul className="inline-flex flex-wrap space-x-1">
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous"
            className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${
              currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
           <button
              onClick={() => paginate(number)}
              className={`px-3 py-2 leading-tight ${
                currentPage === number
                  ? 'text-white bg-blue-500 border-blue-500'
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next"
            className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${
              currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
