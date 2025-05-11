/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "photo_url" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "year" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "poster_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genres" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directors" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "directors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diary_entries" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "movie_id" TEXT NOT NULL,
    "last_watched_date" TIMESTAMP(3) NOT NULL,
    "watched_count" INTEGER NOT NULL DEFAULT 0,
    "rating" SMALLINT NOT NULL,
    "review" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diary_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entry_tags" (
    "diary_entry_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "entry_tags_pkey" PRIMARY KEY ("diary_entry_id","tag_id")
);

-- CreateTable
CREATE TABLE "movie_genres" (
    "movie_id" TEXT NOT NULL,
    "genre_id" TEXT NOT NULL,

    CONSTRAINT "movie_genres_pkey" PRIMARY KEY ("movie_id","genre_id")
);

-- CreateTable
CREATE TABLE "movie_directors" (
    "movie_id" TEXT NOT NULL,
    "director_id" TEXT NOT NULL,

    CONSTRAINT "movie_directors_pkey" PRIMARY KEY ("movie_id","director_id")
);

-- CreateTable
CREATE TABLE "user_follows" (
    "follower_id" TEXT NOT NULL,
    "followee_id" TEXT NOT NULL,

    CONSTRAINT "user_follows_pkey" PRIMARY KEY ("follower_id","followee_id")
);

-- CreateTable
CREATE TABLE "entry_likes" (
    "user_id" TEXT NOT NULL,
    "diary_entry_id" TEXT NOT NULL,

    CONSTRAINT "entry_likes_pkey" PRIMARY KEY ("user_id","diary_entry_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "movies_title_idx" ON "movies"("title");

-- CreateIndex
CREATE INDEX "movies_year_idx" ON "movies"("year");

-- CreateIndex
CREATE UNIQUE INDEX "genres_name_key" ON "genres"("name");

-- CreateIndex
CREATE UNIQUE INDEX "directors_first_name_last_name_key" ON "directors"("first_name", "last_name");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE INDEX "diary_entries_user_id_idx" ON "diary_entries"("user_id");

-- CreateIndex
CREATE INDEX "diary_entries_movie_id_idx" ON "diary_entries"("movie_id");

-- CreateIndex
CREATE INDEX "diary_entries_last_watched_date_idx" ON "diary_entries"("last_watched_date");

-- CreateIndex
CREATE INDEX "entry_tags_tag_id_idx" ON "entry_tags"("tag_id");

-- CreateIndex
CREATE INDEX "movie_genres_genre_id_idx" ON "movie_genres"("genre_id");

-- CreateIndex
CREATE INDEX "movie_directors_director_id_idx" ON "movie_directors"("director_id");

-- CreateIndex
CREATE INDEX "user_follows_followee_id_idx" ON "user_follows"("followee_id");

-- CreateIndex
CREATE INDEX "entry_likes_diary_entry_id_idx" ON "entry_likes"("diary_entry_id");

-- AddForeignKey
ALTER TABLE "diary_entries" ADD CONSTRAINT "diary_entries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diary_entries" ADD CONSTRAINT "diary_entries_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entry_tags" ADD CONSTRAINT "entry_tags_diary_entry_id_fkey" FOREIGN KEY ("diary_entry_id") REFERENCES "diary_entries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entry_tags" ADD CONSTRAINT "entry_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_genres" ADD CONSTRAINT "movie_genres_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_genres" ADD CONSTRAINT "movie_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_directors" ADD CONSTRAINT "movie_directors_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_directors" ADD CONSTRAINT "movie_directors_director_id_fkey" FOREIGN KEY ("director_id") REFERENCES "directors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_follows" ADD CONSTRAINT "user_follows_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_follows" ADD CONSTRAINT "user_follows_followee_id_fkey" FOREIGN KEY ("followee_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entry_likes" ADD CONSTRAINT "entry_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entry_likes" ADD CONSTRAINT "entry_likes_diary_entry_id_fkey" FOREIGN KEY ("diary_entry_id") REFERENCES "diary_entries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
