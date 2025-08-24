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
        className="fixed bottom-6 right-6 z-[9999] bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
        aria-label="Give Feedback"
      >
        <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
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
            <div className="p-6">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Thank you!
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your feedback has been submitted successfully.
                  </p>
                </div>
              ) : (
                <FeedbackForm
                  onSuccess={handleSuccess}
                  onCancel={handleClose}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
