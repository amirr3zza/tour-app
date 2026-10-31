import Hero from "./components/hero";
import LastMinuteCarousel from "./components/last-minute-carousel";

export default function Home() {
  return (
    <main className="w-full flex-1 flex flex-col items-center justify-start font-sans">
      <Hero />
      <LastMinuteCarousel />
    </main>
  );
}


