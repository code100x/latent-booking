import Footer from "../../_common/footer";
import Navbar from "../../_common/navbar";
import { PremiumFeatures } from "../home/premiumFeature";
import PrivacyPolicyContent from "./policyContent";

export function PrivacyPolicy() {
  return (
    <>
      <main className="min-h-screen bg-black">
        <Navbar />
        <div className="container mx-auto px-0 py-12">
          <PrivacyPolicyContent />
          <PremiumFeatures />
        </div>
        <Footer />
      </main>
    </>
  );
}
