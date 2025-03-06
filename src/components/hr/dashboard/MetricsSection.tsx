import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  DollarSignIcon,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  color: string;
}

const MetricCard = ({
  title,
  value,
  change,
  icon,
  color = "bg-blue-100",
}: MetricCardProps) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-0 text-white hover:bg-white/20 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-blue-200">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-full ${color}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        {change && (
          <div className="flex items-center mt-1">
            <span
              className={`flex items-center text-xs ${change.isPositive ? "text-green-600" : "text-red-600"}`}
            >
              {change.isPositive ? (
                <ArrowUpIcon className="w-3 h-3 mr-1" />
              ) : (
                <ArrowDownIcon className="w-3 h-3 mr-1" />
              )}
              {change.value}
            </span>
            <span className="text-xs text-blue-200 ml-1">do mês anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface MetricsSectionProps {
  totalEmployees?: {
    count: string;
    change: {
      value: string;
      isPositive: boolean;
    };
  };
  pendingLeaveRequests?: {
    count: string;
    change: {
      value: string;
      isPositive: boolean;
    };
  };
  upcomingEvaluations?: {
    count: string;
  };
  payrollStatus?: {
    status: string;
    dueDate: string;
  };
}

const MetricsSection = ({
  totalEmployees = {
    count: "124",
    change: {
      value: "4%",
      isPositive: true,
    },
  },
  pendingLeaveRequests = {
    count: "8",
    change: {
      value: "12%",
      isPositive: false,
    },
  },
  upcomingEvaluations = {
    count: "12",
  },
  payrollStatus = {
    status: "Due in 5 days",
    dueDate: "28 May",
  },
}: MetricsSectionProps) => {
  return (
    <section className="w-full bg-gradient-to-br from-blue-900/90 to-purple-900/90 p-6 rounded-xl shadow-xl border border-blue-800/30">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Visão Geral do Painel de RH
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total de Funcionários"
          value={totalEmployees.count}
          change={totalEmployees.change}
          icon={<UserIcon className="w-5 h-5 text-blue-600" />}
          color="bg-blue-100"
        />
        <MetricCard
          title="Solicitações de Ausência Pendentes"
          value={pendingLeaveRequests.count}
          change={pendingLeaveRequests.change}
          icon={<CalendarIcon className="w-5 h-5 text-amber-600" />}
          color="bg-amber-100"
        />
        <MetricCard
          title="Avaliações Próximas"
          value={upcomingEvaluations.count}
          icon={<ClockIcon className="w-5 h-5 text-purple-600" />}
          color="bg-purple-100"
        />
        <MetricCard
          title="Status da Folha de Pagamento"
          value={payrollStatus.status}
          icon={<DollarSignIcon className="w-5 h-5 text-green-600" />}
          color="bg-green-100"
        />
      </div>
    </section>
  );
};

export default MetricsSection;
