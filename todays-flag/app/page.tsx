import { GameSection } from "./components/GameSection";
import { HeroSection } from "./components/HeroSection";

export default async function Home() {
  return (
    <div className="max-w-[1280px] w-full">
      <div>
        <HeroSection />
      </div>
      {/* <GameSection /> */}
    </div>
  );
}
