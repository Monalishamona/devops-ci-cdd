import React from 'react';
import Hero from '../components/Home/Hero';
import RecentlyAdded from '../components/Home/RecentlyAdded';

const Home = () => {
  return (
    <div className="bg-white text-black px-6 py-12">
      <Hero />
      <RecentlyAdded />
    </div>
  );
};

export default Home;
