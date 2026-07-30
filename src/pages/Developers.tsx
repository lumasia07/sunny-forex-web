import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeo } from '../hooks/useSeo';
import {
  Terminal,
  Code2,
  Copy,
  Check,
  Lock,
  Server,
  Search,
  ArrowLeft,
  BookOpen,
  Layers,
  ListFilter,
  CheckCircle2,
  FileText,
  Play,
  RotateCcw,
  ShieldCheck,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Sparkles,
  Sun,
  Moon,
  MessageSquare,
  Rocket,
  KeyRound,
} from 'lucide-react';
import {
  API_ENDPOINTS,
  ACRONYMS,
  TECHNICAL_GUIDE,
  STATUS_CODES,
  NATIONAL_IDS,
  generateCodeSnippet,
  generateApiDocsMarkdown,
  ApiEndpoint,
} from '../data/apiDocsData';

type Lang = 'curl' | 'js' | 'python' | 'php';
type ThemeMode = 'light' | 'dark';

export function Developers() {
  useSeo('developers');

  // Theme State - Default is Light mode
  const [theme, setTheme] = useState<ThemeMode>('light');

  // Layout & Navigation State
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [rightPanelOpen, setRightPanelOpen] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const [activeSection, setActiveSection] = useState<string>('overview');
  const [selectedEndpointId, setSelectedEndpointId] = useState<string>('get_token');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLang, setSelectedLang] = useState<Lang>('curl');
  const [isSandboxMode, setIsSandboxMode] = useState<boolean>(true);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Selected Scenario for Sandbox
  const [selectedEdgeCaseId, setSelectedEdgeCaseId] = useState<string>('success');

  // Collapsible Accordion States
  const [requestFieldsOpen, setRequestFieldsOpen] = useState<boolean>(true);
  const [responseFieldsOpen, setResponseFieldsOpen] = useState<boolean>(true);
  const [acronymsOpen, setAcronymsOpen] = useState<boolean>(false);

  // Sandbox State
  const [sandboxEnv, setSandboxEnv] = useState<'uat' | 'live'>('uat');
  const [sandboxCustomInput, setSandboxCustomInput] = useState<string>('');
  const [sandboxLoading, setSandboxLoading] = useState<boolean>(false);
  const [sandboxResponse, setSandboxResponse] = useState<any | null>(null);
  const [sandboxMeta, setSandboxMeta] = useState<{ status: number; statusText: string; timeMs: number } | null>(null);

  const sandboxRef = useRef<HTMLDivElement>(null);

  const selectedEndpoint = useMemo(() => {
    return API_ENDPOINTS.find((ep) => ep.id === selectedEndpointId) || API_ENDPOINTS[0];
  }, [selectedEndpointId]);

  // Keep custom input synced when selected endpoint or scenario changes
  React.useEffect(() => {
    setSandboxCustomInput(JSON.stringify(selectedEndpoint.sampleRequest, null, 2));
    
    if (selectedEndpoint.edgeCaseResponses && selectedEndpoint.edgeCaseResponses.length > 0) {
      const matched = selectedEndpoint.edgeCaseResponses.find((ec) => ec.scenarioId === selectedEdgeCaseId);
      if (matched) {
        setSandboxResponse(matched.responsePayload);
        setSandboxMeta({ status: matched.httpStatus, statusText: matched.httpStatusText, timeMs: 124 });
      } else {
        const defaultEC = selectedEndpoint.edgeCaseResponses[0];
        setSandboxResponse(defaultEC.responsePayload);
        setSelectedEdgeCaseId(defaultEC.scenarioId);
        setSandboxMeta({ status: defaultEC.httpStatus, statusText: defaultEC.httpStatusText, timeMs: 124 });
      }
    } else {
      setSandboxResponse(selectedEndpoint.sampleResponse);
      setSelectedEdgeCaseId('success');
      setSandboxMeta({ status: 200, statusText: '200 OK', timeMs: 124 });
    }
  }, [selectedEndpoint, selectedEdgeCaseId]);

  const filteredEndpoints = useMemo(() => {
    if (!searchQuery.trim()) return API_ENDPOINTS;
    const q = searchQuery.toLowerCase();
    return API_ENDPOINTS.filter(
      (ep) =>
        ep.title.toLowerCase().includes(q) ||
        ep.path.toLowerCase().includes(q) ||
        ep.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2200);
  };

  const handleCopyMarkdown = () => {
    const mdContent = generateApiDocsMarkdown();
    copyToClipboard(mdContent, 'markdown');
  };

  const handleOpenIntercom = (message?: string) => {
    if (typeof (window as any).Intercom === 'function') {
      if (message) {
        (window as any).Intercom('showNewMessage', message);
      } else {
        (window as any).Intercom('show');
      }
    } else {
      window.location.href = '/#contact';
    }
  };

  // Launch Playground button handler - Opens panel, sets sandbox mode, and scrolls smoothly
  const handleLaunchPlayground = () => {
    setRightPanelOpen(true);
    setIsSandboxMode(true);
    setTimeout(() => {
      if (sandboxRef.current) {
        sandboxRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const handleRunSandbox = () => {
    setSandboxLoading(true);
    setSandboxResponse(null);

    setTimeout(() => {
      try {
        JSON.parse(sandboxCustomInput);
        if (selectedEndpoint.edgeCaseResponses) {
          const matched = selectedEndpoint.edgeCaseResponses.find((ec) => ec.scenarioId === selectedEdgeCaseId);
          if (matched) {
            setSandboxResponse(matched.responsePayload);
            setSandboxMeta({ status: matched.httpStatus, statusText: matched.httpStatusText, timeMs: Math.floor(Math.random() * 70) + 85 });
          } else {
            setSandboxResponse(selectedEndpoint.sampleResponse);
            setSandboxMeta({ status: 200, statusText: '200 OK', timeMs: 110 });
          }
        } else {
          setSandboxResponse(selectedEndpoint.sampleResponse);
          setSandboxMeta({ status: 200, statusText: '200 OK', timeMs: 110 });
        }
      } catch (err) {
        setSandboxResponse({
          error: 'Bad Request',
          message: 'Invalid JSON payload structure: ' + (err as Error).message,
          status_code: 400,
        });
        setSandboxMeta({ status: 400, statusText: '400 Bad Request', timeMs: 35 });
      } finally {
        setSandboxLoading(false);
      }
    }, 350);
  };

  const currentCode = generateCodeSnippet(
    selectedEndpoint,
    selectedLang,
    sandboxEnv === 'uat' ? TECHNICAL_GUIDE.uatUrl : TECHNICAL_GUIDE.liveUrl
  );

  const isLight = theme === 'light';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isLight ? 'bg-[#FAF9F5] text-gray-900' : 'bg-[#0A0A0C] text-gray-100 selection:bg-[#7A1220]/40 selection:text-white'
      }`}
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {copiedType && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-2xl backdrop-blur-md border border-emerald-500/30"
          >
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>
              {copiedType === 'markdown'
                ? 'Full API Documentation copied as Markdown!'
                : 'Code snippet copied to clipboard!'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Bar */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b px-4 md:px-6 py-2.5 flex items-center justify-between gap-3 transition-colors ${
          isLight
            ? 'bg-white/95 border-gray-200 text-gray-800 shadow-sm'
            : 'bg-[#0E0E12]/95 border-white/10 text-gray-100'
        }`}
      >
        {/* Left Controls & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className={`hidden lg:flex items-center justify-center p-1.5 rounded-lg transition-colors border ${
              isLight
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-250'
                : 'bg-white/5 hover:bg-white/10 text-gray-400 border-white/10 hover:text-white'
            }`}
            title={sidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
          >
            {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4 text-[#7A1220]" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`flex lg:hidden items-center justify-center p-1.5 rounded-lg border transition-colors ${
              isLight
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-250'
                : 'bg-white/5 hover:bg-white/10 text-gray-400 border-white/10'
            }`}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          <Link
            to="/"
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
              isLight
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-250'
                : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10 hover:text-white'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Site</span>
          </Link>

          <div className={`h-4 w-px hidden sm:block ${isLight ? 'bg-gray-200' : 'bg-white/10'}`} />

          <div className="flex items-center gap-2">
            <img src="/sunny_logo_large.svg" alt="SunnyRemit" className="h-5 w-auto object-contain" />
            <span className="hidden md:inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-[#7A1220]/10 text-[#7A1220] border border-[#7A1220]/25">
              API Portal v1.1
            </span>
          </div>
        </div>

        {/* Center Search Input */}
        <div className="hidden sm:flex items-center relative w-64 md:w-80">
          <Search className={`w-3.5 h-3.5 absolute left-3 pointer-events-none ${isLight ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search endpoints or parameters..."
            className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs font-medium transition-colors border focus:outline-none focus:border-[#7A1220] ${
              isLight
                ? 'bg-gray-100/90 border-gray-200 text-gray-900 placeholder-gray-400'
                : 'bg-black/60 border-white/10 text-white placeholder-gray-500'
            }`}
          />
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          {/* Playground Quick Launch CTA */}
          <button
            onClick={handleLaunchPlayground}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all active:scale-95"
            title="Launch Interactive Sandbox Playground"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Launch Playground</span>
          </button>

          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              isLight
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-250 shadow-sm'
                : 'bg-white/10 hover:bg-white/15 text-amber-300 border-white/15'
            }`}
            title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
          >
            {isLight ? (
              <>
                <Moon className="w-3.5 h-3.5 text-gray-700" />
                <span className="hidden sm:inline">Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Light</span>
              </>
            )}
          </button>

          {/* Copy Markdown CTA */}
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#7A1220] to-rose-700 text-white font-semibold text-xs hover:opacity-90 active:scale-95 transition-all shadow-md border border-rose-500/20"
            title="Copy full API documentation as Markdown"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Copy Markdown</span>
          </button>

          {/* Right Panel Toggle Button */}
          <button
            onClick={() => setRightPanelOpen((prev) => !prev)}
            className={`flex items-center justify-center p-1.5 rounded-lg border transition-colors ${
              isLight
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-250'
                : 'bg-white/5 hover:bg-white/10 text-gray-400 border-white/10'
            }`}
            title={rightPanelOpen ? 'Hide Sandbox / Code Panel' : 'Show Sandbox / Code Panel'}
          >
            {rightPanelOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4 text-emerald-500" />}
          </button>
        </div>
      </header>

      {/* Main Container View */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Mobile Navigation Drawer Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                className={`w-72 h-full p-4 space-y-5 overflow-y-auto no-scrollbar border-r ${
                  isLight ? 'bg-white border-gray-200 text-gray-900' : 'bg-[#0C0C10] border-white/10 text-gray-100'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider">Navigation</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setActiveSection('overview');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold ${
                      activeSection === 'overview'
                        ? 'bg-[#7A1220] text-white'
                        : isLight ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Overview & Specs</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveSection('status_codes');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold ${
                      activeSection === 'status_codes'
                        ? 'bg-[#7A1220] text-white'
                        : isLight ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    <ListFilter className="w-4 h-4" />
                    <span>Status Codes</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveSection('national_ids');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold ${
                      activeSection === 'national_ids'
                        ? 'bg-[#7A1220] text-white'
                        : isLight ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>National ID Mapping</span>
                  </button>
                </div>

                <div className="space-y-1 pt-2 border-t border-gray-200">
                  <p className="text-[10px] font-bold uppercase text-gray-400 px-2 mb-1.5">API Endpoints (9)</p>
                  {API_ENDPOINTS.map((ep) => (
                    <button
                      key={ep.id}
                      onClick={() => {
                        setSelectedEndpointId(ep.id);
                        setActiveSection('endpoint');
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left ${
                        selectedEndpointId === ep.id && activeSection === 'endpoint'
                          ? 'bg-[#7A1220] text-white font-bold'
                          : isLight ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      <span className="truncate pr-2">{ep.title.replace(/^\d+\.\s*/, '')}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 font-bold">
                        {ep.method}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleOpenIntercom('Hi, I need help integrating the SunnyRemit API.');
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#7A1220] text-white text-xs font-bold shadow-md"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Request API Credentials</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsible Left Navigation Sidebar (Desktop) */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 260, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`hidden lg:flex flex-col border-r p-4 shrink-0 space-y-4 overflow-y-auto no-scrollbar max-h-[calc(100vh-3.5rem)] transition-colors ${
                isLight ? 'bg-[#F4F4F6] border-gray-250 text-gray-800' : 'bg-[#0C0C0F] border-white/10 text-gray-100'
              }`}
            >
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 mb-1.5">Getting Started</p>
                <button
                  onClick={() => setActiveSection('overview')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeSection === 'overview'
                      ? isLight ? 'bg-white text-[#7A1220] font-bold border border-gray-200 shadow-sm' : 'bg-white/10 text-white border border-white/10 shadow-sm'
                      : isLight ? 'text-gray-700 hover:bg-gray-200/70' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-[#D4A24C]" />
                  <span>Overview & Specs</span>
                </button>
                <button
                  onClick={() => setActiveSection('status_codes')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeSection === 'status_codes'
                      ? isLight ? 'bg-white text-[#7A1220] font-bold border border-gray-200 shadow-sm' : 'bg-white/10 text-white border border-white/10 shadow-sm'
                      : isLight ? 'text-gray-700 hover:bg-gray-200/70' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ListFilter className="w-4 h-4 text-emerald-600" />
                  <span>Status Codes</span>
                </button>
                <button
                  onClick={() => setActiveSection('national_ids')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeSection === 'national_ids'
                      ? isLight ? 'bg-white text-[#7A1220] font-bold border border-gray-200 shadow-sm' : 'bg-white/10 text-white border border-white/10 shadow-sm'
                      : isLight ? 'text-gray-700 hover:bg-gray-200/70' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>National ID Mapping</span>
                </button>
              </div>

              <div className="space-y-1 pt-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 mb-1.5">Web Service Methods (9)</p>
                {filteredEndpoints.map((ep) => {
                  const isSelected = selectedEndpointId === ep.id && activeSection === 'endpoint';
                  return (
                    <button
                      key={ep.id}
                      onClick={() => {
                        setSelectedEndpointId(ep.id);
                        setActiveSection('endpoint');
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-all ${
                        isSelected
                          ? isLight
                            ? 'bg-[#7A1220] text-white font-bold shadow-md'
                            : 'bg-[#7A1220]/30 text-white font-bold border border-[#7A1220]/50 shadow-sm'
                          : isLight
                          ? 'text-gray-700 hover:bg-gray-200/70 font-medium'
                          : 'text-gray-400 hover:text-white hover:bg-white/5 font-medium'
                      }`}
                    >
                      <span className="truncate pr-2">{ep.title.replace(/^\d+\.\s*/, '')}</span>
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/20'
                      }`}>
                        {ep.method}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Intercom CTA Box */}
              <div className={`p-3.5 rounded-2xl border space-y-2 mt-auto ${
                isLight ? 'bg-white border-gray-250 shadow-sm' : 'bg-white/5 border-white/10'
              }`}>
                <div className={`flex items-center gap-2 text-xs font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  <KeyRound className="w-3.5 h-3.5 text-[#7A1220]" />
                  <span>Request Credentials</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed font-light">
                  Need dedicated partner keys or UAT credentials? Chat via Intercom.
                </p>
                <button
                  onClick={() => handleOpenIntercom('Hi, I need help requesting API credentials for SunnyRemit integration.')}
                  className="w-full py-1.5 px-3 rounded-xl bg-[#7A1220] hover:bg-[#5C0D18] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Talk to Integration Team</span>
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Center Main Documentation Body */}
        <main className="flex-1 p-5 md:p-8 overflow-y-auto no-scrollbar space-y-6 max-h-[calc(100vh-3.5rem)]">
          
          {/* OVERVIEW SECTION */}
          {activeSection === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl">
              
              <div className="space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#7A1220]/10 text-[#7A1220] font-bold text-[10px] uppercase tracking-wider">
                  Partner Developer Portal
                </span>
                <h1 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  SunnyRemit Web Services Integration Guide
                </h1>
                <p className={`text-xs md:text-sm font-normal leading-relaxed ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                  The SunnyRemit API suite enables Sending Agent Partners to seamlessly integrate real-time interbank foreign exchange rates, beneficiary bank verification, instant mobile money remittances (MPESA), and treasury account balances.
                </p>
              </div>

              {/* Minimal Compact Environment Spec Cards */}
              <div className="space-y-2">
                <h3 className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>Web Service Environment Endpoints</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                    isLight ? 'bg-white border-gray-250 shadow-sm' : 'bg-white/5 border-white/10'
                  }`}>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">UAT Sandbox Gateway</span>
                      <code className="text-xs font-mono font-bold text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                        {TECHNICAL_GUIDE.uatUrl}
                      </code>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 border border-emerald-500/30 font-bold shrink-0">
                      UAT
                    </span>
                  </div>

                  <div className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                    isLight ? 'bg-white border-gray-250 shadow-sm' : 'bg-white/5 border-white/10'
                  }`}>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Live Production Gateway</span>
                      <code className="text-xs font-mono font-bold text-amber-800 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                        {TECHNICAL_GUIDE.liveUrl}
                      </code>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-800 border border-amber-500/30 font-bold shrink-0">
                      Live
                    </span>
                  </div>
                </div>

                <p className={`text-xs italic pt-1 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                  * Web Service URLs and API User Credentials for UAT & Live environments will be provided by the SunnyRemit Support Team upon partner onboarding approval.
                </p>
              </div>

              {/* Bearer Token Security Box */}
              <div className={`p-4 rounded-xl border space-y-2 ${
                isLight ? 'bg-rose-50/70 border-rose-200' : 'bg-[#7A1220]/15 border-[#7A1220]/35'
              }`}>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#7A1220]" />
                  <h3 className={`text-xs md:text-sm font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>Bearer Token Security Requirement</h3>
                </div>
                <p className={`text-xs font-normal leading-relaxed ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                  {TECHNICAL_GUIDE.authNote}
                </p>
                <div className="pt-0.5 flex items-center justify-between flex-wrap gap-2">
                  <code className={`text-xs font-mono px-2.5 py-1 rounded-md border font-bold ${
                    isLight ? 'bg-white border-gray-300 text-gray-900 shadow-sm' : 'bg-black/60 border-white/10 text-white'
                  }`}>
                    Authorization: Bearer YOUR_GENERATED_TOKEN
                  </code>
                  <button
                    onClick={() => handleOpenIntercom('Hi, I need help setting up Bearer Token Auth.')}
                    className="text-xs font-bold text-[#7A1220] hover:underline flex items-center gap-1"
                  >
                    <span>Request Credentials Assistance</span>
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Collapsible Acronyms Accordion */}
              <div className={`rounded-2xl border overflow-hidden ${
                isLight ? 'bg-white border-gray-250 shadow-sm' : 'bg-black/40 border-white/10'
              }`}>
                <button
                  onClick={() => setAcronymsOpen((prev) => !prev)}
                  className={`w-full flex items-center justify-between p-3.5 text-left font-bold text-xs transition-colors ${
                    isLight ? 'bg-gray-50 hover:bg-gray-100 text-gray-900' : 'bg-white/5 hover:bg-white/10 text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4A24C]" />
                    <span>Field Requirement Codes & Data Types ({ACRONYMS.length})</span>
                  </span>
                  {acronymsOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>

                {acronymsOpen && (
                  <div className={`p-3.5 border-t overflow-x-auto no-scrollbar ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
                    <table className="w-full text-left text-xs">
                      <thead className={`border-b font-semibold ${isLight ? 'text-gray-500 border-gray-200' : 'text-gray-400 border-white/10'}`}>
                        <tr>
                          <th className="pb-2">Code</th>
                          <th className="pb-2">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y font-mono">
                        {ACRONYMS.map((ac) => (
                          <tr key={ac.acronym} className={isLight ? 'divide-gray-150' : 'divide-white/5'}>
                            <td className="py-2 font-bold text-[#7A1220]">{ac.acronym}</td>
                            <td className={`py-2 font-sans ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{ac.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ENDPOINT DETAILS SECTION */}
          {activeSection === 'endpoint' && (
            <motion.div key={selectedEndpoint.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl">
              
              {/* Title & Route */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 border border-emerald-500/30">
                    {selectedEndpoint.method}
                  </span>
                  <h1 className={`text-xl md:text-2xl font-extrabold tracking-tight ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    {selectedEndpoint.title}
                  </h1>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono text-gray-500">Endpoint Path:</span>
                  <code className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border ${
                    isLight ? 'bg-gray-100 border-gray-250 text-[#7A1220]' : 'bg-white/5 border-white/10 text-rose-400'
                  }`}>
                    {selectedEndpoint.path}
                  </code>
                </div>

                <p className={`text-xs md:text-sm font-normal leading-relaxed pt-0.5 ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                  {selectedEndpoint.description}
                </p>
              </div>

              {/* Edge Case Scenario Notice for Current Endpoint */}
              {selectedEndpoint.edgeCaseResponses && selectedEndpoint.edgeCaseResponses.length > 0 && (
                <div className={`p-3.5 rounded-2xl border space-y-1.5 ${
                  isLight ? 'bg-emerald-50/70 border-emerald-200' : 'bg-emerald-500/10 border-emerald-500/30'
                }`}>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Test Scenarios Available in Sandbox</span>
                    </span>
                    <button
                      onClick={handleLaunchPlayground}
                      className="text-xs font-bold text-emerald-700 underline hover:text-emerald-900"
                    >
                      Test in Sandbox Playground →
                    </button>
                  </div>
                </div>
              )}

              {/* Collapsible Request Body Accordion */}
              <div className={`rounded-2xl border overflow-hidden ${
                isLight ? 'bg-white border-gray-250 shadow-sm' : 'bg-black/40 border-white/10'
              }`}>
                <button
                  onClick={() => setRequestFieldsOpen((prev) => !prev)}
                  className={`w-full flex items-center justify-between p-3.5 text-left font-bold text-xs transition-colors ${
                    isLight ? 'bg-gray-50 hover:bg-gray-100 text-gray-900' : 'bg-white/5 hover:bg-white/10 text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#7A1220]" />
                    <span>Request Body Parameters ({selectedEndpoint.requestFields.length})</span>
                  </span>
                  {requestFieldsOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>

                {requestFieldsOpen && (
                  <div className={`overflow-x-auto no-scrollbar border-t ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
                    <table className="w-full text-left text-xs">
                      <thead className={`font-semibold border-b ${
                        isLight ? 'bg-gray-50 text-gray-600 border-gray-200' : 'bg-white/5 text-gray-400 border-white/10'
                      }`}>
                        <tr>
                          <th className="p-3">Field Name</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Max Len</th>
                          <th className="p-3">Req</th>
                          <th className="p-3">Description</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y font-mono ${isLight ? 'divide-gray-150' : 'divide-white/5'}`}>
                        {selectedEndpoint.requestFields.map((f) => (
                          <tr key={f.field} className={isLight ? 'hover:bg-gray-50' : 'hover:bg-white/[0.02]'}>
                            <td className={`p-3 font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{f.field}</td>
                            <td className="p-3 text-[#7A1220] font-semibold">{f.dataType}</td>
                            <td className="p-3 text-gray-500">{f.maxLength}</td>
                            <td className="p-3">
                              <span
                                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                  f.type === 'M'
                                    ? 'bg-rose-500/15 text-rose-700 border border-rose-500/30'
                                    : f.type === 'CM'
                                    ? 'bg-amber-500/15 text-amber-700 border border-amber-500/30'
                                    : 'bg-gray-500/15 text-gray-700 border border-gray-500/30'
                                }`}
                              >
                                {f.type}
                              </span>
                            </td>
                            <td className={`p-3 font-sans ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{f.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Collapsible Response Schema Accordion */}
              <div className={`rounded-2xl border overflow-hidden ${
                isLight ? 'bg-white border-gray-250 shadow-sm' : 'bg-black/40 border-white/10'
              }`}>
                <button
                  onClick={() => setResponseFieldsOpen((prev) => !prev)}
                  className={`w-full flex items-center justify-between p-3.5 text-left font-bold text-xs transition-colors ${
                    isLight ? 'bg-gray-50 hover:bg-gray-100 text-gray-900' : 'bg-white/5 hover:bg-white/10 text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Response Schema Fields ({selectedEndpoint.responseFields.length})</span>
                  </span>
                  {responseFieldsOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>

                {responseFieldsOpen && (
                  <div className={`overflow-x-auto no-scrollbar border-t ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
                    <table className="w-full text-left text-xs">
                      <thead className={`font-semibold border-b ${
                        isLight ? 'bg-gray-50 text-gray-600 border-gray-200' : 'bg-white/5 text-gray-400 border-white/10'
                      }`}>
                        <tr>
                          <th className="p-3">Field Name</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Max Len</th>
                          <th className="p-3">Req</th>
                          <th className="p-3">Description</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y font-mono ${isLight ? 'divide-gray-150' : 'divide-white/5'}`}>
                        {selectedEndpoint.responseFields.map((f) => (
                          <tr key={f.field} className={isLight ? 'hover:bg-gray-50' : 'hover:bg-white/[0.02]'}>
                            <td className={`p-3 font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{f.field}</td>
                            <td className="p-3 text-emerald-600 font-semibold">{f.dataType}</td>
                            <td className="p-3 text-gray-500">{f.maxLength}</td>
                            <td className="p-3">
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-700 border border-emerald-500/30">
                                {f.type}
                              </span>
                            </td>
                            <td className={`p-3 font-sans ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{f.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* STATUS CODES SECTION */}
          {activeSection === 'status_codes' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl">
              <div>
                <h1 className={`text-xl md:text-2xl font-extrabold tracking-tight mb-1.5 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  System Response Status Codes
                </h1>
                <p className="text-xs text-gray-500 font-light">
                  Status codes returned in the <code className="text-[#7A1220] font-mono font-bold">response_status.status_code</code> payload field.
                </p>
              </div>

              <div className={`overflow-x-auto no-scrollbar rounded-2xl border ${
                isLight ? 'bg-white border-gray-250 shadow-sm' : 'bg-black/40 border-white/10'
              }`}>
                <table className="w-full text-left text-xs">
                  <thead className={`font-semibold border-b ${
                    isLight ? 'bg-gray-50 text-gray-600 border-gray-200' : 'bg-white/5 text-gray-400 border-white/10'
                  }`}>
                    <tr>
                      <th className="p-3">Category</th>
                      <th className="p-3">Response Code</th>
                      <th className="p-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y font-mono ${isLight ? 'divide-gray-150' : 'divide-white/5'}`}>
                    {STATUS_CODES.map((sc, idx) => (
                      <tr key={idx} className={isLight ? 'hover:bg-gray-50' : 'hover:bg-white/[0.02]'}>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              sc.categoryType === 'Success'
                                ? 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30'
                                : sc.categoryType === 'In Progress'
                                ? 'bg-amber-500/15 text-amber-700 border border-amber-500/30'
                                : sc.categoryType === 'Cancelled'
                                ? 'bg-purple-500/15 text-purple-700 border border-purple-500/30'
                                : 'bg-red-500/15 text-red-700 border border-red-500/30'
                            }`}
                          >
                            {sc.categoryType}
                          </span>
                        </td>
                        <td className={`p-3 font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{sc.responseCode}</td>
                        <td className={`p-3 font-sans ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{sc.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* NATIONAL IDS SECTION */}
          {activeSection === 'national_ids' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl">
              <div>
                <h1 className={`text-xl md:text-2xl font-extrabold tracking-tight mb-1.5 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  National ID Mapping
                </h1>
                <p className="text-xs text-gray-500 font-light">
                  Document integer codes required in <code className="text-[#7A1220] font-mono font-bold">CustomerIdentity</code> and <code className="text-[#7A1220] font-mono font-bold">BeneficiaryIdentity</code>.
                </p>
              </div>

              <div className={`overflow-x-auto no-scrollbar rounded-2xl border ${
                isLight ? 'bg-white border-gray-250 shadow-sm' : 'bg-black/40 border-white/10'
              }`}>
                <table className="w-full text-left text-xs">
                  <thead className={`font-semibold border-b ${
                    isLight ? 'bg-gray-50 text-gray-600 border-gray-200' : 'bg-white/5 text-gray-400 border-white/10'
                  }`}>
                    <tr>
                      <th className="p-3">ID Code</th>
                      <th className="p-3">Document Description</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y font-mono ${isLight ? 'divide-gray-150' : 'divide-white/5'}`}>
                    {NATIONAL_IDS.map((id) => (
                      <tr key={id.code} className={isLight ? 'hover:bg-gray-50' : 'hover:bg-white/[0.02]'}>
                        <td className="p-3 font-bold text-[#7A1220]">{id.code}</td>
                        <td className={`p-3 font-sans ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{id.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

        </main>

        {/* Collapsible Right Interactive Sandbox / Code Examples Panel */}
        <AnimatePresence initial={false}>
          {rightPanelOpen && (
            <motion.aside
              ref={sandboxRef}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 430, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`w-full lg:w-[430px] xl:w-[460px] border-t lg:border-t-0 lg:border-l flex flex-col shrink-0 overflow-hidden transition-colors ${
                isLight ? 'bg-[#1C1C22] text-gray-100 border-gray-300' : 'bg-[#0E0E12] text-gray-100 border-white/10'
              }`}
            >
              {/* Panel Header & Mode Switcher */}
              <div className="flex items-center justify-between p-3 bg-black/40 border-b border-white/10">
                <div className="flex items-center bg-black/60 p-0.5 rounded-xl border border-white/10 text-[11px] font-medium">
                  <button
                    onClick={() => setIsSandboxMode(true)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                      isSandboxMode ? 'bg-[#7A1220] text-white font-bold shadow-sm' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current text-rose-300" />
                    <span>Interactive Sandbox</span>
                  </button>
                  <button
                    onClick={() => setIsSandboxMode(false)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                      !isSandboxMode ? 'bg-white/15 text-white font-bold shadow-sm' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Code2 className="w-3 h-3 text-amber-300" />
                    <span>Code Snippets</span>
                  </button>
                </div>

                {!isSandboxMode && (
                  <div className="flex items-center gap-1">
                    {(['curl', 'js', 'python', 'php'] as Lang[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => setSelectedLang(l)}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase transition-all ${
                          selectedLang === l ? 'bg-white/20 text-white' : 'text-gray-500 hover:text-gray-300'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* PANEL CONTENT: CODE SNIPPETS */}
              {!isSandboxMode && (
                <div className="flex-1 p-4 flex flex-col font-mono text-xs overflow-y-auto no-scrollbar space-y-4">
                  <div className="flex items-center justify-between text-[11px] text-gray-400 font-sans">
                    <span>Language: <strong className="text-white uppercase">{selectedLang}</strong></span>
                    <button
                      onClick={() => copyToClipboard(currentCode, 'code')}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy Code</span>
                    </button>
                  </div>

                  <div className="bg-black p-4 rounded-xl border border-white/10 overflow-x-auto no-scrollbar text-emerald-400 leading-relaxed">
                    <pre>{currentCode}</pre>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="text-[10px] font-sans uppercase tracking-wider text-gray-400">Sample Response Payload</div>
                    <div className="bg-black p-4 rounded-xl border border-white/10 overflow-x-auto no-scrollbar text-gray-300 leading-relaxed max-h-60">
                      <pre>{JSON.stringify(selectedEndpoint.sampleResponse, null, 2)}</pre>
                    </div>
                  </div>
                </div>
              )}

              {/* PANEL CONTENT: INTERACTIVE SANDBOX RUNNER */}
              {isSandboxMode && (
                <div className="flex-1 p-4 flex flex-col font-mono text-xs overflow-y-auto no-scrollbar space-y-4">
                  
                  {/* Scenario Selector */}
                  {selectedEndpoint.edgeCaseResponses && selectedEndpoint.edgeCaseResponses.length > 0 && (
                    <div className="space-y-1 font-sans">
                      <label className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Select Test Scenario:</span>
                      </label>
                      <select
                        value={selectedEdgeCaseId}
                        onChange={(e) => setSelectedEdgeCaseId(e.target.value)}
                        className="w-full bg-black/80 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#7A1220]"
                      >
                        {selectedEndpoint.edgeCaseResponses.map((ec) => (
                          <option key={ec.scenarioId} value={ec.scenarioId}>
                            {ec.scenarioName}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between font-sans text-xs">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-rose-400" />
                        <span>Editable Request Payload</span>
                      </span>
                      <button
                        onClick={() => setSandboxCustomInput(JSON.stringify(selectedEndpoint.sampleRequest, null, 2))}
                        className="text-[10px] text-gray-400 hover:text-white flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                    </div>
                    <textarea
                      value={sandboxCustomInput}
                      onChange={(e) => setSandboxCustomInput(e.target.value)}
                      rows={7}
                      className="w-full bg-black/90 p-3 rounded-xl border border-white/10 text-emerald-400 text-xs font-mono focus:outline-none focus:border-[#7A1220] transition-colors leading-relaxed"
                    />
                  </div>

                  <button
                    onClick={handleRunSandbox}
                    disabled={sandboxLoading}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.99] text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all"
                  >
                    {sandboxLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Executing Request...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Send Sandbox Test Request</span>
                      </>
                    )}
                  </button>

                  {/* Response Inspector */}
                  <div className="space-y-2 pt-1 flex-1 flex flex-col">
                    <div className="flex items-center justify-between font-sans text-xs">
                      <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Response Inspector</span>
                      {sandboxMeta && (
                        <div className="flex items-center gap-2 text-[10px] font-mono">
                          <span
                            className={`px-2 py-0.5 rounded font-bold border ${
                              sandboxMeta.status === 200
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                : sandboxMeta.status === 401
                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                                : sandboxMeta.status === 409
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                                : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            }`}
                          >
                            {sandboxMeta.statusText}
                          </span>
                          <span className="text-gray-400">{sandboxMeta.timeMs} ms</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 bg-black p-3.5 rounded-xl border border-white/10 overflow-x-auto no-scrollbar text-gray-300 text-xs leading-relaxed max-h-64">
                      {sandboxResponse ? (
                        <pre>{JSON.stringify(sandboxResponse, null, 2)}</pre>
                      ) : (
                        <span className="text-gray-500 italic">Click "Send Sandbox Test Request" above to simulate API response.</span>
                      )}
                    </div>
                  </div>

                </div>
              )}
            </motion.aside>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
