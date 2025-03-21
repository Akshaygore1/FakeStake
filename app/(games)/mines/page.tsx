import ConfigComponent from "@/app/_components/ConfigComponent";
import GridComponent from "@/app/_components/GridComponent";

export default function Mines() {
  return (
    <main className="flex flex-col h-full">
      {/* Rest of the components in a row with two columns */}
      <div className="flex flex-col lg:flex-row w-full p-4 lg:p-8 flex-1">
        <div className="flex justify-center w-full lg:w-1/3 p-4">
          <ConfigComponent />
        </div>
        <div className="flex justify-center items-center w-full lg:w-2/3 p-4">
          <GridComponent />
        </div>
      </div>
    </main>
  );
}
