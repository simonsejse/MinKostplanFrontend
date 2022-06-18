import React, { useEffect, useState } from 'react';

/**
 * Routing
 */
import { useSearchParams, useNavigate } from 'react-router-dom';

const ResetCredentials = () => {
  //Invoked when Componenet is "initially" mounted because of dependency
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('passwordToken');
    if (!token || token === '' || token === undefined || token === null) {
      navigate('/');
    }
    setToken(token);
  }, []);

  return <div>ResetCredentials</div>;
};

export default ResetCredentials;
