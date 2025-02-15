export function GameSection() {
  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-8 md:mb-16">
          Modes de{" "}
          <span className="bg-gradient-to-r from-ring to-primary bg-clip-text text-transparent">
            jeux
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <a
              href="/flag"
              aria-label="Redirection vers la page de jeu des drapeaux"
              className="inline-block w-full relative group"
            >
              <div
                className="h-48 rounded-xl transition-all duration-500 filter grayscale hover:grayscale-0 hover:scale-105 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('/assets/flagGame.jpg')`,
                }}
              >
                <p className="text-stroke absolute inset-0 flex items-center justify-center text-[40px] font-medium text-white text-shadow">
                  Drapeau
                </p>
              </div>
              <p className="mt-4 text-foreground">
                Découvre le drapeau du jour avec des indices
              </p>
            </a>
          </div>

          <div className="text-center">
            <a className="inline-block w-full relative group">
              <div
                className="h-48 rounded-xl transition-all duration-500 filter grayscale hover:grayscale-0 hover:scale-105 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('/assets/countryGame.jpg')` }}
              >
                <p className="text-stroke absolute inset-0 flex items-center justify-center text-[40px] font-medium text-white text-shadow">
                  Capitale
                </p>
              </div>
              <p className="mt-4 text-foreground">
                Découvre la capitale du jour grâce à des photos
              </p>
            </a>
          </div>

          <div className="text-center">
            <a className="inline-block w-full relative group">
              <div
                className="h-48 rounded-xl transition-all duration-500 filter grayscale hover:grayscale-0 hover:scale-105 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('/assets/runGame.jpg')`,
                }}
              >
                <p className="text-stroke absolute inset-0 flex items-center justify-center text-[40px] font-medium text-white text-shadow">
                  Course
                </p>
              </div>
              <p className="mt-4 text-foreground">
                Nommer le maximum de drapeau en 60s !
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
