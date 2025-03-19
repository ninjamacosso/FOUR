'use client';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HrPageHeader } from '@/components/hr/shared/HrPageHeader';
import MetricsSection from '@/components/hr/dashboard/MetricsSection';
import QuickAccessCards from '@/components/hr/dashboard/QuickAccessCards';
import RecentActivities from '@/components/hr/dashboard/RecentActivities';
import DepartmentDistribution from '@/components/hr/dashboard/DepartmentDistribution';
import AttendanceOverview from '@/components/hr/dashboard/AttendanceOverview';
import { LineChart, Users, BadgeDollarSign, Clock, UserPlus, UserMinus, Briefcase } from 'lucide-react';

export default function HrDashboard() {
  const navigate = useNavigate();
  
  // Dados para os componentes do dashboard
  const metrics = [
    {
      title: "Total de Funcionários",
      value: "245",
      change: "+5.2%",
      trend: "up" as const,
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Novas Contratações",
      value: "12",
      change: "+33%",
      trend: "up" as const,
      icon: <UserPlus className="h-4 w-4" />,
    },
    {
      title: "Desligamentos",
      value: "4",
      change: "-20%",
      trend: "down" as const,
      icon: <UserMinus className="h-4 w-4" />,
    },
    {
      title: "Folha de Pagamento",
      value: "KZ 24.583.500",
      change: "+3.2%",
      trend: "up" as const,
      icon: <BadgeDollarSign className="h-4 w-4" />,
    },
  ];

  const quickAccessCards = [
    {
      title: "Gestão de Funcionários",
      description: "Cadastro e gestão de funcionários",
      icon: <Users className="h-5 w-5" />,
      link: "/hr/employees",
    },
    {
      title: "Folha de Pagamento",
      description: "Processamento de salários",
      icon: <BadgeDollarSign className="h-5 w-5" />,
      link: "/hr/payroll",
    },
    {
      title: "Ponto e Presença",
      description: "Controle de ponto e frequência",
      icon: <Clock className="h-5 w-5" />,
      link: "/hr/timeattendance",
    },
    {
      title: "Recrutamento",
      description: "Gestão de vagas e candidatos",
      icon: <Briefcase className="h-5 w-5" />,
      link: "/hr/recruitment",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "contratação",
      user: "Maria Silva",
      department: "Desenvolvimento",
      date: "Hoje, 14:30",
    },
    {
      id: 2,
      type: "desligamento",
      user: "João Santos",
      department: "Marketing",
      date: "Hoje, 11:25",
    },
    {
      id: 3,
      type: "promoção",
      user: "Ana Oliveira",
      department: "Vendas",
      date: "Ontem, 15:45",
    },
    {
      id: 4,
      type: "avaliação",
      user: "Carlos Mendes",
      department: "Financeiro",
      date: "Ontem, 10:15",
    },
    {
      id: 5,
      type: "férias",
      user: "Pedro Costa",
      department: "RH",
      date: "19/03/2024",
    },
  ];
  
  const handleLinkClick = (link: string) => {
    navigate(link);
  };

  return (
    <div className="flex flex-col space-y-6 p-6">
      <HrPageHeader
        title="Dashboard RH"
        description="Visão geral e métricas do departamento de Recursos Humanos"
        icon={<LineChart className="h-6 w-6" />}
      />

      <div className="space-y-6">
        {/* Métricas Principais */}
        <MetricsSection metrics={metrics} />

        {/* Cards de Acesso Rápido */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <QuickAccessCards cards={quickAccessCards} onCardClick={handleLinkClick} />
          </div>
          <div className="lg:col-span-1">
            <RecentActivities activities={recentActivities} />
          </div>
        </div>

        {/* Distribuição por Departamento e Presença */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DepartmentDistribution />
          <AttendanceOverview />
        </div>
      </div>
    </div>
  );
} 