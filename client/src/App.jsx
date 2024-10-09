import './App.css';
//Import Apollo client
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
//Import outlet
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

//http link
const httpLink = createHttpLink({
  uri:'/graphql',
})

//Context
const authLink = setContext((_,{headers}) => {
  const token = localStorage.getItem('id_token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

//Apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache:new InMemoryCache({
    typePolicies: {
      Book:{
        keyFields:['bookId']
      }
    }
  })
})

//Wrap application in Apollo provider
function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
