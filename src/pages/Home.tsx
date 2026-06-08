import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { HeroFeatures } from '../components/HeroFeatures';
import { RatesStrip } from '../components/RatesStrip';
import { Services } from '../components/Services';
import { OurStory } from '../components/OurStory';
import { Branches } from '../components/Branches';
import { PartnersBanner } from '../components/PartnersBanner';
import { FaqSection } from '../components/FaqSection';
import { CtaBand } from '../components/CtaBand';

export function Home() {
  const location = useLocation();
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  useEffect(() => {
    if (window.location.hash === '#faq') {
      const timer = setTimeout(() => {
        const element = document.getElementById('faq');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <>
      <Hero selectedCurrency={selectedCurrency} />
      {/* <HeroFeatures /> */}
      <RatesStrip onRateClick={(code) => {
        setSelectedCurrency(code);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />
      <Services />
      <PartnersBanner />
      <OurStory />
      <Branches />
      <FaqSection />
      <CtaBand />
    </>
  );
}