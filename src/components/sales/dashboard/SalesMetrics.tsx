import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  Target,
  BarChart,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  iconBg: string;
}

const MetricCard = ({
  title,
  value,
  change,
  icon,
  iconBg,
}: MetricCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {change && (
              <div className="flex items-center mt-1">
                {change.isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span
                  className={`text-sm ${change.isPositive ? "text-green-500" : "text-red-500"}`}
                >
                  {change.value}
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${iconBg}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

const SalesMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Vendas Totais"
        value="AOA 12,543,000"
        change={{ value: "12.5%", isPositive: true }}
        icon={<ShoppingCart className="h-5 w-5 text-blue-600" />}
        iconBg="bg-blue-100"
      />
      <MetricCard
        title="Novos Clientes"
        value="124"
        change={{ value: "8.2%", isPositive: true }}
        icon={<Users className="h-5 w-5 text-green-600" />}
        iconBg="bg-green-100"
      />
      <MetricCard
        title="Taxa de Conversão"
        value="24.8%"
        change={{ value: "2.1%", isPositive: false }}
        icon={<Target className="h-5 w-5 text-purple-600" />}
        iconBg="bg-purple-100"
      />
      <MetricCard
        title="Ticket Médio"
        value="AOA 85,400"
        change={{ value: "5.3%", isPositive: true }}
        icon={<BarChart className="h-5 w-5 text-amber-600" />}
        iconBg="bg-amber-100"
      />
    </div>
  );
};

export default SalesMetrics;
