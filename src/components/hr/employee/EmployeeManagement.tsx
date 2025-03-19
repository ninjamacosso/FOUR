import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Employee, departments, positions } from "@/types/hr.types";
import EmployeeTable from "./EmployeeTable";
import EmployeeDetail from "./EmployeeDetail";
import EmployeeOnboarding from "./EmployeeOnboarding";
import {
  Download,
  FileUp,
  Filter,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Upload,
  UserPlus,
  Users,
} from "lucide-react";

// Interface para opções de filtro
interface FilterOption {
  id: string;
  name: string;
}

// Interface para as propriedades do componente
interface EmployeeManagementProps {
  activeTab?: "list" | "details" | "onboarding";
  selectedEmployeeId?: string | null;
  onTabChange?: (tab: "list" | "details" | "onboarding") => void;
  onEmployeeSelect?: (id: string) => void;
  onAddEmployee?: () => void;
  onImportEmployees?: () => void;
  onExportEmployees?: () => void;
}

const EmployeeManagement: React.FC<EmployeeManagementProps> = ({
  activeTab = "list",
  selectedEmployeeId = null,
  onTabChange = () => {},
  onEmployeeSelect = () => {},
  onAddEmployee = () => {},
  onImportEmployees = () => {},
  onExportEmployees = () => {},
}) => {
  // Estados
  const [activeView, setActiveView] = useState<"list" | "details" | "onboarding">("list");
  const [currentTab, setCurrentTab] = useState<"list" | "details" | "onboarding">(activeTab);
  const [currentEmployeeId, setCurrentEmployeeId] = useState<string | null>(selectedEmployeeId);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showAddEmployeeDialog, setShowAddEmployeeDialog] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<string>("");
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    status: "active",
    join_date: new Date().toISOString().split("T")[0],
  });
  
  const navigate = useNavigate();

  // Efeito para carregar funcionários ao montar o componente
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Efeito para filtrar funcionários quando os filtros ou a lista mudam
  useEffect(() => {
    filterEmployees();
  }, [employees, searchTerm, departmentFilter, statusFilter]);

  // Efeito para sincronizar o estado interno com as props
  useEffect(() => {
    setCurrentTab(activeTab);
    setCurrentEmployeeId(selectedEmployeeId);
  }, [activeTab, selectedEmployeeId]);

  // Buscar funcionários do Supabase
  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .order("first_name", { ascending: true });

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
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrar funcionários com base nos critérios de pesquisa e filtros
  const filterEmployees = () => {
    let filtered = [...employees];

    // Filtrar por termo de pesquisa
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (emp) =>
          emp.first_name.toLowerCase().includes(term) ||
          emp.last_name.toLowerCase().includes(term) ||
          emp.email.toLowerCase().includes(term) ||
          emp.position.toLowerCase().includes(term)
      );
    }

    // Filtrar por departamento
    if (departmentFilter !== "all") {
      filtered = filtered.filter((emp) => emp.department === departmentFilter);
    }

    // Filtrar por status
    if (statusFilter !== "all") {
      filtered = filtered.filter((emp) => emp.status === statusFilter);
    }

    setFilteredEmployees(filtered);
  };

  // Manipuladores de eventos
  const handleTabChange = (tab: "list" | "details" | "onboarding") => {
    setCurrentTab(tab);
    onTabChange(tab);
  };

  const handleViewDetails = (id: string) => {
    setCurrentEmployeeId(id);
    setCurrentTab("details");
    onEmployeeSelect(id);
  };

  const handleBackToList = () => {
    setCurrentTab("list");
    onTabChange("list");
  };

  const handleAddEmployee = async () => {
    try {
      // Validar campos obrigatórios
      if (!newEmployee.first_name || !newEmployee.last_name || !newEmployee.email || !newEmployee.position || !newEmployee.department) {
        toast({
          title: "Erro",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive",
        });
        return;
      }

      // Inserir novo funcionário no Supabase
      const { data, error } = await supabase.from("employees").insert([
        {
          first_name: newEmployee.first_name,
          last_name: newEmployee.last_name,
          email: newEmployee.email,
          phone: newEmployee.phone || null,
          position: newEmployee.position,
          department: newEmployee.department,
          status: newEmployee.status,
          join_date: newEmployee.join_date,
          address: newEmployee.address || null,
          national_id: newEmployee.national_id || null,
          tax_id: newEmployee.tax_id || null,
          social_security_number: newEmployee.social_security_number || null,
          bank_account: newEmployee.bank_account || null,
          emergency_contact_name: newEmployee.emergency_contact_name || null,
          emergency_contact_relationship: newEmployee.emergency_contact_relationship || null,
          emergency_contact_phone: newEmployee.emergency_contact_phone || null,
          avatar_url: newEmployee.avatar_url || null,
        },
      ]).select();

      if (error) throw error;

      // Fechar diálogo e atualizar lista
      setShowAddEmployeeDialog(false);
      
      // Resetar formulário
      setNewEmployee({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        position: "",
        department: "",
        status: "active",
        join_date: new Date().toISOString().split("T")[0],
      });
      
      // Atualizar lista de funcionários
      fetchEmployees();
      
      toast({
        title: "Sucesso",
        description: "Funcionário adicionado com sucesso.",
      });
      
      // Se houver callback, chamar
      if (onAddEmployee) onAddEmployee();
      
      // Se houver dados retornados, navegar para detalhes
      if (data && data.length > 0) {
        handleViewDetails(data[0].id);
      }
    } catch (error) {
      console.error("Erro ao adicionar funcionário:", error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o funcionário.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    setEmployeeToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDeleteEmployee = async () => {
    try {
      // Excluir funcionário do Supabase
      const { error } = await supabase
        .from("employees")
        .delete()
        .eq("id", employeeToDelete);

      if (error) throw error;

      // Fechar diálogo e atualizar lista
      setShowDeleteDialog(false);
      setEmployeeToDelete("");
      
      // Atualizar lista de funcionários
      fetchEmployees();
      
      toast({
        title: "Sucesso",
        description: "Funcionário excluído com sucesso.",
      });
      
      // Se estiver na página de detalhes do funcionário excluído, voltar para a lista
      if (currentTab === "details" && currentEmployeeId === employeeToDelete) {
        handleBackToList();
      }
    } catch (error) {
      console.error("Erro ao excluir funcionário:", error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o funcionário.",
        variant: "destructive",
      });
    }
  };

  const handleEditEmployee = (id: string) => {
    navigate(`/hr/employees/edit/${id}`);
  };

  const handleImportEmployees = () => {
    // Implementação de importação de funcionários
    if (onImportEmployees) onImportEmployees();
  };

  const handleExportEmployees = () => {
    // Implementação de exportação de funcionários
    if (onExportEmployees) onExportEmployees();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Função para iniciar o processo de onboarding
  const handleStartOnboarding = () => {
    setCurrentEmployeeId(null);
    setCurrentTab("onboarding");
  };

  // Função para finalizar o onboarding
  const handleOnboardingComplete = () => {
    toast({
      title: "Onboarding concluído",
      description: "O funcionário foi integrado com sucesso.",
    });
    setCurrentTab("list");
    // Recarregar a lista de funcionários
    fetchEmployees();
  };

  // Função para cancelar o onboarding
  const handleOnboardingCancel = () => {
    setCurrentTab("list");
  };

  // Renderização condicional com base na aba atual
  const renderView = () => {
    switch (currentTab) {
      case "details":
        return (
          <EmployeeDetail
            employeeId={currentEmployeeId!}
            onBack={handleBackToList}
            onEdit={(id) => handleEditEmployee(id)}
          />
        );
      case "onboarding":
        return (
          <EmployeeOnboarding
            employeeId={currentEmployeeId}
            onComplete={handleOnboardingComplete}
            onCancel={handleOnboardingCancel}
          />
        );
      case "list":
      default:
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestão de Funcionários</h2>
              <div className="flex space-x-2">
                <Button onClick={handleStartOnboarding}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Novo Funcionário
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="ativos">
              <TabsList>
                <TabsTrigger value="ativos">Funcionários Ativos</TabsTrigger>
                <TabsTrigger value="inativos">Inativos</TabsTrigger>
                <TabsTrigger value="todos">Todos</TabsTrigger>
              </TabsList>
              <TabsContent value="ativos" className="mt-4">
                <EmployeeTable
                  employees={employees.filter(emp => emp.status === 'active').map(emp => ({
                    id: emp.id,
                    name: `${emp.first_name} ${emp.last_name}`,
                    position: emp.position,
                    department: emp.department,
                    status: emp.status === 'on_leave' ? 'on-leave' : 
                           emp.status === 'terminated' ? 'inactive' : emp.status,
                    joinDate: emp.join_date
                  }))}
                  isLoading={isLoading}
                  onViewDetails={handleViewDetails}
                  onEdit={handleEditEmployee}
                  onDelete={handleDeleteEmployee}
                  onViewDocuments={handleViewDetails}
                />
              </TabsContent>
              <TabsContent value="inativos" className="mt-4">
                <EmployeeTable
                  employees={employees.filter(emp => emp.status !== 'active').map(emp => ({
                    id: emp.id,
                    name: `${emp.first_name} ${emp.last_name}`,
                    position: emp.position,
                    department: emp.department,
                    status: emp.status === 'on_leave' ? 'on-leave' : 
                           emp.status === 'terminated' ? 'inactive' : emp.status,
                    joinDate: emp.join_date
                  }))}
                  isLoading={isLoading}
                  onViewDetails={handleViewDetails}
                  onEdit={handleEditEmployee}
                  onDelete={handleDeleteEmployee}
                  onViewDocuments={handleViewDetails}
                />
              </TabsContent>
              <TabsContent value="todos" className="mt-4">
                <EmployeeTable
                  employees={employees.map(emp => ({
                    id: emp.id,
                    name: `${emp.first_name} ${emp.last_name}`,
                    position: emp.position,
                    department: emp.department,
                    status: emp.status === 'on_leave' ? 'on-leave' : 
                           emp.status === 'terminated' ? 'inactive' : emp.status,
                    joinDate: emp.join_date
                  }))}
                  isLoading={isLoading}
                  onViewDetails={handleViewDetails}
                  onEdit={handleEditEmployee}
                  onDelete={handleDeleteEmployee}
                  onViewDocuments={handleViewDetails}
                />
              </TabsContent>
            </Tabs>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto py-6">
      {renderView()}
    </div>
  );
};

export default EmployeeManagement;
