import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import BoardingHouseList from '../components/BoardingHouseList';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <main>
        <BoardingHouseList />
      </main>
    </div>
  );
};

export default Home;
