'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  PayrollProcessing, 
  PayrollSummary,
  PayrollEmployeeList,
  PayrollCalculation,
  PayrollDeductions,
  PayrollBenefits,
  PayrollHistory,
  PayrollSettings,
  PayrollReports,
  PayrollPayslips,
  formatCurrency
} from '@/components/hr/payroll';
import { HrPageHeader } from '@/components/hr/shared/HrPageHeader';
import { 
  BadgeDollarSign, 
  Users, 
  Calculator, 
  Minus, 
  Plus, 
  History,
  Settings,
  FileText,
  Mail
} from 'lucide-react';

// Dados fictícios da folha de pagamento
const payrollData = {
  totalEmployees: 245,
  totalGrossSalary: 24583500,
  totalNetSalary: 19768400,
  totalDeductions: 4815100,
  totalBenefits: 1230000,
  averageSalary: 100340,
  payrollStatus: "draft", // draft, calculated, approved, paid
  currency: "AOA",
  lastProcessed: "25/02/2024",
  paymentDate: "05/03/2024",
};

export default function PayrollPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-6 p-6">
      <HrPageHeader
        title="Folha de Pagamento"
        description="Gerencie folhas de pagamento e contracheques dos funcionários"
        icon={<BadgeDollarSign className="h-6 w-6" />}
      />

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-8 w-full">
          <TabsTrigger value="overview">
            <BadgeDollarSign className="h-4 w-4 mr-2" />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="employees">
            <Users className="h-4 w-4 mr-2" />
            Funcionários
          </TabsTrigger>
          <TabsTrigger value="calculation">
            <Calculator className="h-4 w-4 mr-2" />
            Cálculos
          </TabsTrigger>
          <TabsTrigger value="deductions">
            <Minus className="h-4 w-4 mr-2" />
            Deduções
          </TabsTrigger>
          <TabsTrigger value="benefits">
            <Plus className="h-4 w-4 mr-2" />
            Benefícios
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="h-4 w-4 mr-2" />
            Histórico
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="h-4 w-4 mr-2" />
            Relatórios
          </TabsTrigger>
          <TabsTrigger value="payslips">
            <Mail className="h-4 w-4 mr-2" />
            Contracheques
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <PayrollProcessing formatCurrency={formatCurrency} />
          <PayrollSummary data={payrollData} formatCurrency={formatCurrency} />
        </TabsContent>

        <TabsContent value="employees">
          <PayrollEmployeeList formatCurrency={formatCurrency} payrollStatus={payrollData.payrollStatus} />
        </TabsContent>

        <TabsContent value="calculation">
          <PayrollCalculation formatCurrency={formatCurrency} />
        </TabsContent>

        <TabsContent value="deductions">
          <PayrollDeductions formatCurrency={formatCurrency} />
        </TabsContent>

        <TabsContent value="benefits">
          <PayrollBenefits formatCurrency={formatCurrency} />
        </TabsContent>

        <TabsContent value="history">
          <PayrollHistory formatCurrency={formatCurrency} />
        </TabsContent>

        <TabsContent value="reports">
          <PayrollReports formatCurrency={formatCurrency} />
        </TabsContent>

        <TabsContent value="payslips">
          <PayrollPayslips formatCurrency={formatCurrency} />
        </TabsContent>
        
        {/* Aba de configurações acessível apenas pelo menu principal */}
        <TabsContent value="settings">
          <PayrollSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
} 