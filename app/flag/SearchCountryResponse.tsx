import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Country } from "@prisma/client";
import { CheckIcon } from "lucide-react";
import { useSearchCountry } from "./SearchCountryResponse.hook";

interface SearchCountryResponseProps {
  countries: Country[];
  onValueChange?: (value: string) => void;
}

export const SearchCountryResponse = ({
  countries,
  onValueChange,
}: SearchCountryResponseProps) => {
  const {
    open,
    value,
    search,
    selectedCountry,
    filteredCountries,
    handleSearchChange,
    handleCountrySelect,
  } = useSearchCountry({ countries });

  return (
    <div className="w-full max-w-md mx-auto">
      <Command className="rounded-lg border shadow-md mt-4">
        <CommandInput
          placeholder={
            selectedCountry ? selectedCountry.label : "Rechercher un pays..."
          }
          value={search}
          onValueChange={handleSearchChange}
          onFocus={() => search.length > 0 && open}
        />
        {open && search.length > 0 && (
          <CommandList className="max-h-60 overflow-auto">
            <CommandEmpty>Pas de pays trouvé</CommandEmpty>
            <CommandGroup>
              {filteredCountries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.value}
                  onSelect={(value) => {
                    handleCountrySelect(value);
                    onValueChange?.(value);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === country.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {country.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
};
