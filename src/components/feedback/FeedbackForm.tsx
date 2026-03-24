"use client";

import { useState, useTransition } from "react";
import { IconCoffee, IconSend } from "@tabler/icons-react";
import { submitFeedback } from "@/services/feedback";

interface FeedbackFormProps {
  onSuccess?: () => void;
}

export default function FeedbackForm({ onSuccess }: FeedbackFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        await submitFeedback(feedback);
        onSuccess?.();
        setFeedback("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        maxLength={500}
        placeholder="Share your thoughts..."
        rows={3}
        className="
          w-full px-3 py-2 text-sm
          bg-white/5 border border-white/10 
          rounded-lg resize-none
          text-white/90 placeholder-white/30
          focus:outline-none focus:border-white/20 focus:bg-white/[0.07]
          transition-colors
        "
        required
      />

      {error && (
        <p className="mt-2 text-xs text-red-400/80">{error}</p>
      )}

      <div className="mt-3 flex items-center justify-between">
        <a
          href="https://www.buymeacoffee.com/akshaygore"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-1.5 text-[11px] text-white/30 
            hover:text-amber-400/70 transition-colors
          "
        >
          <IconCoffee size={12} />
          <span>Buy me a coffee</span>
        </a>

        <button
          type="submit"
          disabled={isPending || !feedback.trim()}
          className="
            flex items-center gap-1.5 px-3 py-1.5
            bg-emerald-600/80 hover:bg-emerald-600
            disabled:bg-white/10 disabled:text-white/30
            text-xs font-medium text-white
            rounded-md transition-colors
            disabled:cursor-not-allowed
          "
        >
          {isPending ? (
            <span>Sending...</span>
          ) : (
            <>
              <span>Send</span>
              <IconSend size={12} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
