/**
 * React stuff
 */
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Services
 */
import userService from '../services/user/user.service';
import authService from '../services/auth/auth.service';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

/**
 * Custom AuthContext.Provider component
 *  Authentication related business logic -> new Provider component:
 * */
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('dsaas');
    //Find a better way of setting setUser because this way
    //it will be set after the first render causing it to rerender, meaning
    //first time it renders user will be null

    const isAuthenticated = authService
      .isAuthenticated()
      .then((response) => {
        return response.status === 200;
      })
      .catch((err) => console.log(err));

    if (isAuthenticated) {
      userService
        .getUser()
        .then((response) => response.data)
        .then((user) => {
          setUser(user);
          const origin = location?.state?.from?.pathname || '/home';
          navigate(origin);
        })
        .catch((error) => {
          console.log(
            error?.response?.data?.message || 'Cannot authenticate user!'
          );
        });
    }
  }, []);

  const handleLogin = (email, password, remember_me) => {
    return authService.logIn(email, password, remember_me).then((response) => {
      setUser(response.data);
      console.log(response);

      const origin = location?.state?.from?.pathname || '/home';
      navigate(origin);
      return response;
    });
  };

  const handleLogout = () => {
    setUser(null);
    authService.logOut().then((response) => {
      console.log('OK');
    });
    /**
     *  <ProtectedRoute>
          <Me />
        </ProtectedRoute>
        - So when we setUser to null it will cause a rerender, 
          meaning I'm no longer allowed to the protected route
     */
  };

  const value = {
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
