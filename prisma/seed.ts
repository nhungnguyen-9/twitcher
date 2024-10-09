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

    const gameCategory = await prisma.category.create({
        data: {title: "gaming"}
    })

    const podcastCategory = await prisma.category.create({
        data: {title: "podcast"}
    })

    const entertainCategory = await prisma.category.create({
        data: {title: "entertainment"}
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