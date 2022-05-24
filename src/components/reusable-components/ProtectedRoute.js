/**
 * React stuff
 */
import {
  Routes,
  Route,
  NavLink,
  useLocation,
  Navigate,
  useNavigate,
} from 'react-router-dom';
/**
 *
 */
import { useAuth } from '../../contexts/auth.context';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
