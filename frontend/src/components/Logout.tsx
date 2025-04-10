import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from './AuthorizeView';

type LogoutProps = {
  children?: React.ReactNode;
};

const Logout = ({ children }: LogoutProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [, setUser] = useContext(UserContext);

  const handleLogout = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://intex-312-backend-btgbgsf0g8aegcdr.eastus-01.azurewebsites.net/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setUser({ email: '', roles: [] });
        window.dispatchEvent(new CustomEvent('user-logged-out'));
        navigate('/login');
      } else {
        console.error('Logout failed:', response.status);
        setError('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        disabled={loading}
        className="btn btn-link text-white text-decoration-none p-0"
        style={{ background: 'none', border: 'none' }}
      >
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Logging out...
          </>
        ) : (
          children || 'Logout'
        )}
      </button>

      {error && (
        <div className="alert alert-danger mt-2 mb-0 py-2 px-3" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

export default Logout;