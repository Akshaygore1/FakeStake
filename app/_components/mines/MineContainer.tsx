import ConfigComponent from "./ConfigComponent";
import GridComponent from "./GridComponent";

export default function MineContainer() {
  return (
    <div className="flex flex-col md:flex-row w-full bg-background text-white rounded-lg">
      <div className="w-full md:w-[380px] p-6 bg-primary rounded-l-lg border-r border-gray-800">
        <ConfigComponent />
      </div>
      <div className="flex-1 flex flex-col p-4">
        <GridComponent />
      </div>
    </div>
  );
}
