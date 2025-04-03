import { DailyCountryService } from "@/lib/services/country/DailyCountryService";
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
  const dailyCountryService = new DailyCountryService();

  // Update and retrieve the daily country
  const updateResult = await dailyCountryService.updateDailyCountry();

  if (!updateResult.success) {
    return ResponseService.error(updateResult.message);
  }

  return ResponseService.success<GuessedCountry>(updateResult.message);
}
