"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useRouletteStore } from "@/stores/game/roulette.store";
import { WHEEL_NUMBERS, WHEEL_NUMBERS_AC, getNumberColorClass } from "@/lib/roulette-constants";
import "./Roulette.css";

interface RouletteWheelProps {
  onSpinComplete?: (winningNumber: number) => void;
}

// Animation phase types for better state management
type AnimationPhase = 'idle' | 'spinning' | 'slowing' | 'stopping' | 'stopped';

interface WheelProps {
  animationPhase: AnimationPhase;
  finalDegree: number;
}

const Wheel = React.memo(function Wheel({ animationPhase, finalDegree }: WheelProps) {
  // Determine wheel animation class based on phase
  const getWheelStyle = (): React.CSSProperties => {
    if (animationPhase === 'spinning' || animationPhase === 'slowing') {
      return { animation: 'wheelRotate 5s linear infinite' };
    }
    return { animation: 'none' };
  };

  // Determine ball track animation style based on phase
  const getBallTrackStyle = (): React.CSSProperties => {
    switch (animationPhase) {
      case 'spinning':
        return { animation: 'ballRotate 1s linear infinite' };
      case 'slowing':
        return { animation: 'ballRotate 2s linear infinite' };
      case 'stopping':
        return { 
          animation: `ballStopDynamic 3s linear forwards`,
          // Use CSS custom property for the dynamic degree
          ['--stop-degree' as any]: `-${finalDegree}deg`
        };
      case 'stopped':
        return { 
          transform: `rotate(-${finalDegree}deg)`,
          animation: 'none'
        };
      default:
        return { animation: 'none' };
    }
  };

  return (
    <div className="wheel" style={getWheelStyle()}>
      <div className="outerRim"></div>
      {WHEEL_NUMBERS.map((number, index) => (
        <div key={`wheel-sect-${number}`} id={`sect${index + 1}`} className="sect">
          <span className={number < 10 ? "single" : "double"}>{number}</span>
          <div className="block"></div>
        </div>
      ))}
      <div className="pocketsRim"></div>
      <div className="ballTrack" style={getBallTrackStyle()}>
        <div className="ball"></div>
      </div>
      <div className="pockets"></div>
      <div className="cone"></div>
      <div className="turret"></div>
      <div className="turretHandle">
        <div className="thendOne"></div>
        <div className="thendTwo"></div>
      </div>
    </div>
  );
});

export default function RouletteWheel({ onSpinComplete }: RouletteWheelProps) {
  const { isSpinning, setIsSpinning, setLastWinningNumber } =
    useRouletteStore();

  const [winningNumber, setWinningNumber] = useState<number | null>(null);
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('idle');
  const [finalDegree, setFinalDegree] = useState(0);
  
  // Ref to track active timeouts for cleanup
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  
  // Inject dynamic keyframes for ball stop animation
  useEffect(() => {
    // Create a style element for the dynamic keyframe
    const styleEl = document.createElement('style');
    styleEl.id = 'roulette-dynamic-keyframes';
    styleEl.textContent = `
      @keyframes ballStopDynamic {
        from { transform: rotate(0deg); }
        to { transform: rotate(var(--stop-degree, -362deg)); }
      }
    `;
    
    // Only add if not already present
    if (!document.getElementById('roulette-dynamic-keyframes')) {
      document.head.appendChild(styleEl);
    }
    
    return () => {
      const el = document.getElementById('roulette-dynamic-keyframes');
      if (el) el.remove();
    };
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const spinWheel = useCallback(() => {
    if (isSpinning) return;

    // Clear any existing timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    setIsSpinning(true);
    setWinningNumber(null);

    const randomWinningNumber = Math.floor(Math.random() * 37);
    
    // Calculate the degree for the winning number
    let degree = 0;
    for (let i = 0; i < WHEEL_NUMBERS_AC.length; i++) {
      if (WHEEL_NUMBERS_AC[i] === randomWinningNumber) {
        degree = i * 9.73 + 362;
        break;
      }
    }
    setFinalDegree(degree);
    
    // Start spinning phase
    setAnimationPhase('spinning');
    
    // Schedule phase transitions
    const t1 = setTimeout(() => setAnimationPhase('slowing'), 2000);
    const t2 = setTimeout(() => setAnimationPhase('stopping'), 6000);
    const t3 = setTimeout(() => setAnimationPhase('stopped'), 9000);
    const t4 = setTimeout(() => {
      setWinningNumber(randomWinningNumber);
      setLastWinningNumber(randomWinningNumber);
      setIsSpinning(false);
      onSpinComplete?.(randomWinningNumber);
    }, 10000);
    
    timeoutsRef.current = [t1, t2, t3, t4];
  }, [isSpinning, setIsSpinning, setLastWinningNumber, onSpinComplete]);

  return (
    <div className="container">
      <div id="container">
        <Wheel animationPhase={animationPhase} finalDegree={finalDegree} />
      </div>

      {/* Winning Number Display */}
      {winningNumber !== null && (
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-1">Winning Number</div>
          <div
            className={`text-4xl font-bold ${getNumberColorClass(winningNumber)}`}
          >
            {winningNumber}
          </div>
        </div>
      )}

      {/* Spin Button */}
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className={`px-8 py-3 rounded-lg font-bold text-black transition-all ${
          isSpinning
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-success hover:bg-green-800 hover:scale-105"
        }`}
      >
        {isSpinning ? "Spinning..." : "SPIN"}
      </button>
    </div>
  );
}
