import { prisma } from "@/lib/prisma";
import { Country, GuessedCountry } from "@prisma/client";
import { ApiResponse, ResponseService } from "../response/responseService";
import { CountryService } from "./CountryService";
import { GuessedCountryService } from "./GuessedCountryService";

export class DailyCountryService {
  constructor(
    private readonly guessedCountryService = new GuessedCountryService(),
    private readonly countryService = new CountryService()
  ) {}

  /**
   * Get the daily country to guess
   * @public
   * @returns {Promise<CountryUpdateResult>} The result of the update operation
   */
  public async getTodayCountry(): Promise<
    ApiResponse<Country & GuessedCountry>
  > {
    try {
      const latestGuessed = await prisma.guessedCountry.findFirst({
        include: {
          country: true,
        },
        orderBy: {
          guessedAt: "desc",
        },
      });

      if (latestGuessed) {
        return ResponseService.formatSuccessResponse("Pays du jour trouvé", {
          ...latestGuessed.country,
          guessedAt: latestGuessed.guessedAt,
          countryCC: latestGuessed.countryCC,
        });
      } else {
        return ResponseService.formatErrorResponse(
          "Aucun pays deviné aujourd'hui"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du pays du jour:", error);
      return ResponseService.formatErrorResponse(
        "Erreur lors de la récupération du pays du jour"
      );
    }
  }

  /**
   * Updates the daily country to guess
   * @public
   * @returns {Promise<CountryUpdateResult>} The result of the update operation
   */
  public async updateDailyCountry(): Promise<ApiResponse<void | undefined>> {
    try {
      await this.guessedCountryService.checkAndResetGuessedCountries();
      const randomCountry =
        await this.countryService.getRandomAvailableCountry();

      if (!randomCountry) {
        return ResponseService.formatErrorResponse(
          "Aucun pays disponible à deviner"
        );
      }

      await this.guessedCountryService.addGuessedCountry(randomCountry.CC);

      return ResponseService.formatSuccessResponse(
        `Pays du jour mis à jour: ${randomCountry.NameFRA}`
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du pays du jour:", error);
      return ResponseService.formatErrorResponse(
        "Erreur lors de la mise à jour du pays du jour"
      );
    }
  }
}
