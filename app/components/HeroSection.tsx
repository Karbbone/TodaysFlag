import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="h-full">
      <div className="blur-circle" aria-hidden="true"></div>
      <div className="flex flex-col items-center justify-center gap-10 text-center h-full max-w-7xl mx-auto px-10 sm:px-0">
        <h1 className="text-3xl md:text-6xl font-bold">
          <span className="bg-gradient-to-r from-flash to-primary bg-clip-text text-transparent">
            Today&apos;s Flag
          </span>
          <br />
          Deviens un as de la géographie
        </h1>

        <p className="text-lg md:text-2xl">
          Votre besoin quotidien de{" "}
          <span className="bg-gradient-to-r from-flash to-primary bg-clip-text text-transparent">
            culture générale
          </span>
          . <br />
          <span>Apprenez les drapeaux du monde entier en vous amusant.</span>
        </p>

        <Link href="/flag">
          <Button
            className="flex items-center justify-center text-lg gap-2 cursor-pointer"
            variant={"default"}
            size={"lg"}
          >
            <Flag className="h-10 w-10" />
            <span>Devine le drapeau du jour</span>
          </Button>
        </Link>
      </div>
    </section>
  );
}
