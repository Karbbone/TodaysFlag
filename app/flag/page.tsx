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
      <div className="w-full bg-[url('/assets/heroSection.png')] bg-cover bg-center bg-no-repeat min-h-screen">
        <FlagContent />
      </div>
    </HydrationBoundary>
  );
}
