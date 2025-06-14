import { cn } from "@/lib/utils";
import React from "react";

interface WrapperProps {
  className?: string;
  children?: React.ReactNode;
}
export const Wrapper = (props: WrapperProps) => {
  return (
    <div
      className={`${cn(
        props.className
      )} h-full max-w-7xl mx-auto px-10 sm:px-0`}
    >
      {props.children}
    </div>
  );
};
