import { fetchDailyCountry } from "@/lib/api/dailyCountry";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "../makeClient";
import { FlagContent } from "./FlagContent";

export default async function FlagPage() {
  // try for server side rendering
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["dailyCountry"],
    queryFn: fetchDailyCountry,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FlagContent />
    </HydrationBoundary>
  );
}
