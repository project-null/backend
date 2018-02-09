import koaRouter from 'koa-router';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import { makeExecutableSchema } from 'graphql-tools';
import Account from '../models/accounts';

var typeDefs = [`
interface Animal{
    name: String!
}

type Dog implements Animal{
    name: String!    
    accountName: String!
    _id:String!
    url:String!
    secretText:String!    
}

type Query {
  hello: String,
  account: [Dog],
}

schema {
  query: Query
}`];

var resolvers = {
    Query: {
        async account(root) {
            return await Account.getAll();
        },
        hello(root) {
            return 'world';
        }
    }
};

var schema = makeExecutableSchema({ typeDefs, resolvers });

const graphQLrouter = new koaRouter();
graphQLrouter.post('/graphql', graphqlKoa({ schema }));
graphQLrouter.get('/graphql', graphqlKoa({ schema }));

graphQLrouter.get('/graphiql', graphiqlKoa({
    endpointURL: '/graphql'
}));

export default (app) => {
    app.use(graphQLrouter.routes());
}
