import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/*
 *   the logic here is we store a 'splash' variable when we fetch 'data' first time after login
 *   so next time a request won't be triggered every time we open the app, but only when there
 *   is a new login
 */

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const splash = localStorage.getItem('splash');

    if (splash) return navigate('/', { replace: true });

    localStorage.setItem('splash', 's');

    navigate('/', { replace: true });

  }, [navigate]);

  return <div>Loading...</div>;
}

export default Splash;
