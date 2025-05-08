const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

module.exports = {
  user: {
    create: async (username, email, hashedPassword) => {
      return await prisma.user.create({
        data: { username, email, password: hashedPassword },
      });
    },
    getById: async (id) => {
      return await prisma.user.findUnique({ where: { id } });
    },
    getByEmail: async (email) => {
      return await prisma.user.findUnique({ where: { email } });
    },
    getByUsername: async (username) => {
      return await prisma.user.findUnique({ where: { username } });
    },
  },
};
