"use client";

import { useDailyCountry } from "@/hooks/useDailyCountry";

export function FlagContent() {
  const { data } = useDailyCountry();
  return (
    <div className="text-center">
      <img className="inline-block" src={data.data.Flag}></img>
    </div>
  );
}
