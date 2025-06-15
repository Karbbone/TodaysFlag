"use client";

import { Button } from "@/components/ui/button";
import { useCountry } from "@/hooks/useCountry";
import { useDailyCountry } from "@/hooks/useDailyCountry";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { SearchCountryResponse } from "./SearchCountryResponse";
import { WinningMessage } from "./WinningMessage";

export function FlagContent() {
  const { data: dailyCountry } = useDailyCountry();
  const { data: countries } = useCountry();
  const [selectedCountryValue, setSelectedCountryValue] = useState<string>("");
  const [hasGuessed, setHasGuessed] = useState<boolean>(true);

  const handleClickGuess = () => {
    const selectedCountry = selectedCountryValue.split("/")[0];
    const dailyCountryName = dailyCountry?.data.NameFRA;
    const countryCode = dailyCountry?.data.CC;

    if (dailyCountryName === selectedCountry) {
      const today = new Date().toISOString().split("T")[0];

      Cookies.set(`guessed_country_${today}`, countryCode ?? " ", {
        expires: 1,
        path: "/",
        sameSite: "strict",
      });

      setHasGuessed(true);
      // TODO : React confetti & animation : bravo ou bien joué
    } else {
      // TODO : Afficher un message d'erreur
      alert(`Désolé, ce n'est pas le bon pays.`);
    }
  };

  useEffect(() => {
    if (dailyCountry?.data) {
      const today = new Date().toISOString().split("T")[0];
      const guessedToday = Cookies.get(`guessed_country_${today}`);

      if (guessedToday === dailyCountry.data.CC) {
        setHasGuessed(true);
      }
    }
  }, [dailyCountry]);

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
        <div className="space-y-6">
          {hasGuessed ? (
            <WinningMessage />
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
