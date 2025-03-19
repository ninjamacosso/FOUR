import React, { useState } from "react";
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
import { Separator } from "@/components/ui/separator";
import {
  Users,
  CalendarDays,
  BadgeDollarSign,
  Award,
  FileBarChart,
  BarChart3,
  Settings,
  Home,
  BookOpen,
  Shield,
  Briefcase,
  UserPlus,
  MessageSquare,
  FileText,
  ClipboardCheck,
  Heart,
  Gift,
  Clock,
  Bot,
  MoreHorizontal,
} from "lucide-react";
import EmployeeManagement from "./employee/EmployeeManagement";
import PayrollProcessing from "./payroll/PayrollProcessing";
import LeaveManagement from "./leave/LeaveManagement";
import PerformanceEvaluation from "./performance/PerformanceEvaluation";
import ReportingDashboard from "./reporting/ReportingDashboard";
import MetricsSection from "./dashboard/MetricsSection";
import QuickAccessCards from "./dashboard/QuickAccessCards";
import RecentActivities from "./dashboard/RecentActivities";

// Componentes temporários para os módulos que ainda serão implementados
const HRDashboard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Dashboard de RH</CardTitle>
      <CardDescription>Módulo em desenvolvimento</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Este módulo está sendo implementado.</p>
    </CardContent>
  </Card>
);

const TimeAttendance = () => (
  <Card>
    <CardHeader>
      <CardTitle>Controle de Ponto</CardTitle>
      <CardDescription>Módulo em desenvolvimento</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Este módulo está sendo implementado.</p>
    </CardContent>
  </Card>
);

const PayrollModule = () => (
  <Card>
    <CardHeader>
      <CardTitle>Folha de Pagamento</CardTitle>
      <CardDescription>Módulo em desenvolvimento</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Este módulo está sendo implementado.</p>
    </CardContent>
  </Card>
);

const BenefitsManagement = () => (
  <Card>
    <CardHeader>
      <CardTitle>Gestão de Benefícios</CardTitle>
      <CardDescription>Módulo em desenvolvimento</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Este módulo está sendo implementado.</p>
    </CardContent>
  </Card>
);

const RecruitmentModule = () => (
  <Card>
    <CardHeader>
      <CardTitle>Recrutamento e Seleção</CardTitle>
      <CardDescription>Módulo em desenvolvimento</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Este módulo está sendo implementado.</p>
    </CardContent>
  </Card>
);

const TrainingModule = () => (
  <Card>
    <CardHeader>
      <CardTitle>Treinamento e Desenvolvimento</CardTitle>
      <CardDescription>Módulo em desenvolvimento</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Este módulo está sendo implementado.</p>
    </CardContent>
  </Card>
);

const PerformanceModule = () => (
  <Card>
    <CardHeader>
      <CardTitle>Avaliação de Desempenho</CardTitle>
      <CardDescription>Módulo em desenvolvimento</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Este módulo está sendo implementado.</p>
    </CardContent>
  </Card>
);

const HealthSafetyModule = () => (
  <Card>
    <CardHeader>
      <CardTitle>Saúde e Segurança do Trabalho</CardTitle>
      <CardDescription>Módulo em desenvolvimento</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Este módulo está sendo implementado.</p>
    </CardContent>
  </Card>
);

const JobSalaryModule = () => (
  <Card>
    <CardHeader>
      <CardTitle>Cargos e Salários</CardTitle>
      <CardDescription>Módulo em desenvolvimento</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Este módulo está sendo implementado.</p>
    </CardContent>
  </Card>
);

const EmployeePortal = () => (
  <Card>
    <CardHeader>
      <CardTitle>Portal do Colaborador</CardTitle>
      <CardDescription>Módulo em desenvolvimento</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Este módulo está sendo implementado.</p>
    </CardContent>
  </Card>
);

const HRReports = () => (
  <Card>
    <CardHeader>
      <CardTitle>Relatórios e Análises</CardTitle>
      <CardDescription>Módulo em desenvolvimento</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Este módulo está sendo implementado.</p>
    </CardContent>
  </Card>
);

const ComplianceModule = () => (
  <Card>
    <CardHeader>
      <CardTitle>Conformidade Legal e eSocial</CardTitle>
      <CardDescription>Módulo em desenvolvimento</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Este módulo está sendo implementado.</p>
    </CardContent>
  </Card>
);

const HRModule: React.FC = () => {
  // Estado para controlar a aba ativa
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Função para mudar de aba
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">ERP FOUR - Recursos Humanos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os aspectos de RH com inteligência e automação
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleTabChange("dashboard")}>
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="outline" onClick={() => handleTabChange("settings")}>
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList className="grid grid-cols-7 h-auto p-1">
          <TabsTrigger value="dashboard" className="flex flex-col py-2 h-auto">
            <Home className="h-4 w-4 mb-1" />
            <span className="text-xs">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="employees" className="flex flex-col py-2 h-auto">
            <Users className="h-4 w-4 mb-1" />
            <span className="text-xs">Colaboradores</span>
          </TabsTrigger>
          <TabsTrigger value="timeattendance" className="flex flex-col py-2 h-auto">
            <Clock className="h-4 w-4 mb-1" />
            <span className="text-xs">Ponto</span>
          </TabsTrigger>
          <TabsTrigger value="payroll" className="flex flex-col py-2 h-auto">
            <BadgeDollarSign className="h-4 w-4 mb-1" />
            <span className="text-xs">Folha</span>
          </TabsTrigger>
          <TabsTrigger value="benefits" className="flex flex-col py-2 h-auto">
            <Gift className="h-4 w-4 mb-1" />
            <span className="text-xs">Benefícios</span>
          </TabsTrigger>
          <TabsTrigger value="recruitment" className="flex flex-col py-2 h-auto">
            <UserPlus className="h-4 w-4 mb-1" />
            <span className="text-xs">Recrutamento</span>
          </TabsTrigger>
          <TabsTrigger value="more" className="flex flex-col py-2 h-auto">
            <MoreHorizontal className="h-4 w-4 mb-1" />
            <span className="text-xs">Mais</span>
          </TabsTrigger>
        </TabsList>

        {/* Segunda linha de abas para "Mais" */}
        {activeTab === "more" && (
          <TabsList className="grid grid-cols-7 h-auto p-1 mt-2">
            <TabsTrigger value="training" className="flex flex-col py-2 h-auto">
              <BookOpen className="h-4 w-4 mb-1" />
              <span className="text-xs">Treinamento</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex flex-col py-2 h-auto">
              <Award className="h-4 w-4 mb-1" />
              <span className="text-xs">Desempenho</span>
            </TabsTrigger>
            <TabsTrigger value="health" className="flex flex-col py-2 h-auto">
              <Heart className="h-4 w-4 mb-1" />
              <span className="text-xs">Saúde</span>
            </TabsTrigger>
            <TabsTrigger value="jobsalary" className="flex flex-col py-2 h-auto">
              <Briefcase className="h-4 w-4 mb-1" />
              <span className="text-xs">Cargos</span>
            </TabsTrigger>
            <TabsTrigger value="portal" className="flex flex-col py-2 h-auto">
              <MessageSquare className="h-4 w-4 mb-1" />
              <span className="text-xs">Portal</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex flex-col py-2 h-auto">
              <BarChart3 className="h-4 w-4 mb-1" />
              <span className="text-xs">Relatórios</span>
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex flex-col py-2 h-auto">
              <Shield className="h-4 w-4 mb-1" />
              <span className="text-xs">eSocial</span>
            </TabsTrigger>
          </TabsList>
        )}

        {/* Dashboard */}
        <TabsContent value="dashboard">
          <HRDashboard />
        </TabsContent>

        {/* Colaboradores */}
        <TabsContent value="employees">
          <EmployeeManagement />
        </TabsContent>

        {/* Ponto e Jornada */}
        <TabsContent value="timeattendance">
          <TimeAttendance />
        </TabsContent>

        {/* Folha de Pagamento */}
        <TabsContent value="payroll">
          <PayrollModule />
        </TabsContent>

        {/* Benefícios */}
        <TabsContent value="benefits">
          <BenefitsManagement />
        </TabsContent>

        {/* Recrutamento */}
        <TabsContent value="recruitment">
          <RecruitmentModule />
        </TabsContent>

        {/* Treinamento */}
        <TabsContent value="training">
          <TrainingModule />
        </TabsContent>

        {/* Desempenho */}
        <TabsContent value="performance">
          <PerformanceModule />
        </TabsContent>

        {/* Saúde e Segurança */}
        <TabsContent value="health">
          <HealthSafetyModule />
        </TabsContent>

        {/* Cargos e Salários */}
        <TabsContent value="jobsalary">
          <JobSalaryModule />
        </TabsContent>

        {/* Portal do Colaborador */}
        <TabsContent value="portal">
          <EmployeePortal />
        </TabsContent>

        {/* Relatórios */}
        <TabsContent value="reports">
          <HRReports />
        </TabsContent>

        {/* Compliance e eSocial */}
        <TabsContent value="compliance">
          <ComplianceModule />
        </TabsContent>

        {/* Configurações */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Módulo RH</CardTitle>
              <CardDescription>
                Personalize o módulo de RH de acordo com as necessidades da sua empresa.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Configurações Gerais</h3>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Configurações de Folha de Pagamento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Dia de Pagamento:</span>
                          <span className="font-medium">5</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Tabela IRRF:</span>
                          <span className="font-medium">Atualizada (2023)</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Alíquota INSS:</span>
                          <span className="font-medium">Progressiva</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        Editar Configurações
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Configurações de eSocial</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Certificado Digital:</span>
                          <span className="font-medium">Configurado</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Envio Automático:</span>
                          <span className="font-medium">Ativado</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Validação Prévia:</span>
                          <span className="font-medium">Ativada</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        Editar Configurações
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Integrações</h3>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Financeiro</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <span className="text-sm font-medium text-green-600">Conectado</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        Configurar
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Contabilidade</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <span className="text-sm font-medium text-green-600">Conectado</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        Configurar
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Biometria</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <span className="text-sm font-medium text-yellow-600">Pendente</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        Configurar
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Segurança e Conformidade</h3>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">LGPD</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Conformidade:</span>
                          <span className="text-sm font-medium text-green-600">100%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Criptografia:</span>
                          <span className="text-sm font-medium">Ativada</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Retenção de Dados:</span>
                          <span className="text-sm font-medium">Configurada</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        Configurar
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Autenticação</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">2FA:</span>
                          <span className="text-sm font-medium">Ativado</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Política de Senhas:</span>
                          <span className="text-sm font-medium">Forte</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Logs de Acesso:</span>
                          <span className="text-sm font-medium">Ativados</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        Configurar
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRModule; 