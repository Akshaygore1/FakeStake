"use client";

import WheelComponent from "./WheelComponent";
import WheelConfig from "./WheelConfig";

export default function WheelContainer() {
  return (
    <div className="flex flex-col md:flex-row bg-background gap-4 md:gap-8 p-4 w-full max-w-6xl mx-auto">
      <div className="w-full md:w-1/3 bg-primary">
        <WheelConfig />
      </div>
      <div className="w-full md:w-2/3">
        <div className="flex justify-center">
          <WheelComponent />
        </div>
      </div>
    </div>
  );
}
