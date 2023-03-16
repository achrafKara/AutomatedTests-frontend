import { useState, useMemo, createContext } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [state, setState] = useState({
    jwt: localStorage.getItem('jwt'),
    appUser: JSON.parse(localStorage.getItem('user')),
  });

  const storeUser = (appUser, next) => {
    if (!appUser) return;

    setState((prevState) => ({
      ...prevState,
      appUser,
    }));

    localStorage.setItem('user', JSON.stringify(appUser));

    if (next) next();
  };

  const login = (jwt, appUser) => {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('user', JSON.stringify(appUser));

    setState({ jwt, appUser });
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');

    setState({ jwt: null, appUser: null });
  };

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
      storeUser,
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export { AuthProvider, AuthContext };
