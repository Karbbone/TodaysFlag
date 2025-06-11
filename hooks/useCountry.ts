import { fetchCountry } from "@/lib/api/Country";
import { useQuery } from "@tanstack/react-query";

export function useCountry() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountry,
  });
}
