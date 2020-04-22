import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './componentes/Layout/Header';

import Clientes from './componentes/Clientes/Clientes';
import EditarCliente from './componentes/Clientes/EditarCliente';
import NuevoCliente from './componentes/Clientes/NuevoCliente';

import NuevoProducto from './componentes/Productos/NuevoProducto';
import Productos from './componentes/Productos/Productos';
import EditarProducto from './componentes/Productos/EditarProducto';


// const client = new ApolloClient({
//   url: "ec2-3-89-19-150.compute-1.amazonaws.com:8000/graphql",
//   onError: ({networkError, graphQLErrors}) => {
//     console.log('graphQLErrors', graphQLErrors);
//     console.log('networkError', networkError);
//   }
// });

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: 'http://52.73.101.215:8000/graphql',
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache({
    addTypename: false
  })
});

function App() {
  return (
    <ApolloProvider client={ client }>
      <Router>
        <Fragment>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Clientes} />
              <Route exact path="/cliente/editar/:id" component={ EditarCliente } />
              <Route exact path="/cliente/nuevo" component={ NuevoCliente } />
              <Route exact path="/producto/nuevo" component={ NuevoProducto } />
              <Route exact path="/productos" component={ Productos } />
              <Route exact path="/producto/editar/:id" component={ EditarProducto } />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ApolloProvider>
  );
}

export default App;
