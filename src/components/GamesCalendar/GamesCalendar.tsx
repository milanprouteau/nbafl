import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGames, formatDate } from '../../services/nbaApi';
import './GamesCalendar.scss';

interface Game {
  id: number;
  date: string;
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    visitors: {
      id: number;
      name: string;
      logo: string;
    };
  };
  scores: {
    home: number;
    visitors: number;
  };
  status: {
    long: string;
  };
}

const GamesCalendar: React.FC = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        setError(null);
        const gamesData = await fetchGames(formatDate(selectedDate));
        setGames(gamesData);
      } catch (err) {
        setError('Failed to load games. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, [selectedDate]);

  const findNextGameDay = async (direction: 'next' | 'previous') => {
    setIsSearching(true);
    let attempts = 0;
    const maxAttempts = 14; // Maximum 2 weeks search
    
    while (attempts < maxAttempts) {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() + (direction === 'next' ? attempts + 1 : -(attempts + 1)));
      
      try {
        const gamesData = await fetchGames(formatDate(newDate));
        if (gamesData.length > 0) {
          setSelectedDate(newDate);
          setGames(gamesData);
          break;
        }
      } catch (error) {
        console.error('Error checking games:', error);
      }
      
      attempts++;
    }
    
    setIsSearching(false);
    if (attempts === maxAttempts) {
      setError(`No games found in the ${direction} 2 weeks`);
    }
  };

  const handlePickTeam = (teamId: number, teamName: string) => {
    navigate(`/team/${teamId}/${encodeURIComponent(teamName)}`);
  };

  if (loading) return <div className="games__loading">Loading games...</div>;
  if (error) return <div className="games__error">{error}</div>;

  return (
    <div className="games">
      <div className="games__nav">
        <button 
          onClick={() => findNextGameDay('previous')} 
          disabled={isSearching}
          className="games__nav-button"
        >
          {isSearching ? 'Searching...' : '< Previous Game Day'}
        </button>
        <h2 className="games__nav-date">{selectedDate.toLocaleDateString('fr-FR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</h2>
        <button 
          onClick={() => findNextGameDay('next')}
          disabled={isSearching}
          className="games__nav-button"
        >
          {isSearching ? 'Searching...' : 'Next Game Day >'}
        </button>
      </div>

      <div className="games__list">
        {games.map((game) => (
          <div key={game.id} className="games__card">
            <div className="games__team games__team--home">
              <img className="games__team-logo" src={game.teams.home.logo} alt={game.teams.home.name} />
              <span className="games__team-name">{game.teams.home.name}</span>
              <button 
                className="games__team-pick"
                onClick={() => handlePickTeam(game.teams.home.id, game.teams.home.name)}
              >
                Pick
              </button>
              <span className="games__team-score">{game.scores.home}</span>
            </div>
            
            <div className="games__versus">VS</div>
            
            <div className="games__team games__team--away">
              <img className="games__team-logo" src={game.teams.visitors.logo} alt={game.teams.visitors.name} />
              <span className="games__team-name">{game.teams.visitors.name}</span>
              <button 
                className="games__team-pick"
                onClick={() => handlePickTeam(game.teams.visitors.id, game.teams.visitors.name)}
              >
                Pick
              </button>
              <span className="games__team-score">{game.scores.visitors}</span>
            </div>

            <div className="games__status">{game.status.long}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesCalendar;
