import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';
import Account from '../models/accounts';

const graphqlObject = new GraphQLObjectType({
    name: 'account',
    description: '账号信息',
    fields: {
        secretText:{
            description:'密文',
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
    type: new GraphQLList(graphqlObject),
    description: '账号信息',
    resolve: async function (_, args) {
        console.log(args);
        let list = await Account.getAll();
        return list;
    }
}