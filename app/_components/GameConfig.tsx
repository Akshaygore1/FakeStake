"use client";

import { IconCoins } from "@tabler/icons-react";
import React from "react";
import { useCommonStore } from "@/stores/common.store";

export interface ConfigField {
  id: string;
  label: string;
  type: "input" | "select" | "custom";
  value: any;
  onChange: (value: any) => void;
  options?: Array<{ label: string; value: any }>;
  customComponent?: React.ReactNode;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  placeholder?: string;
  extraInfo?: string;
}

export interface ConfigButton {
  id: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
  loadingText?: string;
}

interface GameConfigProps {
  // Bet amount configuration
  betAmount: number;
  onBetAmountChange: (amount: number) => void;
  showBetInput?: boolean;
  betInputDisabled?: boolean;

  // Additional fields for game-specific configuration
  additionalFields?: ConfigField[];

  // Action buttons
  primaryButton?: ConfigButton;
  secondaryButtons?: ConfigButton[];

  // Additional content sections
  additionalContent?: React.ReactNode;

  // Error handling
  error?: string;

  // Custom styling
  className?: string;

  // Game status and special displays
  gameStatus?: string;
  customStatusDisplay?: React.ReactNode;
}

export default function GameConfig({
  betAmount,
  onBetAmountChange,
  showBetInput = true,
  betInputDisabled = false,
  additionalFields = [],
  primaryButton,
  secondaryButtons = [],
  additionalContent,
  error,
  className = "",
  gameStatus,
  customStatusDisplay,
}: GameConfigProps) {
  const { balance } = useCommonStore();
  const [inputValue, setInputValue] = React.useState(betAmount.toString());

  // Update input value when betAmount prop changes
  React.useEffect(() => {
    setInputValue(betAmount.toString());
  }, [betAmount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      onBetAmountChange(numValue);
    }
  };

  const handleHalfBet = () => {
    const newAmount = betAmount / 2;
    onBetAmountChange(newAmount);
    setInputValue(newAmount.toString());
  };

  const handleDoubleBet = () => {
    const newAmount = betAmount * 2;
    if (newAmount <= balance) {
      onBetAmountChange(newAmount);
      setInputValue(newAmount.toString());
    }
  };

  const renderField = (field: ConfigField) => {
    switch (field.type) {
      case "input":
        return (
          <div
            key={field.id}
            className="flex bg-[#1e2a36] rounded-md overflow-hidden"
          >
            <div className="flex-1 flex items-center relative">
              <input
                type="number"
                value={field.value}
                min={field.min}
                max={field.max}
                step={field.step}
                placeholder={field.placeholder}
                onChange={(e) =>
                  field.onChange(parseFloat(e.target.value) || 0)
                }
                disabled={field.disabled}
                className="w-full bg-[#1e2a36] px-3 py-3 outline-none text-white disabled:opacity-50"
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
          </div>
        );

      case "select":
        return (
          <div key={field.id} className="relative">
            <select
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              disabled={field.disabled}
              className="w-full p-3 border border-[#2c3a47] bg-[#1e2a36] text-white rounded-md appearance-none focus:outline-none disabled:opacity-50"
            >
              {field.placeholder && (
                <option value="" disabled>
                  {field.placeholder}
                </option>
              )}
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        );

      case "custom":
        return <div key={field.id}>{field.customComponent}</div>;

      default:
        return null;
    }
  };

  const renderButton = (button: ConfigButton, isPrimary = false) => {
    const baseClasses =
      "w-full py-3 rounded-md font-medium transition-colors disabled:cursor-not-allowed";

    let variantClasses = "";
    switch (button.variant) {
      case "primary":
        variantClasses =
          "bg-success text-black hover:bg-green-700 disabled:bg-gray-600 disabled:text-gray-400";
        break;
      case "secondary":
        variantClasses =
          "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-600 disabled:text-gray-400";
        break;
      case "danger":
        variantClasses =
          "bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-600 disabled:text-gray-400";
        break;
      default:
        variantClasses = isPrimary
          ? "bg-success text-black hover:bg-green-700 disabled:bg-gray-600 disabled:text-gray-400"
          : "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-600 disabled:text-gray-400";
    }

    return (
      <button
        key={button.id}
        onClick={button.onClick}
        disabled={button.disabled || button.loading}
        className={`${baseClasses} ${variantClasses}`}
      >
        {button.loading ? button.loadingText || "Loading..." : button.label}
      </button>
    );
  };

  return (
    <div
      className={`flex flex-col gap-6 p-4 text-white max-w-md mx-auto rounded-lg ${className}`}
    >
      {/* Balance and Bet Amount Header */}
      {showBetInput && (
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-[#b0b9d2]">Bet Amount</span>
            <span className="text-white">Balance: ${balance.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Custom Status Display */}
      {customStatusDisplay}

      {/* Bet Amount Input */}
      {showBetInput && (
        <div className="flex bg-[#1e2a36] rounded-md overflow-hidden">
          <div className="flex-1 flex items-center relative">
            <input
              type="number"
              value={inputValue}
              min={0.01}
              step={0.01}
              onChange={handleInputChange}
              disabled={betInputDisabled}
              className="w-full bg-[#1e2a36] px-3 py-3 outline-none text-white disabled:opacity-50"
              onClick={(e) => e.currentTarget.select()}
            />
            <div className="absolute right-3 pointer-events-none">
              <IconCoins className="w-4 h-4 text-success" />
            </div>
          </div>
          <button
            className="bg-[#1e2a36] px-6 border-l border-[#2c3a47] hover:bg-[#2c3a47] transition-colors text-white disabled:opacity-50"
            onClick={handleHalfBet}
            disabled={!betAmount || betAmount <= 0 || betInputDisabled}
          >
            ½
          </button>
          <button
            className="bg-[#1e2a36] px-6 border-l border-[#2c3a47] hover:bg-[#2c3a47] transition-colors text-white disabled:opacity-50"
            onClick={handleDoubleBet}
            disabled={
              !betAmount ||
              betAmount <= 0 ||
              betAmount * 2 > balance ||
              betInputDisabled
            }
          >
            2×
          </button>
        </div>
      )}

      {/* Additional Fields */}
      {additionalFields.map((field) => (
        <div key={field.id}>
          <div className="flex justify-between mb-2">
            <span className="text-[#b0b9d2]">{field.label}</span>
            {field.extraInfo && (
              <span className="text-[#4cd964]">{field.extraInfo}</span>
            )}
          </div>
          {renderField(field)}
        </div>
      ))}

      {/* Error Display */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Additional Content */}
      {additionalContent}

      {/* Primary Button */}
      {primaryButton && renderButton(primaryButton, true)}

      {/* Secondary Buttons */}
      {secondaryButtons.map((button) => renderButton(button))}
    </div>
  );
}
