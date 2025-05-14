import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from 'react-query';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Container, Dialog, withAuth } from './components';
import {
  configureAxios,
  configureI18n,
  queryClient,
  toastOptions,
} from './config';
import { AuthenticationProvider } from './context';
import './index.css';
import { Error, NotFound, SignIn, SignUp, Todos } from './pages';

configureAxios();
configureI18n();

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Toaster toastOptions={toastOptions} />
      <Dialog />
      <Container width='2xl'>
        <Router>
          <Routes>
            <Route path='/' element={<Navigate to='/todos' />} />
            <Route path='/todos' element={withAuth(<Todos />)} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </Container>
    </ErrorBoundary>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider>
        <App />
      </AuthenticationProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
