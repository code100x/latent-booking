import Footer from "../../_common/footer";
import Navbar from "../../_common/navbar";
import FooterCta from "./footer-cta";
import { HeroText } from "./heroText";
import { JoinButton } from "./joinButton";
import { LatentEpisodes } from "./latentEpisode";
import { LatentPlusEpisodes } from "./latentPlusEpisodes";
import { MediaShowcase } from "./mediaShowCase";
import { PremiumFeatures } from "./premiumFeature";

export function LandingPage() {
  return (
    <>
      <main className="min-h-screen bg-black">
        <Navbar />
        <div className="container mx-auto px-16 py-12">
          <div className="grid grid-cols-1  lg:grid-cols-2 gap-12 items-start ">
            <div className=" h-full flex items-center">
              <div className="flex flex-col gap-10">
                <HeroText />
                <JoinButton />
              </div>
            </div>
            <MediaShowcase />
          </div>
          <div>
            <LatentEpisodes />
            <PremiumFeatures />
            <LatentPlusEpisodes />
            <FooterCta />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
