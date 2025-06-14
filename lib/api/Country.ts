import { Country } from "@prisma/client";
import { ApiResponse } from "./types/ApiResponse";
const API_URL = process.env.NEXT_PUBLIC_API_HOST;

export async function fetchCountry(): Promise<ApiResponse<Country[]>> {
  const response = await fetch(`${API_URL}/api/country`);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des pays");
  }

  return response.json();
}
