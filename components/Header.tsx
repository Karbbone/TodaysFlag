import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex-shrink-0 p-10">
      <div className="container mx-auto">
        <div className="relative">
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
            <Image
              className="rounded-full"
              src="/assets/todaysFlagIcon.png"
              alt="Logo"
              width={64}
              height={64}
            />
          </div>

          <div>
            <nav>
              <ul className="flex justify-center gap-6">
                <li>
                  <Link
                    className="text-foreground no-underline hover:text-primary transition-colors"
                    href="/"
                    aria-label="Redirection vers la page d'accueil"
                  >
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-foreground no-underline hover:text-primary transition-colors"
                    href="/flag"
                    aria-label="Redirection vers la page de jeu drapeau"
                  >
                    Drapeau
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
