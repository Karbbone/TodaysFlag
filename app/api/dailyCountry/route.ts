import { DailyCountryService } from "@/lib/services/country/DailyCountryService";
import { ResponseService } from "@/lib/services/response/responseService";
/**
 * API route for retrieving the daily country to guess
 * @async
 * @function GET
 * @description This endpoint updates the daily country to guess and returns the selected country's information
 * @returns {Promise<Response>} A response containing either:
 */

export async function GET() {
  const dailyCountryService = new DailyCountryService();
  const todayCountry = await dailyCountryService.getTodayCountry();
  if (todayCountry.success) {
    return ResponseService.success(todayCountry.message, todayCountry.data);
  } else {
    return ResponseService.error(todayCountry.message);
  }
}
