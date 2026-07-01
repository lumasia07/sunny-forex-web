import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSeo } from '../hooks/useSeo';
import { Terminal, Code, Copy, Check, Lock, Globe, Server } from 'lucide-react';

export function Developers() {
  useSeo('developers');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const curlCode = `curl -X GET "https://api.sunnyremit.com/v1/rates" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Accept: application/json"`;

  const responseJson = `{
  "status": "success",
  "data": [
    {
      "currency_code": "USD",
      "currency_name": "US Dollar",
      "buy_rate": "130.5000",
      "sell_rate": "132.0000",
      "change_pct": "0.42",
      "updated_at": "2026-07-01T10:00:00Z"
    },
    {
      "currency_code": "EUR",
      "currency_name": "Euro",
      "buy_rate": "141.2000",
      "sell_rate": "143.5000",
      "change_pct": "-0.18",
      "updated_at": "2026-07-01T10:00:00Z"
    }
  ]
}`;

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pt-28 pb-24 overflow-hidden relative">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7A1220]/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4A24C]/5 rounded-full blur-[100px] pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
          <span className="inline-block w-12 h-px bg-[#7A1220] mb-5" />
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#7A1220] mb-3">
            Developer Infrastructure
          </p>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05] mb-6">
            Build on the rails of <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-[#D4A24C]">global liquidity.</span>
          </h1>
          <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed max-w-xl">
            Integrate our real-time interbank foreign exchange rates and instant mobile remittance rails directly into your fintech apps, billing systems, and treasury dashboards.
          </p>
        </div>

        {/* Developer Portal Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: API Docs */}
          <div className="lg:col-span-6 space-y-10">
            
            {/* Auth Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#7A1220]">
                  <Lock className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold">Authentication</h3>
              </div>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                All API requests require your private API key sent as a Bearer token in the request header. You can obtain your sandbox keys in the merchant control center.
              </p>
            </div>

            {/* Rates Endpoint */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500">
                  <Globe className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold">Retrieve Live Forex Board Rates</h3>
              </div>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Fetch the official, CBK-licensed real-time buy and sell rates across our 151 supported circulating currencies. Perfect for displaying indicators, currency exchanges, or audit feeds.
              </p>
              
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">GET</span>
                <code className="text-xs font-mono text-gray-300">/v1/rates</code>
              </div>
            </div>

            {/* Tech Specs Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <Server className="w-5 h-5 text-[#D4A24C] mb-2" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">99.99% Uptime</h4>
                <p className="text-[10px] text-gray-400 font-light leading-relaxed">Redundant edge servers routed through Cloudflare guarantee instant responses.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <Code className="w-5 h-5 text-[#0EA5E9] mb-2" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Webhooks</h4>
                <p className="text-[10px] text-gray-400 font-light leading-relaxed">Receive instant HTTP callbacks whenever exchange rates shift or transfer orders complete.</p>
              </div>
            </div>

          </div>

          {/* Right Column: Code Terminal */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex-grow rounded-3xl bg-black border border-white/10 overflow-hidden flex flex-col font-mono text-xs shadow-2xl">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-5 py-4 bg-white/5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-[10px] text-gray-400 ml-2 font-sans font-medium flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Interactive Sandbox Shell</span>
                  </span>
                </div>
                
                <button
                  onClick={() => copyToClipboard(curlCode, 'curl')}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  title="Copy Code"
                >
                  {copiedText === 'curl' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Terminal Shell Content */}
              <div className="p-6 space-y-6 overflow-x-auto">
                <div>
                  <div className="text-gray-500 mb-2 font-sans text-[10px] uppercase tracking-wider">Request</div>
                  <pre className="text-emerald-400 leading-relaxed font-mono whitespace-pre">{curlCode}</pre>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-gray-500 font-sans text-[10px] uppercase tracking-wider">Response Payload</div>
                    <button
                      onClick={() => copyToClipboard(responseJson, 'json')}
                      className="p-1 rounded hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                      title="Copy response JSON"
                    >
                      {copiedText === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <pre className="text-gray-300 leading-relaxed font-mono whitespace-pre">{responseJson}</pre>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
