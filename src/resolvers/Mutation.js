const 
    { sign } = require('jsonwebtoken'),
    { compare, hash } = require("bcryptjs"),
    c0nx = require(`../services/cnx_sdb.${process.env.NODE_ENV || "dev"}`),
    { getUserId } = require('../utils');

const 
    postLink = ( parent, args, context, info ) => {
        const userId = getUserId( context );
        return context.prisma.createLink({
          url: args.url,
          description: args.description,
          postBy: { connect: { id: userId } },
        })
    },

    updateLink = (root, args, context) => {
        return args
    },

    deleteLink = (parent, args) => {
        return 'Eliminado exitosamente.'
    },
 
    signup = async ( parent, args, context, info ) => {
        const 
            hashedPassword = await hash( args.password, 10 ),
            {password, ...user} = await context.prisma.createUser({...args, password: hashedPassword}),
            token = sign({ userId: user.id }, c0nx.c0nn.APP_SECRET  );
        return { token, user };
    },
      
    login = async ( parent, args, context, info ) => {
        console.log( args );
        // 1 verificacion usuario. SI NO ENCUENTRA USUARIO GENERA UN ERROR..
        const { password, ...user } = await context.prisma.user({ email: args.email });
        console.log( user, password );
        if( !user || !password ) throw new Error('No se encontraron datos');
        // 2 verificacion contrasena
        const valid = await compare( args.password, password );
        if( !valid ) throw new Error('Usuario o Contraseña invalida.');

        // 3 generate token
        const token = sign({ userId: user.id }, c0nx.c0nn.APP_SECRET );
        console.log({ token, user })
        return { token, user };
    },
    
    vote = async ( parent, args, context, info ) => {
        // 1
        const userId = getUserId( context );
        // 2
        const voteExist = await context.prisma.$exists.vote({
            user: { id: userId },
            link: { id: args.linkId }
        });
        // 
        if( voteExist ) throw new Error(" Ya voto por este link: " + args.linkId );
        
        return context.prisma.createVote({
            user: { connect: { id: userId } },
            link: { connect: { id: args.linkId } }
        })
    };

module.exports = {
    postLink,
    updateLink,
    deleteLink,
    signup,
    login,
    vote
}