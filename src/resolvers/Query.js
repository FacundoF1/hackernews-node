const feed = async ( parent, args, context, info ) => {
    const  
        where = args.filter ? {
            OR: [ 
                { description_contains: args.filter },
                { url_contains: args.filter },
            ]
        } : {},

        links = await context.prisma.links({ 
            where,
            skip: args.skip,
            first: args.first,
            orderBy: args.orderBy
        }),

        count = await context.prisma
            .linksConnection({ where, })
            .aggregate()
            .count();

    return {
        links,
        count
    }
}

module.exports = {
    feed,
}