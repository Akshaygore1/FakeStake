import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_URL } from "@/config/site";
import HomePage from "@/pages/home";
import GamesPage from "@/pages/games";
import MinesPage from "@/pages/games/mines";
import PlinkoPage from "@/pages/games/plinko";
import DicePage from "@/pages/games/dice";
import LimboPage from "@/pages/games/limbo";
import FlipPage from "@/pages/games/flip";
import BlackjackPage from "@/pages/games/blackjack";
import RoulettePage from "@/pages/games/roulette";
import DragonTowerPage from "@/pages/games/dragontower";
import SnakePage from "@/pages/games/snake";
import { SEO } from "@/lib/seo";

function NotFoundPage() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 text-center text-white">
      <SEO
        title="Page Not Found | Fake Stake"
        description="The page you requested could not be found on Fake Stake."
        url={`${SITE_URL}/404`}
      />
      <div>
        <h1 className="text-4xl font-semibold">Page not found</h1>
        <p className="mt-3 text-white/70">Try heading back to the games list.</p>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/mines" element={<MinesPage />} />
        <Route path="/plinko" element={<PlinkoPage />} />
        <Route path="/dice" element={<DicePage />} />
        <Route path="/limbo" element={<LimboPage />} />
        <Route path="/flip" element={<FlipPage />} />
        <Route path="/blackjack" element={<BlackjackPage />} />
        <Route path="/roulette" element={<RoulettePage />} />
        <Route path="/dragontower" element={<DragonTowerPage />} />
        <Route path="/snake" element={<SnakePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}
