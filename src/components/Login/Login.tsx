import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { ReactComponent as TrashTalkLogo } from '../../assets/trashtalk-logo.svg';
import backgroundImage from '../../assets/backgrounds/jordan-last-shot.jpg';
import './Login.scss';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/home');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="login">
      <div className="login__box">
        <TrashTalkLogo className="login__logo" />
        
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__form-group">
            <input
              className="login__input"
              type="email"
              placeholder="Ton Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="login__form-group">
            <input
              className="login__input"
              type="password"
              placeholder="Ton Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="login__error">{error}</div>}

          <button type="submit" className="login__submit">
            {isSignUp ? 'Créer un compte' : 'Se connecter'}
          </button>
        </form>

        <div className="login__divider">ou</div>

        <button onClick={handleGoogleSignIn} className="login__google">
          <img 
            className="login__google-icon"
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google Logo" 
          />
          Continuer avec Google
        </button>

        <p className="login__toggle">
          {isSignUp ? 'Déjà dans la Team ?' : "Pas encore de compte ?"}{' '}
          <span className="login__toggle-link" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Se connecter' : 'Rejoindre'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
