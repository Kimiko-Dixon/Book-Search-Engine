const express = require('express');
const path = require('path');
//require apollo server,express and auth middleware
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
const {authMiddleware} = require('./utils/auth')

//require type definitions and resolvers
const {typeDefs,resolvers} = require('./schemas')
const db = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

//Create the server with the type definitions and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers
})

const startApolloServer = async () => {
  //Wait for the erver to start
  await server.start()

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  //register the suth middleware for the database
  app.use('/graphql', expressMiddleware(server,{
    context:authMiddleware
  }))

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  //direct to the entry point for the client
  app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname,'../client/dist/index.html'))
  })
}
//listen at the port
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

}

//activate the function to run the server
startApolloServer()