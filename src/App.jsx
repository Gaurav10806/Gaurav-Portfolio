import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  BackToTop,
  GithubStats,
} from "./components";
import ScratchesOverlay from "./components/ScratchesOverlay";

function AppContent() {
  useEffect(() => {
    const handleHashChange = (e) => {
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
    <div className="relative z-0 bg-primary">
      <ScratchesOverlay />
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <GithubStats />
      <Feedbacks />
      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
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
