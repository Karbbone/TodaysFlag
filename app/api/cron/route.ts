import { GuessedCountryService } from "@/lib/services/guessedCountryService";
import { ResponseService } from "@/lib/services/response/responseService";
import { GuessedCountry } from "@prisma/client";

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

  return ResponseService.success<GuessedCountry>(updateResult.message);
}
