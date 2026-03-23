import {
  IconCheck,
  IconCurrencyDollar,
  IconPencil,
  IconRefresh,
} from "@tabler/icons-react";
import { type ChangeEvent, type KeyboardEvent, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gameCards } from "@/config/games";
import { useCommonStore } from "@/stores/common.store";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/games", label: "Games" },
];

const gamePaths = new Set(gameCards.map((game) => game.path));

export default function Navbar() {
  const { balance, clearCommonState, setBalance } = useCommonStore();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  const isGamesArea = location.pathname === "/games" || gamePaths.has(location.pathname);

  const handleEditClick = () => {
    setEditValue(balance.toString());
    setIsEditing(true);
  };

  const handleSaveBalance = () => {
    const newBalance = parseFloat(editValue);

    if (!Number.isNaN(newBalance) && newBalance >= 0) {
      setBalance(newBalance);
    }

    setIsEditing(false);
    setEditValue("");
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSaveBalance();
    }

    if (event.key === "Escape") {
      setIsEditing(false);
      setEditValue("");
    }
  };

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <div className="mx-auto max-w-7xl">
        <nav className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#07110a]/78 px-3 py-3 text-white shadow-[0_22px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-5 sm:py-4">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,248,58,0.15),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(255,176,71,0.16),transparent_22%),linear-gradient(90deg,rgba(255,255,255,0.04),transparent_22%,transparent_78%,rgba(255,255,255,0.04))]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />

          <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 lg:grid-cols-[auto_1fr_auto]">
            <Link to="/" className="group inline-flex min-w-0 items-center gap-2.5 sm:gap-3">
              <div className="flex min-w-0 items-end gap-2 leading-none">
                <span className="bg-[#00f83a] px-2 py-1 text-lg font-black uppercase tracking-[-0.08em] text-black transition-transform duration-300 group-hover:-translate-y-0.5 sm:text-2xl">
                  Fake
                </span>
                <span className="truncate font-instrument-serif text-[1.65rem] italic tracking-[-0.07em] text-[#13ff66] sm:text-[2.3rem]">
                  Stake
                </span>
              </div>
              <span className="hidden text-[0.68rem] uppercase tracking-[0.34em] text-white/48 sm:block">
                Practice floor
              </span>
            </Link>

            <div className="order-3 col-span-2 flex flex-wrap items-center gap-2 lg:order-2 lg:col-span-1 lg:justify-center">
              {navLinks.map((link) => {
                const isActive = link.to === "/" ? location.pathname === "/" : isGamesArea;

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={[
                      "inline-flex min-w-[4.75rem] items-center justify-center rounded-full px-3.5 py-2 text-[0.68rem] font-medium uppercase tracking-[0.24em] transition-all duration-300 sm:min-w-[5.5rem] sm:px-4 sm:text-sm sm:tracking-[0.28em]",
                      isActive
                        ? "bg-white text-black"
                        : "text-white/62 hover:bg-white/6 hover:text-white",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="order-2 flex flex-wrap items-center justify-end gap-2 sm:gap-3 lg:order-3 lg:justify-end">
              {balance <= 1 && (
                <button
                  onClick={clearCommonState}
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-[#00f83a]/30 px-3 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-[#8effb2] transition-colors duration-300 hover:bg-[#00f83a]/10 sm:text-xs sm:tracking-[0.24em]"
                >
                  <IconRefresh className="h-4 w-4" />
                  Reset credit
                </button>
              )}

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-white/80">
                <IconCurrencyDollar className="h-4 w-4 text-[#00f83a]" />
                <span className="hidden text-[0.68rem] uppercase tracking-[0.24em] text-white/44 md:block">
                  Balance
                </span>

                {isEditing ? (
                  <input
                    autoFocus
                    type="number"
                    min="0"
                    step="0.01"
                    value={editValue}
                    onBlur={handleSaveBalance}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    className="w-24 bg-transparent text-right text-sm font-medium text-white outline-none placeholder:text-white/30 sm:text-base"
                  />
                ) : (
                  <span className="min-w-[4.5rem] text-right text-sm font-medium text-white sm:text-base">
                    {balance.toFixed(2)}
                  </span>
                )}

                <button
                  type="button"
                  onClick={isEditing ? handleSaveBalance : handleEditClick}
                  aria-label={isEditing ? "Save balance" : "Edit balance"}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[#8effb2] transition-colors duration-300 hover:bg-white/8"
                >
                  {isEditing ? <IconCheck className="h-4 w-4" /> : <IconPencil className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
