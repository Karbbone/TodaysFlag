import { Country, GuessedCountry } from "@prisma/client";
import { ApiResponse } from "./types/ApiResponse";
const API_URL = process.env.NEXT_PUBLIC_API_HOST;

type DailyCountryResponse = Country & GuessedCountry;

export async function fetchDailyCountry(): Promise<
  ApiResponse<DailyCountryResponse>
> {
  const response = await fetch(`${API_URL}/api/dailyCountry`);

  if (!response.ok) {
    throw new Error(
      "Erreur lors de la récupération des données du pays du jour"
    );
  }

  return response.json();
}
