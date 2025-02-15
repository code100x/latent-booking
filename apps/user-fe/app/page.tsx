import { Hero } from "./_components/home/hero";
import FooterCta from "./_components/home/footer-cta";
import { LatentEpisodes } from "./_components/latentEpisodes";
import { LatentPlusEpisodes } from "./_components/latentPlusEpisodes";
import EventsRow from "./_components/eventsRow";
export default function Home() {
  return (
    <>
      <main className="min-h-screen w-full">
        <Hero />
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <EventsRow />
          <LatentEpisodes />
          <LatentPlusEpisodes />
          {/* <FooterCta /> */}
        </div>
      </main>
    </>
  );
}
