import { Bomb, Coins, Divide, Gem } from "lucide-react";
import React, { useEffect, useRef } from "react";

export interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  result: "win" | "lose" | null; // Indicates if the user won or lost
  amount?: number; // Amount of money won or lost (optional)
  multiplier?: number;
}

export default function Modal({
  isOpen,
  closeModal,
  result,
  amount,
  multiplier,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  let modalContent = null;

  // Determine modal content based on result
  switch (result) {
    case "win":
      modalContent = (
        <div
          ref={modalRef}
          className="modal relative bg-[#1e2a30] p-6 border-4 border-success shadow-2xl rounded-xl transform transition-all duration-300 hover:scale-105 w-48"
        >
          <div className="flex justify-center">
            <span className="text-success text-3xl font-bold">
              {multiplier}x
            </span>
          </div>

          <div className="h-0.5 w-24 bg-gray-500 mx-auto my-2"></div>

          <div className="flex justify-center items-center gap-1">
            <span className="text-success text-xl font-semibold flex flex-row gap-2">
              <Coins className="w-6 h-6" /> {amount?.toFixed(2)}
            </span>
          </div>
        </div>
      );
      break;
    case "lose":
      modalContent = (
        <div
          ref={modalRef}
          className="modal relative bg-gradient-to-br from-red-900 to-black p-8 border-2 border-red-500 shadow-2xl rounded-2xl transform transition-all duration-300 hover:scale-105"
        >
          <div className="modal relative rounded-lg flex flex-col justify-center items-center space-y-4">
            <div className="animate-bounce">
              <Bomb className="w-12 h-12 text-red-400" />
            </div>
            <div className="text-center">
              <span className="text-red-300 text-sm uppercase tracking-wider font-medium">
                You Lost!
              </span>
            </div>
          </div>
        </div>
      );
      break;
    default:
      modalContent = null;
      break;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-lg mx-auto my-6">
        {modalContent}
      </div>
    </div>
  );
}
