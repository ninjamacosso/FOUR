import React, { useState, useEffect } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Employee, Contract, Document, LeaveRequest, PerformanceEvaluation } from "@/types/hr.types";
import {
  ArrowLeft,
  Calendar,
  Download,
  Edit,
  FileText,
  Mail,
  MapPin,
  Phone,
  Star,
  User,
  Briefcase,
  Building,
  CreditCard,
  Clock,
  AlertCircle,
  FileCheck,
  Award,
  Clipboard,
} from "lucide-react";

interface EmployeeDetailProps {
  employeeId: string;
  onBack: () => void;
  onEdit: (id: string) => void;
}

const EmployeeDetail: React.FC<EmployeeDetailProps> = ({
  employeeId,
  onBack,
  onEdit,
}) => {
  // Estados
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [evaluations, setEvaluations] = useState<PerformanceEvaluation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Efeito para carregar dados do funcionário
  useEffect(() => {
    if (employeeId) {
      fetchEmployeeData();
    }
  }, [employeeId]);

  // Buscar dados do funcionário e informações relacionadas
  const fetchEmployeeData = async () => {
    setIsLoading(true);
    try {
      // Buscar dados do funcionário
      const { data: employeeData, error: employeeError } = await supabase
        .from("employees")
        .select("*")
        .eq("id", employeeId)
        .single();

      if (employeeError) throw employeeError;

      if (employeeData) {
        // Converter o status para o tipo correto
        const typedEmployee = {
          ...employeeData,
          status: employeeData.status as Employee["status"]
        };
        
        setEmployee(typedEmployee);
      }

      // Buscar contratos do funcionário
      const { data: contractsData, error: contractsError } = await supabase
        .from("contracts")
        .select("*")
        .eq("employee_id", employeeId)
        .order("start_date", { ascending: false });

      if (contractsError) throw contractsError;

      if (contractsData) {
        // Converter o status e tipo para os tipos corretos
        const typedContracts = contractsData.map(contract => ({
          ...contract,
          status: contract.status as Contract["status"],
          type: contract.type as Contract["type"]
        }));
        
        setContracts(typedContracts);
      }

      // Buscar documentos do funcionário
      const { data: documentsData, error: documentsError } = await supabase
        .from("documents")
        .select("*")
        .eq("employee_id", employeeId)
        .order("created_at", { ascending: false });

      if (documentsError) throw documentsError;

      if (documentsData) {
        setDocuments(documentsData);
      }

      // Buscar solicitações de licença do funcionário
      const { data: leaveRequestsData, error: leaveRequestsError } = await supabase
        .from("leave_requests")
        .select("*")
        .eq("employee_id", employeeId)
        .order("start_date", { ascending: false });

      if (leaveRequestsError) throw leaveRequestsError;

      if (leaveRequestsData) {
        // Converter o status e tipo para os tipos corretos
        const typedLeaveRequests = leaveRequestsData.map(leave => ({
          ...leave,
          status: leave.status as LeaveRequest["status"],
          leave_type: leave.leave_type as LeaveRequest["leave_type"]
        }));
        
        setLeaveRequests(typedLeaveRequests);
      }

      // Buscar avaliações de desempenho do funcionário
      const { data: evaluationsData, error: evaluationsError } = await supabase
        .from("performance_evaluations")
        .select("*")
        .eq("employee_id", employeeId)
        .order("review_date", { ascending: false });

      if (evaluationsError) throw evaluationsError;

      if (evaluationsData) {
        // Converter o rating para o tipo correto
        const typedEvaluations = evaluationsData.map(evaluation => ({
          ...evaluation,
          overall_rating: evaluation.overall_rating as PerformanceEvaluation["overall_rating"]
        }));
        
        setEvaluations(typedEvaluations);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do funcionário:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados do funcionário.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Função para formatar o status do funcionário
  const formatStatus = (status: Employee["status"]) => {
    switch (status) {
      case "active":
        return { label: "Ativo", variant: "default" as const };
      case "inactive":
        return { label: "Inativo", variant: "secondary" as const };
      case "on_leave":
        return { label: "De Licença", variant: "outline" as const };
      case "terminated":
        return { label: "Desligado", variant: "destructive" as const };
      default:
        return { label: status, variant: "default" as const };
    }
  };

  // Função para formatar o tipo de contrato
  const formatContractType = (type: Contract["type"]) => {
    switch (type) {
      case "permanent":
        return "Permanente";
      case "temporary":
        return "Temporário";
      case "internship":
        return "Estágio";
      case "consultant":
        return "Consultor";
      default:
        return type;
    }
  };

  // Função para formatar o status do contrato
  const formatContractStatus = (status: Contract["status"]) => {
    switch (status) {
      case "active":
        return { label: "Ativo", variant: "default" as const };
      case "expired":
        return { label: "Expirado", variant: "secondary" as const };
      case "terminated":
        return { label: "Rescindido", variant: "destructive" as const };
      default:
        return { label: status, variant: "default" as const };
    }
  };

  // Função para formatar o tipo de licença
  const formatLeaveType = (type: LeaveRequest["leave_type"]) => {
    switch (type) {
      case "annual":
        return "Férias";
      case "sick":
        return "Licença Médica";
      case "maternity":
        return "Licença Maternidade";
      case "paternity":
        return "Licença Paternidade";
      case "unpaid":
        return "Licença Não Remunerada";
      case "bereavement":
        return "Licença por Luto";
      case "other":
        return "Outro";
      default:
        return type;
    }
  };

  // Função para formatar o status da licença
  const formatLeaveStatus = (status: LeaveRequest["status"]) => {
    switch (status) {
      case "pending":
        return { label: "Pendente", variant: "outline" as const };
      case "approved":
        return { label: "Aprovada", variant: "default" as const };
      case "rejected":
        return { label: "Rejeitada", variant: "destructive" as const };
      case "cancelled":
        return { label: "Cancelada", variant: "secondary" as const };
      default:
        return { label: status, variant: "default" as const };
    }
  };

  // Função para formatar a avaliação de desempenho
  const formatRating = (rating: PerformanceEvaluation["overall_rating"]) => {
    switch (rating) {
      case "excellent":
        return { label: "Excelente", variant: "default" as const };
      case "good":
        return { label: "Bom", variant: "default" as const };
      case "satisfactory":
        return { label: "Satisfatório", variant: "secondary" as const };
      case "needs_improvement":
        return { label: "Precisa Melhorar", variant: "outline" as const };
      case "poor":
        return { label: "Insatisfatório", variant: "destructive" as const };
      default:
        return { label: rating, variant: "default" as const };
    }
  };

  // Função para baixar um documento
  const downloadDocument = async (document: Document) => {
    try {
      // Em uma implementação real, isso faria o download do documento
      // do storage do Supabase ou outro serviço de armazenamento
      toast({
        title: "Download iniciado",
        description: `Baixando ${document.name}...`,
      });
    } catch (error) {
      console.error("Erro ao baixar documento:", error);
      toast({
        title: "Erro",
        description: "Não foi possível baixar o documento.",
        variant: "destructive",
      });
    }
  };

  // Renderização condicional com base no carregamento
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">Carregando dados do funcionário...</p>
        </CardContent>
      </Card>
    );
  }

  // Renderização quando o funcionário não é encontrado
  if (!employee) {
    return (
      <Card>
        <CardContent className="flex flex-col justify-center items-center h-64">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Funcionário não encontrado.</p>
          <Button variant="link" onClick={onBack} className="mt-2">
            Voltar para a Lista
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Renderização dos detalhes do funcionário
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">Detalhes do Funcionário</h2>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={employee.avatar_url || undefined} />
                <AvatarFallback className="text-lg">
                  {employee.first_name[0]}
                  {employee.last_name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">
                  {employee.first_name} {employee.last_name}
                </CardTitle>
                <CardDescription className="text-lg">
                  {employee.position} - {employee.department}
                </CardDescription>
                <div className="mt-1">
                  <Badge variant={formatStatus(employee.status).variant}>
                    {formatStatus(employee.status).label}
                  </Badge>
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={() => onEdit(employee.id)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="contracts">Contratos</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
              <TabsTrigger value="leave">Licenças</TabsTrigger>
              <TabsTrigger value="performance">Desempenho</TabsTrigger>
            </TabsList>

            {/* Aba de Visão Geral */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Informações Pessoais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div className="flex items-start">
                        <dt className="w-8 flex-shrink-0">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </dt>
                        <dd className="flex-1">
                          <span className="font-medium block">Nome Completo</span>
                          <span>
                            {employee.first_name} {employee.last_name}
                          </span>
                        </dd>
                      </div>
                      <div className="flex items-start">
                        <dt className="w-8 flex-shrink-0">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                        </dt>
                        <dd className="flex-1">
                          <span className="font-medium block">Email</span>
                          <span>{employee.email}</span>
                        </dd>
                      </div>
                      <div className="flex items-start">
                        <dt className="w-8 flex-shrink-0">
                          <Phone className="h-5 w-5 text-muted-foreground" />
                        </dt>
                        <dd className="flex-1">
                          <span className="font-medium block">Telefone</span>
                          <span>{employee.phone || "Não informado"}</span>
                        </dd>
                      </div>
                      <div className="flex items-start">
                        <dt className="w-8 flex-shrink-0">
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                        </dt>
                        <dd className="flex-1">
                          <span className="font-medium block">Endereço</span>
                          <span>{employee.address || "Não informado"}</span>
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Informações Profissionais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div className="flex items-start">
                        <dt className="w-8 flex-shrink-0">
                          <Briefcase className="h-5 w-5 text-muted-foreground" />
                        </dt>
                        <dd className="flex-1">
                          <span className="font-medium block">Cargo</span>
                          <span>{employee.position}</span>
                        </dd>
                      </div>
                      <div className="flex items-start">
                        <dt className="w-8 flex-shrink-0">
                          <Building className="h-5 w-5 text-muted-foreground" />
                        </dt>
                        <dd className="flex-1">
                          <span className="font-medium block">Departamento</span>
                          <span>{employee.department}</span>
                        </dd>
                      </div>
                      <div className="flex items-start">
                        <dt className="w-8 flex-shrink-0">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                        </dt>
                        <dd className="flex-1">
                          <span className="font-medium block">Data de Admissão</span>
                          <span>{new Date(employee.join_date).toLocaleDateString()}</span>
                        </dd>
                      </div>
                      <div className="flex items-start">
                        <dt className="w-8 flex-shrink-0">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                        </dt>
                        <dd className="flex-1">
                          <span className="font-medium block">Conta Bancária</span>
                          <span>{employee.bank_account || "Não informada"}</span>
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Documentação</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <dt className="text-sm text-muted-foreground">Identidade</dt>
                      <dd className="font-medium">{employee.national_id || "Não informado"}</dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-sm text-muted-foreground">CPF/NIF</dt>
                      <dd className="font-medium">{employee.tax_id || "Não informado"}</dd>
                    </div>
                    <div className="space-y-1">
                      <dt className="text-sm text-muted-foreground">Seguridade Social</dt>
                      <dd className="font-medium">{employee.social_security_number || "Não informado"}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Contato de Emergência</CardTitle>
                </CardHeader>
                <CardContent>
                  {employee.emergency_contact_name ? (
                    <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <dt className="text-sm text-muted-foreground">Nome</dt>
                        <dd className="font-medium">{employee.emergency_contact_name}</dd>
                      </div>
                      <div className="space-y-1">
                        <dt className="text-sm text-muted-foreground">Relação</dt>
                        <dd className="font-medium">{employee.emergency_contact_relationship || "Não informada"}</dd>
                      </div>
                      <div className="space-y-1">
                        <dt className="text-sm text-muted-foreground">Telefone</dt>
                        <dd className="font-medium">{employee.emergency_contact_phone || "Não informado"}</dd>
                      </div>
                    </dl>
                  ) : (
                    <p className="text-muted-foreground">Nenhum contato de emergência registrado.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba de Contratos */}
            <TabsContent value="contracts" className="space-y-4">
              {contracts.length > 0 ? (
                <div className="space-y-4">
                  {contracts.map((contract) => (
                    <Card key={contract.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">
                            Contrato {formatContractType(contract.type)}
                          </CardTitle>
                          <Badge variant={formatContractStatus(contract.status).variant}>
                            {formatContractStatus(contract.status).label}
                          </Badge>
                        </div>
                        <CardDescription>
                          Vigência: {new Date(contract.start_date).toLocaleDateString()} 
                          {contract.end_date ? ` até ${new Date(contract.end_date).toLocaleDateString()}` : " (Sem data de término)"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Salário Base:</span>
                            <span className="font-medium">
                              {new Intl.NumberFormat("pt-AO", {
                                style: "currency",
                                currency: "AOA",
                              }).format(contract.salary)}
                            </span>
                          </div>
                          {contract.document_url && (
                            <Button variant="outline" className="w-full" onClick={() => window.open(contract.document_url, "_blank")}>
                              <FileText className="mr-2 h-4 w-4" />
                              Ver Documento do Contrato
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col justify-center items-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Nenhum contrato registrado.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Aba de Documentos */}
            <TabsContent value="documents" className="space-y-4">
              {documents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documents.map((document) => (
                    <Card key={document.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{document.name}</CardTitle>
                        <CardDescription>{document.type}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Tamanho:</span>
                            <span>
                              {document.size < 1024
                                ? `${document.size} B`
                                : document.size < 1024 * 1024
                                ? `${(document.size / 1024).toFixed(2)} KB`
                                : `${(document.size / (1024 * 1024)).toFixed(2)} MB`}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Data de Upload:</span>
                            <span>{new Date(document.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" onClick={() => downloadDocument(document)}>
                          <Download className="mr-2 h-4 w-4" />
                          Baixar Documento
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col justify-center items-center py-8">
                    <FileCheck className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Nenhum documento registrado.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Aba de Licenças */}
            <TabsContent value="leave" className="space-y-4">
              {leaveRequests.length > 0 ? (
                <div className="space-y-4">
                  {leaveRequests.map((leave) => (
                    <Card key={leave.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">
                            {formatLeaveType(leave.leave_type)}
                          </CardTitle>
                          <Badge variant={formatLeaveStatus(leave.status).variant}>
                            {formatLeaveStatus(leave.status).label}
                          </Badge>
                        </div>
                        <CardDescription>
                          Período: {new Date(leave.start_date).toLocaleDateString()} até {new Date(leave.end_date).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {leave.reason && (
                            <div>
                              <h4 className="text-sm font-medium mb-1">Motivo:</h4>
                              <p className="text-sm text-muted-foreground">{leave.reason}</p>
                            </div>
                          )}
                          {leave.approved_by && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Aprovado por:</span>
                              <span>{leave.approved_by}</span>
                            </div>
                          )}
                          {leave.approved_at && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Data de Aprovação:</span>
                              <span>{new Date(leave.approved_at).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col justify-center items-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Nenhuma licença registrada.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Aba de Desempenho */}
            <TabsContent value="performance" className="space-y-4">
              {evaluations.length > 0 ? (
                <div className="space-y-4">
                  {evaluations.map((evaluation) => (
                    <Card key={evaluation.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">
                            Avaliação de Desempenho - {evaluation.period}
                          </CardTitle>
                          <Badge variant={formatRating(evaluation.overall_rating).variant}>
                            {formatRating(evaluation.overall_rating).label}
                          </Badge>
                        </div>
                        <CardDescription>
                          Data da Avaliação: {new Date(evaluation.review_date).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Avaliado por:</span>
                            <span>{evaluation.reviewed_by}</span>
                          </div>
                          {evaluation.comments && (
                            <div>
                              <h4 className="text-sm font-medium mb-1">Comentários:</h4>
                              <p className="text-sm text-muted-foreground">{evaluation.comments}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col justify-center items-center py-8">
                    <Award className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Nenhuma avaliação de desempenho registrada.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDetail;
