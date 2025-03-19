import React, { useState } from "react";
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
  BadgeDollarSign,
  Calendar,
  FileText,
  History,
  UserMinus,
  Settings,
  Calculator,
  Clock,
  PieChart,
  Download,
  Printer,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import PayrollSummary from "./PayrollSummary";
import PayrollEmployeeList from "./PayrollEmployeeList";
import PayrollCalculation from "./PayrollCalculation";
import PayrollDeductions from "./PayrollDeductions";
import PayrollBenefits from "./PayrollBenefits";
import PayrollHistory from "./PayrollHistory";
import PayrollSettings from "./PayrollSettings";

const PayrollProcessing: React.FC = () => {
  const [activeTab, setActiveTab] = useState("summary");
  const [selectedMonth, setSelectedMonth] = useState("3");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [payrollStatus, setPayrollStatus] = useState("draft"); // draft, processing, completed, approved

  // Dados fictícios para o resumo da folha de pagamento
  const payrollData = {
    totalEmployees: 245,
    totalGrossSalary: 24583500,
    totalNetSalary: 19768400,
    totalDeductions: 4815100,
    totalBenefits: 1230000,
    averageSalary: 100300,
    payrollStatus: payrollStatus,
    currency: "Kz", // Kwanza (moeda angolana)
    lastProcessed: "25/03/2023",
    paymentDate: "05/04/2023",
  };

  // Handles para ações da folha de pagamento
  const handleCalculatePayroll = () => {
    setPayrollStatus("processing");
    // Em um sistema real, aqui iniciaria o cálculo da folha no servidor
    
    // Simulando um processamento
    setTimeout(() => {
      setPayrollStatus("completed");
    }, 2000);
  };

  const handleApprovePayroll = () => {
    setPayrollStatus("approved");
    // Em um sistema real, aqui aprovaria a folha e a liberaria para pagamento
  };

  const handleReopenPayroll = () => {
    setPayrollStatus("draft");
    // Em um sistema real, aqui reabriria a folha para edições
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 2,
    });
  };

  // Status da folha com badge apropriado
  const getStatusText = () => {
    switch (payrollStatus) {
      case "draft":
        return "Rascunho";
      case "processing":
        return "Processando";
      case "completed":
        return "Calculado";
      case "approved":
        return "Aprovado";
      default:
        return payrollStatus;
    }
  };

  const getStatusColor = () => {
    switch (payrollStatus) {
      case "draft":
        return "text-amber-500 bg-amber-50 border-amber-200";
      case "processing":
        return "text-blue-500 bg-blue-50 border-blue-200";
      case "completed":
        return "text-emerald-500 bg-emerald-50 border-emerald-200";
      case "approved":
        return "text-purple-500 bg-purple-50 border-purple-200";
      default:
        return "text-gray-500 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Folha de Pagamento</h2>
          <p className="text-muted-foreground">
            Gerencie e processe a folha de pagamento dos funcionários
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex">
            <div className="mr-2">
              <Select
                value={selectedMonth}
                onValueChange={setSelectedMonth}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Mês" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Mês</SelectLabel>
                    <SelectItem value="1">Janeiro</SelectItem>
                    <SelectItem value="2">Fevereiro</SelectItem>
                    <SelectItem value="3">Março</SelectItem>
                    <SelectItem value="4">Abril</SelectItem>
                    <SelectItem value="5">Maio</SelectItem>
                    <SelectItem value="6">Junho</SelectItem>
                    <SelectItem value="7">Julho</SelectItem>
                    <SelectItem value="8">Agosto</SelectItem>
                    <SelectItem value="9">Setembro</SelectItem>
                    <SelectItem value="10">Outubro</SelectItem>
                    <SelectItem value="11">Novembro</SelectItem>
                    <SelectItem value="12">Dezembro</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select
                value={selectedYear}
                onValueChange={setSelectedYear}
              >
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Ano</SelectLabel>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className={`px-3 py-1 rounded-md border text-sm font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </div>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        {payrollStatus === "draft" && (
          <Button onClick={handleCalculatePayroll}>
            <Calculator className="mr-2 h-4 w-4" />
            Calcular Folha
          </Button>
        )}
        
        {payrollStatus === "completed" && (
          <Button onClick={handleApprovePayroll}>
            <BadgeDollarSign className="mr-2 h-4 w-4" />
            Aprovar Folha
          </Button>
        )}
        
        {payrollStatus === "approved" && (
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir Folha
          </Button>
        )}
        
        {(payrollStatus === "completed" || payrollStatus === "approved") && (
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        )}
        
        {(payrollStatus === "completed" || payrollStatus === "approved") && (
          <Button variant="outline" onClick={handleReopenPayroll}>
            <History className="mr-2 h-4 w-4" />
            Reabrir Folha
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-7 w-full">
          <TabsTrigger value="summary">
            <PieChart className="h-4 w-4 mr-2" />
            Resumo
          </TabsTrigger>
          <TabsTrigger value="employees">
            <UserMinus className="h-4 w-4 mr-2" />
            Funcionários
          </TabsTrigger>
          <TabsTrigger value="calculation">
            <Calculator className="h-4 w-4 mr-2" />
            Cálculos
          </TabsTrigger>
          <TabsTrigger value="deductions">
            <FileText className="h-4 w-4 mr-2" />
            Deduções
          </TabsTrigger>
          <TabsTrigger value="benefits">
            <BadgeDollarSign className="h-4 w-4 mr-2" />
            Benefícios
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="h-4 w-4 mr-2" />
            Histórico
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4 pt-4">
          <PayrollSummary data={payrollData} formatCurrency={formatCurrency} />
        </TabsContent>

        <TabsContent value="employees" className="space-y-4 pt-4">
          <PayrollEmployeeList formatCurrency={formatCurrency} payrollStatus={payrollStatus} />
        </TabsContent>

        <TabsContent value="calculation" className="space-y-4 pt-4">
          <PayrollCalculation formatCurrency={formatCurrency} />
        </TabsContent>

        <TabsContent value="deductions" className="space-y-4 pt-4">
          <PayrollDeductions formatCurrency={formatCurrency} />
        </TabsContent>

        <TabsContent value="benefits" className="space-y-4 pt-4">
          <PayrollBenefits formatCurrency={formatCurrency} />
        </TabsContent>

        <TabsContent value="history" className="space-y-4 pt-4">
          <PayrollHistory formatCurrency={formatCurrency} />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4 pt-4">
          <PayrollSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollProcessing;
