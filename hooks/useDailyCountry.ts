import { useQuery } from "@tanstack/react-query";
import { fetchDailyCountry } from "../lib/api/dailyCountry";

export function useDailyCountry() {
  return useQuery({
    queryKey: ["dailyCountry"],
    queryFn: fetchDailyCountry,
  });
}
