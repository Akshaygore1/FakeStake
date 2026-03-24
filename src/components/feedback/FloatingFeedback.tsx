"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { IconMessage, IconX, IconCheck } from "@tabler/icons-react";
import FeedbackForm from "./FeedbackForm";

export default function FloatingFeedback() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleSuccess = useCallback(() => {
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
    }, 1800);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSubmitted(false);
  }, []);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    // Delay adding listener to prevent immediate close
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClose]);

  return (
    <div className="fixed bottom-5 right-5 z-[9999]" ref={panelRef}>
      {/* Expanded Panel */}
      <div
        className={`
          absolute bottom-0 right-0 origin-bottom-right
          transition-all duration-200 ease-out
          ${isOpen 
            ? "opacity-100 scale-100 pointer-events-auto" 
            : "opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        <div className="w-72 bg-neutral-900/95 backdrop-blur-sm border border-white/10 rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <span className="text-sm font-medium text-white/80">Feedback</span>
            <button
              onClick={handleClose}
              className="text-white/40 hover:text-white/70 transition-colors p-0.5"
            >
              <IconX size={14} />
            </button>
          </div>

          {/* Content */}
          {submitted ? (
            <div className="px-4 py-6 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/20 mb-3">
                <IconCheck size={20} className="text-emerald-400" />
              </div>
              <p className="text-sm text-white/70">Thanks for your feedback!</p>
            </div>
          ) : (
            <FeedbackForm onSuccess={handleSuccess} />
          )}
        </div>
      </div>

      {/* Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-2
          bg-white/5 hover:bg-white/10
          border border-white/10 hover:border-white/20
          rounded-full backdrop-blur-sm
          transition-all duration-200 ease-out
          ${isOpen ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"}
        `}
      >
        <IconMessage size={14} className="text-white/50" />
        <span className="text-xs font-medium text-white/60">Feedback</span>
      </button>
    </div>
  );
}
