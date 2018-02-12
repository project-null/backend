import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';
import Account from '../models/accounts';

const User = new GraphQLObjectType({
    name: 'User',
    description: 'User对象',
    fields: {
        secretText:{
            type: GraphQLString,
        },
        _id: {
            type: GraphQLString,
        },
        url: {
            type: GraphQLString,
        },
        labels: {
            type: new GraphQLList(GraphQLString),
        },
        type: {
            type: GraphQLInt,
        },
        name: {
            type: GraphQLString
        },
        accountName:{
            type:GraphQLString,
        }
    }
});

export default {
    type: new GraphQLList(User),
    description: '密码本',
    resolve: async function (_, args) {
        let list = await Account.getAll();
        return list;
    }
}