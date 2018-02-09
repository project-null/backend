import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt
} from 'graphql'

import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';

import Account from '../models/accounts';


import koaRouter from 'koa-router';
// 我们要用的模拟数据
const data = {
    "1": {
        "id": "1",
        "name": 'a1',
    },
    "2": {
        "id": "1",
        "name": 'a1',
    }
}

const User = new GraphQLObjectType({
    name: 'User',
    description: 'User对象',
    fields: {
        _id: {
            type: GraphQLString,            
        },
        type: {
            type: GraphQLInt,
        },
        name: {
            type: GraphQLString
        }
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: User,
            resolve: async function (_, args) {
                let list = await Account.getAll();
                console.log(list);
                return list[0];
            }
        }
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
