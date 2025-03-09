-- CreateTable
CREATE TABLE "Country" (
    "CC" TEXT NOT NULL,
    "NameENG" TEXT NOT NULL,
    "NameFRA" TEXT NOT NULL,
    "NameESP" TEXT NOT NULL,
    "Flag" TEXT NOT NULL,
    "Capital" TEXT NOT NULL,
    "Map" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("CC")
);

-- CreateTable
CREATE TABLE "GuessedCountry" (
    "guessedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "countryCC" TEXT NOT NULL,

    CONSTRAINT "GuessedCountry_pkey" PRIMARY KEY ("guessedAt")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuessedCountry_countryCC_key" ON "GuessedCountry"("countryCC");

-- AddForeignKey
ALTER TABLE "GuessedCountry" ADD CONSTRAINT "GuessedCountry_countryCC_fkey" FOREIGN KEY ("countryCC") REFERENCES "Country"("CC") ON DELETE RESTRICT ON UPDATE CASCADE;
