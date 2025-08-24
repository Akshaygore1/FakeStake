"use client";

import { createFeedback } from "../../action/action";
import { useFormStatus } from "react-dom";
import { useState, useTransition } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {pending ? "Submitting..." : "Submit Feedback"}
    </button>
  );
}

interface FeedbackFormProps {
  onSuccess?: () => void;
}

export default function FeedbackForm({ onSuccess }: FeedbackFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      try {
        await createFeedback(formData);
        setSuccess(true);
        onSuccess?.();
        // Reset form
        const form = document.getElementById(
          "feedback-form"
        ) as HTMLFormElement;
        form?.reset();
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
    <form id="feedback-form" action={handleSubmit} className="space-y-4 p-6">
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
        <SubmitButton />
      </div>
    </form>
  );
}
