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
  genre: { getAll: async () => await prisma.genre.findMany() },
  director: { getAll: async () => await prisma.director.findMany() },
  movie: {
    getAll: async () => {
      // First, load all movies with their genres & directors
      const movies = await prisma.movie.findMany({
        include: {
          directors: { include: { director: true } },
          genres: { include: { genre: true } },
          _count: { select: { DiaryEntry: true } },
        },
      });

      // Then, for each movie, fetch its average rating
      const withAvg = await Promise.all(
        movies.map(async (m) => {
          const { _avg } = await prisma.diaryEntry.aggregate({
            where: { movieId: m.id },
            _avg: { rating: true },
          });
          return { ...m, averageRating: _avg.rating ?? 0 };
        })
      );

      return withAvg;
    },
  },
  adminDashboard: {
    getAll: async (startDate, endDate) => {
      const raw = await prisma.diaryEntry.groupBy({
        by: ["lastWatchedDate"],
        _count: { id: true },
        _avg: { rating: true },
        _sum: { watchedCount: true },
        where: {
          lastWatchedDate: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        },
        orderBy: { lastWatchedDate: "asc" },
      });
      return raw.map((s) => ({
        date: s.lastWatchedDate.toISOString().slice(0, 10),
        entryCount: s._count.id,
        avgRating: Number((s._avg.rating ?? 0).toFixed(2)),
        totalWatchCount: s._sum.watchedCount,
      }));
    },
  },
};
