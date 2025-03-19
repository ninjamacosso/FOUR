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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  CalendarDays,
  BadgeDollarSign,
  Award,
  FileBarChart,
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Clock,
  UserPlus,
  UserMinus,
  Briefcase,
  Heart,
  Bot,
  Calendar,
  CheckCircle,
  XCircle,
  FileText,
  Zap,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  DollarSign,
  CheckCircle2,
} from "lucide-react";

// Componente de Cartão de Métrica
interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "blue" | "green" | "red" | "yellow" | "purple";
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  color = "blue",
}) => {
  const colorClasses = {
    blue: "bg-blue-500/10 text-blue-500",
    green: "bg-green-500/10 text-green-500",
    red: "bg-red-500/10 text-red-500",
    yellow: "bg-yellow-500/10 text-yellow-500",
    purple: "bg-purple-500/10 text-purple-500",
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-full ${colorClasses[color]}`}>{icon}</div>
          {trend && (
            <Badge
              variant={trend.isPositive ? "default" : "destructive"}
              className="gap-1 font-medium"
            >
              {trend.isPositive ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />}
              {trend.value}%
            </Badge>
          )}
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm font-medium mt-1 text-muted-foreground">{description}</div>
        </div>
        <div className="mt-3">
          <div className="text-sm font-medium">{title}</div>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente de Cartão de Alerta
interface AlertCardProps {
  title: string;
  count: number;
  items: Array<{
    id: string;
    name: string;
    description: string;
    date?: string;
    status?: string;
  }>;
  icon: React.ReactNode;
  color: "blue" | "green" | "red" | "yellow" | "purple";
}

const AlertCard: React.FC<AlertCardProps> = ({ title, count, items, icon, color }) => {
  const colorClasses = {
    blue: "bg-blue-500/10 text-blue-500",
    green: "bg-green-500/10 text-green-500",
    red: "bg-red-500/10 text-red-500",
    yellow: "bg-yellow-500/10 text-yellow-500",
    purple: "bg-purple-500/10 text-purple-500",
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-full ${colorClasses[color]}`}>{icon}</div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge variant="outline">{count}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-start space-x-3">
              <div className="bg-muted rounded-full p-1.5">
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
              <div className="space-y-1">
                <div className="font-medium text-sm">{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.description}</div>
                {item.date && (
                  <div className="text-xs text-muted-foreground/80">{item.date}</div>
                )}
                {item.status && (
                  <Badge variant="outline" className="text-xs">
                    {item.status}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-1">
        <Button variant="outline" size="sm" className="w-full">
          Ver todas
        </Button>
      </CardFooter>
    </Card>
  );
};

// Componente de Cartão de Atividade Recente
interface ActivityCardProps {
  activities: Array<{
    id: string;
    user: {
      name: string;
      avatar?: string;
      initials: string;
    };
    action: string;
    target: string;
    date: string;
    icon: React.ReactNode;
  }>;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activities }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
        <CardDescription>Últimas ações realizadas no sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{activity.user.name}</span>
                  <span className="text-muted-foreground">{activity.action}</span>
                  <span className="font-medium">{activity.target}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  {activity.icon}
                  <span className="ml-1">{activity.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          Ver todas as atividades
        </Button>
      </CardFooter>
    </Card>
  );
};

// Componente de Cartão de Aniversariantes e Admissões
interface CelebrationsCardProps {
  birthdays: Array<{
    id: string;
    name: string;
    date: string;
    department: string;
    avatar?: string;
    initials: string;
  }>;
  anniversaries: Array<{
    id: string;
    name: string;
    years: number;
    date: string;
    department: string;
    avatar?: string;
    initials: string;
  }>;
}

const CelebrationsCard: React.FC<CelebrationsCardProps> = ({ birthdays, anniversaries }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Celebrações</CardTitle>
        <CardDescription>Aniversários e datas importantes</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="birthdays">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="birthdays">Aniversários</TabsTrigger>
            <TabsTrigger value="anniversaries">Tempo de Casa</TabsTrigger>
          </TabsList>
          <TabsContent value="birthdays" className="mt-4 space-y-3">
            {birthdays.map((person) => (
              <div key={person.id} className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback>{person.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{person.name}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {person.date} • {person.department}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="anniversaries" className="mt-4 space-y-3">
            {anniversaries.map((person) => (
              <div key={person.id} className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback>{person.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">
                    {person.name}{" "}
                    <Badge variant="outline">{person.years} {person.years === 1 ? "ano" : "anos"}</Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Briefcase className="mr-1 h-3 w-3" />
                    {person.date} • {person.department}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Componente de Cartão de Vagas Abertas
interface OpenPositionsCardProps {
  positions: Array<{
    id: string;
    title: string;
    department: string;
    applications: number;
    deadline: string;
    status: "Nova" | "Em Andamento" | "Urgente";
  }>;
}

// Define a type for the position
type Position = {
  id: string;
  title: string;
  department: string;
  applications: number;
  deadline: string;
  status: "Nova" | "Em Andamento" | "Urgente";
};

const OpenPositionsCard: React.FC<OpenPositionsCardProps> = ({ positions }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Vagas Abertas</CardTitle>
        <CardDescription>Processos seletivos em andamento</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {positions.map((position) => (
            <div key={position.id} className="border rounded-md p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{position.title}</h4>
                  <p className="text-xs text-muted-foreground">{position.department}</p>
                </div>
                <Badge
                  variant={
                    position.status === "Urgente"
                      ? "destructive"
                      : position.status === "Nova"
                      ? "default"
                      : "outline"
                  }
                >
                  {position.status}
                </Badge>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {position.applications} candidatos
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Prazo: {position.deadline}
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <Button variant="outline" size="sm" className="w-full">
                  Ver detalhes
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Componente de Cartão de Assistente IA
const AIAssistantCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Assistente RH</CardTitle>
        <CardDescription>
          Inteligência artificial para apoio em decisões
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="font-medium text-sm">Tendências Identificadas</div>
          <div className="space-y-2">
            <div className="flex items-start p-2 border rounded-md">
              <TrendingUp className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
              <div className="text-xs">
                As taxas de retenção aumentaram 12% após a implementação do novo programa de benefícios
              </div>
            </div>
            <div className="flex items-start p-2 border rounded-md">
              <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
              <div className="text-xs">
                Aumento de 8% nas faltas no departamento de Operações. Recomendamos uma análise de causa raiz.
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="font-medium text-sm">O que posso fazer por você?</div>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="justify-start">
              <FileBarChart className="h-3 w-3 mr-2" />
              Gerar relatório de turnover
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Zap className="h-3 w-3 mr-2" />
              Sugestões de ação
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            Fazer uma pergunta
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente principal do Dashboard
const HRNinjaDashboard: React.FC = () => {
  // Dados simulados para o dashboard
  const metricsData = {
    totalEmployees: {
      value: 247,
      trend: { value: 5.2, isPositive: true },
      description: "Total de colaboradores ativos",
    },
    turnover: {
      value: "3.2%",
      trend: { value: 0.8, isPositive: false },
      description: "Taxa de turnover mensal",
    },
    averageSalary: {
      value: "AOA 582.400",
      trend: { value: 2.1, isPositive: true },
      description: "Salário médio",
    },
    openPositions: {
      value: 12,
      trend: { value: 33.3, isPositive: true },
      description: "Vagas em aberto",
    },
    timeToHire: {
      value: "18 dias",
      trend: { value: 5.5, isPositive: true },
      description: "Tempo médio de contratação",
    },
    trainingCompletion: {
      value: "87%",
      trend: { value: 4.2, isPositive: true },
      description: "Taxa de conclusão de treinamentos",
    },
  };

  const pendingApprovals = {
    items: [
      {
        id: "1",
        name: "Férias - Carlos Silva",
        description: "15/06/2023 a 30/06/2023",
        date: "Solicitado em 01/05/2023",
        status: "Pendente",
      },
      {
        id: "2",
        name: "Hora Extra - Equipe de TI",
        description: "Projeto de migração de sistemas",
        date: "Solicitado em 28/04/2023",
        status: "Pendente",
      },
      {
        id: "3",
        name: "Reembolso - Ana Oliveira",
        description: "Despesas de viagem - AOA 125.000",
        date: "Solicitado em 27/04/2023",
        status: "Pendente",
      },
      {
        id: "4",
        name: "Promoção - Pedro Santos",
        description: "Analista Júnior para Pleno",
        date: "Solicitado em 25/04/2023",
        status: "Pendente",
      },
    ],
  };

  const upcomingDeadlines = {
    items: [
      {
        id: "1",
        name: "Fechamento da Folha",
        description: "Prazo final para ajustes",
        date: "Vence em 2 dias",
      },
      {
        id: "2",
        name: "Entrega IRT (Imposto)",
        description: "Remuneração de trabalhadores",
        date: "Vence em 5 dias",
      },
      {
        id: "3",
        name: "Avaliações de Desempenho",
        description: "1º semestre",
        date: "Vence em 10 dias",
      },
      {
        id: "4",
        name: "Renovação de Contratos",
        description: "5 colaboradores",
        date: "Vence em 15 dias",
      },
    ],
  };

  const recentActivities = [
    {
      id: "1",
      user: {
        name: "Marcos Barbosa",
        initials: "MB",
      },
      action: "contratou",
      target: "Juliana Costa",
      date: "Há 2 horas",
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    },
    {
      id: "2",
      user: {
        name: "Sofia Santos",
        initials: "SS",
      },
      action: "aprovou férias de",
      target: "Ricardo Fernandes",
      date: "Há 3 horas",
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    },
    {
      id: "3",
      user: {
        name: "Luís António",
        initials: "LA",
      },
      action: "atualizou perfil de",
      target: "Maria Teixeira",
      date: "Há 4 horas",
      icon: <CheckCircle className="h-4 w-4 text-blue-500" />,
    },
    {
      id: "4",
      user: {
        name: "Catarina Silva",
        initials: "CS",
      },
      action: "rejeitou pedido de",
      target: "Amanda Oliveira",
      date: "Há 5 horas",
      icon: <XCircle className="h-4 w-4 text-red-500" />,
    },
  ];

  const birthdays = [
    {
      id: "1",
      name: "Fernanda Lima",
      date: "05/05",
      department: "Marketing",
      initials: "FL",
    },
    {
      id: "2",
      name: "Ricardo Gomes",
      date: "12/05",
      department: "Tecnologia",
      initials: "RG",
    },
    {
      id: "3",
      name: "Juliana Martins",
      date: "18/05",
      department: "Financeiro",
      initials: "JM",
    },
  ];

  const anniversaries = [
    {
      id: "1",
      name: "Carlos Eduardo",
      years: 5,
      date: "03/05",
      department: "Vendas",
      initials: "CE",
    },
    {
      id: "2",
      name: "Patricia Souza",
      years: 3,
      date: "15/05",
      department: "RH",
      initials: "PS",
    },
    {
      id: "3",
      name: "Marcos Oliveira",
      years: 10,
      date: "22/05",
      department: "Operações",
      initials: "MO",
    },
  ];

  const openPositions: Position[] = [
    {
      id: "1",
      title: "Desenvolvedor Full Stack",
      department: "Tecnologia",
      applications: 18,
      deadline: "15/05",
      status: "Urgente",
    },
    {
      id: "2",
      title: "Analista de Marketing Digital",
      department: "Marketing",
      applications: 12,
      deadline: "20/05",
      status: "Em Andamento",
    },
    {
      id: "3",
      title: "Assistente Administrativo",
      department: "Administrativo",
      applications: 24,
      deadline: "25/05",
      status: "Nova",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total de Colaboradores"
          value={metricsData.totalEmployees.value}
          description={metricsData.totalEmployees.description}
          icon={<Users className="h-5 w-5" />}
          trend={metricsData.totalEmployees.trend}
          color="blue"
        />
        <MetricCard
          title="Taxa de Turnover"
          value={metricsData.turnover.value}
          description={metricsData.turnover.description}
          icon={<UserMinus className="h-5 w-5" />}
          trend={metricsData.turnover.trend}
          color="red"
        />
        <MetricCard
          title="Salário Médio"
          value={metricsData.averageSalary.value}
          description={metricsData.averageSalary.description}
          icon={<DollarSign className="h-5 w-5" />}
          trend={metricsData.averageSalary.trend}
          color="green"
        />
      </div>

      {/* Painéis de Alertas e Atividades */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AlertCard
              title="Aprovações Pendentes"
              count={pendingApprovals.items.length}
              items={pendingApprovals.items}
              icon={<Clock className="h-5 w-5" />}
              color="yellow"
            />
            <AlertCard
              title="Prazos Importantes"
              count={upcomingDeadlines.items.length}
              items={upcomingDeadlines.items}
              icon={<AlertCircle className="h-5 w-5" />}
              color="red"
            />
          </div>
          <ActivityCard activities={recentActivities} />
        </div>
        <div className="space-y-6">
          <AIAssistantCard />
          <CelebrationsCard birthdays={birthdays} anniversaries={anniversaries} />
        </div>
      </div>

      {/* Vagas e Recrutamento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <OpenPositionsCard positions={openPositions} />
        </div>
        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Indicadores de Recrutamento</CardTitle>
              <CardDescription>Desempenho do mês atual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Vagas Preenchidas</span>
                  <span className="text-sm font-medium">8/12</span>
                </div>
                <Progress value={66.7} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Candidatos Qualificados</span>
                  <span className="text-sm font-medium">72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Vagas com Urgência</span>
                  <span className="text-sm font-medium">3</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Tempo Médio de Contratação</span>
                  <span className="text-sm font-medium">18 dias</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Treinamento e Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Treinamentos em Andamento</CardTitle>
            <CardDescription>Progresso atual dos programas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Integração de Novos Colaboradores</span>
                <span className="text-sm font-medium">12 participantes</span>
              </div>
              <Progress value={75} className="h-2" />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">75% concluído</span>
                <span className="text-xs text-muted-foreground">Término: 15/05</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Excel Avançado</span>
                <span className="text-sm font-medium">24 participantes</span>
              </div>
              <Progress value={50} className="h-2" />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">50% concluído</span>
                <span className="text-xs text-muted-foreground">Término: 22/05</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Liderança e Gestão</span>
                <span className="text-sm font-medium">8 participantes</span>
              </div>
              <Progress value={30} className="h-2" />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">30% concluído</span>
                <span className="text-xs text-muted-foreground">Término: 10/06</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              Ver todos os treinamentos
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Ciclo de Avaliações</CardTitle>
            <CardDescription>Progresso das avaliações de desempenho</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">1º Semestre 2023</span>
                <Badge variant="outline">Em andamento</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Autoavaliações</span>
                  <span className="text-sm">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Avaliação dos Gestores</span>
                  <span className="text-sm">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Calibração</span>
                  <span className="text-sm">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Feedback</span>
                  <span className="text-sm">32%</span>
                </div>
                <Progress value={32} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              Ver detalhes do ciclo
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default HRNinjaDashboard; 