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

// Importação dos submódulos
import EmployeeManagement from "./employee/EmployeeManagement";
import EmployeeOnboarding from "./employee/EmployeeOnboarding";
import HRModuleDocumentation from "./documentation/HRModuleDocumentation";
import HRNinjaDashboard from "./dashboard/HRNinjaDashboard";

// Componentes temporários para os módulos que ainda serão implementados
const TimeAttendanceNinja = () => (
  <Card>
    <CardHeader>
      <CardTitle>Ponto e Jornada</CardTitle>
      <CardDescription>Módulo em desenvolvimento</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Este módulo está sendo implementado.</p>
    </CardContent>
  </Card>
);

const PayrollNinja = () => (
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

const BenefitsNinja = () => (
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

const RecruitmentNinja = () => (
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

const TrainingNinja = () => (
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

const PerformanceNinja = () => (
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

const HealthSafetyNinja = () => (
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

const JobSalaryNinja = () => (
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

const EmployeePortalNinja = () => (
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

const HRReportsNinja = () => (
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

const ComplianceNinja = () => (
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

const HRNinjaModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Resetar o estado de onboarding ao mudar de aba
    setShowOnboarding(false);
  };

  // Função para iniciar o processo de onboarding
  const handleStartOnboarding = () => {
    setShowOnboarding(true);
  };

  // Função para finalizar o onboarding
  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  // Função para cancelar o onboarding
  const handleOnboardingCancel = () => {
    setShowOnboarding(false);
  };

  // Renderizar o conteúdo da aba de funcionários
  const renderEmployeeContent = () => {
    if (showOnboarding) {
      return (
        <EmployeeOnboarding
          onComplete={handleOnboardingComplete}
          onCancel={handleOnboardingCancel}
        />
      );
    }
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Gestão de Funcionários</h2>
          <Button onClick={handleStartOnboarding}>
            <UserPlus className="mr-2 h-4 w-4" />
            Novo Funcionário
          </Button>
        </div>
        <EmployeeManagement />
      </div>
    );
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Recursos Humanos</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </Button>
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-6 md:grid-cols-12 h-auto">
            <TabsTrigger value="dashboard" className="flex flex-col h-auto py-2">
              <Home className="h-4 w-4 mb-1" />
              <span className="text-xs">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex flex-col h-auto py-2">
              <Users className="h-4 w-4 mb-1" />
              <span className="text-xs">Funcionários</span>
            </TabsTrigger>
            <TabsTrigger value="timeattendance" className="flex flex-col h-auto py-2">
              <Clock className="h-4 w-4 mb-1" />
              <span className="text-xs">Ponto</span>
            </TabsTrigger>
            <TabsTrigger value="payroll" className="flex flex-col h-auto py-2">
              <BadgeDollarSign className="h-4 w-4 mb-1" />
              <span className="text-xs">Folha</span>
            </TabsTrigger>
            <TabsTrigger value="benefits" className="flex flex-col h-auto py-2">
              <Gift className="h-4 w-4 mb-1" />
              <span className="text-xs">Benefícios</span>
            </TabsTrigger>
            <TabsTrigger value="recruitment" className="flex flex-col h-auto py-2">
              <UserPlus className="h-4 w-4 mb-1" />
              <span className="text-xs">Recrutamento</span>
            </TabsTrigger>
            <TabsTrigger value="training" className="flex flex-col h-auto py-2">
              <BookOpen className="h-4 w-4 mb-1" />
              <span className="text-xs">Treinamento</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex flex-col h-auto py-2">
              <Award className="h-4 w-4 mb-1" />
              <span className="text-xs">Desempenho</span>
            </TabsTrigger>
            <TabsTrigger value="health" className="flex flex-col h-auto py-2">
              <Heart className="h-4 w-4 mb-1" />
              <span className="text-xs">Saúde</span>
            </TabsTrigger>
            <TabsTrigger value="jobsalary" className="flex flex-col h-auto py-2">
              <Briefcase className="h-4 w-4 mb-1" />
              <span className="text-xs">Cargos</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex flex-col h-auto py-2">
              <BarChart3 className="h-4 w-4 mb-1" />
              <span className="text-xs">Relatórios</span>
            </TabsTrigger>
            <TabsTrigger value="documentation" className="flex flex-col h-auto py-2">
              <FileText className="h-4 w-4 mb-1" />
              <span className="text-xs">Documentação</span>
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

          <TabsContent value="dashboard" className="mt-6">
            <HRNinjaDashboard />
          </TabsContent>
          <TabsContent value="employees" className="mt-6">
            {renderEmployeeContent()}
          </TabsContent>
          <TabsContent value="timeattendance">
            <TimeAttendanceNinja />
          </TabsContent>
          <TabsContent value="payroll">
            <PayrollNinja />
          </TabsContent>
          <TabsContent value="benefits">
            <BenefitsNinja />
          </TabsContent>
          <TabsContent value="recruitment">
            <RecruitmentNinja />
          </TabsContent>
          <TabsContent value="training">
            <TrainingNinja />
          </TabsContent>
          <TabsContent value="performance">
            <PerformanceNinja />
          </TabsContent>
          <TabsContent value="health">
            <HealthSafetyNinja />
          </TabsContent>
          <TabsContent value="jobsalary">
            <JobSalaryNinja />
          </TabsContent>
          <TabsContent value="portal">
            <EmployeePortalNinja />
          </TabsContent>
          <TabsContent value="reports">
            <HRReportsNinja />
          </TabsContent>
          <TabsContent value="documentation">
            <HRModuleDocumentation />
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Módulo RH Ninja</CardTitle>
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
    </div>
  );
};

export default HRNinjaModule; 