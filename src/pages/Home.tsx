import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { StatsBar } from '../components/StatsBar';
import { DeviceShowcaseSection } from '../components/DeviceShowcaseSection';
import { RatesStrip } from '../components/RatesStrip';
import { Services } from '../components/Services';
import { Branches } from '../components/Branches';
import { PartnersBanner } from '../components/PartnersBanner';
import { FaqSection } from '../components/FaqSection';
import { CtaBand } from '../components/CtaBand';
import { useSeo } from '../hooks/useSeo';

export function Home() {
  useSeo('home');
  const location = useLocation();

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
      <Hero />
      <StatsBar />
      <DeviceShowcaseSection />
      <RatesStrip />
      <Services />
      <PartnersBanner />
      <Branches />
      <FaqSection />
      <CtaBand />
    </>
  );
}
