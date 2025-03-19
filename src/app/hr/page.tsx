'use client';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HrPageHeader } from '@/components/hr/shared/HrPageHeader';
import { 
  Users, 
  BadgeDollarSign, 
  CalendarDays, 
  Award, 
  ClipboardList, 
  Clock,
  Building,
  GraduationCap,
  LineChart,
  Settings,
  FileBarChart
} from 'lucide-react';

export default function HrPage() {
  const navigate = useNavigate();

  const modules = [
    {
      id: 'dashboard',
      title: 'Dashboard RH',
      description: 'Visão geral e métricas do departamento de RH',
      icon: <LineChart className="h-6 w-6" />,
      href: '/hr/dashboard'
    },
    {
      id: 'employees',
      title: 'Funcionários',
      description: 'Gerenciamento de funcionários e dados pessoais',
      icon: <Users className="h-6 w-6" />,
      href: '/hr/employees'
    },
    {
      id: 'payroll',
      title: 'Folha de Pagamento',
      description: 'Processamento de salários e contracheques',
      icon: <BadgeDollarSign className="h-6 w-6" />,
      href: '/hr/payroll'
    },
    {
      id: 'timeattendance',
      title: 'Ponto e Presença',
      description: 'Registro de ponto e controle de presença',
      icon: <Clock className="h-6 w-6" />,
      href: '/hr/timeattendance'
    },
    {
      id: 'leave',
      title: 'Férias e Ausências',
      description: 'Gerenciamento de férias e licenças',
      icon: <CalendarDays className="h-6 w-6" />,
      href: '/hr/leave'
    },
    {
      id: 'performance',
      title: 'Avaliação de Desempenho',
      description: 'Avaliações e feedback de funcionários',
      icon: <Award className="h-6 w-6" />,
      href: '/hr/performance'
    },
    {
      id: 'recruitment',
      title: 'Recrutamento',
      description: 'Gestão de vagas e processos seletivos',
      icon: <ClipboardList className="h-6 w-6" />,
      href: '/hr/recruitment'
    },
    {
      id: 'training',
      title: 'Treinamentos',
      description: 'Capacitação e desenvolvimento profissional',
      icon: <GraduationCap className="h-6 w-6" />,
      href: '/hr/training'
    },
    {
      id: 'structure',
      title: 'Estrutura Organizacional',
      description: 'Departamentos, cargos e organograma',
      icon: <Building className="h-6 w-6" />,
      href: '/hr/structure'
    },
    {
      id: 'reports',
      title: 'Relatórios',
      description: 'Relatórios e análises de RH',
      icon: <FileBarChart className="h-6 w-6" />,
      href: '/hr/reports'
    },
    {
      id: 'settings',
      title: 'Configurações',
      description: 'Configurações do módulo de RH',
      icon: <Settings className="h-6 w-6" />,
      href: '/hr/settings'
    }
  ];

  const handleNavigate = (href: string) => {
    navigate(href);
  };

  return (
    <div className="flex flex-col space-y-6 p-6">
      <HrPageHeader
        title="Recursos Humanos"
        description="Gerencie todos os aspectos do departamento de RH"
        icon={<Users className="h-6 w-6" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((module) => (
          <Card 
            key={module.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleNavigate(module.href)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{module.title}</CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                {module.icon}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="pt-1">{module.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 