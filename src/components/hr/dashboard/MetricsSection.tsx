import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Metric {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
}

interface MetricsSectionProps {
  metrics: Metric[];
}

const MetricsSection: React.FC<MetricsSectionProps> = ({ metrics = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {metric.title}
                </p>
                <h3 className="text-2xl font-bold">{metric.value}</h3>
              </div>
              <div className="p-2 bg-muted rounded-full">{metric.icon}</div>
            </div>
            <div className="flex items-center mt-4">
              {metric.trend === "up" ? (
                <ArrowUpRight className="h-4 w-4 text-emerald-500 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span
                className={`text-sm font-medium ${
                  metric.trend === "up" ? "text-emerald-500" : "text-red-500"
                }`}
              >
                {metric.change}
              </span>
              <span className="text-xs text-muted-foreground ml-2">vs. mês anterior</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsSection;
