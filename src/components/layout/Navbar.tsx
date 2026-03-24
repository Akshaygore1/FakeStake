import {
  IconCheck,
  IconPencil,
  IconRefresh,
} from "@tabler/icons-react";
import { type ChangeEvent, type KeyboardEvent, useState, useRef, useEffect } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isGamesArea = location.pathname === "/games" || gamePaths.has(location.pathname);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (isEditing) {
          setIsEditing(false);
          setEditValue("");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditing]);

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

  const handleReset = () => {
    clearCommonState();
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 px-4 py-5 sm:px-8 sm:py-6">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-medium tracking-[-0.02em] text-white/90 transition-colors duration-200 hover:text-[#00f83a] sm:text-xl"
        >
          FakeStake
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = link.to === "/" ? location.pathname === "/" : isGamesArea;

            return (
              <Link
                key={link.to}
                to={link.to}
                className={[
                  "relative text-sm tracking-wide transition-colors duration-200",
                  isActive
                    ? "text-white"
                    : "text-white/50 hover:text-white/80",
                ].join(" ")}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-white/60" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Balance */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="font-mono text-sm tabular-nums text-white/70 transition-colors duration-200 hover:text-white"
          >
            ${balance.toFixed(2)}
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute right-0 top-full mt-3 min-w-[200px] rounded-lg border border-white/10 bg-black/90 p-3 backdrop-blur-sm">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <span className="text-white/50">$</span>
                  <input
                    autoFocus
                    type="number"
                    min="0"
                    step="0.01"
                    value={editValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    className="flex-1 bg-transparent font-mono text-sm text-white outline-none placeholder:text-white/30"
                    placeholder="0.00"
                  />
                  <button
                    type="button"
                    onClick={handleSaveBalance}
                    className="text-[#00f83a] transition-opacity hover:opacity-70"
                  >
                    <IconCheck className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleEditClick}
                    className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <IconPencil className="h-3.5 w-3.5" />
                    Edit balance
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <IconRefresh className="h-3.5 w-3.5" />
                    Reset to $1000
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
