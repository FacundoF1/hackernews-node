const 
    // 1
    { GraphQLServer } = require('graphql-yoga'), 
    { prisma } = require('./generated/prisma-client'),
    Query = require('./resolvers/Query'),
    Mutation = require('./resolvers/Mutation'),
    User = require('./resolvers/User'),
    Link = require('./resolvers/Link'),
    Subscription = require('./resolvers/Subscription'),
    Vote = require('./resolvers/Vote');
// 2
const resolvers = {
        Query,
        Mutation,
        Subscription,
        User,
        Link,
        Vote
    };

// 3
const server = new GraphQLServer({
        typeDefs: './src/schema.graphql',
        resolvers,
        context: request => {
            return {
                ...request,
                prisma,
            }
        },  
    });
    
server.start( (e) => console.log( `Servidor corriendo en http://localhost:${e.port}`, e) );  