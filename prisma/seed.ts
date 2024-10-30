import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const adminRole = await prisma.role.upsert({
        where: {name: 'admin'},
        update: {},
        create: {
            name: 'admin',
        },
    })

    const userRole = await prisma.role.upsert({
        where: {name: 'user'},
        update: {},
        create: {
            name: 'user',
        },
    })

    const gameCategory = await prisma.category.upsert({
        where: {id: 1},
        update: {},
        create: {
            title: 'gaming',
        },
    })

    const podcastCategory = await prisma.category.upsert({
        where: {id: 2},
        update: {},
        create: {
            title: 'podcast',
        },
    })

    const entertainCategory = await prisma.category.upsert({
        where: {id: 3},
        update: {},
        create: {
            title: 'entertainment',
        },
    })
    const techCategory = await prisma.category.upsert({
        where: {id: 4}, // Assuming 4 is the unique id for the 'tech' category
        update: {},
        create: {
            title: 'tech',
        },
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })