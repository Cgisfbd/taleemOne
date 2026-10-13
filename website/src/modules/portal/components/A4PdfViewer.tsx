"use client";

import React, { useState, useRef } from "react";
import {
  Printer,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Eye,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/shared/i18n";

interface A4PdfViewerProps {
  documentTitle?: string;
  pdfUrl?: string;
}

export const A4PdfViewer: React.FC<A4PdfViewerProps> = ({
  documentTitle = "Official_Document_A4.pdf",
  pdfUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
}) => {
  const { language, direction } = useLanguage();
  const isRTL = direction === "rtl";

  // PDF Viewer State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 6; // Multi-page A4 document
  const [scale, setScale] = useState<number>(1); // 1 = 100% Fit to Width
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Pinch-to-zoom refs
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartDistRef = useRef<number | null>(null);
  const touchStartScaleRef = useRef<number>(1);

  // Zoom Handlers
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.6));
  const handleResetZoom = () => setScale(1);

  // Page Navigation Handlers
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Touch Pinch-to-Zoom Event Handlers for Mobile Phones
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartDistRef.current = dist;
      touchStartScaleRef.current = scale;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartDistRef.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = dist / touchStartDistRef.current;
      const newScale = Math.min(Math.max(touchStartScaleRef.current * ratio, 0.6), 2.5);
      setScale(newScale);
    }
  };

  const handleTouchEnd = () => {
    touchStartDistRef.current = null;
  };

  const handleToggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullScreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullScreen(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      ref={containerRef}
      className={`w-full flex flex-col rounded-3xl glass-ultra overflow-hidden border border-amber-500/30 shadow-2xl transition-all ${
        isFullScreen ? "fixed inset-0 z-50 rounded-none h-screen w-screen p-2 overflow-y-auto bg-black/95" : "my-6"
      }`}
    >
      {/* =========================================================================
          TOP PROFESSIONAL PDF VIEWER TOOLBAR
         ========================================================================= */}
      <div className="w-full bg-gradient-to-r from-amber-500/15 via-[#2D1F33]/20 to-purple-500/15 dark:from-amber-500/10 dark:via-[#1A0F26]/60 dark:to-purple-500/10 border-b border-amber-500/20 px-3 sm:px-6 py-3 flex items-center justify-between gap-2 flex-wrap select-none print:hidden">
        {/* Document Title Badge */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 text-white flex items-center justify-center font-bold shadow-md shadow-amber-600/20 shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-start">
            <span className="font-display font-black text-xs sm:text-sm text-[#2D1F33] dark:text-white truncate max-w-[150px] sm:max-w-[260px]">
              {documentTitle}
            </span>
            <span className="text-[9px] sm:text-[10px] text-amber-800 dark:text-amber-300 font-mono">
              A4 Standard • Multi-Page PDF Document
            </span>
          </div>
        </div>

        {/* Page Switcher Navigation */}
        <div className="flex items-center gap-1.5 bg-white/50 dark:bg-white/5 px-2 py-1 rounded-xl border border-black/5 dark:border-white/10 text-xs">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-[#2D1F33] dark:text-white transition-colors"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="font-mono text-xs font-bold text-[#2D1F33] dark:text-white px-1">
            Page {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-[#2D1F33] dark:text-white transition-colors"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom & Touch Scale Controls */}
        <div className="flex items-center gap-1 bg-white/50 dark:bg-white/5 p-1 rounded-xl border border-black/5 dark:border-white/10">
          <button
            type="button"
            onClick={handleZoomOut}
            title="Zoom Out"
            className="w-7 h-7 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center text-[#2D1F33] dark:text-[#C8BDCF] transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleResetZoom}
            title="Fit to Width (100%)"
            className="px-2 h-7 rounded-lg bg-amber-500/20 text-amber-800 dark:text-amber-300 text-[10px] sm:text-[11px] font-bold font-mono flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{Math.round(scale * 100)}%</span>
          </button>

          <button
            type="button"
            onClick={handleZoomIn}
            title="Zoom In"
            className="w-7 h-7 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center text-[#2D1F33] dark:text-[#C8BDCF] transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action Controls: Fullscreen & Print */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={handleToggleFullScreen}
            title={isFullScreen ? "Exit Fullscreen" : "Fullscreen View"}
            className="p-2 rounded-xl bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-[#2D1F33] dark:text-[#C8BDCF] border border-black/5 dark:border-white/10 transition-colors"
          >
            {isFullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            title="Print PDF Document"
            className="px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-800 hover:opacity-95 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-amber-600/25 active:scale-95 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>{language === "ur" ? "پرنٹ / PDF" : "Print PDF"}</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          ACTUAL A4 DOCUMENT CANVAS STAGE (COMPACT & RESPONSIVE FOR MOBILE)
         ========================================================================= */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full max-h-[58vh] sm:max-h-[70vh] lg:max-h-[760px] overflow-y-auto overflow-x-auto p-2 sm:p-4 md:p-6 flex justify-center bg-[#FAF7F2]/80 dark:bg-[#10071A]/90 custom-scrollbar select-none touch-pan-y"
      >
        {/* The Exact True A4 Sheet (210mm x 297mm Ratio) */}
        <div
          id="a4-printable-document"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            transition: touchStartDistRef.current !== null ? "none" : "transform 0.15s ease-out",
          }}
          className="w-full max-w-[680px] min-h-[520px] sm:min-h-[720px] md:min-h-[860px] bg-white text-[#1E112A] shadow-xl rounded-sm p-3.5 sm:p-7 lg:p-9 relative flex flex-col justify-between border border-black/10 print:m-0 print:p-8 print:border-none print:shadow-none print:w-full select-text"
        >
          {/* =====================================================================
              PAGE 1: LOREM IPSUM + ARTICLE + BAR CHART
             ===================================================================== */}
          {currentPage === 1 && (
            <div className="flex flex-col justify-between h-full space-y-3 sm:space-y-4">
              <div>
                <h1 className="text-xl sm:text-3xl font-extrabold text-black text-center mb-2 sm:mb-4 tracking-tight">
                  Lorem ipsum
                </h1>

                <h2 className="text-sm sm:text-lg font-bold text-black text-center mb-2.5 sm:mb-4 leading-snug">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac faucibus odio.
                </h2>

                <div className="text-[11px] sm:text-xs text-[#222] leading-relaxed space-y-2 text-justify">
                  <p>
                    Vestibulum neque massa, scelerisque sit amet ligula eu, congue molestie mi. Praesent ut varius sem. Nullam at porttitor arcu, nec lacinia nisi. Ut ac dolor vitae odio interdum condimentum. <strong>Vivamus dapibus sodales ex, vitae malesuada ipsum cursus convallis.</strong> Maecenas sed egestas nulla, ac condimentum orci. Mauris diam felis, vulputate ac suscipit et, iaculis non est. Curabitur semper arcu ac ligula semper, nec luctus nisl blandit.
                  </p>

                  <p className="font-semibold text-black">
                    Maecenas mauris lectus, lobortis et purus mattis, blandit dictum tellus.
                  </p>

                  <ul className="list-disc pl-4 space-y-0.5 text-[10px] sm:text-xs">
                    <li><strong className="text-black">Maecenas non lorem quis tellus placerat varius.</strong></li>
                    <li><em>Nulla facilisi.</em></li>
                    <li><u>Aenean congue fringilla justo ut aliquam.</u></li>
                    <li>Morbi viverra semper lorem nec molestie.</li>
                  </ul>
                </div>
              </div>

              {/* 3D Bar Chart Visual */}
              <div className="p-2.5 sm:p-4 bg-white border border-gray-200 rounded-lg mt-1">
                <div className="flex items-end justify-between gap-3 h-32 sm:h-44 pt-4 pb-1 px-3 border-b border-l border-gray-400 relative">
                  {/* Y Axis Guides */}
                  <div className="absolute left-[-22px] top-0 bottom-1 flex flex-col justify-between text-[9px] font-mono text-gray-500">
                    <span>12</span>
                    <span>8</span>
                    <span>4</span>
                    <span>0</span>
                  </div>

                  {/* Row 1 Bars */}
                  <div className="flex-1 flex items-end justify-center gap-1 h-full">
                    <div className="w-2.5 sm:w-3.5 bg-[#00529B] rounded-t-xs" style={{ height: "75%" }} />
                    <div className="w-2.5 sm:w-3.5 bg-[#E03C11] rounded-t-xs" style={{ height: "25%" }} />
                    <div className="w-2.5 sm:w-3.5 bg-[#FDB913] rounded-t-xs" style={{ height: "35%" }} />
                  </div>

                  {/* Row 2 Bars */}
                  <div className="flex-1 flex items-end justify-center gap-1 h-full">
                    <div className="w-2.5 sm:w-3.5 bg-[#00529B] rounded-t-xs" style={{ height: "20%" }} />
                    <div className="w-2.5 sm:w-3.5 bg-[#E03C11] rounded-t-xs" style={{ height: "70%" }} />
                    <div className="w-2.5 sm:w-3.5 bg-[#FDB913] rounded-t-xs" style={{ height: "80%" }} />
                  </div>

                  {/* Row 3 Bars */}
                  <div className="flex-1 flex items-end justify-center gap-1 h-full">
                    <div className="w-2.5 sm:w-3.5 bg-[#00529B] rounded-t-xs" style={{ height: "25%" }} />
                    <div className="w-2.5 sm:w-3.5 bg-[#E03C11] rounded-t-xs" style={{ height: "15%" }} />
                    <div className="w-2.5 sm:w-3.5 bg-[#FDB913] rounded-t-xs" style={{ height: "30%" }} />
                  </div>

                  {/* Row 4 Bars */}
                  <div className="flex-1 flex items-end justify-center gap-1 h-full">
                    <div className="w-2.5 sm:w-3.5 bg-[#00529B] rounded-t-xs" style={{ height: "35%" }} />
                    <div className="w-2.5 sm:w-3.5 bg-[#E03C11] rounded-t-xs" style={{ height: "75%" }} />
                    <div className="w-2.5 sm:w-3.5 bg-[#FDB913] rounded-t-xs" style={{ height: "50%" }} />
                  </div>
                </div>

                {/* X Axis Labels & Legend */}
                <div className="flex items-center justify-between mt-1.5 pt-0.5 text-[10px] text-gray-700 font-semibold px-2">
                  <div className="flex-1 flex justify-around">
                    <span>Row 1</span>
                    <span>Row 2</span>
                    <span>Row 3</span>
                    <span>Row 4</span>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-2 text-[9px] pl-3 border-l border-gray-200">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-[#00529B] inline-block" />
                      <span>Col 1</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-[#E03C11] inline-block" />
                      <span>Col 2</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-[#FDB913] inline-block" />
                      <span>Col 3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              PAGE 2: PARAGRAPHS + STRUCTURED TABLE
             ===================================================================== */}
          {currentPage === 2 && (
            <div className="flex flex-col justify-between h-full space-y-3 sm:space-y-4">
              <div className="text-[11px] sm:text-xs text-[#222] leading-relaxed space-y-2 text-justify">
                <p>
                  In non mauris justo. Duis vehicula mi vel mi pretium, a viverra erat efficitur. Cras aliquam est ac eros varius, id iaculis dui auctor. Duis pretium neque ligula, et pulvinar mi placerat et. Nulla nec nunc sit amet nunc posuere vestibulum. Ut id neque eget tortor mattis tristique. Donec ante est, blandit sit amet tristique vel, lacinia pulvinar arcu.
                </p>

                <p>
                  In eleifend velit vitae libero sollicitudin euismod. Fusce vitae vestibulum velit. Pellentesque vulputate lectus quis pellentesque commodo. Aliquam erat volutpat. Vestibulum in egestas velit.
                </p>
              </div>

              {/* Table Section */}
              <div className="my-2 sm:my-3">
                <h3 className="text-xs sm:text-base font-bold text-black mb-2">
                  Cras fringilla ipsum magna, in fringilla dui commodo a.
                </h3>

                <div className="overflow-hidden border border-gray-300 rounded-sm">
                  <table className="w-full text-start text-[10px] sm:text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-gray-300 bg-gray-50 text-gray-800 font-bold">
                        <th className="p-1.5 sm:p-2 border-r border-gray-300 w-8 text-center">#</th>
                        <th className="p-1.5 sm:p-2 border-r border-gray-300 text-start">Lorem ipsum</th>
                        <th className="p-1.5 sm:p-2 border-r border-gray-300 text-start">Status</th>
                        <th className="p-1.5 sm:p-2 text-start">Info</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                      <tr>
                        <td className="p-1.5 sm:p-2 text-center border-r border-gray-300 font-mono">1</td>
                        <td className="p-1.5 sm:p-2 border-r border-gray-300">In eleifend velit vitae libero sollicitudin euismod.</td>
                        <td className="p-1.5 sm:p-2 border-r border-gray-300 font-semibold text-emerald-700">Lorem</td>
                        <td className="p-1.5 sm:p-2 font-mono">95%</td>
                      </tr>
                      <tr>
                        <td className="p-1.5 sm:p-2 text-center border-r border-gray-300 font-mono">2</td>
                        <td className="p-1.5 sm:p-2 border-r border-gray-300">Cras fringilla ipsum magna, in fringilla dui commodo a.</td>
                        <td className="p-1.5 sm:p-2 border-r border-gray-300 font-semibold text-emerald-700">Ipsum</td>
                        <td className="p-1.5 sm:p-2 font-mono">92%</td>
                      </tr>
                      <tr>
                        <td className="p-1.5 sm:p-2 text-center border-r border-gray-300 font-mono">3</td>
                        <td className="p-1.5 sm:p-2 border-r border-gray-300">Aliquam erat volutpat.</td>
                        <td className="p-1.5 sm:p-2 border-r border-gray-300 font-semibold text-emerald-700">Lorem</td>
                        <td className="p-1.5 sm:p-2 font-mono">89%</td>
                      </tr>
                      <tr>
                        <td className="p-1.5 sm:p-2 text-center border-r border-gray-300 font-mono">4</td>
                        <td className="p-1.5 sm:p-2 border-r border-gray-300">Fusce vitae vestibulum velit.</td>
                        <td className="p-1.5 sm:p-2 border-r border-gray-300 font-semibold text-emerald-700">Lorem</td>
                        <td className="p-1.5 sm:p-2 font-mono">97%</td>
                      </tr>
                      <tr>
                        <td className="p-1.5 sm:p-2 text-center border-r border-gray-300 font-mono">5</td>
                        <td className="p-1.5 sm:p-2 border-r border-gray-300">Etiam vehicula luctus fermentum.</td>
                        <td className="p-1.5 sm:p-2 border-r border-gray-300 font-semibold text-emerald-700">Ipsum</td>
                        <td className="p-1.5 sm:p-2 font-mono">98%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="text-[11px] sm:text-xs text-[#222] leading-relaxed space-y-2 text-justify">
                <p>
                  Etiam vehicula luctus fermentum. In vel metus congue, pulvinar lectus vel, fermentum dui. Maecenas ante orci, egestas ut aliquet sit amet, sagittis a magna. Aliquam ante quam, pellentesque ut dignissim quis, laoreet eget est. Aliquam erat volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                </p>
              </div>
            </div>
          )}

          {/* =====================================================================
              PAGE 3: MULTI-SECTION ARTICLE
             ===================================================================== */}
          {currentPage === 3 && (
            <div className="flex flex-col justify-between h-full space-y-3 sm:space-y-4 text-[11px] sm:text-xs text-[#222] leading-relaxed text-justify">
              <div>
                <h2 className="text-sm sm:text-lg font-bold text-black mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </h2>
                <p className="mb-2">
                  Nunc ac faucibus odio. Vestibulum neque massa, scelerisque sit amet ligula eu, congue molestie mi. Praesent ut varius sem. Nullam at porttitor arcu, nec lacinia nisi. Ut ac dolor vitae odio interdum condimentum. Vivamus dapibus sodales ex, vitae malesuada ipsum cursus convallis.
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-bold text-black mb-1">
                  Maecenas mauris lectus, lobortis et purus mattis, blandit dictum tellus.
                </h3>
                <p className="mb-2">
                  Maecenas non lorem quis tellus placerat varius. Nulla facilisi. Aenean congue fringilla justo ut aliquam. Mauris id ex erat. Nunc vulputate neque vitae justo facilisis, non condimentum ante sagittis. Morbi viverra semper lorem nec molestie.
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-bold text-black mb-1">
                  In eleifend velit vitae libero sollicitudin euismod.
                </h3>
                <p>
                  Fusce vitae vestibulum velit. Pellentesque vulputate lectus quis pellentesque commodo. Aliquam erat volutpat. Vestibulum in egestas velit. Pellentesque fermentum nisl vitae fringilla venenatis.
                </p>
              </div>
            </div>
          )}

          {/* =====================================================================
              PAGE 4 & 5: DOCUMENT WITH PHOTO
             ===================================================================== */}
          {(currentPage >= 4) && (
            <div className="flex flex-col justify-between h-full space-y-3 sm:space-y-4 text-[11px] sm:text-xs text-[#222] leading-relaxed text-justify">
              {/* Photo Header */}
              <div className="w-full flex justify-center py-1">
                <div className="w-full max-w-sm h-32 sm:h-44 bg-slate-900 rounded-lg overflow-hidden shadow-md flex items-center justify-center relative border border-gray-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-3 text-white">
                    <div>
                      <span className="text-[9px] font-mono text-amber-300 block">Figure {currentPage - 3}.0 • Document Asset</span>
                      <strong className="text-xs font-semibold">Technical Hardware Architecture Reference</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-bold text-black mb-1">
                  Maecenas mauris lectus, lobortis et purus mattis, blandit dictum tellus.
                </h3>
                <p className="mb-2">
                  Maecenas non lorem quis tellus placerat varius. Nulla facilisi. Aenean congue fringilla justo ut aliquam. Mauris id ex erat. Nunc vulputate neque vitae justo facilisis, non condimentum ante sagittis.
                </p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-bold text-black mb-1">
                  In eleifend velit vitae libero sollicitudin euismod.
                </h3>
                <p>
                  Fusce vitae vestibulum velit. Pellentesque vulputate lectus quis pellentesque commodo. Aliquam erat volutpat. Vestibulum in egestas velit. Pellentesque fermentum nisl vitae fringilla venenatis.
                </p>
              </div>
            </div>
          )}

          {/* =====================================================================
              A4 FOOTER (PAGE NUMBER & PRINT SPECIFICATION)
             ===================================================================== */}
          <div className="pt-4 border-t border-gray-300 mt-6 flex items-center justify-between text-[11px] text-gray-500 font-mono">
            <span>A4 Document Specification • 210mm × 297mm</span>
            <span className="font-bold text-black">Page {currentPage} of {totalPages}</span>
            <span>Jamia Document Reader Engine</span>
          </div>
        </div>
      </div>

      {/* Footer Info Ribbon */}
      <div className="bg-white/40 dark:bg-black/20 px-4 py-2 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px] text-[#8C7A96] dark:text-[#A394AB] print:hidden">
        <div className="flex items-center gap-1.5 font-semibold">
          <Eye className="w-3.5 h-3.5 text-amber-500" />
          <span>Actual A4 PDF Document Viewer • Touch Pinch-to-Zoom Enabled</span>
        </div>
        <span className="font-mono text-[10px]">Use Prev/Next to switch pages</span>
      </div>
    </div>
  );
};
