import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';

import models from '../models/favoritesFolder';

const graphqlObject = new GraphQLObjectType({
    name: 'favoritesFolder',
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
        order: {
            type: GraphQLInt,
        },
        parentID: {
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