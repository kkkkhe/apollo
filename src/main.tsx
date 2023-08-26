import ReactDOM from 'react-dom/client'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { First } from './pages/first.tsx';
import { SecondPage } from './pages/second.tsx';
import App from './App.tsx';
const cache = new InMemoryCache({
});
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache,
});
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
