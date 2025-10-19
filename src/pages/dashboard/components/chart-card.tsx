import type { ReactNode } from "react";
import { Card } from "./base-card";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function ChartCard({
  title,
  children,
  className = "",
}: ChartCardProps): JSX.Element {
  return (
    <Card className={`p-6 ${className}`}>
      <h3 className="text-lg font-semibol mb-4">{title}</h3>
      {children}
    </Card>
  );
}
