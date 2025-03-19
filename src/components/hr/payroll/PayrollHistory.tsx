import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Download,
  Eye,
  FileText,
  History,
  Search,
  Filter,
  BadgeDollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface PayrollHistoryProps {
  formatCurrency: (value: number) => string;
}

// Dados fictícios do histórico de folhas
const mockPayrollHistory = [
  {
    id: 1,
    period: "Março 2024",
    totalEmployees: 245,
    totalGrossSalary: 24583500,
    totalNetSalary: 19768400,
    totalDeductions: 4815100,
    totalBenefits: 1230000,
    processedAt: "25/03/2024",
    paidAt: "05/04/2024",
    status: "paid",
    processedBy: "Ana Silva",
    approvedBy: "Carlos Santos",
    variation: {
      grossSalary: 3.2,
      netSalary: 3.1,
      trend: "up",
    },
  },
  {
    id: 2,
    period: "Fevereiro 2024",
    totalEmployees: 242,
    totalGrossSalary: 23820000,
    totalNetSalary: 19175000,
    totalDeductions: 4645000,
    totalBenefits: 1191000,
    processedAt: "23/02/2024",
    paidAt: "05/03/2024",
    status: "paid",
    processedBy: "Ana Silva",
    approvedBy: "Carlos Santos",
    variation: {
      grossSalary: 2.8,
      netSalary: 2.7,
      trend: "up",
    },
  },
  {
    id: 3,
    period: "Janeiro 2024",
    totalEmployees: 240,
    totalGrossSalary: 23170000,
    totalNetSalary: 18670000,
    totalDeductions: 4500000,
    totalBenefits: 1158500,
    processedAt: "25/01/2024",
    paidAt: "05/02/2024",
    status: "paid",
    processedBy: "Ana Silva",
    approvedBy: "Carlos Santos",
    variation: {
      grossSalary: -1.2,
      netSalary: -1.0,
      trend: "down",
    },
  },
  {
    id: 4,
    period: "Dezembro 2023",
    totalEmployees: 238,
    totalGrossSalary: 23450000,
    totalNetSalary: 18860000,
    totalDeductions: 4590000,
    totalBenefits: 1172500,
    processedAt: "22/12/2023",
    paidAt: "05/01/2024",
    status: "paid",
    processedBy: "Ana Silva",
    approvedBy: "Carlos Santos",
    variation: {
      grossSalary: 12.5,
      netSalary: 12.3,
      trend: "up",
    },
  },
];

const PayrollHistory: React.FC<PayrollHistoryProps> = ({ formatCurrency }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [payrollHistory, setPayrollHistory] = useState(mockPayrollHistory);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState<any>(null);

  // Função para filtrar folhas
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockPayrollHistory.filter((payroll) =>
      payroll.period.toLowerCase().includes(query.toLowerCase()) ||
      payroll.processedBy.toLowerCase().includes(query.toLowerCase()) ||
      payroll.approvedBy.toLowerCase().includes(query.toLowerCase())
    );
    setPayrollHistory(filtered);
  };

  // Função para visualizar detalhes da folha
  const handleViewDetails = (payroll: any) => {
    setSelectedPayroll(payroll);
    setIsDetailsDialogOpen(true);
  };

  // Função para exportar folha
  const handleExportPayroll = (payrollId: number) => {
    console.log("Exportar folha:", payrollId);
    // Implementar exportação da folha
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Histórico de Folhas</CardTitle>
              <CardDescription>
                Histórico de processamento das folhas de pagamento
              </CardDescription>
            </div>
            <div className="flex gap-4">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Buscar folhas..."
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
              <Select
                value={selectedYear}
                onValueChange={setSelectedYear}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Ano</SelectLabel>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Período</TableHead>
                <TableHead>Funcionários</TableHead>
                <TableHead className="text-right">Salário Bruto</TableHead>
                <TableHead className="text-right">Salário Líquido</TableHead>
                <TableHead>Processado em</TableHead>
                <TableHead>Pago em</TableHead>
                <TableHead>Variação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollHistory.map((payroll) => (
                <TableRow key={payroll.id}>
                  <TableCell className="font-medium">{payroll.period}</TableCell>
                  <TableCell>{payroll.totalEmployees}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(payroll.totalGrossSalary)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(payroll.totalNetSalary)}
                  </TableCell>
                  <TableCell>{payroll.processedAt}</TableCell>
                  <TableCell>{payroll.paidAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {payroll.variation.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 mr-1 text-emerald-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1 text-red-500" />
                      )}
                      <span
                        className={
                          payroll.variation.trend === "up"
                            ? "text-emerald-500"
                            : "text-red-500"
                        }
                      >
                        {payroll.variation.grossSalary > 0 ? "+" : ""}
                        {payroll.variation.grossSalary}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(payroll)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleExportPayroll(payroll.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Folha - {selectedPayroll?.period}</DialogTitle>
            <DialogDescription>
              Informações detalhadas do processamento da folha
            </DialogDescription>
          </DialogHeader>
          {selectedPayroll && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Salário Bruto Total
                    </CardTitle>
                    <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatCurrency(selectedPayroll.totalGrossSalary)}
                    </div>
                    <div className="flex items-center pt-1 text-xs">
                      {selectedPayroll.variation.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                      )}
                      <span
                        className={
                          selectedPayroll.variation.trend === "up"
                            ? "text-emerald-500"
                            : "text-red-500"
                        }
                      >
                        {selectedPayroll.variation.grossSalary > 0 ? "+" : ""}
                        {selectedPayroll.variation.grossSalary}% em relação ao mês anterior
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Salário Líquido Total
                    </CardTitle>
                    <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatCurrency(selectedPayroll.totalNetSalary)}
                    </div>
                    <div className="flex items-center pt-1 text-xs">
                      {selectedPayroll.variation.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                      )}
                      <span
                        className={
                          selectedPayroll.variation.trend === "up"
                            ? "text-emerald-500"
                            : "text-red-500"
                        }
                      >
                        {selectedPayroll.variation.netSalary > 0 ? "+" : ""}
                        {selectedPayroll.variation.netSalary}% em relação ao mês anterior
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informações Gerais</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total de Funcionários:</span>
                      <span className="font-medium">{selectedPayroll.totalEmployees}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total de Deduções:</span>
                      <span className="font-medium">
                        {formatCurrency(selectedPayroll.totalDeductions)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total de Benefícios:</span>
                      <span className="font-medium">
                        {formatCurrency(selectedPayroll.totalBenefits)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Processamento</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processado em:</span>
                      <span className="font-medium">{selectedPayroll.processedAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processado por:</span>
                      <span className="font-medium">{selectedPayroll.processedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Aprovado por:</span>
                      <span className="font-medium">{selectedPayroll.approvedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data do Pagamento:</span>
                      <span className="font-medium">{selectedPayroll.paidAt}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => handleExportPayroll(selectedPayroll.id)}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Relatório Detalhado
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PayrollHistory; 