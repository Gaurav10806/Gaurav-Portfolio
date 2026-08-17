import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";

import {
  About,
  Contact,
  Hero,
  Navbar,
  Tech,
  Works,
  BackToTop,
  GithubStats,
} from "./components";
import { GlobalAINetworkCanvas } from "./components/canvas";
import ScratchesOverlay from "./components/ScratchesOverlay";

function AppContent() {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }
    };

    window.scrollTo(0, 0);

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="relative z-0 bg-[#0B0D12] text-white min-h-screen w-full overflow-x-hidden selection:bg-purple-500/30 selection:text-white">
      {/* Website-wide Continuous Connected-Node AI Background */}
      <GlobalAINetworkCanvas />
      <ScratchesOverlay />
      <Navbar />
      <Hero />
      <About />
      <Tech />
      <Works />
      <GithubStats />
      <div className="relative z-10">
        <Contact />
      </div>
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
