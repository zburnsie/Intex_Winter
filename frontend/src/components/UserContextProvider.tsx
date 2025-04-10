// components/UserProvider.tsx

import React, { useEffect, useState } from 'react';
import { User, UserContext } from './AuthorizeView';

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await fetch('https://localhost:5000/pingauth', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (data.email) {
            const username = data.email.split('@')[0];
            setUser({ email: username, roles: data.roles ?? [] });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Auth fetch error:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAuth();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;