import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './AuthorizeView';


const AdminOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const [user] = useContext(UserContext);

  if (!user?.roles?.includes('Admin')) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AdminOnlyRoute;
