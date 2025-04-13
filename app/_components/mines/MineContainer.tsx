import ConfigComponent from "./ConfigComponent";
import GridComponent from "./GridComponent";

export default function MineContainer() {
  return (
    <div className="flex flex-col md:flex-row w-full bg-[#0f1923] text-white">
      <div className="w-full md:w-[380px] p-6 bg-[#1a2530] border-r border-gray-800">
        <ConfigComponent />
      </div>
      <div className="flex-1 flex flex-col p-4">
        <GridComponent />
      </div>
    </div>
  );
}
