const { PrismaClient } = require("../../generated/prisma");
const axios = require("axios");

// Initialize Prisma Client
const prisma = new PrismaClient();

// Your OMDb API Key
const OMDB_API_KEY = process.env.OMDB_API_KEY || "1301d52";
const OMDB_BASE_URL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

const movieTitles = [
  "Companion",
  "The Ballad of Wallis Island",
  "The Ugly Stepsister",
  "Mala influencia",
  "Fight or Flight",
  "A Complete Unknown",
  "Rust",
  "Nosferatu",
  "Wicked",
  "Gladiator II",
  "Queen of the Ring",
  "The Assessment",
  "Heretic",
  "Friendship",
  "The Luckiest Man in America",
  "Speak No Evil",
  "The Brutalist",
  "The Order",
  "Conclave",
  "Babygirl",
  "Beetlejuice Beetlejuice",
  "Anora",
  "The Substance",
  "The Surfer",
  "Freaky Tales",
  "Oppenheimer",
  "Mission: Impossible - Dead Reckoning Part One",
  "Top Gun: Maverick",
  "Black Widow",
  "The Old Guard",
  "Inside Man: Most Wanted",
  "Once Upon a Time... in Hollywood",
  "A Simple Favor",
  "Rogue One: A Star Wars Story",
  "The Accountant",
  "Interstellar",
  "Inception",
  "Twilight",
  "The Dark Knight",
  "Pride & Prejudice",
  "Star Wars: Episode III - Revenge of the Sith",
  "Gladiator",
  "Final Destination",
  "Star Wars: Episode I - The Phantom Menace",
  "The Shawshank Redemption",
  "The Four Seasons",
  "Star Wars: Episode IV - A New Hope",
  "The Godfather",
];

// Utility to split full name into first/last
function parseName(fullName) {
  const parts = fullName.trim().split(" ");
  const lastName = parts.pop();
  const firstName = parts.join(" ");
  return { firstName, lastName };
}

// Fetch movie data from OMDb
async function fetchMovie(title) {
  const { data } = await axios.get(OMDB_BASE_URL, {
    params: { t: title, plot: "full" },
  });
  return data.Response === "True" ? data : null;
}

async function upsertGenre(name) {
  const genre = await prisma.genre.upsert({
    where: { name },
    update: {},
    create: { name },
  });
  return genre;
}

async function upsertDirector(fullName) {
  const { firstName, lastName } = parseName(fullName);
  const director = await prisma.director.upsert({
    where: { firstName_lastName: { firstName, lastName } },
    update: {},
    create: { firstName, lastName },
  });
  return director;
}

async function populateMovies() {
  console.log("Starting movie seeding...");

  for (const title of movieTitles) {
    console.log(`Processing: ${title}`);
    const omdb = await fetchMovie(title);
    if (!omdb) {
      console.warn(`No data found for ${title}`);
      continue;
    }

    const year = parseInt(omdb.Year, 10);
    const runtime = parseInt(omdb.Runtime.replace(" min", ""), 10);
    const plot = omdb.Plot;
    const poster = omdb.Poster !== "N/A" ? omdb.Poster : null;

    // Upsert movie record
    const movie = await prisma.movie.upsert({
      where: { title_year: { title: omdb.Title, year } },
      update: {
        duration: runtime,
        description: plot,
        posterUrl: poster,
      },
      create: {
        title: omdb.Title,
        year,
        duration: runtime,
        description: plot,
        posterUrl: poster,
      },
    });

    // Process genres
    const genres = omdb.Genre.split(",").map((g) => g.trim());
    for (const name of genres) {
      const genre = await upsertGenre(name);
      await prisma.movieGenre.upsert({
        where: { movieId_genreId: { movieId: movie.id, genreId: genre.id } },
        update: {},
        create: { movieId: movie.id, genreId: genre.id },
      });
    }

    // Process directors
    const directors = omdb.Director.split(",").map((d) => d.trim());
    for (const fullName of directors) {
      const director = await upsertDirector(fullName);
      await prisma.movieDirector.upsert({
        where: {
          movieId_directorId: { movieId: movie.id, directorId: director.id },
        },
        update: {},
        create: { movieId: movie.id, directorId: director.id },
      });
    }

    console.log(`Seeded: ${movie.title} (${movie.year})`);
  }

  console.log("Movie seeding completed.");
}

// Run
populateMovies()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
