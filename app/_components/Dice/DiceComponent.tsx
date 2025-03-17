import { Button } from "@/components/ui/button";
import CustomSlider from "./DiceSlider";

export default function DiceComponent() {
  return (
    <div className="w-full aspect-square bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-8 flex items-center justify-center">
      <div className="text-4xl font-bold text-gray-400">
        <div className="w-96">
          {/* <CustomSlider />
           */}
        </div>
      </div>
    </div>
  );
}
