"use client";
import BlackjackGame from "./BlackjackGame";
import BlackjackConfig from "./BlackjackConfig";

function BlackjackContainer() {
  return (
    <div className="flex flex-col md:flex-row bg-background gap-4 md:gap-8 p-4 m-4 w-full max-w-6xl mx-auto min-h-[calc(100vh-200px)]">
      <div className="w-full md:w-1/3 bg-primary">
        <BlackjackConfig />
      </div>
      <div className="w-full md:w-2/3">
        <BlackjackGame />
      </div>
    </div>
  );
}

export default BlackjackContainer;
