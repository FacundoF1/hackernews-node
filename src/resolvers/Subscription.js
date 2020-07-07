const
    // LINK
    newLinkSubscription = (parent, args, context, info) => {
        return context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node()
    },
    newLink = {
        subscribe: newLinkSubscription,
        resolve: payload => payload
    }
    // VOTE
    newVoteSubscription = (parent, args, context, info) => {
        return context.prisma.$subscribe.vote({ mutation_in: [ 'CREATED' ]} ).node();
    },
    newVote = {
        subscribe: newVoteSubscription,
        resolve: payload => payload
    };



module.exports = {
    newLink,
    newVote
}