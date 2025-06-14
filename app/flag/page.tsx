import { fetchCountry } from "@/lib/api/Country";
import { fetchDailyCountry } from "@/lib/api/dailyCountry";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "../makeClient";
import { FlagContent } from "./components/FlagContent";

export default async function FlagPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["dailyCountry"],
    queryFn: fetchDailyCountry,
  });

  await queryClient.prefetchQuery({
    queryKey: ["countries"],
    queryFn: fetchCountry,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FlagContent />
    </HydrationBoundary>
  );
}
