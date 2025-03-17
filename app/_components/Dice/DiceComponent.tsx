import { Slider } from "@/components/ui/slider";

export default function DiceComponent() {
  return (
    <div className="w-full aspect-square bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-8 flex items-center justify-center">
      <div className="p-4 bg-gray-600 rounded-3xl relative">
        <div className="text-4xl p-2 font-bold text-gray-400 bg-gray-900 rounded-lg">
          <div className="w-96">
            <Slider />
          </div>
        </div>
      </div>
    </div>
  );
}
