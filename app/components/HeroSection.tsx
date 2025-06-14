import { BlurCircle } from "@/app/components/BlurCircle";
import { MainDescriptionTitle } from "@/app/components/MainDescriptionTitle";
import { MainTitle } from "@/app/components/MainTitle";
import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/Wrapper";
import { Flag } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="h-full">
      <BlurCircle />
      <Wrapper className="flex flex-col items-center justify-center gap-10 text-center">
        <MainTitle />

        <MainDescriptionTitle />

        <Link href="/flag">
          <Button
            className="flex items-center justify-center text-base sm:text-lg gap-2 cursor-pointer"
            variant={"default"}
            size={"lg"}
          >
            <Flag className="h-10 w-10" />
            <span>Devine le drapeau du jour</span>
          </Button>
        </Link>
      </Wrapper>
    </section>
  );
}
