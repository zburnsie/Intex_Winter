import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { AuthorizeView } from './AuthorizeView'; // Adjust the import path based on your project structure

const MoviesPage: React.FC = () => {
  const [showCookieBanner, setShowCookieBanner] = useState(true);

  const handleAcceptCookies = () => {
    setShowCookieBanner(false);
    // Store the cookie preference in localStorage or cookies if needed
    localStorage.setItem('cookiesAccepted', 'true');
  };

  return (
    <Container fluid>
      {/* Your MoviesPage content here */}

      {showCookieBanner && (
        <div
          className="position-fixed bottom-0 start-0 end-0 bg-white text-dark p-3 d-flex justify-content-between align-items-center border-top shadow"
          style={{ zIndex: 1050 }}
        >
          <span>
            🍪 This site uses cookies to improve your experience. By continuing,
            you agree.
          </span>
          <button
            className="btn btn-light btn-sm"
            onClick={handleAcceptCookies}
          >
            Got it!
          </button>
        </div>
      )}

      {/* This part ensures the rest of your layout (like AuthorizeView) isn't affected */}
      <AuthorizeView>
        {/* Additional components or content inside AuthorizeView */}
      </AuthorizeView>
    </Container>
  );
};

export default MoviesPage;

