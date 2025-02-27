// import { GameSection } from "./components/GameSection";
import { HeroSection } from "./components/HeroSection";

export default async function Home() {
  return (
    <div className="w-full bg-[url('/assets/heroSection.png')] bg-cover bg-center bg-no-repeat">
      <HeroSection />
    </div>
  );
}
