import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className: string
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-lg shadow-sm border  ${className}`}
    >
      {children}
    </div>
  );
}