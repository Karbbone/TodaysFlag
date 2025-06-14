import { prisma } from "@/lib/prisma";
import { Country } from "@prisma/client";
import { GuessedCountryService } from "./GuessedCountryService";

export class CountryService {
  constructor(
    private readonly guessedCountryService = new GuessedCountryService()
  ) {}

  /**
   * All countries in the database
   * @public
   * @returns {Promise<Country[]>} A list of all countries
   */
  public async getAllCountries(): Promise<Country[]> {
    return await prisma.country.findMany();
  }

  /**
   * Retrieves a random country that hasn't been guessed yet
   * @public
   * @returns {Promise<Country | null>} A random country or null if none available
   */
  public async getRandomAvailableCountry(): Promise<Country | null> {
    const guessedCountryCodes =
      await this.guessedCountryService.getGuessedCountryCodes();
    const availableCountries = await prisma.country.findMany({
      where: {
        CC: {
          notIn: guessedCountryCodes,
        },
      },
    });

    if (availableCountries.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * availableCountries.length);
    return availableCountries[randomIndex];
  }
}
