"use client";

import { Button } from "@/components/ui/button";
import { useCountry } from "@/hooks/useCountry";
import { useDailyCountry } from "@/hooks/useDailyCountry";
import Image from "next/image";
import { useState } from "react";
import { SearchCountryResponse } from "./SearchCountryResponse";

export function FlagContent() {
  const { data: dailyCountry } = useDailyCountry();
  const { data: countries } = useCountry();
  const [selectedCountryValue, setSelectedCountryValue] = useState<string>("");

  const handleClickGuess = () => {
    const selectedCountry = selectedCountryValue.split("/")[0];
    const dailyCountryName = dailyCountry?.data.NameFRA;

    if (dailyCountryName === selectedCountry) {
      alert("Bravo ! Vous avez deviné le pays !");
      // TODO : React confetti & animation : bravo ou bien joué
    } else {
      // TODO : Afficher un message d'erreur tremblement + message et retirer les options qui on été choisies + faire une liste
      alert(
        `Désolé, ce n'est pas le bon pays. Le pays du jour est ${dailyCountryName}.`
      );
    }
  };

  return (
    <div className="text-center max-w-7xl mx-auto space-y-12">
      <Image
        className="inline-block w-[350px] h-auto"
        src={dailyCountry?.data.Flag ?? ""}
        alt="game-flag"
        width={350}
        height={100}
      />
      <div className="space-y-6">
        <SearchCountryResponse
          countries={countries?.data ?? []}
          onValueChange={setSelectedCountryValue}
        />
        <Button onClick={handleClickGuess} disabled={!selectedCountryValue}>
          Deviner
        </Button>
      </div>
    </div>
  );
}
