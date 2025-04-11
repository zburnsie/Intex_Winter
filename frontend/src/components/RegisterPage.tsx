import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ✅ Add this at the top
const baseApiUrl =
  'https://intex-312-backend-btgbgsf0g8aegcdr.eastus-01.azurewebsites.net';
// const baseApiUrl = 'https://localhost:5000';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      setSuccess('');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      setSuccess('');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setSuccess('');
    } else {
      setError('');
      setSuccess('');

      fetch(`${baseApiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then(async (response) => {
          if (response.ok) {
            setSuccess('Account created. Please log in.');
            setTimeout(() => {
              navigate('/login');
            }, 1000);
          } else {
            const data = await response.json();
            setError(data.message || 'Error registering.');
          }
        })
        .catch((error) => {
          console.error(error);
          setError('Error registering.');
        });
    }
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle w-100 d-flex justify-content-center bg-black text-white">
      <div
        className="card bg-dark border-0 shadow p-4"
        style={{ maxWidth: '360px', width: '100%' }}
      >
        <h5
          className="text-center mb-4 fw-bold text-white"
        >
          Register
        </h5>
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
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>
  
          <div className="d-grid mb-2">
            <button
              className="btn btn-danger btn-login fw-bold text-uppercase"
              type="submit"
            >
              Register

            </button>
          </div>
          <div className="d-grid mb-2">
            <button
              type="button"
              className="btn btn-outline-light btn-login fw-bold text-uppercase"
              onClick={handleLoginClick}
            >
              Go to Login
            </button>
          </div>
        </form>
  
        {/* Feedback messages */}
        {success && (
          <div className="alert alert-success mt-3" role="alert">
            {success}
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}

          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
