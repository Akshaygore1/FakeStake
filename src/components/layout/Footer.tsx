import { IconArrowUpRight, IconCoffee, IconMail } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/games", label: "Games" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#040705] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,248,58,0.14),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(255,176,71,0.12),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.42em] text-emerald-300/72 sm:text-sm">
              Fake Stake
            </p>
            <h2 className="mt-5 max-w-xl text-[clamp(2.3rem,4.4vw,4.4rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-white">
              A sharper practice floor for casino rhythm.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
              Move through every game with virtual credit, fast resets, and zero real-money pressure.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="mailto:akshaygore789@gmail.com"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-white/72 transition-colors duration-300 hover:text-white"
              >
                <IconMail className="h-4 w-4 text-[#00f83a]" />
                Email
                <IconArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="https://www.buymeacoffee.com/akshaygore"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-white/72 transition-colors duration-300 hover:text-white"
              >
                <IconCoffee className="h-4 w-4 text-[#ffb35c]" />
                Buy me coffee
                <IconArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-white/40">Navigate</p>
              <div className="mt-5 space-y-4">
                {quickLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block text-lg font-medium tracking-[-0.03em] text-white/74 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-white/40">House rules</p>
              <div className="mt-5 space-y-4 text-sm leading-6 text-white/58 sm:text-base">
                <p>All play uses virtual credit only.</p>
                <p>Edit or reset your bankroll whenever you want.</p>
                <p>Jump between tables without signing in.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/44 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Fake Stake. Built for free-play practice.</p>
          <p>No real money. No withdrawals. Just reps.</p>
        </div>
      </div>
    </footer>
  );
}
