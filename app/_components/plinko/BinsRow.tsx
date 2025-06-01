import PlinkoEngine from "./plinkoEngine";
import { binColorsByRowCount, binPayouts, RowCount } from "./utils";

type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export default function BinsRow({
  rowCount,
  riskLevel,
  binsWidth,
}: {
  rowCount: RowCount;
  riskLevel: RiskLevel;
  binsWidth: number;
}) {
  const payouts = binPayouts[rowCount][riskLevel];
  const colors = binColorsByRowCount?.[rowCount] || {
    background: [],
    shadow: [],
  };

  return (
    <div className="flex w-full justify-center lg:h-7">
      <div className="flex gap-[1%]" style={{ width: `${binsWidth * 100}%` }}>
        {payouts.map((payout, binIndex) => (
          <div
            key={binIndex}
            className="flex min-w-0 flex-1 items-center justify-center rounded-xs text-[clamp(6px,2.784px+0.87vw,8px)] font-bold text-gray-950 shadow-[0_2px_var(--shadow-color)] lg:rounded-md lg:text-[clamp(10px,-16.944px+2.632vw,12px)] lg:shadow-[0_3px_var(--shadow-color)]"
            style={{
              backgroundColor: colors.background[binIndex],
            }}
          >
            {payout}
            {payout < 100 ? "×" : ""}
          </div>
        ))}
      </div>
    </div>
  );
}
