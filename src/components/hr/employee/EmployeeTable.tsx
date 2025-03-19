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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  FileText,
  UserPlus,
  Filter,
  Download,
  UserCheck,
  UserMinus,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
  CircleSlash,
  ArrowUpDown,
  FileDown,
} from "lucide-react";

// Interfaces
interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  status: "active" | "inactive" | "on-leave";
  joinDate: string;
  avatar?: string;
  email?: string;
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
  employees = defaultEmployees,
  isLoading = false,
  onViewDetails = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onViewDocuments = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortColumn, setSortColumn] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Extrai os departamentos únicos para o filtro
  const departments = ["all", ...new Set(employees.map((emp) => emp.department))];

  // Função para extrair iniciais do nome para o avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Função para gerar cor de fundo baseada no nome (para consistência)
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-amber-500",
      "bg-rose-500",
      "bg-indigo-500",
      "bg-emerald-500",
      "bg-pink-500",
      "bg-cyan-500",
    ];
    
    // Soma simples dos códigos ASCII das letras do nome
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    return colors[hash % colors.length];
  };

  // Função para ordenar funcionários
  const sortEmployees = (employees: Employee[]) => {
    return [...employees].sort((a, b) => {
      let comparison = 0;
      
      switch (sortColumn) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "department":
          comparison = a.department.localeCompare(b.department);
          break;
        case "position":
          comparison = a.position.localeCompare(b.position);
          break;
        case "joinDate":
          comparison = new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });
  };

  // Filtra e ordena os funcionários
  const filteredAndSortedEmployees = sortEmployees(employees.filter(
    (employee) => {
      // Filtrar por termo de busca
      const matchesSearch = 
        searchTerm === "" ||
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtrar por departamento
      const matchesDepartment = 
        departmentFilter === "all" || 
        employee.department === departmentFilter;
      
      // Filtrar por status
      const matchesStatus = 
        statusFilter === "all" || 
        employee.status === statusFilter;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    }
  ));

  // Função para alternar a classificação
  const toggleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Função para renderizar badges de status
  const getStatusBadge = (status: Employee["status"]) => {
    const statusConfig = {
      active: {
        label: "Ativo",
        variant: "outline",
        className: "bg-green-50 border-green-200 text-green-700 hover:bg-green-100",
        icon: <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-green-600" />,
      },
      inactive: {
        label: "Inativo",
        variant: "outline",
        className: "bg-red-50 border-red-200 text-red-700 hover:bg-red-100",
        icon: <XCircle className="h-3.5 w-3.5 mr-1 text-red-600" />,
      },
      "on-leave": {
        label: "De Férias",
        variant: "outline",
        className: "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100",
        icon: <Calendar className="h-3.5 w-3.5 mr-1 text-amber-600" />,
      },
    };
    
    const config = statusConfig[status];
    
    return (
      <Badge variant="outline" className={`flex items-center ${config.className}`}>
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-AO', { 
      day: '2-digit', 
      month: '2-digit',
      year: 'numeric' 
    }).format(date);
  };

  // Renderização do componente
  return (
    <div className="w-full bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm">
      {/* Cabeçalho com título, filtros e busca */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          <UserCheck className="mr-2 h-5 w-5 text-primary" />
          Diretório de Funcionários
        </h2>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
          {/* Filtros */}
          <div className="flex items-center gap-2 flex-wrap">
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[180px] h-9 text-sm">
                <Filter className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Todos os Departamentos</SelectItem>
                  {departments.filter(d => d !== "all").map((department) => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px] h-9 text-sm">
                <Filter className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="active">Ativos</SelectItem>
                  <SelectItem value="inactive">Inativos</SelectItem>
                  <SelectItem value="on-leave">De Férias</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Busca */}
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por nome, cargo ou departamento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-[300px] h-9 text-sm"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Mensagem de erro, se houver */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-md mb-4 border border-red-200 dark:border-red-800">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        </div>
      )}

      {/* Tabela */}
      <div className="rounded-md border border-border overflow-hidden">
        <Table className="min-w-full">
          <TableCaption className="py-4 text-sm text-muted-foreground">
            {filteredAndSortedEmployees.length} funcionários encontrados de um total de {employees.length}
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-[50px]">Avatar</TableHead>
              <TableHead className="cursor-pointer" onClick={() => toggleSort("name")}>
                <div className="flex items-center gap-1">
                  Nome
                  <ArrowUpDown className={`h-3.5 w-3.5 text-muted-foreground ${sortColumn === "name" ? "opacity-100" : "opacity-50"}`} />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => toggleSort("position")}>
                <div className="flex items-center gap-1">
                  Cargo
                  <ArrowUpDown className={`h-3.5 w-3.5 text-muted-foreground ${sortColumn === "position" ? "opacity-100" : "opacity-50"}`} />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => toggleSort("department")}>
                <div className="flex items-center gap-1">
                  Departamento
                  <ArrowUpDown className={`h-3.5 w-3.5 text-muted-foreground ${sortColumn === "department" ? "opacity-100" : "opacity-50"}`} />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => toggleSort("status")}>
                <div className="flex items-center gap-1">
                  Status
                  <ArrowUpDown className={`h-3.5 w-3.5 text-muted-foreground ${sortColumn === "status" ? "opacity-100" : "opacity-50"}`} />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => toggleSort("joinDate")}>
                <div className="flex items-center gap-1">
                  Data de Admissão
                  <ArrowUpDown className={`h-3.5 w-3.5 text-muted-foreground ${sortColumn === "joinDate" ? "opacity-100" : "opacity-50"}`} />
                </div>
              </TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10"
                >
                  <div className="flex justify-center items-center space-x-2 text-muted-foreground">
                    <div className="w-6 h-6 border-2 border-t-primary rounded-full animate-spin"></div>
                    <span>Carregando funcionários...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredAndSortedEmployees.length > 0 ? (
              filteredAndSortedEmployees.map((employee) => (
                <TableRow 
                  key={employee.id} 
                  className="group hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => onViewDetails(employee.id)}
                >
                  <TableCell className="w-[50px]">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarImage src={employee.avatar} alt={employee.name} />
                      <AvatarFallback className={`text-white ${getAvatarColor(employee.name)}`}>
                        {getInitials(employee.name)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-primary-foreground">{employee.name}</div>
                    {employee.email && (
                      <div className="text-xs text-muted-foreground">{employee.email}</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium">
                      {employee.position}
                    </span>
                  </TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{getStatusBadge(employee.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                      {formatDate(employee.joinDate)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                onViewDetails(employee.id);
                              }}
                            >
                              <Eye className="h-4 w-4 text-blue-600" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Ver detalhes</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                onEdit(employee.id);
                              }}
                            >
                              <Edit className="h-4 w-4 text-amber-600" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Editar</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                onViewDocuments(employee.id);
                              }}
                            >
                              <FileText className="h-4 w-4 text-green-600" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Ver documentos</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDelete(employee.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Excluir</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="group-hover:hidden"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails(employee.id);
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4 text-blue-600" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(employee.id);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4 text-amber-600" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDocuments(employee.id);
                          }}
                        >
                          <FileText className="mr-2 h-4 w-4 text-green-600" />
                          Ver Documentos
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(employee.id);
                          }}
                          className="text-red-600 focus:text-red-700 focus:bg-red-50"
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
                  className="text-center py-10"
                >
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <CircleSlash className="h-10 w-10 mb-2 text-muted" />
                    <p>Nenhum funcionário encontrado</p>
                    <p className="text-sm mt-1">Tente ajustar os filtros ou a pesquisa</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Exportar resultados - aparece apenas quando há resultados filtrados */}
      {filteredAndSortedEmployees.length > 0 && (
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" className="text-xs">
            <FileDown className="h-3.5 w-3.5 mr-1.5" />
            Exportar resultados ({filteredAndSortedEmployees.length})
          </Button>
        </div>
      )}
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
    email: "joao.silva@empresa.com",
  },
  {
    id: "EMP002",
    name: "Maria Santos",
    position: "Gerente de RH",
    department: "Recursos Humanos",
    status: "active",
    joinDate: "2021-06-10",
    email: "maria.santos@empresa.com",
  },
  {
    id: "EMP003",
    name: "António Fernandes",
    position: "Analista Financeiro",
    department: "Finanças",
    status: "on-leave",
    joinDate: "2020-11-05",
    email: "antonio.fernandes@empresa.com",
  },
  {
    id: "EMP004",
    name: "Luísa Costa",
    position: "Especialista de Marketing",
    department: "Marketing",
    status: "active",
    joinDate: "2022-01-20",
    email: "luisa.costa@empresa.com",
  },
  {
    id: "EMP005",
    name: "Carlos Mendes",
    position: "Gerente de Operações",
    department: "Operações",
    status: "inactive",
    joinDate: "2019-08-12",
    email: "carlos.mendes@empresa.com",
  },
];

export default EmployeeTable;
