import {
  lazy, Suspense,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import './scss/app.scss';

import { AuthProvider } from './context/authentication';

import ProtectedRoute from './authentication/protected';
import AuthRoute from './authentication/auth';
import Splash from './pages/splash';
import Tests from './pages/tests';
import Dashboard from './pages/dashboard';
import Descriptions from './pages/descriptions';

const CreateUser = lazy(() => import('./pages/create_user'));
const SignIn = lazy(() => import('./pages/signin'));
const Profile = lazy(() => import('./pages/profile'));

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path="/splash"
            element={<Splash />}
          />
          <Route
            exact
            path="/"
            element={<Tests />}
          />
          <Route
            exact
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route
            exact
            path="/descriptions"
            element={<Descriptions />}
          />
          <Route
            exact
            path="/create-user"
            element={<Component Child={CreateUser} />}
          />
          <Route
            exact
            path="/profile"
            element={<Component Child={Profile} />}
          />
        </Route>
        
        <Route element={<AuthRoute />}>
          <Route
            exact
            path="/sign-in"
            element={<Component Child={SignIn}/>}
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function Component({ Child, ...rest }) {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <Child {...rest} />
    </Suspense>
  );
}

export default App;
