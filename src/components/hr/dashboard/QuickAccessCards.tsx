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
  FileText,
  UserPlus,
  Clock,
  Briefcase,
} from "lucide-react";

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const QuickAccessCard = ({
  title = "Card Title",
  description = "Card description goes here",
  icon = <FileText />,
  onClick = () => {},
}: QuickAccessCardProps) => {
  return (
    <Card
      className="bg-white/10 backdrop-blur-sm border-0 hover:bg-white/20 transition-all cursor-pointer shadow-lg hover:shadow-xl text-white rounded-xl"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-white">{title}</CardTitle>
          <div className="text-blue-400 h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-blue-200">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-300 hover:text-white hover:bg-blue-600/30"
        >
          Acessar
        </Button>
      </CardFooter>
    </Card>
  );
};

interface QuickAccessCardsProps {
  cards?: QuickAccessCardProps[];
}

const QuickAccessCards = ({ cards }: QuickAccessCardsProps) => {
  const defaultCards: QuickAccessCardProps[] = [
    {
      title: "Gestão de Funcionários",
      description:
        "Visualize e gerencie informações, contratos e documentos de funcionários",
      icon: <Users className="h-6 w-6" />,
      onClick: () => console.log("Navigate to Employee Management"),
    },
    {
      title: "Gestão de Ausências",
      description:
        "Acompanhe férias, dias de doença e aprove solicitações de ausência",
      icon: <CalendarDays className="h-6 w-6" />,
      onClick: () => console.log("Navigate to Leave Management"),
    },
    {
      title: "Processamento de Folha",
      description:
        "Processe a folha de pagamento com conformidade fiscal angolana",
      icon: <BadgeDollarSign className="h-6 w-6" />,
      onClick: () => console.log("Navigate to Payroll Processing"),
    },
    {
      title: "Avaliação de Desempenho",
      description: "Gerencie ciclos de avaliação e progressão de carreira",
      icon: <Award className="h-6 w-6" />,
      onClick: () => console.log("Navigate to Performance Evaluation"),
    },
    {
      title: "Painel de Relatórios",
      description: "Gere e exporte relatórios de RH para conformidade",
      icon: <FileBarChart className="h-6 w-6" />,
      onClick: () => console.log("Navigate to Reporting Dashboard"),
    },
    {
      title: "Integração de Novos Funcionários",
      description: "Simplifique o processo de integração de novos funcionários",
      icon: <UserPlus className="h-6 w-6" />,
      onClick: () => console.log("Navigate to New Hire Onboarding"),
    },
    {
      title: "Controle de Presença",
      description: "Monitore a presença dos funcionários e horas trabalhadas",
      icon: <Clock className="h-6 w-6" />,
      onClick: () => console.log("Navigate to Attendance Tracking"),
    },
    {
      title: "Cargos e Funções",
      description: "Gerencie cargos e estrutura organizacional",
      icon: <Briefcase className="h-6 w-6" />,
      onClick: () => console.log("Navigate to Job Positions"),
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="w-full bg-gradient-to-br from-gray-900/90 to-blue-900/90 p-6 rounded-xl shadow-xl border border-blue-800/30">
      <h2 className="text-2xl font-bold mb-6 text-white">Acesso Rápido</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayCards.map((card, index) => (
          <QuickAccessCard
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
            onClick={card.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickAccessCards;
