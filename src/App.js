import {
  lazy, Suspense,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import './scss/app.scss';

import { AuthProvider } from './context/authentication';

import ProtectedRoute from './authentication/protected';
import AuthRoute from './authentication/auth';

const Splash = lazy(() => import('./pages/splash'));
const Tests = lazy(() => import('./pages/tests'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Descriptions = lazy(() => import('./pages/descriptions'));
const CreateUser = lazy(() => import('./pages/create_user'));
const SignIn = lazy(() => import('./pages/signin'));

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path="/splash"
            element={<Component Child={Splash} />}
          />
          <Route
            exact
            path="/"
            element={<Component Child={Tests} />}
          />
          <Route
            exact
            path="/create-user"
            element={<Component Child={CreateUser}/>}
          />
          <Route
            exact
            path="/dashboard"
            element={<Component Child={Dashboard} />}
          />
          <Route
            exact
            path="/descriptions"
            element={<Component Child={Descriptions} />}
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
