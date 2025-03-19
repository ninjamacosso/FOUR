import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BadgeDollarSign,
  Users,
  TrendingDown,
  TrendingUp,
  Calendar,
  Clock,
  Calculator,
} from "lucide-react";

interface PayrollSummaryProps {
  data: {
    totalEmployees: number;
    totalGrossSalary: number;
    totalNetSalary: number;
    totalDeductions: number;
    totalBenefits: number;
    averageSalary: number;
    payrollStatus: string;
    currency: string;
    lastProcessed: string;
    paymentDate: string;
  };
  formatCurrency: (value: number) => string;
}

const PayrollSummary: React.FC<PayrollSummaryProps> = ({ data, formatCurrency }) => {
  const metrics = [
    {
      title: "Total de Funcionários",
      value: data.totalEmployees,
      icon: Users,
      description: "Funcionários ativos na folha",
      format: (value: number) => value.toString(),
      trend: "up",
      trendValue: "+2.5%",
    },
    {
      title: "Salário Bruto Total",
      value: data.totalGrossSalary,
      icon: BadgeDollarSign,
      description: "Soma dos salários brutos",
      format: formatCurrency,
      trend: "up",
      trendValue: "+3.2%",
    },
    {
      title: "Salário Líquido Total",
      value: data.totalNetSalary,
      icon: Calculator,
      description: "Soma dos salários líquidos",
      format: formatCurrency,
      trend: "up",
      trendValue: "+3.1%",
    },
    {
      title: "Total de Deduções",
      value: data.totalDeductions,
      icon: TrendingDown,
      description: "Impostos e outras deduções",
      format: formatCurrency,
      trend: "up",
      trendValue: "+2.8%",
    },
    {
      title: "Total de Benefícios",
      value: data.totalBenefits,
      icon: TrendingUp,
      description: "Benefícios e adicionais",
      format: formatCurrency,
      trend: "up",
      trendValue: "+4.2%",
    },
    {
      title: "Salário Médio",
      value: data.averageSalary,
      icon: BadgeDollarSign,
      description: "Média salarial por funcionário",
      format: formatCurrency,
      trend: "up",
      trendValue: "+1.5%",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metric.format(metric.value)}
              </div>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
              <div className={`flex items-center pt-1 text-xs ${
                metric.trend === "up" 
                  ? "text-emerald-500" 
                  : "text-red-500"
              }`}>
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {metric.trendValue} em relação ao mês anterior
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Datas Importantes</CardTitle>
            <CardDescription>
              Próximas datas relevantes para a folha
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Data do Pagamento</span>
              </div>
              <span className="text-sm font-medium">{data.paymentDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Último Processamento</span>
              </div>
              <span className="text-sm font-medium">{data.lastProcessed}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribuição Salarial</CardTitle>
            <CardDescription>
              Faixas salariais dos funcionários
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm mb-1">Até {formatCurrency(100000)}</div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "35%" }} />
                  </div>
                </div>
                <span className="text-sm font-medium ml-4">35%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm mb-1">{formatCurrency(100000)} - {formatCurrency(200000)}</div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "45%" }} />
                  </div>
                </div>
                <span className="text-sm font-medium ml-4">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm mb-1">Acima de {formatCurrency(200000)}</div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "20%" }} />
                  </div>
                </div>
                <span className="text-sm font-medium ml-4">20%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PayrollSummary; 