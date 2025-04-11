import React, { useEffect, useState } from 'react';
import { User, UserContext } from './AuthorizeView';

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({ email: '', roles: [], recId: -1 });
  const [loading, setLoading] = useState(true);
  console.log('Context in Provider:', UserContext);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await fetch(
          'https://intex-312-backend-btgbgsf0g8aegcdr.eastus-01.azurewebsites.net/pingauth',
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        const text = await response.text();
        console.log('raw response text:', text);
        // const data = await response.json();
        const data = JSON.parse(text);
        console.log('parsed data:', data);
        if (data.email && typeof data.recId === 'number' && data.recId !== -1) {
          const username = data.email.split('@')[0];
          setUser({
            email: username,
            roles: data.roles ?? [],
            recId: data.recId ?? -1,
          });
        } else {
          setUser({ email: '', roles: [], recId: -1 }); // fallback "logged out" user
        }
      } catch (err) {
        console.error('Auth fetch error:', err);
        setUser({ email: '', roles: [], recId: -1 });
      } finally {
        setLoading(false);
      }
    };

    fetchAuth();
  }, []);

  if (loading) return null;

  return (
    <UserContext.Provider value={[user, setUser, loading]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
