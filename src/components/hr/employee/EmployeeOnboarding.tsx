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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { departments, positions } from "@/types/hr.types";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FileCheck,
  FileText,
  Loader2,
  Upload,
  User,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Interface para o processo de onboarding
interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  status: "pendente" | "em_andamento" | "concluido";
  category: "documentacao" | "treinamento" | "integracao" | "equipamentos" | "acesso";
  assignedTo: string;
  dueDate: string;
}

interface OnboardingTemplate {
  id: string;
  name: string;
  description: string;
  department: string;
  tasks: OnboardingTask[];
}

interface EmployeeOnboardingProps {
  employeeId?: string;
  onComplete?: () => void;
  onCancel?: () => void;
}

const EmployeeOnboarding: React.FC<EmployeeOnboardingProps> = ({
  employeeId,
  onComplete,
  onCancel,
}) => {
  // Estados
  const [activeTab, setActiveTab] = useState("informacoes");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  // Estado para novo funcionário
  const [newEmployee, setNewEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    join_date: "",
    address: "",
    national_id: "", // BI angolano
    tax_id: "", // NIF angolano
    social_security_number: "", // Número da Segurança Social
    bank_account: "",
    emergency_contact_name: "",
    emergency_contact_relationship: "",
    emergency_contact_phone: "",
  });

  // Templates de onboarding pré-definidos
  const onboardingTemplates: OnboardingTemplate[] = [
    {
      id: "1",
      name: "Onboarding Padrão",
      description: "Processo padrão para novos colaboradores",
      department: "Todos",
      tasks: [
        {
          id: "1",
          title: "Recolher documentação pessoal",
          description: "BI, NIF, comprovante de residência, certificados acadêmicos",
          status: "pendente",
          category: "documentacao",
          assignedTo: "RH",
          dueDate: "Dia 1",
        },
        {
          id: "2",
          title: "Cadastrar no sistema de ponto",
          description: "Configurar biometria e credenciais de acesso",
          status: "pendente",
          category: "acesso",
          assignedTo: "TI",
          dueDate: "Dia 1",
        },
        {
          id: "3",
          title: "Treinamento inicial",
          description: "Apresentação da empresa, valores e procedimentos básicos",
          status: "pendente",
          category: "treinamento",
          assignedTo: "RH",
          dueDate: "Dia 2",
        },
        {
          id: "4",
          title: "Configurar estação de trabalho",
          description: "Preparar computador, telefone e acesso à rede",
          status: "pendente",
          category: "equipamentos",
          assignedTo: "TI",
          dueDate: "Dia 1",
        },
        {
          id: "5",
          title: "Apresentação à equipe",
          description: "Apresentar o novo colaborador aos colegas e gestores",
          status: "pendente",
          category: "integracao",
          assignedTo: "Gestor",
          dueDate: "Dia 2",
        },
        {
          id: "6",
          title: "Abertura de conta bancária",
          description: "Auxiliar na abertura de conta para pagamento de salário (se necessário)",
          status: "pendente",
          category: "documentacao",
          assignedTo: "RH",
          dueDate: "Semana 1",
        },
        {
          id: "7",
          title: "Treinamento específico da função",
          description: "Capacitação nas ferramentas e processos específicos do cargo",
          status: "pendente",
          category: "treinamento",
          assignedTo: "Gestor",
          dueDate: "Semana 1",
        },
      ],
    },
    {
      id: "2",
      name: "Onboarding Tecnologia",
      description: "Processo para equipe de tecnologia",
      department: "Tecnologia",
      tasks: [
        {
          id: "1",
          title: "Recolher documentação pessoal",
          description: "BI, NIF, comprovante de residência, certificados acadêmicos",
          status: "pendente",
          category: "documentacao",
          assignedTo: "RH",
          dueDate: "Dia 1",
        },
        {
          id: "2",
          title: "Configurar acessos aos sistemas",
          description: "Email, GitHub, AWS, sistemas internos",
          status: "pendente",
          category: "acesso",
          assignedTo: "TI",
          dueDate: "Dia 1",
        },
        {
          id: "3",
          title: "Configurar ambiente de desenvolvimento",
          description: "Instalar IDEs, ferramentas e configurar ambientes",
          status: "pendente",
          category: "equipamentos",
          assignedTo: "TI",
          dueDate: "Dia 1-2",
        },
        {
          id: "4",
          title: "Treinamento em metodologias ágeis",
          description: "Scrum, Kanban e processos internos de desenvolvimento",
          status: "pendente",
          category: "treinamento",
          assignedTo: "Líder Técnico",
          dueDate: "Semana 1",
        },
        {
          id: "5",
          title: "Apresentação da arquitetura",
          description: "Overview da arquitetura dos sistemas e infraestrutura",
          status: "pendente",
          category: "treinamento",
          assignedTo: "Arquiteto",
          dueDate: "Semana 1",
        },
      ],
    },
    {
      id: "3",
      name: "Onboarding Comercial",
      description: "Processo para equipe comercial e vendas",
      department: "Vendas",
      tasks: [
        {
          id: "1",
          title: "Recolher documentação pessoal",
          description: "BI, NIF, comprovante de residência, certificados acadêmicos",
          status: "pendente",
          category: "documentacao",
          assignedTo: "RH",
          dueDate: "Dia 1",
        },
        {
          id: "2",
          title: "Treinamento sobre produtos",
          description: "Apresentação detalhada dos produtos e serviços",
          status: "pendente",
          category: "treinamento",
          assignedTo: "Gerente Comercial",
          dueDate: "Semana 1",
        },
        {
          id: "3",
          title: "Configurar CRM",
          description: "Acesso ao CRM e treinamento básico",
          status: "pendente",
          category: "acesso",
          assignedTo: "TI",
          dueDate: "Dia 2",
        },
        {
          id: "4",
          title: "Treinamento em técnicas de vendas",
          description: "Metodologia de vendas da empresa",
          status: "pendente",
          category: "treinamento",
          assignedTo: "Gerente Comercial",
          dueDate: "Semana 1-2",
        },
        {
          id: "5",
          title: "Acompanhamento de visitas",
          description: "Acompanhar vendedor experiente em visitas a clientes",
          status: "pendente",
          category: "integracao",
          assignedTo: "Vendedor Sênior",
          dueDate: "Semana 2",
        },
      ],
    },
  ];

  // Tarefas do template selecionado
  const [tasks, setTasks] = useState<OnboardingTask[]>([]);

  // Função para selecionar um template
  const handleSelectTemplate = (templateId: string) => {
    const template = onboardingTemplates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setTasks(template.tasks);
      calculateProgress(template.tasks);
    }
  };

  // Função para atualizar o status de uma tarefa
  const updateTaskStatus = (taskId: string, status: "pendente" | "em_andamento" | "concluido") => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task
    );
    setTasks(updatedTasks);
    calculateProgress(updatedTasks);
  };

  // Calcular progresso do onboarding
  const calculateProgress = (taskList: OnboardingTask[]) => {
    const total = taskList.length;
    const completed = taskList.filter((task) => task.status === "concluido").length;
    setProgress(total > 0 ? (completed / total) * 100 : 0);
  };

  // Função para salvar o funcionário e iniciar onboarding
  const handleSaveEmployee = async () => {
    setIsLoading(true);
    try {
      // Aqui seria a lógica para salvar no banco de dados
      // Simulando uma chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Funcionário cadastrado com sucesso",
        description: "O processo de onboarding foi iniciado.",
      });
      
      // Avançar para a próxima etapa
      setActiveTab("onboarding");
    } catch (error) {
      console.error("Erro ao cadastrar funcionário:", error);
      toast({
        title: "Erro ao cadastrar funcionário",
        description: "Ocorreu um erro ao salvar os dados. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Função para finalizar o processo de onboarding
  const handleCompleteOnboarding = async () => {
    setIsLoading(true);
    try {
      // Aqui seria a lógica para finalizar o onboarding no banco de dados
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Processo de onboarding concluído",
        description: "O funcionário foi integrado com sucesso.",
      });
      
      if (onComplete) onComplete();
    } catch (error) {
      console.error("Erro ao finalizar onboarding:", error);
      toast({
        title: "Erro ao finalizar onboarding",
        description: "Ocorreu um erro ao processar a solicitação. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Renderizar o componente de tarefas
  const renderTasks = () => {
    return (
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="overflow-hidden">
            <div className={`h-1 ${getCategoryColor(task.category)}`} />
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{task.title}</h4>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <Badge variant="outline">{getCategoryLabel(task.category)}</Badge>
                    <span className="text-xs text-muted-foreground">
                      Responsável: {task.assignedTo}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Prazo: {task.dueDate}
                    </span>
                  </div>
                </div>
                <Select
                  value={task.status}
                  onValueChange={(value: "pendente" | "em_andamento" | "concluido") =>
                    updateTaskStatus(task.id, value)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendente">
                      <div className="flex items-center">
                        <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                        Pendente
                      </div>
                    </SelectItem>
                    <SelectItem value="em_andamento">
                      <div className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 text-blue-500" />
                        Em andamento
                      </div>
                    </SelectItem>
                    <SelectItem value="concluido">
                      <div className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                        Concluído
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  // Função para obter a cor da categoria
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "documentacao":
        return "bg-blue-500";
      case "treinamento":
        return "bg-green-500";
      case "integracao":
        return "bg-purple-500";
      case "equipamentos":
        return "bg-orange-500";
      case "acesso":
        return "bg-cyan-500";
      default:
        return "bg-gray-500";
    }
  };

  // Função para obter o label da categoria
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "documentacao":
        return "Documentação";
      case "treinamento":
        return "Treinamento";
      case "integracao":
        return "Integração";
      case "equipamentos":
        return "Equipamentos";
      case "acesso":
        return "Acesso";
      default:
        return category;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Onboarding de Funcionários</CardTitle>
        <CardDescription>
          Processo de integração de novos colaboradores adaptado ao contexto angolano
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="informacoes">Informações Pessoais</TabsTrigger>
            <TabsTrigger value="onboarding" disabled={activeTab === "informacoes"}>
              Processo de Onboarding
            </TabsTrigger>
          </TabsList>

          <TabsContent value="informacoes" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">Nome</Label>
                <Input
                  id="first_name"
                  value={newEmployee.first_name}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, first_name: e.target.value })
                  }
                  placeholder="Nome"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Sobrenome</Label>
                <Input
                  id="last_name"
                  value={newEmployee.last_name}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, last_name: e.target.value })
                  }
                  placeholder="Sobrenome"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, email: e.target.value })
                  }
                  placeholder="email@exemplo.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={newEmployee.phone}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, phone: e.target.value })
                  }
                  placeholder="+244 XXX XXX XXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Departamento</Label>
                <Select
                  value={newEmployee.department}
                  onValueChange={(value) =>
                    setNewEmployee({ ...newEmployee, department: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Cargo</Label>
                <Select
                  value={newEmployee.position}
                  onValueChange={(value) =>
                    setNewEmployee({ ...newEmployee, position: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((pos) => (
                      <SelectItem key={pos} value={pos}>
                        {pos}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="join_date">Data de Admissão</Label>
                <Input
                  id="join_date"
                  type="date"
                  value={newEmployee.join_date}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, join_date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="national_id">Bilhete de Identidade (BI)</Label>
                <Input
                  id="national_id"
                  value={newEmployee.national_id}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, national_id: e.target.value })
                  }
                  placeholder="Número do BI"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax_id">Número de Identificação Fiscal (NIF)</Label>
                <Input
                  id="tax_id"
                  value={newEmployee.tax_id}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, tax_id: e.target.value })
                  }
                  placeholder="Número do NIF"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social_security_number">Número da Segurança Social</Label>
                <Input
                  id="social_security_number"
                  value={newEmployee.social_security_number}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      social_security_number: e.target.value,
                    })
                  }
                  placeholder="Número da Segurança Social"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bank_account">Conta Bancária</Label>
                <Input
                  id="bank_account"
                  value={newEmployee.bank_account}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, bank_account: e.target.value })
                  }
                  placeholder="Número da conta bancária"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Endereço</Label>
                <Textarea
                  id="address"
                  value={newEmployee.address}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, address: e.target.value })
                  }
                  placeholder="Endereço completo"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergency_contact_name">Nome do Contato de Emergência</Label>
                <Input
                  id="emergency_contact_name"
                  value={newEmployee.emergency_contact_name}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      emergency_contact_name: e.target.value,
                    })
                  }
                  placeholder="Nome completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergency_contact_relationship">Relação</Label>
                <Input
                  id="emergency_contact_relationship"
                  value={newEmployee.emergency_contact_relationship}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      emergency_contact_relationship: e.target.value,
                    })
                  }
                  placeholder="Ex: Cônjuge, Pai, Mãe, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergency_contact_phone">Telefone de Emergência</Label>
                <Input
                  id="emergency_contact_phone"
                  value={newEmployee.emergency_contact_phone}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      emergency_contact_phone: e.target.value,
                    })
                  }
                  placeholder="+244 XXX XXX XXX"
                />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button onClick={handleSaveEmployee} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando
                  </>
                ) : (
                  <>
                    Salvar e Continuar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="onboarding" className="space-y-6 mt-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Progresso do Onboarding</h3>
                <div className="flex items-center mt-2">
                  <Progress value={progress} className="h-2 flex-1" />
                  <span className="ml-2 text-sm font-medium">{Math.round(progress)}%</span>
                </div>
              </div>

              <Separator />

              {!selectedTemplate ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Selecione um Modelo de Onboarding</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {onboardingTemplates.map((template) => (
                      <Card
                        key={template.id}
                        className={`cursor-pointer transition-all hover:border-primary ${
                          selectedTemplate === template.id
                            ? "border-2 border-primary"
                            : ""
                        }`}
                        onClick={() => handleSelectTemplate(template.id)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{template.name}</CardTitle>
                          <CardDescription>{template.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Badge>{template.department}</Badge>
                          <p className="text-sm mt-2">
                            {template.tasks.length} tarefas no total
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Lista de Tarefas</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTemplate(null)}
                    >
                      Trocar modelo
                    </Button>
                  </div>
                  {renderTasks()}
                </>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setActiveTab("informacoes")}>
                Voltar
              </Button>
              <Button
                onClick={handleCompleteOnboarding}
                disabled={isLoading || !selectedTemplate || progress < 100}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando
                  </>
                ) : (
                  <>
                    Finalizar Onboarding
                    <CheckCircle2 className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EmployeeOnboarding; 