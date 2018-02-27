import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import koaRouter from 'koa-router';

import account from '../schema/account';
import favorites from '../schema/favorites';
import favoritesFolder from '../schema/favoritesFolder';

import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql';

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        account,
        favorites,
        favoritesFolder
    }
});

const schema = new GraphQLSchema({
    query: Query
});


const graphQLrouter = new koaRouter();
graphQLrouter.post('/graphql', graphqlKoa({ schema }));
graphQLrouter.get('/graphql', graphqlKoa({ schema }));

graphQLrouter.get('/graphiql', graphiqlKoa({
    endpointURL: '/graphql'
}));

export default (app) => {
    app.use(graphQLrouter.routes());
}
