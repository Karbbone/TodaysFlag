export async function fetchDailyCountry() {
  const response = await fetch("http://localhost:3000/api/dailyCountry");

  if (!response.ok) {
    throw new Error(
      "Erreur lors de la récupération des données du pays du jour"
    );
  }

  return response.json();
}
