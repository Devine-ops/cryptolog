const { PrismaClient } = require('@prisma/client');
const primsa = new PrismaClient();

module.exports = async function handler(req, res) {
    const newUser = await prisma.user.create({
        data: useRouteLoaderData,
    });

    try{
    return res.status(201).json({
        message: 'User created successfully',
        user: newUser,
    });

    }catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating user' });
    }
}