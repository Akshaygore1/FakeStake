"use client";
import { useCommonStore } from "@/app/_store/commonStore";
import { usePlinkoStore } from "@/app/_store/plinkoStore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { RiskLevel, RowCount } from "./utils";
import GameConfig, { ConfigField } from "../GameConfig";

function PlinkoConfig({ dropBall }: { dropBall: () => void }) {
  const [error, setError] = React.useState<string>("");
  const { balance } = useCommonStore();
  const {
    riskLevel,
    setRiskLevel,
    rowCount,
    setRowCount,
    setBetAmount,
    betAmount,
  } = usePlinkoStore();

  const handleBetAmountChange = (newValue: number) => {
    setBetAmount(newValue);
    if (newValue > balance) {
      setError("Bet amount cannot exceed your balance");
    } else {
      setError("");
    }
  };

  const handleDropBall = () => {
    // Validate bet amount before proceeding
    if (betAmount <= 0 || betAmount > balance) {
      setError("Invalid bet amount");
      return;
    }

    // Don't deduct balance here - let the engine handle it when the ball is dropped
    dropBall();
  };

  // Additional fields for Plinko configuration
  const additionalFields: ConfigField[] = [
    {
      id: "riskLevel",
      label: "Risk Level",
      type: "custom",
      value: riskLevel,
      onChange: (value) => setRiskLevel(value as RiskLevel),
      customComponent: (
        <Select
          value={riskLevel}
          onValueChange={(value) => setRiskLevel(value as RiskLevel)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select risk level" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Risk Level</SelectLabel>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      ),
    },
    {
      id: "rowCount",
      label: "Row Count",
      type: "custom",
      value: rowCount,
      onChange: (value) => setRowCount(parseInt(value) as unknown as RowCount),
      customComponent: (
        <Select
          value={rowCount.toString()}
          onValueChange={(value) =>
            setRowCount(parseInt(value) as unknown as RowCount)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select row count" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Row Count</SelectLabel>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="9">9</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="11">11</SelectItem>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="13">13</SelectItem>
              <SelectItem value="14">14</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="16">16</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      ),
    },
  ];

  const primaryButton = {
    id: "bet",
    label: betAmount > balance ? "Insufficient Balance" : "Bet",
    onClick: handleDropBall,
    disabled: !betAmount || betAmount <= 0 || betAmount > balance,
  };

  return (
    <GameConfig
      betAmount={betAmount}
      onBetAmountChange={handleBetAmountChange}
      additionalFields={additionalFields}
      error={error}
      primaryButton={primaryButton}
    />
  );
}

export default PlinkoConfig;
