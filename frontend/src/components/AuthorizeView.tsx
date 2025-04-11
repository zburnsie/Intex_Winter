import React, { useState, useEffect, createContext, useContext } from 'react';
import { Navigate } from 'react-router-dom';

export interface User {
  email: string;
  roles: string[];
  recId?: number;
}

export const UserContext = createContext<
  [User, React.Dispatch<React.SetStateAction<User>>, boolean]
>([{ email: '', roles: [], recId: -1 }, () => {}, true]);

function AuthorizeView(props: {
  children: React.ReactNode;
  requiredRole?: string;
}) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>({ email: '', roles: [], recId: -1 });

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

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response from server');
        }

        const data = await response.json();

        if (data.email) {
          const userObj = {
            email: data.email,
            roles: data.roles ?? [],
            recId: data.recId ?? -1,
          };
          setUser(userObj);

          if (
            props.requiredRole &&
            !userObj.roles.includes(props.requiredRole)
          ) {
            setAuthorized(false);
          } else {
            setAuthorized(true);
          }
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAuth();
  }, [props.requiredRole]);

  if (loading) return <p>Loading...</p>;
  if (!authorized) return <Navigate to="/unauthorized" />;

  return (
    <UserContext.Provider value={[user, setUser, loading]}>
      {props.children}
    </UserContext.Provider>
  );
}

export function AuthorizedUser(props: { value: 'email' | 'roles' }) {
  const [user] = useContext(UserContext);
  if (!user.email) return null;

  if (props.value === 'email') return <>{user.email}</>;
  if (props.value === 'roles') return <>{user.roles.join(', ')}</>;
  return null;
}

export default AuthorizeView;
