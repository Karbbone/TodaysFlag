import { Country, GuessedCountry } from "@prisma/client";
import { ApiResponse } from "./types/ApiResponse";

type DailyCountryResponse = Country & GuessedCountry;

export async function fetchDailyCountry(): Promise<
  ApiResponse<DailyCountryResponse>
> {
  const response = await fetch("http://localhost:3000/api/dailyCountry");

  if (!response.ok) {
    throw new Error(
      "Erreur lors de la récupération des données du pays du jour"
    );
  }

  return response.json();
}
