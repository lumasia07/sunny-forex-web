import React, { useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AppSplash, markSplashSeen, shouldShowSplash } from './components/AppSplash';
import { Home } from './pages/Home';
import { Forex } from './pages/Forex';
import { Remittance } from './pages/Remittance';
import { BranchesPage } from './pages/BranchesPage';
import { Corporate } from './pages/Corporate';
import { Blog } from './pages/Blog';
import { LockRate } from './pages/LockRate';
import { WhatsAppButton } from './components/WhatsAppButton';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: 'instant' as ScrollBehavior,
    });
  }, [pathname, hash]);

  return null;
}

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forex" element={<Forex />} />
          <Route path="/remittance" element={<Remittance />} />
          <Route path="/branches" element={<BranchesPage />} />
          <Route path="/corporate" element={<Corporate />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/lock-rate" element={<LockRate />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export function App() {
  const [showSplash, setShowSplash] = useState(shouldShowSplash);
  const [appReady, setAppReady] = useState(!shouldShowSplash());

  const handleSplashComplete = useCallback(() => {
    markSplashSeen();
    setShowSplash(false);
    setAppReady(true);
  }, []);

  return (
    <BrowserRouter>
      {showSplash && <AppSplash onComplete={handleSplashComplete} />}
      {appReady && (
        <>
          <ScrollToTop />
          <AppContent />
        </>
      )}
    </BrowserRouter>
  );
}
