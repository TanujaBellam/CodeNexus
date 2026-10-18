import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import EditorScreen from './components/EditorScreen';
import AuthModal from './components/AuthModal';

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [view, setView] = useState('landing'); // landing, editor
  const [difficulty, setDifficulty] = useState('easy');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Load session from localStorage on load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  const handleAuthSuccess = (authUser, authToken) => {
    setUser(authUser);
    setToken(authToken);
    setView('editor');
  };

  const handleGuestAccess = () => {
    setIsAuthOpen(false);
    setView('editor');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    setView('landing');
  };

  const handleSelectDifficulty = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setView('editor');
  };

  const handleStartCoding = () => {
    setView('editor');
  };

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text antialiased">
      {view === 'landing' ? (
        <LandingPage
          user={user}
          onLogout={handleLogout}
          onOpenAuth={() => setIsAuthOpen(true)}
          onSelectDifficulty={handleSelectDifficulty}
        />
      ) : (
        <EditorScreen
          initialDifficulty={difficulty}
          user={user}
          token={token}
          onBackToLanding={() => setView('landing')}
          onSessionExpired={() => { handleLogout(); setIsAuthOpen(true); }}
        />
      )}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        onGuestAccess={handleGuestAccess}
      />
    </div>
  );
}
