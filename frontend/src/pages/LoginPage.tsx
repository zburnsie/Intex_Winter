import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './identity.css';
import '@fortawesome/fontawesome-free/css/all.css';

// ✅ Add this at the top
const baseApiUrl =
  'https://intex-312-backend-btgbgsf0g8aegcdr.eastus-01.azurewebsites.net';
// const baseApiUrl = 'https://localhost:5000';

function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberme, setRememberme] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (type === 'checkbox') {
      setRememberme(checked);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const loginUrl = rememberme
      ? `${baseApiUrl}/login?useCookies=true`
      : `${baseApiUrl}/login?useSessionCookies=true`;

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      let data = null;
      const contentLength = response.headers.get('content-length');
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || 'Invalid email or password.');
      }

      window.location.href = '/movies'; // Redirect to MoviesPage on successful login
    } catch (error: any) {
      setError(error.message || 'Error logging in.');
      console.error('Fetch attempt failed:', error);
    }
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle w-100 d-flex justify-content-center text-white bg-black">
      <div className="card bg-dark border-0 shadow p-4" style={{ maxWidth: '360px', width: '100%' }}>
        <h5 className="text-center mb-3 fw-bold text-white">Sign In</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="form-check d-flex align-items-center mb-3">
            <input
              className="form-check-input me-2"
              type="checkbox"
              id="rememberme"
              name="rememberme"
              checked={rememberme}
              onChange={handleChange}
            />
            <label className="form-check-label mb-0" htmlFor="rememberme">
              Remember me
            </label>
          </div>
          <div className="d-grid mb-2">
            <button className="btn btn-danger fw-bold" type="submit">
              Sign in
            </button>
          </div>
          <div className="d-grid mb-2">
            <button
              className="btn btn-outline-light fw-bold"
              type="button"
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </div>
          <hr className="my-4" />
          <div className="d-grid mb-2">
            <button className="btn btn-outline-light fw-bold" type="button">
              <i className="fa-brands fa-google me-2"></i> Sign in with Google
            </button>
          </div>
          <div className="d-grid mb-2">
            <button className="btn btn-outline-light fw-bold" type="button">
              <i className="fa-brands fa-facebook-f me-2"></i> Sign in with Facebook
            </button>
          </div>
          {error && (
            <p className="text-danger text-center mt-3 mb-0" style={{ fontSize: '0.9rem' }}>
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
