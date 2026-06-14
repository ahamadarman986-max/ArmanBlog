"use client";

import { useEffect, useState } from "react";
import { User, MessageSquare, Send } from "lucide-react";

type Comment = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

type CommentBoxProps = {
  slug: string;
};

export function CommentBox({ slug }: CommentBoxProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" >("idle");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`comments-${slug}`);
      if (stored) {
        setComments(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load comments", e);
    }
  }, [slug]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    const newComment: Comment = {
      id: Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    const updated = [newComment, ...comments];

    try {
      localStorage.setItem(`comments-${slug}`, JSON.stringify(updated));
      setComments(updated);
      setMessage("");
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (e) {
      console.error("Failed to save comment", e);
      setStatus("error");
    }
  }

  function getInitials(nameStr: string) {
    return nameStr
      .trim()
      .split(/\s+/)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";
  }

  function formatCommentDate(dateStr: string) {
    try {
      return new Date(dateStr).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  }

  return (
    <div className="grid gap-8">
      <section className="surface rounded-lg p-6">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6 text-gold" />
          <h2 className="font-display text-2xl font-semibold text-ink dark:text-white">Join the discussion</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="focus-ring rounded-lg border border-black/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
              placeholder="Name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="focus-ring rounded-lg border border-black/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
              placeholder="Email"
            />
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className="focus-ring min-h-32 rounded-lg border border-black/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
            placeholder="Share your thoughts..."
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="focus-ring inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-gold disabled:opacity-70 dark:bg-white dark:text-ink"
            >
              <Send className="h-4 w-4" />
              {status === "submitting" ? "Submitting..." : "Submit Comment"}
            </button>

            {status === "success" && (
              <p className="text-sm font-medium text-gold animate-fade-in">Comment posted successfully!</p>
            )}
            {status === "error" && (
              <p className="text-sm font-medium text-red-500 animate-fade-in">Please fill in all fields correctly.</p>
            )}
          </div>
        </form>
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl font-semibold text-ink dark:text-white">
          Comments ({comments.length})
        </h3>
        {comments.length === 0 ? (
          <div className="surface rounded-lg p-8 text-center text-muted dark:text-gray-400">
            <User className="mx-auto h-8 w-8 opacity-40 mb-3" />
            <p className="text-sm">No comments yet. Be the first to start the conversation!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {comments.map((comment) => (
              <article key={comment.id} className="surface flex gap-4 rounded-lg p-5 animate-fade-up">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-sm font-bold text-gold">
                  {getInitials(comment.name)}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <span className="text-sm font-bold text-ink dark:text-white">{comment.name}</span>
                    <time className="text-xs text-muted dark:text-gray-400">
                      {formatCommentDate(comment.createdAt)}
                    </time>
                  </div>
                  <p className="text-sm leading-6 text-muted dark:text-gray-300 whitespace-pre-wrap">
                    {comment.message}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
