"use client";

import { useState, useTransition } from "react";
import { IconCoffee } from "@tabler/icons-react";
import { submitFeedback } from "@/services/feedback";

interface FeedbackFormProps {
  onSuccess?: () => void;
}

export default function FeedbackForm({ onSuccess }: FeedbackFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      try {
        await submitFeedback(feedback);
        setSuccess(true);
        onSuccess?.();
        setFeedback("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    });
  };

  if (success) {
    return (
      <div className="p-6 text-center">
        <div className="text-green-600 dark:text-green-400 text-lg font-semibold mb-2">
          Thank you for your feedback! 🎉
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          We appreciate your input and will use it to improve our service.
        </p>
      </div>
    );
  }

  return (
    <form id="feedback-form" onSubmit={handleSubmit} className="space-y-4 p-6">
      <div>
        <label
          htmlFor="feedback"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          How can we improve your experience?
        </label>
        <textarea
          id="feedback"
          name="feedback"
          value={feedback}
          onChange={(event) => setFeedback(event.target.value)}
          maxLength={500}
          placeholder="Share your thoughts, suggestions, or report any issues..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none transition-colors placeholder-gray-400 dark:placeholder-gray-500"
          required
        />
      </div>

      {error && (
        <div className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? "Submitting..." : "Submit Feedback"}
        </button>
        <a
          href="https://www.buymeacoffee.com/akshaygore"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 rounded-xl bg-amber-300 flex items-center gap-2"
        >
          Buy me a Coffee! <IconCoffee size={16} />
        </a>
      </div>
    </form>
  );
}
