import { Globe } from "@/components/magicui/globe";

export function HeroSection() {
  return (
    <section className="py-8 md:py-16 min-h-[60vh] border-b-[1px] border-ring relative overflow-hidden">
      <div className="blur-circle"></div>
      <div className="mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-16">
          <div>
            <h2 className="text-7xl font-bold">
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
              Apprenez les drapeaux du monde entier en vous amusant.
            </p>
          </div>
          <Globe />
        </div>
      </div>
    </section>
  );
}
