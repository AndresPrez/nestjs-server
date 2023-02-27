import { PrismaClient, RoleEnum } from '@prisma/client'
import bcrypt from 'bcrypt';

async function hashPassword(password: string, customSalt?: string) {
    const salt = customSalt || (await bcrypt.genSalt(1));
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const prisma = new PrismaClient()

async function roles() {
    const admin = await prisma.role.upsert({
        where: { role: RoleEnum.ADMIN },
        update: {},
        create: {
            role: RoleEnum.ADMIN
        }
    })

    const user = await prisma.role.upsert({
        where: { role: RoleEnum.USER },
        update: {},
        create: {
            role: RoleEnum.USER
        }
    })

    console.log({ admin, user })
}

async function users() {
    const adminRole = await prisma.role.findUnique({ where: { role: RoleEnum.ADMIN } })
    const userRole = await prisma.role.findUnique({ where: { role: RoleEnum.USER } })

    const admin = await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: await hashPassword("admin"),
            roles: {
                create: [
                    { role: { connect: { id: adminRole?.id } } }
                ]
            }
        }
    })

    const regular = await prisma.user.upsert({
        where: { username: 'regular' },
        update: {},
        create: {
            username: 'regular',
            password: await hashPassword("regular"),
            roles: {
                create: [
                    { role: { connect: { id: userRole?.id } } }
                ]
            }
        }
    })

    console.log({ admin, regular })
}

async function main() {
    await roles()
    await users()
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