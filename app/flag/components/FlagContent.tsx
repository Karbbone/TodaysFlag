"use client";

import { Button } from "@/components/ui/button";
import { useCountry } from "@/hooks/useCountry";
import { useDailyCountry } from "@/hooks/useDailyCountry";
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
              {dailyCountry?.data && (
                <LeafletMap mapUrl={dailyCountry.data.Map} />
              )}
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
