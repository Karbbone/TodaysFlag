import { CountryService } from "@/lib/services/country/CountryService";
import { ResponseService } from "@/lib/services/response/responseService";
/**
 * API route for all country
 * @async
 * @function GET
 * @description This endpoint updates the daily country to guess and returns the selected country's information
 * @returns {Promise<Response>} A response containing either:
 */

export async function GET() {
  const contryService = new CountryService();
  const countries = await contryService.getAllCountries();

  const response = ResponseService.formatSuccessResponse(
    "All countries retrieved successfully",
    countries
  );

  return ResponseService.success(response.message, response.data);
}
