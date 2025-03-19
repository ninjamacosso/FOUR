import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  CheckCircle,
  Clock,
  FileClock,
  FileText,
  Plus,
  Search,
  ThumbsDown,
  ThumbsUp,
  Timer,
  User,
  UserCheck,
  UserCog,
  UserMinus,
  XCircle,
} from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, differenceInDays } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Toast, ToastAction } from "@/components/ui/toast";

// Tipos para ausências
type TimeOffType = 
  | "ferias" 
  | "atestado" 
  | "licenca_maternidade" 
  | "licenca_paternidade" 
  | "falta_justificada" 
  | "falta_injustificada" 
  | "outros";

type TimeOffStatus = 
  | "pendente" 
  | "aprovado" 
  | "reprovado" 
  | "cancelado";

type TimeOffRequest = {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar?: string;
  employeePosition: string;
  type: TimeOffType;
  status: TimeOffStatus;
  dateRequested: string;
  startDate: string;
  endDate: string;
  duration: number;
  reason: string;
  approver?: string;
  approvalDate?: string;
  approvalComments?: string;
  attachmentUrl?: string;
};

const TimeOffRequestsTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("pendente");
  const [showNewRequestDialog, setShowNewRequestDialog] = useState<boolean>(false);
  const [showRequestDetailsDialog, setShowRequestDetailsDialog] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] = useState<TimeOffRequest | null>(null);
  const [newRequestForm, setNewRequestForm] = useState({
    employeeType: "current",
    type: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    reason: "",
    attachedFile: null as File | null,
  });
  const [requests, setRequests] = useState<TimeOffRequest[]>([
    {
      id: "REQ001",
      employeeId: "EMP001",
      employeeName: "Ana Silva",
      employeePosition: "Analista de Marketing",
      type: "ferias",
      status: "aprovado",
      dateRequested: "15/03/2023",
      startDate: "01/06/2023",
      endDate: "15/06/2023",
      duration: 15,
      reason: "Férias regulamentares anuais",
      approver: "Carlos Mendes",
      approvalDate: "20/03/2023",
      approvalComments: "Aprovado conforme escala de férias do departamento."
    },
    {
      id: "REQ002",
      employeeId: "EMP005",
      employeeName: "João Pereira",
      employeePosition: "Desenvolvedor Frontend",
      type: "atestado",
      status: "aprovado",
      dateRequested: "22/03/2023",
      startDate: "22/03/2023",
      endDate: "24/03/2023",
      duration: 3,
      reason: "Atestado médico - Anexo",
      approver: "Mariana Santos",
      approvalDate: "22/03/2023",
    },
    {
      id: "REQ003",
      employeeId: "EMP008",
      employeeName: "Mariana Santos",
      employeePosition: "Gerente de RH",
      type: "ferias",
      status: "pendente",
      dateRequested: "24/03/2023",
      startDate: "10/07/2023",
      endDate: "31/07/2023",
      duration: 22,
      reason: "Férias regulamentares programadas",
    },
    {
      id: "REQ004",
      employeeId: "EMP012",
      employeeName: "Pedro Costa",
      employeePosition: "Analista Financeiro",
      type: "falta_justificada",
      status: "pendente",
      dateRequested: "25/03/2023",
      startDate: "27/03/2023",
      endDate: "27/03/2023",
      duration: 1,
      reason: "Casamento de familiar próximo",
    },
    {
      id: "REQ005",
      employeeId: "EMP007",
      employeeName: "Carla Oliveira",
      employeePosition: "Recepcionista",
      type: "falta_injustificada",
      status: "reprovado",
      dateRequested: "18/03/2023",
      startDate: "19/03/2023",
      endDate: "19/03/2023",
      duration: 1,
      reason: "Problemas pessoais",
      approver: "Mariana Santos",
      approvalDate: "18/03/2023",
      approvalComments: "Solicitação feita fora do prazo e sem documentação comprobatória."
    },
    {
      id: "REQ006",
      employeeId: "EMP015",
      employeeName: "Luisa Mendes",
      employeePosition: "Analista de Suporte",
      type: "licenca_maternidade",
      status: "aprovado",
      dateRequested: "10/03/2023",
      startDate: "15/05/2023",
      endDate: "11/11/2023",
      duration: 180,
      reason: "Licença maternidade conforme previsão de nascimento",
      approver: "Mariana Santos",
      approvalDate: "11/03/2023",
      approvalComments: "Aprovado conforme a legislação vigente. Documentação médica recebida."
    },
  ]);
  const [approvalComment, setApprovalComment] = useState<string>("");
  const { toast } = useToast();
  
  // Função para filtrar as solicitações com base na aba ativa
  const getFilteredRequests = () => {
    if (activeTab === "todas") {
      return requests;
    }
    return requests.filter(req => req.status === activeTab);
  };
  
  // Função para renderizar o tipo de ausência com um badge colorido
  const renderTimeOffTypeBadge = (type: TimeOffType) => {
    switch(type) {
      case "ferias":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            Férias
          </Badge>
        );
      case "atestado":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            Atestado Médico
          </Badge>
        );
      case "licenca_maternidade":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
            Licença Maternidade
          </Badge>
        );
      case "licenca_paternidade":
        return (
          <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-200">
            Licença Paternidade
          </Badge>
        );
      case "falta_justificada":
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
            Falta Justificada
          </Badge>
        );
      case "falta_injustificada":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            Falta Injustificada
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
            Outros
          </Badge>
        );
    }
  };
  
  // Função para renderizar o status com um badge colorido
  const renderStatusBadge = (status: TimeOffStatus) => {
    switch(status) {
      case "pendente":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
            Pendente
          </Badge>
        );
      case "aprovado":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Aprovado
          </Badge>
        );
      case "reprovado":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            Reprovado
          </Badge>
        );
      case "cancelado":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
            Cancelado
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
            {status}
          </Badge>
        );
    }
  };
  
  // Função para lidar com a abertura dos detalhes de uma solicitação
  const handleOpenRequestDetails = (request: TimeOffRequest) => {
    setSelectedRequest(request);
    setShowRequestDetailsDialog(true);
  };
  
  // Função para aprovar uma solicitação
  const handleApproveRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { 
            ...req, 
            status: "aprovado", 
            approver: "Usuário Atual", // Seria o usuário logado
            approvalDate: format(new Date(), "dd/MM/yyyy"),
            approvalComments: approvalComment
          } 
        : req
    ));
    
    toast({
      title: "Solicitação aprovada",
      description: "A solicitação foi aprovada com sucesso.",
      variant: "default",
    });
    
    setApprovalComment("");
    setShowRequestDetailsDialog(false);
  };
  
  // Função para reprovar uma solicitação
  const handleRejectRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { 
            ...req, 
            status: "reprovado", 
            approver: "Usuário Atual", // Seria o usuário logado
            approvalDate: format(new Date(), "dd/MM/yyyy"),
            approvalComments: approvalComment
          } 
        : req
    ));
    
    toast({
      title: "Solicitação reprovada",
      description: "A solicitação foi reprovada.",
      variant: "destructive",
    });
    
    setApprovalComment("");
    setShowRequestDetailsDialog(false);
  };

  // Function to handle form input changes
  const handleNewRequestChange = (field: string, value: any) => {
    setNewRequestForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Calculate duration when dates change
  React.useEffect(() => {
    if (newRequestForm.startDate && newRequestForm.endDate) {
      const duration = differenceInDays(newRequestForm.endDate, newRequestForm.startDate) + 1;
      // You might want to update the form or show duration somewhere
    }
  }, [newRequestForm.startDate, newRequestForm.endDate]);

  // Function to handle form submission
  const handleSubmitNewRequest = () => {
    // More comprehensive form validation
    const errors: string[] = [];
    
    if (!newRequestForm.type) {
      errors.push("Selecione o tipo de ausência");
    }
    
    if (!newRequestForm.startDate) {
      errors.push("Selecione a data de início");
    }
    
    if (!newRequestForm.endDate) {
      errors.push("Selecione a data de término");
    }
    
    if (newRequestForm.startDate && newRequestForm.endDate && 
        newRequestForm.startDate > newRequestForm.endDate) {
      errors.push("A data de início deve ser anterior à data de término");
    }
    
    if (!newRequestForm.reason.trim()) {
      errors.push("Adicione um motivo para a solicitação");
    }
    
    // If there are validation errors, show them (you might want to use a toast or alert)
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    // Create new request object
    const newRequest: TimeOffRequest = {
      id: `REQ${Date.now()}`,
      employeeId: "CURRENT_USER", // Replace with actual user ID
      employeeName: "Nome do Funcionário", // Replace with actual name
      employeePosition: "Cargo do Funcionário", // Replace with actual position
      type: newRequestForm.type as TimeOffType,
      status: "pendente",
      dateRequested: format(new Date(), "dd/MM/yyyy"),
      startDate: format(newRequestForm.startDate, "dd/MM/yyyy"),
      endDate: format(newRequestForm.endDate, "dd/MM/yyyy"),
      duration: differenceInDays(newRequestForm.endDate, newRequestForm.startDate) + 1,
      reason: newRequestForm.reason,
      attachmentUrl: newRequestForm.attachedFile 
        ? URL.createObjectURL(newRequestForm.attachedFile) 
        : undefined,
    };

    // Adicionar à lista usando o setState
    setRequests(prev => [...prev, newRequest]);
    
    toast({
      title: "Solicitação enviada",
      description: "Sua solicitação foi enviada com sucesso e está aguardando aprovação.",
      variant: "default",
    });

    // Reset form and close dialog
    setNewRequestForm({
      employeeType: "current",
      type: "",
      startDate: undefined,
      endDate: undefined,
      reason: "",
      attachedFile: null,
    });
    setShowNewRequestDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho da seção de ausências */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Solicitações de Ausência</h2>
          <p className="text-muted-foreground">
            Gerenciamento de férias, licenças e faltas dos funcionários
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setShowNewRequestDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Solicitação
          </Button>
        </div>
      </div>

      {/* Tabs para filtrar solicitações por status */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="pendente">
            <Clock className="h-4 w-4 mr-2" />
            Pendentes
          </TabsTrigger>
          <TabsTrigger value="aprovado">
            <CheckCircle className="h-4 w-4 mr-2" />
            Aprovadas
          </TabsTrigger>
          <TabsTrigger value="reprovado">
            <XCircle className="h-4 w-4 mr-2" />
            Reprovadas
          </TabsTrigger>
          <TabsTrigger value="todas">
            <FileClock className="h-4 w-4 mr-2" />
            Todas
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>
                {activeTab === "pendente" ? "Solicitações Pendentes" : 
                 activeTab === "aprovado" ? "Solicitações Aprovadas" : 
                 activeTab === "reprovado" ? "Solicitações Reprovadas" : 
                 "Todas as Solicitações"}
              </CardTitle>
              <CardDescription>
                {activeTab === "pendente" ? "Solicitações que aguardam aprovação" : 
                 activeTab === "aprovado" ? "Solicitações aprovadas pela gestão" : 
                 activeTab === "reprovado" ? "Solicitações que foram reprovadas" : 
                 "Lista completa de solicitações de ausência"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Funcionário</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead>Duração</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredRequests().map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {request.employeeName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{request.employeeName}</div>
                            <div className="text-xs text-muted-foreground">{request.employeePosition}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{renderTimeOffTypeBadge(request.type)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">Início:</span>
                          <span>{request.startDate}</span>
                          <span className="text-xs text-muted-foreground mt-1">Fim:</span>
                          <span>{request.endDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{request.duration} {request.duration === 1 ? 'dia' : 'dias'}</span>
                        </div>
                      </TableCell>
                      <TableCell>{renderStatusBadge(request.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleOpenRequestDetails(request)}
                        >
                          Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {getFilteredRequests().length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  Nenhuma solicitação {activeTab !== "todas" ? `com status '${activeTab}'` : ""} encontrada.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogo para nova solicitação */}
      <Dialog open={showNewRequestDialog} onOpenChange={setShowNewRequestDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nova Solicitação de Ausência</DialogTitle>
            <DialogDescription>
              Preencha os dados para solicitar uma ausência
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Funcionário
              </label>
              <Select defaultValue="current">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o funcionário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Você mesmo</SelectItem>
                  <SelectItem value="other">Outro funcionário</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">
                Tipo de Ausência
              </label>
              <Select 
                value={newRequestForm.type}
                onValueChange={(value) => handleNewRequestChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ferias">Férias</SelectItem>
                  <SelectItem value="atestado">Atestado Médico</SelectItem>
                  <SelectItem value="licenca_maternidade">Licença Maternidade</SelectItem>
                  <SelectItem value="licenca_paternidade">Licença Paternidade</SelectItem>
                  <SelectItem value="falta_justificada">Falta Justificada</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Data de Início
                </label>
                <DatePicker 
                  value={newRequestForm.startDate}
                  onChange={(date) => handleNewRequestChange('startDate', date)}
                  placeholder="Selecione a data inicial"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Data de Término
                </label>
                <DatePicker 
                  value={newRequestForm.endDate}
                  onChange={(date) => handleNewRequestChange('endDate', date)}
                  placeholder="Selecione a data final"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">
                Motivo/Observações
              </label>
              <Textarea 
                placeholder="Descreva o motivo da ausência" 
                value={newRequestForm.reason}
                onChange={(e) => handleNewRequestChange('reason', e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">
                Anexar Documentos (opcional)
              </label>
              <Input
                type="file"
                className="cursor-pointer"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // Validate file size (5MB limit)
                    if (file.size > 5 * 1024 * 1024) {
                      // Show error that file is too large
                      alert("O arquivo não pode ser maior que 5MB");
                      e.target.value = ''; // Clear the input
                      return;
                    }
                    handleNewRequestChange('attachedFile', file);
                  }
                }}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Aceita arquivos PDF, JPG ou PNG até 5MB
                {newRequestForm.attachedFile && ` - ${newRequestForm.attachedFile.name}`}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewRequestDialog(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmitNewRequest}
              disabled={!newRequestForm.type || !newRequestForm.startDate || !newRequestForm.endDate}
            >
              Enviar Solicitação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo de detalhes da solicitação */}
      {selectedRequest && (
        <Dialog open={showRequestDetailsDialog} onOpenChange={setShowRequestDetailsDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalhes da Solicitação</DialogTitle>
              <DialogDescription>
                Solicitação #{selectedRequest.id}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedRequest.employeeName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedRequest.employeeName}</div>
                    <div className="text-sm text-muted-foreground">{selectedRequest.employeePosition}</div>
                  </div>
                </div>
                <div>{renderStatusBadge(selectedRequest.status)}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 border rounded-md p-4">
                <div>
                  <p className="text-sm font-medium">Tipo de Ausência</p>
                  <div className="mt-1">{renderTimeOffTypeBadge(selectedRequest.type)}</div>
                </div>
                <div>
                  <p className="text-sm font-medium">Data da Solicitação</p>
                  <p className="mt-1">{selectedRequest.dateRequested}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Período</p>
                  <p className="mt-1">{selectedRequest.startDate} a {selectedRequest.endDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Duração</p>
                  <p className="mt-1">{selectedRequest.duration} {selectedRequest.duration === 1 ? 'dia' : 'dias'}</p>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <p className="text-sm font-medium">Motivo</p>
                <p className="mt-1">{selectedRequest.reason}</p>
              </div>
              
              {selectedRequest.approver && (
                <div className="border rounded-md p-4">
                  <p className="text-sm font-medium">Informações de Aprovação</p>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <UserCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Aprovado por: {selectedRequest.approver}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Data: {selectedRequest.approvalDate}</span>
                    </div>
                    {selectedRequest.approvalComments && (
                      <div>
                        <p className="text-sm font-medium mt-2">Comentários</p>
                        <p className="text-sm mt-1">{selectedRequest.approvalComments}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {selectedRequest?.attachmentUrl && (
                <div className="border rounded-md p-4">
                  <p className="text-sm font-medium mb-2">Anexo</p>
                  {selectedRequest.attachmentUrl.endsWith('.pdf') ? (
                    <div className="flex items-center">
                      <FileText className="h-6 w-6 text-red-500 mr-2" />
                      <a 
                        href={selectedRequest.attachmentUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Visualizar documento PDF
                      </a>
                    </div>
                  ) : (
                    <img 
                      src={selectedRequest.attachmentUrl} 
                      alt="Anexo da solicitação" 
                      className="max-h-64 rounded-md border" 
                    />
                  )}
                </div>
              )}
              
              {/* Ações para solicitações pendentes */}
              {selectedRequest.status === "pendente" && (
                <div className="border rounded-md p-4 bg-gray-50">
                  <p className="text-sm font-medium mb-3">Ações</p>
                  <Textarea 
                    placeholder="Comentários (opcional)" 
                    className="text-sm mb-3" 
                    value={approvalComment}
                    onChange={(e) => setApprovalComment(e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="border-green-300 text-green-700 hover:bg-green-50"
                      onClick={() => handleApproveRequest(selectedRequest.id)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Aprovar
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-red-300 text-red-700 hover:bg-red-50"
                      onClick={() => handleRejectRequest(selectedRequest.id)}
                    >
                      <ThumbsDown className="h-4 w-4 mr-2" />
                      Reprovar
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRequestDetailsDialog(false)}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TimeOffRequestsTab; 