import React from 'react';
import GamesCalendar from '../GamesCalendar/GamesCalendar';
import './HomePage.scss';

const HomePage: React.FC = () => {
  return (
    <div className="home">
      <div className="home__content">
        <GamesCalendar />
      </div>
    </div>
  );
};

export default HomePage;
