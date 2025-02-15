import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTeamPlayers } from '../../services/nbaApi';
import './TeamPlayers.scss';

interface Player {
  id: number;
  firstname: string;
  lastname: string;
  jersey: number;
  position: string;
  stats: {
    points: number;
    rebounds: number;
    assists: number;
  };
}

const TeamPlayers: React.FC = () => {
  const { teamId, teamName } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        setLoading(true);
        setError(null);
        const playersData = await fetchTeamPlayers(teamId!);
        setPlayers(playersData);
      } catch (err) {
        setError('Failed to load players. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, [teamId]);

  if (loading) return <div className="players__loading">Loading players...</div>;
  if (error) return <div className="players__error">{error}</div>;

  return (
    <div className="players">
      <div className="players__header">
        <button 
          onClick={() => navigate(-1)} 
          className="players__back-button"
        >
          &lt; Back to Games
        </button>
        <h1 className="players__title">{decodeURIComponent(teamName || '')} Players</h1>
      </div>

      <div className="players__list">
        {players.map((player) => (
          <div key={player.id} className="players__card">
            <div className="players__card-header">
              <span className="players__jersey">#{player.jersey}</span>
              <span className="players__position">{player.position}</span>
            </div>
            <h2 className="players__name">
              {player.firstname} {player.lastname}
            </h2>
            <div className="players__stats">
              <div className="players__stat">
                <span className="players__stat-value">{player.stats.points.toFixed(1)}</span>
                <span className="players__stat-label">PPG</span>
              </div>
              <div className="players__stat">
                <span className="players__stat-value">{player.stats.rebounds.toFixed(1)}</span>
                <span className="players__stat-label">RPG</span>
              </div>
              <div className="players__stat">
                <span className="players__stat-value">{player.stats.assists.toFixed(1)}</span>
                <span className="players__stat-label">APG</span>
              </div>
            </div>
            <button className="players__pick-button">
              Pick Player
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPlayers;
