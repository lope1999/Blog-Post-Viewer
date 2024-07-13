import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import notFound from '../assets/notFound.png'

const ErrorPage = ({errorIcon,errorTitle,errorMessage,action }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-3">
      <img 
        src={errorIcon ?? notFound}
        alt="Funny 404"
        className="mb-4"
      />
      <h1 className="text-4xl font-bold mb-4 mt-4">{errorTitle ?? `404 - Page Not Found`}</h1>
      <p className="text-gray-700 mb-6">{errorMessage ?? `Oops! The page you are looking for does not exist.`}</p>
     {action?? <button 
        className="text-blue-500 flex items-center"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon className="w-6 h-6 mr-2" />
         Go Back
      </button>}
    </div>
  );
};

export default ErrorPage;
