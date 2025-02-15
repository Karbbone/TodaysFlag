import Image from "next/image";

export function HeroSection() {
  return (
    <section className="py-8 md:py-16 border-b-[1px] border-ring">
      <div className="mx-auto px-4">
        <div className="md:flex items-center justify-center gap-24">
          <div>
            <h2 className="text-7xl font-bold">
              Today&apos;s{" "}
              <span className="bg-gradient-to-r from-ring to-primary bg-clip-text text-transparent">
                Flag
              </span>
            </h2>
            <p className="text-2xl">
              Votre besoin quotidien de{" "}
              <span className="bg-gradient-to-r from-ring to-primary bg-clip-text text-transparent">
                culture générale
              </span>
              . <br />
              Apprenez les drapeaux du monde entier en vous amusant.
            </p>
          </div>
          <div className="flex-shrink-0 flex items-center justify-center">
            <Image
              src="/assets/world-childrens.svg"
              alt="World Children Illustration"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
