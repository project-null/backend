import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';

import models from '../models/favorites';

const graphqlObject = new GraphQLObjectType({
    name: 'favorites',
    description: 'User对象',
    fields: {
        _id: {
            type: GraphQLString,
        },
        name: {
            description: '密文',
            type: GraphQLString,
        },
        desc: {
            type: GraphQLString,
        },
        labels: {
            type: new GraphQLList(GraphQLString),
        },
        iconURL: {
            type: GraphQLString,
        },
        url: {
            type: GraphQLString
        },
        folderID: {
            type: GraphQLString,
        }
    }
});

export default {
    type: new GraphQLList(graphqlObject),
    description: '收藏的站点',
    args: {
        folderID: {
            type: GraphQLString
        },
        id: {
            type: GraphQLString
        }
    },
    resolve: async function (_, args) {
        const { folderID, id } = args;
        if (!!folderID) {
            let list = await models.getAll({ folderID });
            return list;
        }

        if (!!id) {
            let list = await models.get(id);
            return [list];
        }

        return await models.getAll();
    }
}