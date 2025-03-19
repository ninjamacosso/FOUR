import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileText,
  Download,
  Filter,
  Search,
  Mail,
  Printer,
  Eye,
  Send,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PayrollPayslipsProps {
  formatCurrency: (value: number) => string;
}

// Dados fictícios de contracheques
const mockPayslips = [
  {
    id: 1,
    employeeId: "EMP001",
    employeeName: "João Silva",
    department: "Tecnologia",
    position: "Desenvolvedor Sênior",
    period: "Março 2024",
    grossSalary: 1250000,
    netSalary: 987500,
    deductions: 262500,
    benefits: 125000,
    status: "sent",
    sentAt: "26/03/2024",
    viewedAt: "26/03/2024 15:30",
  },
  {
    id: 2,
    employeeId: "EMP002",
    employeeName: "Maria Santos",
    department: "Marketing",
    position: "Gerente de Marketing",
    period: "Março 2024",
    grossSalary: 1500000,
    netSalary: 1185000,
    deductions: 315000,
    benefits: 150000,
    status: "sent",
    sentAt: "26/03/2024",
    viewedAt: null,
  },
  {
    id: 3,
    employeeId: "EMP003",
    employeeName: "Pedro Costa",
    department: "Vendas",
    position: "Vendedor",
    period: "Março 2024",
    grossSalary: 850000,
    netSalary: 671500,
    deductions: 178500,
    benefits: 85000,
    status: "pending",
    sentAt: null,
    viewedAt: null,
  },
  {
    id: 4,
    employeeId: "EMP004",
    employeeName: "Ana Oliveira",
    department: "RH",
    position: "Analista de RH",
    period: "Março 2024",
    grossSalary: 950000,
    netSalary: 750500,
    deductions: 199500,
    benefits: 95000,
    status: "sent",
    sentAt: "26/03/2024",
    viewedAt: "26/03/2024 16:45",
  },
];

const PayrollPayslips: React.FC<PayrollPayslipsProps> = ({ formatCurrency }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("202403");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPayslip, setSelectedPayslip] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Função para enviar contracheque
  const handleSendPayslip = (payslipId: number) => {
    console.log("Enviando contracheque:", payslipId);
    // Implementar envio do contracheque
  };

  // Função para baixar contracheque
  const handleDownloadPayslip = (payslipId: number) => {
    console.log("Baixando contracheque:", payslipId);
    // Implementar download do contracheque
  };

  // Função para visualizar contracheque
  const handleViewPayslip = (payslip: any) => {
    setSelectedPayslip(payslip);
    setIsPreviewOpen(true);
  };

  // Função para enviar contracheque por email
  const handleEmailPayslip = (payslipId: number) => {
    console.log("Enviando contracheque por email:", payslipId);
    // Implementar envio do contracheque por email
  };

  // Função para imprimir contracheque
  const handlePrintPayslip = (payslipId: number) => {
    console.log("Imprimindo contracheque:", payslipId);
    // Implementar impressão do contracheque
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Contracheques</CardTitle>
              <CardDescription>
                Gerencie e envie os contracheques dos funcionários
              </CardDescription>
            </div>
            <div className="flex gap-4">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Buscar funcionário..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[300px]"
                />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>2024</SelectLabel>
                    <SelectItem value="202403">Março 2024</SelectItem>
                    <SelectItem value="202402">Fevereiro 2024</SelectItem>
                    <SelectItem value="202401">Janeiro 2024</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Enviar Todos
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Funcionário</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead className="text-right">Salário Bruto</TableHead>
                <TableHead className="text-right">Salário Líquido</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Enviado em</TableHead>
                <TableHead>Visualizado em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPayslips.map((payslip) => (
                <TableRow key={payslip.id}>
                  <TableCell className="font-medium">
                    {payslip.employeeName}
                    <br />
                    <span className="text-sm text-muted-foreground">
                      {payslip.employeeId}
                    </span>
                  </TableCell>
                  <TableCell>{payslip.department}</TableCell>
                  <TableCell>{payslip.position}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(payslip.grossSalary)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(payslip.netSalary)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={payslip.status === "sent" ? "success" : "secondary"}
                    >
                      {payslip.status === "sent" ? "Enviado" : "Pendente"}
                    </Badge>
                  </TableCell>
                  <TableCell>{payslip.sentAt || "-"}</TableCell>
                  <TableCell>
                    {payslip.viewedAt ? (
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {payslip.viewedAt}
                      </div>
                    ) : payslip.status === "sent" ? (
                      <div className="flex items-center">
                        <XCircle className="h-4 w-4 text-yellow-500 mr-2" />
                        Não visualizado
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewPayslip(payslip)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownloadPayslip(payslip.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEmailPayslip(payslip.id)}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePrintPayslip(payslip.id)}
                      >
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Diálogo de Visualização do Contracheque */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              Contracheque - {selectedPayslip?.employeeName}
            </DialogTitle>
            <DialogDescription>
              Período: {selectedPayslip?.period}
            </DialogDescription>
          </DialogHeader>

          {selectedPayslip && (
            <div className="space-y-6">
              {/* Informações do Funcionário */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informações do Funcionário</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Matrícula</p>
                    <p className="font-medium">{selectedPayslip.employeeId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nome</p>
                    <p className="font-medium">{selectedPayslip.employeeName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Departamento</p>
                    <p className="font-medium">{selectedPayslip.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cargo</p>
                    <p className="font-medium">{selectedPayslip.position}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Resumo dos Valores */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Resumo dos Valores</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Proventos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {formatCurrency(selectedPayslip.grossSalary)}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Descontos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-500">
                        {formatCurrency(selectedPayslip.deductions)}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Benefícios</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-500">
                        {formatCurrency(selectedPayslip.benefits)}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Valor Líquido</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-500">
                        {formatCurrency(selectedPayslip.netSalary)}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleDownloadPayslip(selectedPayslip.id)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Baixar PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleEmailPayslip(selectedPayslip.id)}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar por Email
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handlePrintPayslip(selectedPayslip.id)}
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PayrollPayslips; 