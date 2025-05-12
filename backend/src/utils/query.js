// Load the Prisma client
const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

// The query object with user and movie operations
module.exports = {
  user: {
    create: async (username, email, password, admin) => {
      try {
        return await prisma.user.create({
          data: {
            username,
            email,
            password,
            role: admin ? "ADMIN" : "USER",
          },
        });
      } catch (error) {
        console.error("Prisma error creating user:", error);
        throw error; // Re-throw to be caught by the controller
      }
    },
    getByEmail: async (email) => {
      try {
        return await prisma.user.findUnique({ where: { email } });
      } catch (error) {
        console.error("Prisma error getting user by email:", error);
        throw error;
      }
    },
    getById: async (id) => {
      try {
        return await prisma.user.findUnique({ where: { id } });
      } catch (error) {
        console.error("Prisma error getting user by id:", error);
        throw error;
      }
    },
    // New function to fetch users with search, pagination, and diary entry count
    getUsers: async (search, page = 1, limit = 20) => {
      const skip = (page - 1) * limit;

      // Build the where clause conditionally based on the search parameter
      const whereClause = search
        ? {
            OR: [
              { username: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}; // If no search term, the where clause is empty, fetching all users

      try {
        const users = await prisma.user.findMany({
          where: whereClause, // Use the conditional where clause
          skip: Number(skip),
          take: Number(limit),
          orderBy: { createdAt: "desc" },
          include: {
            DiaryEntry: true, // Include DiaryEntry to count entries
          },
        });

        // Format the users to include the entries count
        const formattedUsers = users.map((user) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          photoUrl: user.photoUrl,
          role: user.role,
          createdAt: user.createdAt,
          entriesCount: user.DiaryEntry.length,
        }));

        // Get the total count of users matching the search criteria for pagination
        const totalUsers = await prisma.user.count({
          where: whereClause, // Use the same conditional where clause for counting
        });

        return { users: formattedUsers, totalUsers };
      } catch (error) {
        console.error("Prisma error fetching users:", error);
        throw error;
      }
    },
    // New function to update user role
    updateUserRole: async (userId, role) => {
      try {
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { role },
        });
        return updatedUser;
      } catch (error) {
        console.error("Prisma error updating user role:", error);
        throw error;
      }
    },
    // New function to delete a user
    deleteUser: async (userId) => {
      try {
        // Consider adding logic here for cascading deletes if not handled by Prisma schema
        // For example, deleting related DiaryEntries, EntryLikes, UserFollows, ActivityLogs
        // await prisma.diaryEntry.deleteMany({ where: { userId } });
        // await prisma.entryLike.deleteMany({ where: { userId } });
        // await prisma.userFollow.deleteMany({ where: { followerId: userId } });
        // await prisma.userFollow.deleteMany({ where: { followeeId: userId } });
        // await prisma.activityLog.deleteMany({ where: { userId } });

        await prisma.user.delete({
          where: { id: userId },
        });
        return { message: "User deleted successfully." };
      } catch (error) {
        console.error("Prisma error deleting user:", error);
        throw error;
      }
    },
  },
  genre: {
    getAll: async () => {
      try {
        return await prisma.genre.findMany();
      } catch (error) {
        console.error("Prisma error getting all genres:", error);
        throw error;
      }
    },
  },
  director: {
    getAll: async () => {
      try {
        return await prisma.director.findMany();
      } catch (error) {
        console.error("Prisma error getting all directors:", error);
        throw error;
      }
    },
  },
  movie: {
    // Modified function to get movies with search, pagination, and sorting
    getMovies: async (
      search,
      page = 1,
      limit = 10,
      sortColumn,
      sortDirection
    ) => {
      const skip = (page - 1) * limit;

      // Build the where clause for searching across title, genre, and director
      const whereClause = search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              {
                genres: {
                  some: {
                    genre: {
                      name: { contains: search, mode: "insensitive" },
                    },
                  },
                },
              },
              {
                directors: {
                  some: {
                    director: {
                      OR: [
                        {
                          firstName: { contains: search, mode: "insensitive" },
                        },
                        { lastName: { contains: search, mode: "insensitive" } },
                      ],
                    },
                  },
                },
              },
            ],
          }
        : {}; // If no search term, the where clause is empty

      // Build the orderBy clause
      const orderByClause = sortColumn
        ? { [sortColumn]: sortDirection || "asc" }
        : { createdAt: "desc" }; // Default sort

      try {
        // Fetch movies with related genres and directors, applying search, pagination, and sorting
        const movies = await prisma.movie.findMany({
          where: whereClause,
          skip: Number(skip),
          take: Number(limit),
          orderBy: orderByClause,
          include: {
            directors: { include: { director: true } },
            genres: { include: { genre: true } },
            _count: { select: { DiaryEntry: true } },
          },
        });

        // Fetch average ratings for the fetched movies in one query using groupBy
        const movieIds = movies.map((m) => m.id);
        const averageRatings = await prisma.diaryEntry.groupBy({
          by: ["movieId"],
          _avg: { rating: true },
          where: {
            movieId: { in: movieIds },
          },
        });

        // Create a map for easy lookup of average ratings
        const avgRatingMap = averageRatings.reduce((acc, item) => {
          acc[item.movieId] = item._avg.rating ?? 0;
          return acc;
        }, {});

        // Merge average ratings with movie data and format
        const moviesWithAvgRating = movies.map((movie) => ({
          id: movie.id,
          title: movie.title,
          year: movie.year,
          duration: movie.duration,
          description: movie.description,
          posterUrl: movie.posterUrl,
          createdAt: movie.createdAt,
          updatedAt: movie.updatedAt,
          directors: movie.directors.map((d) => d.director), // Simplify director structure
          genres: movie.genres.map((g) => g.genre), // Simplify genre structure
          entriesCount: movie._count.DiaryEntry,
          averageRating: avgRatingMap[movie.id] || 0, // Use 0 if no entries
        }));

        // Get the total count of movies matching the search criteria for pagination
        const totalMovies = await prisma.movie.count({
          where: whereClause,
        });

        return { movies: moviesWithAvgRating, totalMovies };
      } catch (error) {
        console.error("Prisma error fetching movies:", error);
        throw error;
      }
    },

    // New function to get a single movie by ID
    getMovieById: async (id) => {
      try {
        const movie = await prisma.movie.findUnique({
          where: { id },
          include: {
            directors: { include: { director: true } },
            genres: { include: { genre: true } },
            _count: { select: { DiaryEntry: true } },
          },
        });

        if (!movie) return null;

        // Fetch average rating for the single movie
        const averageRatingResult = await prisma.diaryEntry.groupBy({
          by: ["movieId"],
          _avg: { rating: true },
          where: { movieId: movie.id },
        });

        const averageRating = averageRatingResult[0]?._avg.rating ?? 0;

        // Format the movie data
        const formattedMovie = {
          id: movie.id,
          title: movie.title,
          year: movie.year,
          duration: movie.duration,
          description: movie.description,
          posterUrl: movie.posterUrl,
          createdAt: movie.createdAt,
          updatedAt: movie.updatedAt,
          directors: movie.directors.map((d) => d.director), // Simplify director structure
          genres: movie.genres.map((g) => g.genre), // Simplify genre structure
          entriesCount: movie._count.DiaryEntry,
          averageRating: averageRating, // Use 0 if no entries
        };

        return formattedMovie;
      } catch (error) {
        console.error("Prisma error getting movie by ID:", error);
        throw error;
      }
    },

    // Update an existing movie
    updateMovie: async (id, data) => {
      const { genres, directors, ...movieData } = data;
      try {
        // Find the movie to update to handle existing relations
        const existingMovie = await prisma.movie.findUnique({
          where: { id },
          include: {
            genres: true,
            directors: true,
          },
        });

        if (!existingMovie) {
          throw new Error(`Movie with ID ${id} not found.`);
        }

        // --- Handle Genre Updates ---
        // Get IDs of current genres associated with the movie
        const currentGenreIds = existingMovie.genres.map((mg) => mg.genreId); // Use mg.genreId for MovieGenre
        // Find or create new genres from the incoming data
        const newGenreConnects = await Promise.all(
          genres.map(async (genreName) => {
            const existingGenre = await prisma.genre.findUnique({
              where: { name: genreName },
            });
            if (existingGenre) {
              return { id: existingGenre.id };
            } else {
              const newGenre = await prisma.genre.create({
                data: { name: genreName },
              });
              return { id: newGenre.id };
            }
          })
        );
        // Get IDs of the new set of genres
        const newGenreIds = newGenreConnects.map((connect) => connect.id);

        // Determine genres to disconnect (current genres not in the new list)
        const genresToDisconnect = currentGenreIds
          .filter((genreId) => !newGenreIds.includes(genreId))
          .map((genreId) => ({ genreId: genreId })); // Corrected: Removed movieId

        // Determine genres to connect (new genres not in the current list)
        const genresToConnect = newGenreIds
          .filter((genreId) => !currentGenreIds.includes(genreId))
          .map((genreId) => ({ genreId: genreId })); // Corrected: Removed movieId

        // --- Handle Director Updates ---
        // Get IDs of current directors associated with the movie
        const currentDirectorIds = existingMovie.directors.map(
          (md) => md.directorId
        ); // Use md.directorId for MovieDirector
        // Find or create new directors from the incoming data
        const newDirectorConnects = await Promise.all(
          directors.map(async (directorData) => {
            const existingDirector = await prisma.director.findUnique({
              where: {
                firstName_lastName: {
                  firstName: directorData.firstName,
                  lastName: directorData.lastName,
                },
              },
            });
            if (existingDirector) {
              return { id: existingDirector.id };
            } else {
              const newDirector = await prisma.director.create({
                data: directorData,
              });
              return { id: newDirector.id };
            }
          })
        );
        // Get IDs of the new set of directors
        const newDirectorIds = newDirectorConnects.map((connect) => connect.id);

        // Determine directors to disconnect (current directors not in the new list)
        const directorsToDisconnect = currentDirectorIds
          .filter((directorId) => !newDirectorIds.includes(directorId))
          .map((directorId) => ({ directorId: directorId })); // Corrected: Removed movieId

        // Determine directors to connect (new directors not in the current list)
        const directorsToConnect = newDirectorIds
          .filter((directorId) => !currentDirectorIds.includes(directorId))
          .map((directorId) => ({ directorId: directorId })); // Corrected: Removed movieId

        // Perform the update
        const updatedMovie = await prisma.movie.update({
          where: { id },
          data: {
            ...movieData, // Update scalar fields
            genres: {
              deleteMany: genresToDisconnect, // Disconnect old genres from join table
              createMany: { data: genresToConnect }, // Connect new genres to join table
            },
            directors: {
              deleteMany: directorsToDisconnect, // Disconnect old directors from join table
              createMany: { data: directorsToConnect }, // Connect new directors to join table
            },
          },
          include: {
            // Include relations in the response if needed
            genres: { include: { genre: true } },
            directors: { include: { director: true } },
            _count: { select: { DiaryEntry: true } }, // Include count for formatting
          },
        });

        // Fetch average rating for the updated movie
        const averageRatingResult = await prisma.diaryEntry.groupBy({
          by: ["movieId"],
          _avg: { rating: true },
          where: { movieId: updatedMovie.id },
        });

        const averageRating = averageRatingResult[0]?._avg.rating ?? 0;

        // Format the updated movie data
        const formattedUpdatedMovie = {
          id: updatedMovie.id,
          title: updatedMovie.title,
          year: updatedMovie.year,
          duration: updatedMovie.duration,
          description: updatedMovie.description,
          posterUrl: updatedMovie.posterUrl,
          createdAt: updatedMovie.createdAt,
          updatedAt: updatedMovie.updatedAt,
          directors: updatedMovie.directors.map((d) => d.director), // Simplify director structure
          genres: updatedMovie.genres.map((g) => g.genre), // Simplify genre structure
          entriesCount: updatedMovie._count.DiaryEntry,
          averageRating: averageRating,
        };

        return formattedUpdatedMovie;
      } catch (error) {
        console.error("Prisma error updating movie:", error);
        throw error;
      }
    },

    // New function to delete a movie
    deleteMovie: async (id) => {
      try {
        // Delete related records first to avoid foreign key constraints
        await prisma.diaryEntry.deleteMany({ where: { movieId: id } });
        await prisma.movieGenre.deleteMany({ where: { movieId: id } });
        await prisma.movieDirector.deleteMany({ where: { movieId: id } });

        // Now delete the movie
        await prisma.movie.delete({
          where: { id },
        });
        return { message: "Movie deleted successfully." };
      } catch (error) {
        console.error("Prisma error deleting movie:", error);
        throw error;
      }
    },
  },
  adminDashboard: {
    getAll: async (startDate, endDate) => {
      try {
        // Fetch time-based analytics from DiaryEntry within the date range
        const stats = await prisma.diaryEntry.groupBy({
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

        // Fetch total counts (users, entries, likes, new signups in last 7 days)
        const [users, entries, likes, newSignups] = await Promise.all([
          prisma.user.count(),
          prisma.diaryEntry.count(),
          prisma.entryLike.count(),
          prisma.user.count({
            where: {
              createdAt: {
                gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
              },
            },
          }),
        ]);
        const totals = { users, entries, likes, newSignups };

        // Fetch recent activity logs (e.g., last 20 activities)
        const recentActivities = await prisma.activityLog.findMany({
          orderBy: { createdAt: "desc" },
          take: 20, // Limit to recent activities
          include: {
            user: {
              select: {
                username: true, // Include username of the user who performed the activity
              },
            },
          },
        });

        // Format and return the data
        return {
          stats: stats.map((s) => ({
            date: s.lastWatchedDate.toISOString().slice(0, 10), // Format date as YYYY-MM-DD
            entryCount: s._count.id,
            averageRating: s._avg.rating || 0,
            totalWatchedCount: s._sum.watchedCount || 0,
          })),
          totals,
          activities: recentActivities, // Include recent activities
        };
      } catch (error) {
        console.error("Prisma error fetching admin dashboard data:", error);
        throw error;
      }
    },
  },
};
