import {
  lazy, Suspense,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import './scss/app.scss';

const Home = lazy(() => import('./pages/home'));
const CreateUser = lazy(() => import('./pages/create_user'));

function App() {

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Component Child={Home} />}
      />
      <Route
        exact
        path="/create-user"
        element={<Component Child={CreateUser} />}
      />
    </Routes>
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
