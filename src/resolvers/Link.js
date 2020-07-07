const 
    postBy = ( parent, args, context ) => {
        return context.prisma.link({ id: parent.id }).postBy();
    },
    votes = ( parent, args, context ) => {
        return context.prisma.link({ id: parent.id }).votes();
    };

module.exports = {
    postBy,
    votes
};