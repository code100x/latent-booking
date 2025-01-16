import Footer from "./(website)/_common/Footer";
import Navbar from "./(website)/_common/Navbar";
import HomeHero from "./(website)/home/_components/HomeHero";

export default function Home() {
  return (
    <div className="bg-background-primaryblack text-white min-h-dvh px-20 pb-10">
      <Navbar/>
      <HomeHero />
      <Footer/>
    </div>
  );
}
