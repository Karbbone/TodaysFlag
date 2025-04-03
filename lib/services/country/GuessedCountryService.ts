import { prisma } from "@/lib/prisma";
import { GuessedCountry } from "@prisma/client";

export class GuessedCountryService {
  /**
   * Retrieves all country codes that have already been guessed
   * @public
   * @returns {Promise<string[]>} Array of country codes that have been guessed
   */
  public async getGuessedCountryCodes(): Promise<string[]> {
    const guessedCountries = await prisma.guessedCountry.findMany({
      select: {
        countryCC: true,
      },
    });
    return guessedCountries.map(
      (gc: Pick<GuessedCountry, "countryCC">) => gc.countryCC
    );
  }

  /**
   * Checks if all countries have been guessed and resets the table if necessary
   * @public
   * @returns {Promise<void>}
   */
  public async checkAndResetGuessedCountries(): Promise<void> {
    const guessedCountryCodes = await this.getGuessedCountryCodes();
    const totalCountries = await prisma.country.count();

    if (guessedCountryCodes.length >= totalCountries) {
      await prisma.guessedCountry.deleteMany({});
    }
  }

  /**
   * Adds a country to the list of guessed countries
   * @public
   * @param {string} countryCC - The country code to add
   * @returns {Promise<void>}
   */
  public async addGuessedCountry(countryCC: string): Promise<void> {
    await prisma.guessedCountry.create({
      data: {
        countryCC,
        guessedAt: new Date(),
      },
    });
  }
}
