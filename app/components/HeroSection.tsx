import { Globe } from "@/components/magicui/globe";

export function HeroSection() {
  return (
    <section className="pt-8 md:pt-16 min-h-[calc(100vh-20% )] border-b-[1px] border-ring overflow-hidden mx-auto px-4 flex relative">
      <div className="blur-circle"></div>
      <div className="flex flex-col items-center justify-between gap-16 w-full">
        <div>
          <h2 className="text-7xl font-bold mb-4">
            Today&apos;s{" "}
            <span className="bg-gradient-to-r from-flash to-primary bg-clip-text text-transparent">
              Flag
            </span>
          </h2>
          <p className="text-2xl">
            Votre besoin quotidien de{" "}
            <span className="bg-gradient-to-r from-flash to-primary bg-clip-text text-transparent">
              culture générale
            </span>
            . <br />
            <span className="hidden md:block">
              Apprenez les drapeaux du monde entier en vous amusant.
            </span>
          </p>
        </div>
        <div className="w-full flex justify-center overflow-hidden h-[250px]">
          <Globe />
        </div>
      </div>
    </section>
  );
}
