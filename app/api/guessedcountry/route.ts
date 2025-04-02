import { GuessedCountryService } from "@/lib/services/guessedCountryService";
import { ResponseService } from "@/lib/services/responseService";

/**
 * Interface defining the structure of the country response
 * @interface CountryResponse
 * @property {string} countryName - The name of the country
 * @property {string} countryCode - The country code (e.g., 'FR' for France)
 */
interface CountryResponse {
  countryName: string;
  countryCode: string;
}

/**
 * API route handler for updating the daily country
 * @async
 * @function GET
 * @description This endpoint updates the daily country to guess and returns the selected country's information
 * @returns {Promise<Response>} A response containing either:
 */
export async function GET() {
  // Initialize the country service
  const guessedCountryService = new GuessedCountryService();

  // Update and retrieve the daily country
  const updateResult = await guessedCountryService.updateDailyCountry();

  if (!updateResult.success) {
    return ResponseService.error(updateResult.message);
  }

  return ResponseService.success<CountryResponse>(updateResult.message, {
    countryName: updateResult.countryName!,
    countryCode: updateResult.countryCode!,
  });
}
