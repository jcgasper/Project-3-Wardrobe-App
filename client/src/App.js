import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Landing from './pages/Landing'
import Profile from './pages/Profile';
import FullCategory from './pages/FullCategory';
import AddItemForm from './pages/AddItemForm'
import ViewItem from './pages/ViewItem';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})


function App() {
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        
        <Router>
          <>
            {/* <Navbar /> */}
            <Header />
            <Container maxW="container.lg">
            
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/profile/:category' component={FullCategory} />
              <Route exact path='/addItem' component={AddItemForm} />
              <Route exact path='/viewItem/:articleId' component={ViewItem} />
              <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
            </Switch>
            </Container>
            
          </>
        </Router>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;
