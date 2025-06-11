import { Country } from "@prisma/client";
import { useState } from "react";

interface UseSearchCountryProps {
  countries: Country[];
}

export function useSearchCountry({ countries }: UseSearchCountryProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");

  // Put country.CC in the label to avoid duplicate like Saint-Martin
  const countryOptions = countries.map((country) => ({
    label: country.NameFRA + "/" + country.CC,
    value: country.NameFRA + "/" + country.CC,
  }));

  const selectedCountry = countryOptions.find(
    (country) => country.value === value
  );

  const filteredCountries = countryOptions.filter((country) =>
    country.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setOpen(newSearch.length > 0);
  };

  const handleCountrySelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setSearch("");
    setOpen(false);
  };

  return {
    open,
    setOpen,
    value,
    setValue,
    search,
    setSearch,
    selectedCountry,
    filteredCountries,
    handleSearchChange,
    handleCountrySelect,
  };
}
