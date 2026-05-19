import React from 'react';
import { Hero } from '../components/Hero';
import { RatesStrip } from '../components/RatesStrip';
import { Services } from '../components/Services';
import { TrustStats } from '../components/TrustStats';
import { Branches } from '../components/Branches';
import { PartnersBanner } from '../components/PartnersBanner';
import { CtaBand } from '../components/CtaBand';

export function Home() {
  return (
    <>
      <Hero />
      <RatesStrip />
      <Services />
      <PartnersBanner />
      <TrustStats />
      <Branches />
      <CtaBand />
    </>
  );
}