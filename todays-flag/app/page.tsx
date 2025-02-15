import { GameSection } from "./components/GameSection";
import { HeroSection } from "./components/HeroSection";

export default async function Home() {
  return (
    <div>
      <HeroSection />
      <GameSection />
    </div>
  );
}
