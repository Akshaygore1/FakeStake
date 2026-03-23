"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-success">
      <SliderPrimitive.Range className="absolute h-full bg-red-600" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="relative flex flex-col justify-center items-center w-6 h-6 bg-gray-400 border border-primary/50 shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
      <div className="w-3 h-[2px] bg-primary/50 mb-[3px]"></div>
      <div className="w-3 h-[2px] bg-primary/50 mb-[3px]"></div>
      <div className="w-3 h-[2px] bg-primary/50"></div>
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
