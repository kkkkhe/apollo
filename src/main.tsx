import ReactDOM from 'react-dom/client'
import './index.css'
import { ApolloProvider } from '@apollo/client';
import { createBrowserRouter } from 'react-router-dom';
import { First } from './pages/first.tsx';
import { SecondPage } from './pages/second.tsx';
import App from './App.tsx';
import { client } from './shared/client.ts';

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (import.meta.env.DEV) {  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <First/>
  },
  {
    path: '/second',
    element: <SecondPage/>
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    {/* <RouterProvider router={router}/> */}
    <App/>
  </ApolloProvider>
)
