"use client";
import { useCommonStore } from "@/stores/common.store";
import { usePlinkoStore } from "@/stores/game/plinko.store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useCallback, useMemo } from "react";
import { RiskLevel, RowCount } from "./utils";
import GameConfig, { ConfigField } from "@/app/_components/GameConfig";

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

  const handleBetAmountChange = useCallback((newValue: number) => {
    setBetAmount(newValue);
    if (newValue > balance) {
      setError("Bet amount cannot exceed your balance");
    } else {
      setError("");
    }
  }, [setBetAmount, balance]);

  const handleDropBall = useCallback(() => {
    // Validate bet amount before proceeding
    if (betAmount <= 0 || betAmount > balance) {
      setError("Invalid bet amount");
      return;
    }

    // Don't deduct balance here - let the engine handle it when the ball is dropped
    dropBall();
  }, [betAmount, balance, dropBall]);

  // Memoize risk level change handler
  const handleRiskLevelChange = useCallback((value: string) => {
    setRiskLevel(value as RiskLevel);
  }, [setRiskLevel]);

  // Memoize row count change handler
  const handleRowCountChange = useCallback((value: string) => {
    setRowCount(parseInt(value) as unknown as RowCount);
  }, [setRowCount]);

  // Memoize the custom select components
  const riskLevelSelect = useMemo(() => (
    <Select value={riskLevel} onValueChange={handleRiskLevelChange}>
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
  ), [riskLevel, handleRiskLevelChange]);

  const rowCountSelect = useMemo(() => (
    <Select value={rowCount.toString()} onValueChange={handleRowCountChange}>
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
  ), [rowCount, handleRowCountChange]);

  // Memoize additional fields for Plinko configuration
  const additionalFields = useMemo<ConfigField[]>(() => [
    {
      id: "riskLevel",
      label: "Risk Level",
      type: "custom",
      value: riskLevel,
      onChange: handleRiskLevelChange,
      customComponent: riskLevelSelect,
    },
    {
      id: "rowCount",
      label: "Row Count",
      type: "custom",
      value: rowCount,
      onChange: handleRowCountChange,
      customComponent: rowCountSelect,
    },
  ], [riskLevel, rowCount, handleRiskLevelChange, handleRowCountChange, riskLevelSelect, rowCountSelect]);

  // Memoize primary button config
  const primaryButton = useMemo(() => ({
    id: "bet",
    label: betAmount > balance ? "Insufficient Balance" : "Bet",
    onClick: handleDropBall,
    disabled: !betAmount || betAmount <= 0 || betAmount > balance,
  }), [betAmount, balance, handleDropBall]);

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
