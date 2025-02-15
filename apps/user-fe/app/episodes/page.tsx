import { LatentEpisodes } from "../_components/latentEpisodes";
import { LatentPlusEpisodes } from "../_components/latentPlusEpisodes";

export default function Episodes() {
  return (
    <main className="flex flex-col gap-12 max-w-7xl mx-auto">
      <LatentEpisodes />
      <LatentPlusEpisodes />
    </main>
  );
}
