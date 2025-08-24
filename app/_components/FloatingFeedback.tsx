"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import FeedbackForm from "./FeedbackForm";

export default function FloatingFeedback() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  console.log("FloatingFeedback render - isOpen:", isOpen);

  const handleSuccess = () => {
    setIsSubmitted(true);
    // Auto close after 2 seconds
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
    }, 2000);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => {
          console.log("Feedback button clicked, opening modal");
          setIsOpen(true);
        }}
        className="fixed bottom-6 right-6 z-[9999] bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
        aria-label="Give Feedback"
      >
        <div className="flex items-center gap-2">
          <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
          Give Feedback
        </div>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Share Your Feedback
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <FeedbackForm onSuccess={handleSuccess} />
          </div>
        </div>
      )}
    </>
  );
}
