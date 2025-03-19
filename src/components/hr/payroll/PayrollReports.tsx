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
  FileText,
  Download,
  Filter,
  Calendar,
  BarChart,
  PieChart,
  TrendingUp,
  Users,
  Building,
  Mail,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface PayrollReportsProps {
  formatCurrency: (value: number) => string;
}

// Lista de relatórios disponíveis
const availableReports = [
  {
    id: 1,
    name: "Resumo da Folha",
    description: "Resumo geral da folha de pagamento do período",
    icon: <FileText className="h-5 w-5" />,
    type: "summary",
    formats: ["PDF", "Excel"],
  },
  {
    id: 2,
    name: "Análise por Departamento",
    description: "Distribuição de salários por departamento",
    icon: <Building className="h-5 w-5" />,
    type: "department",
    formats: ["PDF", "Excel"],
  },
  {
    id: 3,
    name: "Evolução Salarial",
    description: "Análise da evolução salarial ao longo do tempo",
    icon: <TrendingUp className="h-5 w-5" />,
    type: "evolution",
    formats: ["PDF", "Excel"],
  },
  {
    id: 4,
    name: "Benefícios e Deduções",
    description: "Detalhamento de benefícios e deduções por funcionário",
    icon: <BarChart className="h-5 w-5" />,
    type: "benefits",
    formats: ["PDF", "Excel"],
  },
  {
    id: 5,
    name: "Horas Extras",
    description: "Relatório de horas extras do período",
    icon: <Calendar className="h-5 w-5" />,
    type: "overtime",
    formats: ["PDF", "Excel"],
  },
  {
    id: 6,
    name: "Funcionários",
    description: "Lista completa de funcionários e seus salários",
    icon: <Users className="h-5 w-5" />,
    type: "employees",
    formats: ["PDF", "Excel"],
  },
];

// Histórico de relatórios gerados
const reportHistory = [
  {
    id: 1,
    name: "Resumo da Folha",
    period: "Março 2024",
    generatedAt: "26/03/2024 14:30",
    generatedBy: "Ana Silva",
    format: "PDF",
    status: "completed",
  },
  {
    id: 2,
    name: "Análise por Departamento",
    period: "Março 2024",
    generatedAt: "26/03/2024 14:25",
    generatedBy: "Ana Silva",
    format: "Excel",
    status: "completed",
  },
  {
    id: 3,
    name: "Evolução Salarial",
    period: "1º Trimestre 2024",
    generatedAt: "26/03/2024 11:15",
    generatedBy: "Carlos Santos",
    format: "PDF",
    status: "completed",
  },
  {
    id: 4,
    name: "Benefícios e Deduções",
    period: "Março 2024",
    generatedAt: "26/03/2024 10:45",
    generatedBy: "Ana Silva",
    format: "Excel",
    status: "completed",
  },
];

const PayrollReports: React.FC<PayrollReportsProps> = ({ formatCurrency }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("202403");
  const [selectedFormat, setSelectedFormat] = useState("PDF");
  const [searchQuery, setSearchQuery] = useState("");

  // Função para gerar relatório
  const handleGenerateReport = (reportId: number, format: string) => {
    console.log("Gerando relatório:", reportId, "no formato:", format);
    // Implementar geração do relatório
  };

  // Função para baixar relatório do histórico
  const handleDownloadReport = (reportId: number) => {
    console.log("Baixando relatório:", reportId);
    // Implementar download do relatório
  };

  // Função para enviar relatório por email
  const handleEmailReport = (reportId: number) => {
    console.log("Enviando relatório por email:", reportId);
    // Implementar envio do relatório por email
  };

  return (
    <div className="space-y-6">
      {/* Relatórios Disponíveis */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Relatórios Disponíveis</CardTitle>
              <CardDescription>
                Gere relatórios detalhados da folha de pagamento
              </CardDescription>
            </div>
            <div className="flex gap-4">
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
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Formato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Formato</SelectLabel>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="Excel">Excel</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableReports.map((report) => (
              <Card key={report.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {report.icon}
                    <span className="ml-2">{report.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {report.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {report.formats.map((format) => (
                        <Badge key={format} variant="secondary">
                          {format}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleGenerateReport(report.id, selectedFormat)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Gerar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Histórico de Relatórios */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Histórico de Relatórios</CardTitle>
              <CardDescription>
                Relatórios gerados recentemente
              </CardDescription>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="text"
                placeholder="Buscar relatórios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[300px]"
              />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Relatório</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Gerado em</TableHead>
                <TableHead>Gerado por</TableHead>
                <TableHead>Formato</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportHistory.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.period}</TableCell>
                  <TableCell>{report.generatedAt}</TableCell>
                  <TableCell>{report.generatedBy}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{report.format}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownloadReport(report.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEmailReport(report.id)}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollReports; 