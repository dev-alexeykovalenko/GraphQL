const graphql = require('graphql');
const axios = require('axios');
const { response } = require('express');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString }
    }
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: { 
            type: CompanyType,
            async resolve(parentValue, args) {
                const { companyId } = parentValue;
                const { data } = await axios.get(`http://localhost:3000/companies/${companyId}`);
                return data;
            }
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { 
                id: { type: GraphQLString } 
            },
            async resolve(parentValue, args) {
                const { id } = args;
                const { data } = await axios.get(`http://localhost:3000/users/${id}`);
                return data;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})