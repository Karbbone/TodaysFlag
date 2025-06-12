"use client";

import { Button } from "@/components/ui/button";
import { useCountry } from "@/hooks/useCountry";
import { useDailyCountry } from "@/hooks/useDailyCountry";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SearchCountryResponse } from "./SearchCountryResponse";

export function FlagContent() {
  const { data: dailyCountry } = useDailyCountry();
  const { data: countries } = useCountry();
  const [selectedCountryValue, setSelectedCountryValue] = useState<string>("");
  const [hasGuessed, setHasGuessed] = useState<boolean>(false);

  const handleClickGuess = () => {
    const selectedCountry = selectedCountryValue.split("/")[0];
    const dailyCountryName = dailyCountry?.data.NameFRA;
    const countryCode = dailyCountry?.data.CC;

    if (dailyCountryName === selectedCountry) {
      // Utiliser la date du jour pour la clé du cookie
      const today = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD

      Cookies.set(`guessed_country_${today}`, countryCode ?? " ", {
        expires: 1,
        path: "/",
        sameSite: "strict",
      });

      setHasGuessed(true);

      alert("Bravo ! Vous avez deviné le pays !");
      // TODO : React confetti & animation : bravo ou bien joué
    } else {
      // TODO : Afficher un message d'erreur
      alert(
        `Désolé, ce n'est pas le bon pays. Le pays du jour est ${dailyCountryName}.`
      );
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
          <div className="flex flex-col items-center space-y-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-sm border border-green-100 animate-fade-in">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium text-green-800">
                Félicitations !
              </h3>
            </div>
            <p className="text-center text-green-700">
              Vous avez correctement identifié le drapeau du jour, à demain pour
              le prochain drapeau !
            </p>
          </div>
        ) : (
          <>
            <SearchCountryResponse
              countries={countries?.data ?? []}
              onValueChange={setSelectedCountryValue}
            />
            <Button onClick={handleClickGuess} disabled={!selectedCountryValue}>
              Deviner
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
