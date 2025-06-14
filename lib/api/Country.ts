import { Country } from "@prisma/client";
import { ApiResponse } from "./types/ApiResponse";

export async function fetchCountry(): Promise<ApiResponse<Country[]>> {
  const response = await fetch("http://localhost:3000/api/country/");

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des pays");
  }

  return response.json();
}
