import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authentication';

function Auth() {
  const { jwt } = useContext(AuthContext);

  return !jwt ? (
    <Outlet />
  ) : (
    <Navigate
      to="/splash"
      replace
    />
  );
}

export default Auth;
