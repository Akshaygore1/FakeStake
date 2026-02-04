import GamePage from "@/app/_components/GamePage";
import DragonTowerContainer from "./_components/DragonContainer";

export const dynamic = 'force-static';
export const revalidate = false;

export default function Mines() {
  return (
    <GamePage>
      <DragonTowerContainer />
    </GamePage>
  );
}
