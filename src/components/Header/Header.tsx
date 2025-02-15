import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ReactComponent as TrashTalkLogo } from '../../assets/trashtalk-logo.svg';
import './Header.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, currentUser } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__logo-link">
          <TrashTalkLogo className="header__logo" />
        </Link>
        
        <nav className="header__nav">
          {isAuthenticated ? (
            <>
              <Link to="/" className="header__nav-link">Matchs</Link>
              <Link to="/standings" className="header__nav-link">Classement</Link>
              <Link to="/my-picks" className="header__nav-link">Mes Picks</Link>
              <div className="header__user">
                <span className="header__email">{currentUser?.email}</span>
                <button onClick={handleLogout} className="header__nav-button">
                  Déconnexion
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="header__nav-button">
              Connexion
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
