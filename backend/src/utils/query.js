// Load the Prisma client
const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

// The query object with user operations
module.exports = {
  user: {
    create: async (username, email, password, admin) => {
      return await prisma.user.create({
        data: {
          username,
          email,
          password,
          role: admin ? "ADMIN" : "USER",
        },
      });
    },
    getByEmail: async (email) => {
      return await prisma.user.findUnique({ where: { email } });
    },
    getById: async (id) => {
      return await prisma.user.findUnique({ where: { id } });
    },
  },
};
