import React from "react";
import ConfigForDice from "./ConfigForDice";
import DiceComponent from "./DiceComponent";

function DiceGameContainer() {
  return (
    <div className="flex gap-8">
      <div>
        <ConfigForDice />
      </div>
      <div>
        <DiceComponent />
      </div>
    </div>
  );
}

export default DiceGameContainer;
