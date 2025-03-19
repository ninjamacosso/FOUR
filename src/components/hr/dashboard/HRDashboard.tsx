import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  CalendarDays,
  BadgeDollarSign,
  Award,
  FileBarChart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CircleDollarSign,
  UserCheck,
  UserX,
} from "lucide-react";
import MetricsSection from "./MetricsSection";
import QuickAccessCards from "./QuickAccessCards";
import RecentActivities from "./RecentActivities";
import EmployeeChart from "./EmployeeChart";
import DepartmentDistribution from "./DepartmentDistribution";
import AttendanceOverview from "./AttendanceOverview";

const HRDashboard: React.FC = () => {
  // Dados de exemplo para métricas
  const metrics = [
    {
      title: "Total de Funcionários",
      value: "245",
      change: "+12%",
      trend: "up",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Folha Mensal",
      value: "24.583.500 Kz",
      change: "+3.2%",
      trend: "up",
      icon: <BadgeDollarSign className="h-4 w-4" />,
    },
    {
      title: "Taxa de Retenção",
      value: "92%",
      change: "+2%",
      trend: "up",
      icon: <UserCheck className="h-4 w-4" />,
    },
    {
      title: "Ausências",
      value: "12",
      change: "-3%",
      trend: "down",
      icon: <UserX className="h-4 w-4" />,
    },
  ];

  // Dados para atividades recentes
  const activities = [
    {
      id: 1,
      type: "contratação",
      user: "João Silva",
      department: "Desenvolvimento",
      date: "Hoje, 09:45",
    },
    {
      id: 2,
      type: "promoção",
      user: "Maria Santos",
      department: "Marketing",
      date: "Ontem, 14:30",
    },
    {
      id: 3,
      type: "desligamento",
      user: "Carlos Mendes",
      department: "Financeiro",
      date: "21/03/2023",
    },
    {
      id: 4,
      type: "férias",
      user: "Ana Oliveira",
      department: "RH",
      date: "20/03/2023",
    },
    {
      id: 5,
      type: "avaliação",
      user: "Paulo Costa",
      department: "Vendas",
      date: "19/03/2023",
    },
  ];

  // Dados para acesso rápido
  const quickAccess = [
    {
      title: "Novo Funcionário",
      icon: <UserCheck className="h-8 w-8" />,
      description: "Cadastrar novo colaborador",
      link: "#/employees/new",
    },
    {
      title: "Folha de Pagamento",
      icon: <CircleDollarSign className="h-8 w-8" />,
      description: "Processar folha mensal",
      link: "#/payroll",
    },
    {
      title: "Controle de Ponto",
      icon: <Clock className="h-8 w-8" />,
      description: "Verificar registro de ponto",
      link: "#/timeattendance",
    },
    {
      title: "Relatórios",
      icon: <FileBarChart className="h-8 w-8" />,
      description: "Gerar relatórios de RH",
      link: "#/reports",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard de RH</h2>
        <Button>Atualizar Dados</Button>
      </div>

      {/* Seção de Métricas */}
      <MetricsSection metrics={metrics} />

      {/* Cards de Acesso Rápido */}
      <QuickAccessCards cards={quickAccess} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráficos e Análises */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Contratações</CardTitle>
            <CardDescription>Últimos 12 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <EmployeeChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Departamento</CardTitle>
            <CardDescription>Funcionários ativos</CardDescription>
          </CardHeader>
          <CardContent>
            <DepartmentDistribution />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visão Geral de Presença</CardTitle>
          <CardDescription>Resumo semanal</CardDescription>
        </CardHeader>
        <CardContent>
          <AttendanceOverview />
        </CardContent>
      </Card>

      {/* Atividades Recentes */}
      <RecentActivities activities={activities} />
    </div>
  );
};

export default HRDashboard; 