import { TrendingUpDown, type LucideIcon } from "lucide-react";
import { Card } from "./base-card";
import type { ReactNode } from "react";

interface CardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: ReactNode;
}
export function StatsCard({ title, value, icon: Icon, trend }: CardProps) {
  return (
    <Card className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold  mt-2">{value}</p>
        {trend && (
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <TrendingUpDown className="w-4 h-4 mr-1" />
            {trend}
          </p>
        )}
      </div>
      <div className="bg-blue-50 p-3 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
    </div>
    </Card>
  )
}
