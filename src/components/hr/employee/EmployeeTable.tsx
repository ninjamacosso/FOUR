import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  FileText,
} from "lucide-react";

// Interfaces
interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  status: "active" | "inactive" | "on-leave";
  joinDate: string;
}

interface EmployeeTableProps {
  employees?: Employee[];
  isLoading?: boolean;
  onViewDetails?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewDocuments?: (id: string) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees = [],
  isLoading = false,
  onViewDetails = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onViewDocuments = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Filtra os funcionários com base no termo de busca
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Função para renderizar badges de status
  const getStatusBadge = (status: Employee["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Ativo
          </Badge>
        );
      case "inactive":
        return <Badge variant="destructive">Inativo</Badge>;
      case "on-leave":
        return (
          <Badge
            variant="secondary"
            className="bg-amber-100 text-amber-800 hover:bg-amber-200"
          >
            De Férias
          </Badge>
        );
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  // Renderização do componente
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      {/* Cabeçalho com título e busca */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Diretório de Funcionários
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar funcionários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-[300px]"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Mensagem de erro, se houver */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
      )}

      {/* Tabela */}
      <div className="rounded-md border">
        <Table>
          <TableCaption>Lista de funcionários na organização</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data de Admissão</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-gray-500"
                >
                  Carregando...
                </TableCell>
              </TableRow>
            ) : filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{getStatusBadge(employee.status)}</TableCell>
                  <TableCell>{employee.joinDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onViewDetails(employee.id)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(employee.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onViewDocuments(employee.id)}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Ver Documentos
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete(employee.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-gray-500"
                >
                  Nenhum funcionário encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Dados padrão (mock) - usados apenas como fallback
const defaultEmployees: Employee[] = [
  {
    id: "EMP001",
    name: "João Silva",
    position: "Engenheiro de Software",
    department: "TI",
    status: "active",
    joinDate: "2022-03-15",
  },
  {
    id: "EMP002",
    name: "Maria Santos",
    position: "Gerente de RH",
    department: "Recursos Humanos",
    status: "active",
    joinDate: "2021-06-10",
  },
  {
    id: "EMP003",
    name: "António Fernandes",
    position: "Analista Financeiro",
    department: "Finanças",
    status: "on-leave",
    joinDate: "2020-11-05",
  },
  {
    id: "EMP004",
    name: "Luísa Costa",
    position: "Especialista de Marketing",
    department: "Marketing",
    status: "active",
    joinDate: "2022-01-20",
  },
  {
    id: "EMP005",
    name: "Carlos Mendes",
    position: "Gerente de Operações",
    department: "Operações",
    status: "inactive",
    joinDate: "2019-08-12",
  },
];

export default EmployeeTable;
