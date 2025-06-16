// hooks/useGuessCountry.ts
"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface UseGuessCountryProps {
  dailyCountry:
    | {
        data: {
          NameFRA: string;
          CC: string;
        };
      }
    | null
    | undefined;
}

interface UseGuessCountryReturn {
  hasGuessed: boolean;
  checkGuess: (selectedCountryValue: string) => boolean;
}

export function useGuessCountry({
  dailyCountry,
}: UseGuessCountryProps): UseGuessCountryReturn {
  const [hasGuessed, setHasGuessed] = useState<boolean>(false);

  useEffect(() => {
    if (dailyCountry?.data) {
      const today = new Date().toISOString().split("T")[0];
      const guessedToday = Cookies.get(`guessed_country_${today}`);

      if (guessedToday === dailyCountry.data.CC) {
        setHasGuessed(true);
      }
    }
  }, [dailyCountry]);

  const checkGuess = (selectedCountryValue: string): boolean => {
    if (!dailyCountry?.data) return false;

    const selectedCountry = selectedCountryValue.split("/")[0];
    const dailyCountryName = dailyCountry.data.NameFRA;
    const countryCode = dailyCountry.data.CC;

    const isCorrect = dailyCountryName === selectedCountry;

    if (isCorrect) {
      const today = new Date().toISOString().split("T")[0];

      Cookies.set(`guessed_country_${today}`, countryCode ?? " ", {
        expires: 1,
        path: "/",
        sameSite: "strict",
      });

      setHasGuessed(true);
    }

    return isCorrect;
  };

  return { hasGuessed, checkGuess };
}
