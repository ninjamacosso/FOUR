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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Employee, LeaveRequest } from "@/types/hr.types";
import { format, differenceInCalendarDays, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  Check,
  ChevronDown,
  Clock,
  Download,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import LeaveCalendar from "./LeaveCalendar";
import LeaveRequestForm from "./LeaveRequestForm";

interface LeaveManagementProps {
  activeTab?: "list" | "calendar" | "request";
  onTabChange?: (tab: string) => void;
}

const LeaveManagement: React.FC<LeaveManagementProps> = ({
  activeTab = "list",
  onTabChange = () => {},
}) => {
  // Estados
  const [currentTab, setCurrentTab] = useState<string>(activeTab);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<LeaveRequest[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [showApproveDialog, setShowApproveDialog] = useState<boolean>(false);
  const [showRejectDialog, setShowRejectDialog] = useState<boolean>(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string>("");
  const [rejectionReason, setRejectionReason] = useState<string>("");

  // Efeito para carregar dados ao montar o componente
  useEffect(() => {
    fetchLeaveRequests();
    fetchEmployees();
  }, []);

  // Efeito para filtrar solicitações quando os filtros ou a lista mudam
  useEffect(() => {
    filterLeaveRequests();
  }, [leaveRequests, searchTerm, statusFilter, typeFilter]);

  // Efeito para sincronizar o estado interno com as props
  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  // Buscar solicitações de licença do Supabase
  const fetchLeaveRequests = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("leave_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        // Converter o status e tipo para os tipos corretos
        const typedLeaveRequests = data.map(leave => ({
          ...leave,
          status: leave.status as LeaveRequest["status"],
          leave_type: leave.leave_type as LeaveRequest["leave_type"]
        }));
        
        setLeaveRequests(typedLeaveRequests);
      }
    } catch (error) {
      console.error("Erro ao buscar solicitações de licença:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as solicitações de licença.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar funcionários do Supabase
  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("status", "active");

      if (error) throw error;

      if (data) {
        // Converter o status para o tipo correto
        const typedEmployees = data.map(emp => ({
          ...emp,
          status: emp.status as Employee["status"]
        }));
        
        setEmployees(typedEmployees);
      }
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os funcionários.",
        variant: "destructive",
      });
    }
  };

  // Filtrar solicitações de licença com base nos critérios de pesquisa e filtros
  const filterLeaveRequests = () => {
    let filtered = [...leaveRequests];

    // Filtrar por termo de pesquisa (ID do funcionário)
    if (searchTerm) {
      filtered = filtered.filter((leave) =>
        leave.employee_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por status
    if (statusFilter !== "all") {
      filtered = filtered.filter((leave) => leave.status === statusFilter);
    }

    // Filtrar por tipo de licença
    if (typeFilter !== "all") {
      filtered = filtered.filter((leave) => leave.leave_type === typeFilter);
    }

    setFilteredRequests(filtered);
  };

  // Manipuladores de eventos
  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    onTabChange(tab);
  };

  const handleApproveRequest = (id: string) => {
    setSelectedRequestId(id);
    setShowApproveDialog(true);
  };

  const handleRejectRequest = (id: string) => {
    setSelectedRequestId(id);
    setShowRejectDialog(true);
  };

  const confirmApproveRequest = async () => {
    try {
      const { error } = await supabase
        .from("leave_requests")
        .update({
          status: "approved",
          approved_by: "Admin", // Idealmente, usar o nome do usuário atual
          approved_at: new Date().toISOString(),
        })
        .eq("id", selectedRequestId);

      if (error) throw error;

      // Atualizar a lista de solicitações
      fetchLeaveRequests();
      
      // Fechar o diálogo
      setShowApproveDialog(false);
      setSelectedRequestId("");
      
      toast({
        title: "Sucesso",
        description: "Solicitação de licença aprovada com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao aprovar solicitação de licença:", error);
      toast({
        title: "Erro",
        description: "Não foi possível aprovar a solicitação de licença.",
        variant: "destructive",
      });
    }
  };

  const confirmRejectRequest = async () => {
    try {
      const { error } = await supabase
        .from("leave_requests")
        .update({
          status: "rejected",
          reason: rejectionReason || "Solicitação rejeitada sem motivo específico.",
        })
        .eq("id", selectedRequestId);

      if (error) throw error;

      // Atualizar a lista de solicitações
      fetchLeaveRequests();
      
      // Fechar o diálogo e limpar o motivo
      setShowRejectDialog(false);
      setSelectedRequestId("");
      setRejectionReason("");
      
      toast({
        title: "Sucesso",
        description: "Solicitação de licença rejeitada com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao rejeitar solicitação de licença:", error);
      toast({
        title: "Erro",
        description: "Não foi possível rejeitar a solicitação de licença.",
        variant: "destructive",
      });
    }
  };

  // Função para obter o nome do funcionário pelo ID
  const getEmployeeName = (employeeId: string): string => {
    const employee = employees.find((emp) => emp.id === employeeId);
    return employee ? `${employee.first_name} ${employee.last_name}` : "Funcionário Desconhecido";
  };

  // Função para formatar o tipo de licença
  const formatLeaveType = (type: LeaveRequest["leave_type"]): string => {
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
        return { label: "Pendente", variant: "warning" as const };
      case "approved":
        return { label: "Aprovada", variant: "success" as const };
      case "rejected":
        return { label: "Rejeitada", variant: "destructive" as const };
      case "cancelled":
        return { label: "Cancelada", variant: "secondary" as const };
      default:
        return { label: status, variant: "default" as const };
    }
  };

  // Função para calcular a duração da licença em dias
  const calculateLeaveDuration = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return differenceInCalendarDays(end, start) + 1; // +1 para incluir o dia final
  };

  // Função para lidar com a criação de uma nova solicitação de licença
  const handleLeaveRequestCreated = () => {
    fetchLeaveRequests();
    setCurrentTab("list");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Gestão de Licenças e Férias</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={fetchLeaveRequests}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
          <Button onClick={() => handleTabChange("request")}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Solicitação
          </Button>
        </div>
      </div>

      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list">Lista de Solicitações</TabsTrigger>
          <TabsTrigger value="calendar">Calendário</TabsTrigger>
          <TabsTrigger value="request">Nova Solicitação</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Solicitações de Licença</CardTitle>
              <CardDescription>
                Gerencie as solicitações de licença e férias dos funcionários.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filtros e Pesquisa */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Pesquisar por funcionário..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Status</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="approved">Aprovada</SelectItem>
                      <SelectItem value="rejected">Rejeitada</SelectItem>
                      <SelectItem value="cancelled">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tipo de Licença" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Tipos</SelectItem>
                      <SelectItem value="annual">Férias</SelectItem>
                      <SelectItem value="sick">Licença Médica</SelectItem>
                      <SelectItem value="maternity">Licença Maternidade</SelectItem>
                      <SelectItem value="paternity">Licença Paternidade</SelectItem>
                      <SelectItem value="unpaid">Licença Não Remunerada</SelectItem>
                      <SelectItem value="bereavement">Licença por Luto</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tabela de Solicitações */}
              <div className="border rounded-md">
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <p className="text-muted-foreground">Carregando solicitações...</p>
                  </div>
                ) : filteredRequests.length === 0 ? (
                  <div className="flex flex-col justify-center items-center h-64">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Nenhuma solicitação encontrada.</p>
                    <Button
                      variant="link"
                      onClick={() => handleTabChange("request")}
                      className="mt-2"
                    >
                      Criar Nova Solicitação
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-3 font-medium">Funcionário</th>
                          <th className="text-left p-3 font-medium">Tipo</th>
                          <th className="text-left p-3 font-medium">Período</th>
                          <th className="text-left p-3 font-medium">Duração</th>
                          <th className="text-left p-3 font-medium">Status</th>
                          <th className="text-left p-3 font-medium">Data da Solicitação</th>
                          <th className="text-right p-3 font-medium">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRequests.map((leave) => (
                          <tr key={leave.id} className="border-b hover:bg-muted/50">
                            <td className="p-3">
                              {getEmployeeName(leave.employee_id)}
                            </td>
                            <td className="p-3">{formatLeaveType(leave.leave_type)}</td>
                            <td className="p-3">
                              {format(new Date(leave.start_date), "dd/MM/yyyy")} - {format(new Date(leave.end_date), "dd/MM/yyyy")}
                            </td>
                            <td className="p-3">
                              {calculateLeaveDuration(leave.start_date, leave.end_date)} dias
                            </td>
                            <td className="p-3">
                              <Badge variant={formatLeaveStatus(leave.status).variant}>
                                {formatLeaveStatus(leave.status).label}
                              </Badge>
                            </td>
                            <td className="p-3">
                              {format(new Date(leave.created_at), "dd/MM/yyyy")}
                            </td>
                            <td className="p-3 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  {leave.status === "pending" && (
                                    <>
                                      <DropdownMenuItem
                                        onClick={() => handleApproveRequest(leave.id)}
                                        className="text-green-600"
                                      >
                                        <Check className="mr-2 h-4 w-4" />
                                        Aprovar
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => handleRejectRequest(leave.id)}
                                        className="text-red-600"
                                      >
                                        <X className="mr-2 h-4 w-4" />
                                        Rejeitar
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                    </>
                                  )}
                                  <DropdownMenuItem>
                                    <FileText className="mr-2 h-4 w-4" />
                                    Ver Detalhes
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Mostrando {filteredRequests.length} de {leaveRequests.length} solicitações
              </div>
              <Button variant="outline" onClick={() => handleTabChange("calendar")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                Ver Calendário
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <LeaveCalendar leaveRequests={leaveRequests} employees={employees} />
        </TabsContent>

        <TabsContent value="request">
          <LeaveRequestForm 
            employees={employees} 
            onRequestCreated={handleLeaveRequestCreated} 
            onCancel={() => handleTabChange("list")} 
          />
        </TabsContent>
      </Tabs>

      {/* Diálogo de Aprovação */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aprovar Solicitação</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja aprovar esta solicitação de licença?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmApproveRequest}>
              <Check className="mr-2 h-4 w-4" />
              Aprovar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Rejeição */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeitar Solicitação</DialogTitle>
            <DialogDescription>
              Por favor, forneça um motivo para a rejeição desta solicitação.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="rejection-reason">Motivo da Rejeição</Label>
            <Textarea
              id="rejection-reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Explique o motivo da rejeição..."
              className="mt-2"
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmRejectRequest}>
              <X className="mr-2 h-4 w-4" />
              Rejeitar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeaveManagement;
