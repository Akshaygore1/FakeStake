"use client";

import { useDragonStore } from "@/app/_store/dragonStore";

export default function DragonComponent() {
  const { difficulty } = useDragonStore();

  const rows = 9;
  const cols = difficulty === "easy" ? 4 : difficulty === "medium" ? 3 : 2;

  return (
    <div className="flex justify-center h-full items-cente">
      <div className="flex justify-center items-center">
        <div className="flex flex-col w-[500px] gap-2 p-4 max-w-2xl border border-red-500 rounded-lg">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className={`grid grid-cols-${cols} gap-2`}>
              {Array.from({ length: cols }).map((_, colIndex) => (
                <div key={colIndex}>
                  <div
                    key={colIndex}
                    className={`h-12 basis-sm bg-red-700 rounded-lg flex items-center justify-center text-white font-bold`}
                  >
                    {colIndex + 1}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
