"use client";

import { H1Title } from "@/app/components/Title/H1Title";
import { Button } from "@/components/ui/button";
import { useCountry } from "@/hooks/useCountry";
import { useDailyCountry } from "@/hooks/useDailyCountry";
import { Database } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Confetti from "react-confetti";
import { useGuessCountry } from "../hooks/useGuessCountry";
import LeafletMap from "./LeafletMap";
import { SearchCountryResponse } from "./SearchCountryResponse";
import { WinningMessage } from "./WinningMessage";

export function FlagContent() {
  const { data: dailyCountry } = useDailyCountry();
  const { data: countries } = useCountry();
  const [selectedCountryValue, setSelectedCountryValue] = useState<string>("");
  const { hasGuessed, checkGuess } = useGuessCountry({ dailyCountry });

  const handleClickGuess = () => {
    const isCorrect = checkGuess(selectedCountryValue);

    if (!isCorrect) {
      alert(`Désolé, ce n'est pas le bon pays.`);
    }
  };

  return (
    <>
      {hasGuessed && (
        <Confetti
          width={window.screen.width}
          height={window.screen.height - 200}
          numberOfPieces={200}
          recycle={false}
          gravity={0.3}
        />
      )}
      <H1Title title="Devine le pays du jour" />
      <div className="text-center max-w-7xl mx-auto space-y-12">
        <Image
          className="inline-block w-[350px] h-auto"
          src={dailyCountry?.data.Flag ?? ""}
          alt="game-flag"
          width={350}
          height={100}
        />

        <div className="space-y-12">
          {hasGuessed ? (
            <>
              <WinningMessage />
              <div className="md:flex md:justify-center md:items-center">
                {dailyCountry?.data && (
                  <div className="md:w-1/2">
                    <LeafletMap mapUrl={dailyCountry.data.Map} />
                  </div>
                )}
                <div className="text-left p-6 rounded-r-xl  backdrop-blur-sm border-2 border-border w-full md:w-1/2 md:h-[400px]">
                  <div className="flex items-center justify-start gap-4 mb-6">
                    <Database className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold">Informations du pays</h2>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <SearchCountryResponse
                countries={countries?.data ?? []}
                onValueChange={setSelectedCountryValue}
              />
              <Button
                onClick={handleClickGuess}
                disabled={!selectedCountryValue}
              >
                Deviner
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
