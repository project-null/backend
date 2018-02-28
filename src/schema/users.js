import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';
import users from '../models/users';

const graphqlObject = new GraphQLObjectType({
    name: 'users',
    description: '系统用户信息',
    fields: {
        loginName: {
            type: GraphQLString,
        },
        nikeName: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
        _id: {
            type: GraphQLString
        }
    }
});

export default {
    type: new GraphQLList(graphqlObject),
    description: '系统用户信息',
    resolve: async function (_, args) {        
        let list = await users.getAll();
        return list;
    }
}