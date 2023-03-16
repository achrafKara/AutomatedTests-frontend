import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authentication';

function Protected() {
  const { jwt } = useContext(AuthContext);

  return jwt ? (
    <Outlet />
  ) : (
    <Navigate
      to="/sign-in"
      replace
    />
  );
}

export default Protected;
