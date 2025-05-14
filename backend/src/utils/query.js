// Load the Prisma client
const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();
// Import the caching module
const cache = require("./cache");

// The query object with user, genre, director, movie, and adminDashboard operations
module.exports = {
  user: {
    create: async (username, email, password, admin) => {
      try {
        // Note: User creation does not typically involve caching the created user immediately,
        // but you might invalidate a 'getUsers' cache if that list is cached.
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
      // Caching getByEmail might be useful if user lookups by email are frequent
      // const cacheKey = cache.CACHE_KEYS.USER_EMAIL(email); // Assuming you define this key
      // const cachedData = await cache.get(cacheKey);
      // if (cachedData) return cachedData;

      try {
        const user = await prisma.user.findUnique({ where: { email } });
        // if (user) await cache.set(cacheKey, user, 3600); // Cache for 1 hour
        return user;
      } catch (error) {
        console.error("Prisma error getting user by email:", error);
        throw error;
      }
    },
    getById: async (id) => {
      // Caching getById is often very beneficial
      // const cacheKey = cache.CACHE_KEYS.USER_ID(id); // Assuming you define this key
      // const cachedData = await cache.get(cacheKey);
      // if (cachedData) return cachedData;

      try {
        const user = await prisma.user.findUnique({ where: { id } });
        // if (user) await cache.set(cacheKey, user, 3600); // Cache for 1 hour
        return user;
      } catch (error) {
        console.error("Prisma error getting user by id:", error);
        throw error;
      }
    },
    // Fetch users with search, pagination, and diary entry count
    getUsers: async (search, page = 1, limit = 20) => {
      // Caching the users list with pagination and search parameters
      const cacheKey = cache.CACHE_KEYS.USERS_LIST(search, page, limit); // Assuming you define this key
      const cachedData = await cache.get(cacheKey);

      if (cachedData) {
        return cachedData;
      }

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

        const result = { users: formattedUsers, totalUsers };

        // Cache the result for a reasonable time, e.g., 5 minutes (300 seconds)
        await cache.set(cacheKey, result, 300);

        return result;
      } catch (error) {
        console.error("Prisma error fetching users:", error);
        throw error;
      }
    },
    // Update user role
    updateUserRole: async (userId, role) => {
      try {
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { role },
        });
        // Invalidate user-specific caches and potentially the users list cache
        // cache.del(cache.CACHE_KEYS.USER_ID(userId)); // Assuming you have a user ID cache key
        // Consider invalidating the getUsers cache if roles affect the list display
        // cache.del(cache.CACHE_KEYS.USERS_LIST(...)); // You'd need to know the parameters

        return updatedUser;
      } catch (error) {
        console.error("Prisma error updating user role:", error);
        throw error;
      }
    },
    // Delete a user
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
        // Invalidate user-specific caches and potentially the users list cache
        // cache.del(cache.CACHE_KEYS.USER_ID(userId)); // Assuming you have a user ID cache key
        // Consider invalidating the getUsers cache if deletion affects the list display
        // cache.del(cache.CACHE_KEYS.USERS_LIST(...)); // You'd need to know the parameters

        return { message: "User deleted successfully." };
      } catch (error) {
        console.error("Prisma error deleting user:", error);
        throw error;
      }
    },
  },
  genre: {
    getAll: async () => {
      // Caching genres list
      const cacheKey = cache.CACHE_KEYS.ALL_GENRES; // Assuming you define this key
      const cachedData = await cache.get(cacheKey);

      if (cachedData) {
        return cachedData;
      }

      try {
        const genres = await prisma.genre.findMany();
        // Cache for a longer time as genres don't change often, e.g., 24 hours (86400 seconds)
        await cache.set(cacheKey, genres, 86400);
        return genres;
      } catch (error) {
        console.error("Prisma error getting all genres:", error);
        throw error;
      }
    },
  },
  director: {
    getAll: async () => {
      // Caching directors list
      const cacheKey = cache.CACHE_KEYS.ALL_DIRECTORS; // Assuming you define this key
      const cachedData = await cache.get(cacheKey);

      if (cachedData) {
        return cachedData;
      }

      try {
        const directors = await prisma.director.findMany();
        // Cache for a longer time as directors don't change often, e.g., 24 hours (86400 seconds)
        await cache.set(cacheKey, directors, 86400);
        return directors;
      } catch (error) {
        console.error("Prisma error getting all directors:", error);
        throw error;
      }
    },
  },
  movie: {
    getDashboardMovies: async () => {
      // Cache key for the dashboard movies
      const cacheKey = cache.CACHE_KEYS.DASHBOARD;
      const cachedData = await cache.get(cacheKey);

      if (cachedData) {
        return cachedData;
      }

      try {
        // Get all movies with their genres
        const allMovies = await prisma.movie.findMany({
          include: {
            genres: {
              include: {
                genre: true,
              },
            },
            _count: {
              select: {
                DiaryEntry: true,
              },
            },
          },
          orderBy: [
            { year: "desc" }, 
            { createdAt: "desc" }
          ],
        });
        
        // Still provide the expected structure for the frontend
        // but populate all fields with the complete movie list
        const result = {
          popularMovies: allMovies,
          randomMovies: allMovies,
          newestPerGenre: allMovies,
        };

        // Cache the dashboard data for 1 hour (3600 seconds)
        await cache.set(cacheKey, result, 86400);

        return result;
      } catch (err) {
        console.log("Error:", err);
        throw err;
      }
    },
    getMovies: async (
      search,
      page = 1,
      limit = 10,
      sortColumn,
      sortDirection
    ) => {
      // Create a cache key based on all parameters
      const cacheKey = cache.CACHE_KEYS.MOVIES_LIST(
        search,
        page,
        limit,
        sortColumn,
        sortDirection
      );
      const cachedData = await cache.get(cacheKey);

      if (cachedData) {
        return cachedData;
      }

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

        const result = { movies: moviesWithAvgRating, totalMovies };

        // Cache the list for 15 minutes (900 seconds)
        await cache.set(cacheKey, result, 900);
        return result;
      } catch (error) {
        console.error("Prisma error fetching movies:", error);
        throw error;
      }
    },

    // Get a single movie by ID
    getMovieById: async (id) => {
      // Cache key for a specific movie detail
      const cacheKey = cache.CACHE_KEYS.MOVIE_DETAIL(id);
      const cachedData = await cache.get(cacheKey);

      if (cachedData) {
        return cachedData;
      }

      try {
        const movie = await prisma.movie.findUnique({
          where: { id },
          include: {
            directors: { include: { director: true } },
            genres: { include: { genre: true } },
            _count: { select: { DiaryEntry: true } },
          },
        });

        if (!movie) {
          // If movie is not found, we might cache null or a specific indicator
          // to avoid hitting the DB repeatedly for non-existent IDs, but be careful
          // await cache.set(cacheKey, null, 60); // Cache not found for 1 minute
          return null;
        }

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

        // Cache the movie detail for 1 hour (3600 seconds)
        await cache.set(cacheKey, formattedMovie, 3600);

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
        const currentGenreIds = existingMovie.genres.map((mg) => mg.genreId);
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
          .map((genreId) => ({ genreId: genreId }));

        // Determine genres to connect (new genres not in the current list)
        const genresToConnect = newGenreIds
          .filter((genreId) => !currentGenreIds.includes(genreId))
          .map((genreId) => ({ genreId: genreId }));

        // --- Handle Director Updates ---
        // Get IDs of current directors associated with the movie
        const currentDirectorIds = existingMovie.directors.map(
          (md) => md.directorId
        );
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
          .map((directorId) => ({ directorId: directorId }));

        // Determine directors to connect (new directors not in the current list)
        const directorsToConnect = newDirectorIds
          .filter((directorId) => !currentDirectorIds.includes(directorId))
          .map((directorId) => ({ directorId: directorId }));

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

        // --- Cache Invalidation ---
        // Invalidate the cache for this specific movie detail
        cache.del(cache.CACHE_KEYS.MOVIE_DETAIL(id));
        // Invalidate the dashboard cache as popular/newest movies might change
        cache.del(cache.CACHE_KEYS.DASHBOARD);
        // Consider invalidating relevant movie list caches if the update affects search/sort results
        // This can be complex depending on how many list variations you cache.
        // A simple approach is to invalidate all movie list caches, or use a more sophisticated
        // caching strategy that handles partial invalidation.

        return formattedUpdatedMovie;
      } catch (error) {
        console.error("Prisma error updating movie:", error);
        throw error;
      }
    },

    // Delete a movie
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

        // --- Cache Invalidation ---
        // Invalidate the cache for this specific movie detail
        cache.del(cache.CACHE_KEYS.MOVIE_DETAIL(id));
        // Invalidate the dashboard cache as popular/newest movies might change
        cache.del(cache.CACHE_KEYS.DASHBOARD);
        // Consider invalidating relevant movie list caches
        // cache.del(cache.CACHE_KEYS.MOVIES_LIST(...));

        return { message: "Movie deleted successfully." };
      } catch (error) {
        console.error("Prisma error deleting movie:", error);
        throw error;
      }
    },
  },
  adminDashboard: {
    getAll: async (startDate, endDate) => {
      // Caching admin dashboard data. Note: This might be sensitive data,
      // so consider if caching is appropriate and who can access it.
      // The cache key should probably include the date range.
      const cacheKey = cache.CACHE_KEYS.ADMIN_DASHBOARD(startDate, endDate); // Assuming you define this key
      const cachedData = await cache.get(cacheKey);

      if (cachedData) {
        return cachedData;
      }

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
        const result = {
          stats: stats.map((s) => ({
            date: s.lastWatchedDate.toISOString().slice(0, 10), // Format date as YYYY-MM-DD
            entryCount: s._count.id,
            averageRating: s._avg.rating || 0,
            totalWatchedCount: s._sum.watchedCount || 0,
          })),
          totals,
          activities: recentActivities, // Include recent activities
        };

        // Cache admin dashboard data for a shorter time, e.g., 5 minutes (300 seconds)
        await cache.set(cacheKey, result, 300);

        return result;
      } catch (error) {
        console.error("Prisma error fetching admin dashboard data:", error);
        throw error;
      }
    },
  },
};
