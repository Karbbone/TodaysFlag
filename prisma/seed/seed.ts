import { prisma } from "./../../src/lib/prisma";
import { readFileSync } from "fs";
import { join } from "path";
import { CountryJSON } from "./type";

async function main() {
  try {
    const countryData = readFileSync(join(__dirname, "country.json"), "utf-8");
    const countries: CountryJSON[] = JSON.parse(countryData);

    const countriesToAdd = countries.map((country) => ({
      CC: country.cca2,
      NameENG: country.name.common,
      NameFRA: country.translations.fra.common,
      NameESP: country.translations.spa.common,
      Flag: country.flags.png,
      Capital: country.capital?.[0] ?? null,
      Map: country.maps.openStreetMaps,
    }));

    await prisma.country.createMany({
      data: countriesToAdd,
      skipDuplicates: true,
    });

    console.log(
      `${countriesToAdd.length} pays ont été ajoutés à la base de données.`
    );
  } catch (error) {
    console.error("Erreur:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
