import React, { useState, useRef } from 'react';
import { 
  Download, 
  ExternalLink, 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  FileText, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface PdfViewerProps {
  title: string;
  pdfUrl: string;
  filename: string;
  fileSize?: string;
  lastUpdated?: string;
  summaryHighlights?: string[];
}

export function PdfViewer({
  title,
  pdfUrl,
  filename,
  fileSize = 'PDF Document',
  lastUpdated = '2026',
  summaryHighlights = []
}: PdfViewerProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 15, 175));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 15, 60));
  };

  const handleZoomReset = () => {
    setZoomLevel(100);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none p-4 bg-gray-900' : 'w-full'
      }`}
    >
      {/* Top Toolbar */}
      <div className="bg-slate-900 text-white px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-[#7A1220] flex items-center justify-center text-white shrink-0 shadow-md">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-white truncate font-figtree">
              {title}
            </h3>
            <p className="text-xs text-slate-400 font-light flex items-center gap-2">
              <span>{fileSize}</span>
              <span>•</span>
              <span>CBK Compliant</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Zoom Controls */}
          <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700 text-slate-300">
            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              className="p-1.5 hover:bg-slate-700 hover:text-white rounded transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 text-xs font-mono w-12 text-center text-slate-200">
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              title="Zoom In"
              className="p-1.5 hover:bg-slate-700 hover:text-white rounded transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomReset}
              title="Reset Zoom"
              className="p-1.5 hover:bg-slate-700 hover:text-white rounded transition-colors ml-1 border-l border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* External View & Download Buttons */}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in new window"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-medium rounded-lg border border-slate-700 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Open</span>
          </a>

          <a
            href={pdfUrl}
            download={filename}
            title="Download PDF document"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#7A1220] hover:bg-[#8F1626] text-white text-xs font-semibold rounded-lg shadow-sm transition-all hover:shadow"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </a>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Viewer"}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Summary Highlights Strip (Optional) */}
      {summaryHighlights.length > 0 && !isFullscreen && (
        <div className="bg-amber-50/60 border-b border-amber-200/60 px-4 py-3 sm:px-6">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider font-figtree">
                Key Compliance & Legal Highlights
              </h4>
              <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-800">
                {summaryHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Embedded PDF iframe Container */}
      <div 
        className="w-full bg-slate-100 relative overflow-hidden flex items-center justify-center"
        style={{ height: isFullscreen ? 'calc(100vh - 70px)' : '680px' }}
      >
        <div 
          className="w-full h-full transition-transform duration-200 origin-top"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          <object
            data={`${pdfUrl}#toolbar=1&navpanes=0`}
            type="application/pdf"
            className="w-full h-full border-0"
          >
            <iframe
              src={`${pdfUrl}#toolbar=1`}
              title={title}
              className="w-full h-full border-0"
            >
              {/* Fallback for browsers that block PDF rendering inside iframe */}
              <div className="p-8 text-center flex flex-col items-center justify-center h-full max-w-md mx-auto">
                <FileText className="w-16 h-16 text-gray-400 mb-4" />
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Interactive Viewer Unavailable
                </h4>
                <p className="text-sm text-gray-600 mb-6">
                  Your browser setup prevents direct inline PDF embedding. You can view or download the full document directly.
                </p>
                <div className="flex gap-4">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-700"
                  >
                    Open Document
                  </a>
                  <a
                    href={pdfUrl}
                    download={filename}
                    className="px-4 py-2 bg-[#7A1220] text-white text-sm font-medium rounded-lg hover:bg-[#8F1626]"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            </iframe>
          </object>
        </div>
      </div>
    </div>
  );
}
