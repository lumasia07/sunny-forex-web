import React from 'react';
import { Hero } from '../components/Hero';
import { HeroFeatures } from '../components/HeroFeatures';
import { RatesStrip } from '../components/RatesStrip';
import { Services } from '../components/Services';
import { OurStory } from '../components/OurStory';
import { Branches } from '../components/Branches';
import { PartnersBanner } from '../components/PartnersBanner';
import { CtaBand } from '../components/CtaBand';

export function Home() {
  return (
    <>
      <Hero />
      <HeroFeatures />
      <RatesStrip />
      <Services />
      <PartnersBanner />
      <OurStory />
      <Branches />
      <CtaBand />
    </>
  );
}