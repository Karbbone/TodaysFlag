"use client";

import { useDailyCountry } from "@/hooks/useDailyCountry";

export function FlagContent() {
  const { data } = useDailyCountry();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Pays du jour</h1>
      <img src={data.data.Flag}></img>
    </div>
  );
}
