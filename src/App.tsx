import React, { useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import { Developers } from './pages/Developers';
import { LegalPage } from './pages/LegalPage';
import { IntercomProvider } from './components/IntercomProvider';

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
    <IntercomProvider>
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
            <Route path="/developers" element={<Developers />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/legal/:docId" element={<LegalPage />} />
            <Route path="/terms" element={<LegalPage />} />
            <Route path="/privacy" element={<LegalPage />} />
            <Route path="/aml-policy" element={<LegalPage />} />
            <Route path="/lock-rate" element={<Navigate to="/branches" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </IntercomProvider>
  );
}

export function App() {
  const [showSplash, setShowSplash] = useState(shouldShowSplash);

  const handleSplashComplete = useCallback(() => {
    markSplashSeen();
    setShowSplash(false);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
      {showSplash && <AppSplash onComplete={handleSplashComplete} />}
    </BrowserRouter>
  );
}
