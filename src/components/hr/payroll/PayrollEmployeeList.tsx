import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Filter,
  MoreVertical,
  Download,
  Edit,
  Eye,
  Trash,
  BadgeDollarSign,
} from "lucide-react";

interface PayrollEmployeeListProps {
  formatCurrency: (value: number) => string;
  payrollStatus: string;
}

// Dados fictícios de funcionários
const mockEmployees = [
  {
    id: 1,
    name: "João Silva",
    department: "Tecnologia",
    position: "Desenvolvedor Sênior",
    baseSalary: 450000,
    benefits: 45000,
    deductions: 135000,
    netSalary: 360000,
    status: "active",
  },
  {
    id: 2,
    name: "Maria Santos",
    department: "Marketing",
    position: "Gerente de Marketing",
    baseSalary: 380000,
    benefits: 38000,
    deductions: 114000,
    netSalary: 304000,
    status: "active",
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    department: "Vendas",
    position: "Executivo de Vendas",
    baseSalary: 320000,
    benefits: 64000,
    deductions: 96000,
    netSalary: 288000,
    status: "active",
  },
  {
    id: 4,
    name: "Ana Costa",
    department: "RH",
    position: "Analista de RH",
    baseSalary: 280000,
    benefits: 28000,
    deductions: 84000,
    netSalary: 224000,
    status: "active",
  },
  {
    id: 5,
    name: "Carlos Ferreira",
    department: "Financeiro",
    position: "Contador",
    baseSalary: 350000,
    benefits: 35000,
    deductions: 105000,
    netSalary: 280000,
    status: "active",
  },
];

const PayrollEmployeeList: React.FC<PayrollEmployeeListProps> = ({
  formatCurrency,
  payrollStatus,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(mockEmployees);

  // Função para filtrar funcionários
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockEmployees.filter((employee) =>
      employee.name.toLowerCase().includes(query.toLowerCase()) ||
      employee.department.toLowerCase().includes(query.toLowerCase()) ||
      employee.position.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  // Função para visualizar detalhes do funcionário
  const handleViewEmployee = (employeeId: number) => {
    console.log("Visualizar funcionário:", employeeId);
    // Implementar visualização detalhada do funcionário
  };

  // Função para editar salário do funcionário
  const handleEditSalary = (employeeId: number) => {
    console.log("Editar salário:", employeeId);
    // Implementar edição de salário
  };

  // Função para remover funcionário da folha
  const handleRemoveFromPayroll = (employeeId: number) => {
    console.log("Remover da folha:", employeeId);
    // Implementar remoção da folha
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Lista de Funcionários</CardTitle>
            <CardDescription>
              Gerencie os funcionários incluídos na folha de pagamento
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="text"
                placeholder="Buscar funcionários..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-[300px]"
              />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead className="text-right">Salário Base</TableHead>
              <TableHead className="text-right">Benefícios</TableHead>
              <TableHead className="text-right">Deduções</TableHead>
              <TableHead className="text-right">Salário Líquido</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(employee.baseSalary)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(employee.benefits)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(employee.deductions)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(employee.netSalary)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleViewEmployee(employee.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleEditSalary(employee.id)}
                        disabled={payrollStatus !== "draft"}
                      >
                        <BadgeDollarSign className="h-4 w-4 mr-2" />
                        Editar Salário
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleRemoveFromPayroll(employee.id)}
                        disabled={payrollStatus !== "draft"}
                        className="text-red-600"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Remover da Folha
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PayrollEmployeeList; 