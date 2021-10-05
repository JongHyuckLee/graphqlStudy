const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    helloWorld: String
  }
`);

const rootValue = {
    helloWorld: () => {
        return 'Hello world!';
    },
};

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(cors(corsOptions));
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');