/*
  Warnings:

  - A unique constraint covering the columns `[title,year]` on the table `movies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "movies_title_year_key" ON "movies"("title", "year");
