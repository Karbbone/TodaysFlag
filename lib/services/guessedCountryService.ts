import { prisma } from "@/src/lib/prisma";
import { Country, GuessedCountry } from "@prisma/client";
import { ApiResponse, ResponseService } from "./responseService";

/**
 * Interface defining the result of a country update operation
 * @interface CountryUpdateResult
 * @property {boolean} success - Whether the operation was successful
 * @property {string} message - A message describing the result
 * @property {string} [countryCode] - The country code if successful
 * @property {string} [countryName] - The country name if successful
 */

export interface CountryDataResponse {
  countryName: string;
  countryCode: string;
}

/**
 * @class GuessedCountryService
 * @description Handles operations related to countries and daily country selection
 */
export class GuessedCountryService {
  /**
   * Retrieves all country codes that have already been guessed
   * @private
   * @returns {Promise<string[]>} Array of country codes that have been guessed
   */
  private async getGuessedCountryCodes(): Promise<string[]> {
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
   * @private
   * @returns {Promise<void>}
   */
  private async checkAndResetGuessedCountries(): Promise<void> {
    const guessedCountryCodes = await this.getGuessedCountryCodes();
    const totalCountries = await prisma.country.count();

    if (guessedCountryCodes.length >= totalCountries) {
      await prisma.guessedCountry.deleteMany({});
    }
  }

  /**
   * Retrieves a random country that hasn't been guessed yet
   * @private
   * @returns {Promise<Country | null>} A random country or null if none available
   */
  private async getRandomAvailableCountry(): Promise<Country | null> {
    const guessedCountryCodes = await this.getGuessedCountryCodes();
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

  /**
   * Adds a country to the list of guessed countries
   * @private
   * @param {string} countryCC - The country code to add
   * @returns {Promise<void>}
   */
  private async addGuessedCountry(countryCC: string): Promise<void> {
    await prisma.guessedCountry.create({
      data: {
        countryCC,
        guessedAt: new Date(),
      },
    });
  }

  /**
   * Updates the daily country to guess
   * @public
   * @returns {Promise<CountryUpdateResult>} The result of the update operation
   */
  public async updateDailyCountry(): Promise<
    ApiResponse<CountryDataResponse | undefined>
  > {
    try {
      await this.checkAndResetGuessedCountries();
      const randomCountry = await this.getRandomAvailableCountry();

      if (!randomCountry) {
        return ResponseService.formatErrorResponse(
          "Aucun pays disponible à deviner"
        );
      }

      await this.addGuessedCountry(randomCountry.CC);

      return ResponseService.formatSuccessResponse(
        `Pays du jour mis à jour: ${randomCountry.NameFRA}`,
        {
          countryCode: randomCountry.CC,
          countryName: randomCountry.NameFRA,
        }
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du pays du jour:", error);
      return ResponseService.formatErrorResponse(
        "Erreur lors de la mise à jour du pays du jour"
      );
    }
  }
}
