import Link from "next/link";
import Image from "next/image";

function Header() {
  return (
    <header className="relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div>
            <Image
              className="h-[52px] my-[10px]"
              src="/assets/todaysFlagIcon.png"
              alt="Logo"
              width={52}
              height={52}
            />
          </div>
          <nav>
            <ul className="flex gap-6">
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
              <li className="text-muted cursor-default hidden">
                <span>Capitale</span>
              </li>
              <li className="text-muted cursor-default hidden">
                <span>Course 60s</span>
              </li>
            </ul>
          </nav>
          <div className="p-2 rounded-xl border-2 border-primary hover:bg-ring cursor-pointer">
            <span className="text-2xl select-none">{"🌙"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
