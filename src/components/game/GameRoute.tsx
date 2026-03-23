import type { ReactNode } from "react";
import { SEO, type SEOProps } from "@/lib/seo";
import GamePage from "@/components/game/GamePage";

interface GameRouteProps {
  seo: SEOProps;
  children: ReactNode;
  className?: string;
}

export default function GameRoute({
  seo,
  children,
  className,
}: GameRouteProps) {
  return (
    <>
      <SEO {...seo} />
      <GamePage className={className}>{children}</GamePage>
    </>
  );
}
