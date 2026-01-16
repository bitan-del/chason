import React, { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { VideoShowcase } from './components/VideoShowcase';
import { TrustLogos } from './components/TrustLogos';
import { Projects } from './components/Projects';
import { ConceptGenerator } from './components/ConceptGenerator';
import { Services } from './components/Services';
import { ServiceSlides } from './components/ServiceSlides';
import { Footer } from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Shortened loading time to ensure content appears quickly
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#050505] flex items-center justify-center z-[100]">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-sans font-light tracking-tight animate-pulse text-white mb-6">chason.io</h1>
          <div className="w-32 h-[1px] bg-white/20 mx-auto overflow-hidden">
            <div className="h-full bg-white w-full animate-width origin-left"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-primary selection:bg-white selection:text-black font-sans">
      <Navigation />
      <main>
        <Hero />
        <VideoShowcase />
        <TrustLogos />
        <ServiceSlides />

        <Projects />
        <ConceptGenerator />
      </main>
      <Footer />
    </div>
  );
}

export default App;