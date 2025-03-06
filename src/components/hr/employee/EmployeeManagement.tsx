import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, Search, Filter, Plus, Download, Upload } from "lucide-react";
import EmployeeTable from "./EmployeeTable";
import EmployeeDetail from "./EmployeeDetail";

// Interfaces
interface FilterOption {
  id: string;
  name: string;
}

interface Employee {
  id: string;
  // Add other employee properties as needed
}

interface EmployeeManagementProps {
  activeTab?: "list" | "details";
  selectedEmployeeId?: string;
  onTabChange?: (tab: "list" | "details") => void;
  onEmployeeSelect?: (id: string) => void;
  onAddEmployee?: () => void;
  onImportEmployees?: () => void;
  onExportEmployees?: () => void;
}

interface EmployeeTableProps {
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onViewDocuments: (id: string) => void;
  employees: Employee[];
  isLoading: boolean;
}

interface EmployeeDetailProps {
  employeeId: string;
  onBack: () => void;
  onEdit: (id: string) => void;
}

const EmployeeManagement: React.FC<EmployeeManagementProps> = ({
  activeTab = "list",
  selectedEmployeeId = "",
  onTabChange = () => {},
  onEmployeeSelect = () => {},
  onAddEmployee = () => {},
  onImportEmployees = () => {},
  onExportEmployees = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const departments: FilterOption[] = [
    { id: "all", name: "Todos os Departamentos" },
    { id: "it", name: "TI" },
    { id: "hr", name: "Recursos Humanos" },
    { id: "finance", name: "Finanças" },
    { id: "marketing", name: "Marketing" },
    { id: "operations", name: "Operações" },
  ];

  const statuses: FilterOption[] = [
    { id: "all", name: "Todos os Status" },
    { id: "active", name: "Ativo" },
    { id: "inactive", name: "Inativo" },
    { id: "on-leave", name: "De Férias" },
  ];

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      try {
        // Simulating API call - replace with actual API endpoint
        const response = await new Promise<Employee[]>((resolve) => {
          setTimeout(() => resolve([]), 1000);
        });
        setEmployees(response);
        setError(null);
      } catch (err) {
        setError("Erro ao carregar funcionários");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, [searchTerm, departmentFilter, statusFilter]);

  const handleViewDetails = (id: string) => {
    onEmployeeSelect(id);
    onTabChange("details");
  };

  const handleEditEmployee = (id: string) => {
    onEmployeeSelect(id);
    onTabChange("details");
  };

  const handleDeleteEmployee = async (id: string) => {
    try {
      // Add actual API call here
      console.log(`Excluir funcionário com ID: ${id}`);
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (error) {
      setError("Erro ao excluir funcionário");
      console.error(error);
    }
  };

  const handleViewDocuments = (id: string) => {
    onEmployeeSelect(id);
    onTabChange("details");
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Users className="h-6 w-6 mr-2 text-primary" />
          <h1 className="text-2xl font-bold text-gray-800">
            Gestão de Funcionários
          </h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onImportEmployees}
            className="flex items-center"
          >
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button
            variant="outline"
            onClick={onExportEmployees}
            className="flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={onAddEmployee} className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Funcionário
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
      )}

      <Tabs
        value={activeTab}
        onValueChange={onTabChange}
        className="w-full space-y-6"
      >
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="list" className="px-6">
              Lista de Funcionários
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="px-6"
              disabled={!selectedEmployeeId}
            >
              Detalhes do Funcionário
            </TabsTrigger>
          </TabsList>

          {activeTab === "list" && (
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar funcionários..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-[250px]"
                />
              </div>
              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Departamento" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.id} value={status.id}>
                      {status.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <TabsContent value="list" className="mt-0">
          <Card className="border-none shadow-sm">
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-4 text-center">Carregando...</div>
              ) : (
                <EmployeeTable
                  onViewDetails={handleViewDetails}
                  onEdit={handleEditEmployee}
                  onDelete={handleDeleteEmployee}
                  onViewDocuments={handleViewDocuments}
                  employees={employees}
                  isLoading={isLoading}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="mt-0">
          {selectedEmployeeId ? (
            <EmployeeDetail
              employeeId={selectedEmployeeId}
              onBack={() => onTabChange("list")}
              onEdit={(id) => console.log("Edit employee", id)}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Nenhum Funcionário Selecionado</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Por favor, selecione um funcionário da lista para ver os
                  detalhes.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {activeTab === "list" && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">
            Estatísticas de Funcionários
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">
                      Total de Funcionários
                    </p>
                    <p className="text-2xl font-bold">124</p>
                  </div>
                  <Users className="h-8 w-8 text-primary opacity-70" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Ativos</p>
                    <p className="text-2xl font-bold">112</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs px-3 py-1">
                    90%
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">De Férias</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                  <Badge className="bg-amber-100 text-amber-800 text-xs px-3 py-1">
                    6%
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Inativos</p>
                    <p className="text-2xl font-bold">4</p>
                  </div>
                  <Badge className="bg-red-100 text-red-800 text-xs px-3 py-1">
                    4%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;
