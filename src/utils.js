const 
    { verify } = require('jsonwebtoken'),
    c0nx = require(`./services/cnx_sdb.${process.env.NODE_ENV || "dev"}`);

const getUserId = ( context ) => {
    const Auth = context.request.get('Authorization');
    if( Auth ){
        const 
            token = Auth.replace('Bearer ', ''),
            { userId } = verify( token, c0nx.c0nn.APP_SECRET );
        return userId;
    } 
    throw new Error('No autenticado');
}

module.exports = {
    getUserId
}