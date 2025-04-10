import React, { useEffect, useState } from 'react';
import { User, UserContext } from './AuthorizeView';

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({ email: '', roles: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await fetch('https://intex-312-backend-btgbgsf0g8aegcdr.eastus-01.azurewebsites.net/pingauth', {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error(`Auth request failed: ${response.status}`);
        }
        const text = await response.text();
        if (!text) {
          setUser({ email: '', roles: [] });
          return;
        }
        const data = JSON.parse(text);
        if (data.email) {
            const username = data.email.split('@')[0];
            setUser({ email: username, roles: data.roles ?? [] });
        } else {
          setUser({ email: '', roles: [] });
        }
      } catch (err) {
        console.error('Auth fetch error:', err);
        setUser({ email: '', roles: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchAuth();
  }, []);

  if (loading) return null;

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;