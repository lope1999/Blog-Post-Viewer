import React from 'react';
import PostList from './components/PostList';
import Header from './components/Header';

const App = () => {

  return (
    <div className="container mx-auto p-4">
      <Header />
      <PostList/>
    </div>
  );
};

export default App;
