import { Globe } from "@/components/magicui/globe";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="pt-14 md:pt-28 min-h-[calc(100vh-20% )] border-b-[1px] border-ring overflow-hidden mx-auto px-4 flex relative">
      <div className="blur-circle pointer-events-none"></div>
      <div className="flex flex-col items-center justify-between gap-8 w-full relative z-10">
        <Badge variant={"secondary"}>test</Badge>
        <div>
          <h1 className="text-3xl md:text-6xl font-bold mb-4 text-center">
            Today&apos;s{" "}
            <span className="bg-gradient-to-r from-flash to-primary bg-clip-text text-transparent">
              Flag{" "}
            </span>
            un défi quotidien.
            <br />
            Deviens un as de la géographie
          </h1>
          <p className="text-xl md:text-2xl text-center">
            Votre besoin quotidien de{" "}
            <span className="bg-gradient-to-r from-flash to-primary bg-clip-text text-transparent">
              culture générale
            </span>
            . <br />
            <span>Apprenez les drapeaux du monde entier en vous amusant.</span>
          </p>
        </div>
        <div className="w-full flex justify-center overflow-hidden h-[250px]">
          <Globe />
        </div>
      </div>
    </section>
  );
}
