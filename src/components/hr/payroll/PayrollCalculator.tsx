import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calculator, Download, FileText, HelpCircle, Save } from "lucide-react";
import { formatKwanza } from "@/lib/currency";
import { supabase } from "@/lib/supabase";
import { 
  Employee, 
  PayrollItem, 
  PayrollPeriod,
  angolanTaxRates,
  calculateIncomeTax,
  calculateSocialSecurity,
  calculateEmployerSocialSecurity,
  calculateNetSalary,
  calculateOvertimeAmount
} from "@/types/hr.types";
import { toast } from "@/components/ui/use-toast";

// Interface para os dados de funcionário com informações de salário
interface EmployeePayrollData {
  id: string;
  first_name: string;
  last_name: string;
  position: string;
  base_salary: number;
  allowances: number;
  overtime_hours: number;
  overtime_rate: number;
}

// Interface para os resultados calculados da folha de pagamento
interface CalculatedEmployeePayroll {
  employee_id: string;
  full_name: string;
  position: string;
  base_salary: number;
  allowances: number;
  overtime_hours: number;
  overtime_rate: number;
  overtime_amount: number;
  gross_salary: number;
  income_tax: number;
  social_security: number;
  other_deductions: number;
  net_salary: number;
  employer_social_security: number;
}

// Interface para o resumo da folha de pagamento
interface PayrollSummary {
  total_employees: number;
  total_gross: number;
  total_net: number;
  total_income_tax: number;
  total_social_security: number;
  total_employer_social_security: number;
  total_other_deductions: number;
}

// Interface para as propriedades do componente
interface PayrollCalculatorProps {
  payrollPeriodId?: string;
  onSave?: (calculatedData: CalculatedEmployeePayroll[], summary: PayrollSummary) => void;
  onExport?: (format: "pdf" | "excel") => void;
}

const PayrollCalculator: React.FC<PayrollCalculatorProps> = ({
  payrollPeriodId,
  onSave,
  onExport,
}) => {
  // Estados
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeePayrollData, setEmployeePayrollData] = useState<EmployeePayrollData[]>([]);
  const [calculatedPayroll, setCalculatedPayroll] = useState<CalculatedEmployeePayroll[]>([]);
  const [payrollSummary, setPayrollSummary] = useState<PayrollSummary>({
    total_employees: 0,
    total_gross: 0,
    total_net: 0,
    total_income_tax: 0,
    total_social_security: 0,
    total_employer_social_security: 0,
    total_other_deductions: 0,
  });
  const [payrollPeriods, setPayrollPeriods] = useState<PayrollPeriod[]>([]);
  const [selectedPeriodId, setSelectedPeriodId] = useState<string>(payrollPeriodId || "");
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState("calculator");

  // Carregar funcionários e períodos de folha de pagamento
  useEffect(() => {
    fetchEmployees();
    fetchPayrollPeriods();
  }, []);

  // Carregar dados de folha de pagamento quando um período é selecionado
  useEffect(() => {
    if (selectedPeriodId) {
      fetchPayrollData(selectedPeriodId);
    }
  }, [selectedPeriodId]);

  // Buscar funcionários do Supabase
  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("status", "active");

      if (error) throw error;
      
      if (data) {
        // Converter o status para o tipo correto
        const typedEmployees = data.map(emp => ({
          ...emp,
          status: emp.status as Employee["status"]
        }));
        
        setEmployees(typedEmployees);
        
        // Inicializar dados de folha de pagamento com valores padrão
        const initialPayrollData = data.map(emp => ({
          id: emp.id,
          first_name: emp.first_name,
          last_name: emp.last_name,
          position: emp.position,
          base_salary: 0, // Será preenchido com dados reais
          allowances: 0,
          overtime_hours: 0,
          overtime_rate: 1.5, // Taxa padrão de hora extra (50% adicional)
        }));
        
        setEmployeePayrollData(initialPayrollData);
      }
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os funcionários.",
        variant: "destructive",
      });
    }
  };

  // Buscar períodos de folha de pagamento do Supabase
  const fetchPayrollPeriods = async () => {
    try {
      const { data, error } = await supabase
        .from("payroll_periods")
        .select("*")
        .order("start_date", { ascending: false });

      if (error) throw error;
      
      if (data) {
        // Converter o status para o tipo correto
        const typedPayrollPeriods = data.map(period => ({
          ...period,
          status: period.status as PayrollPeriod["status"]
        }));
        
        setPayrollPeriods(typedPayrollPeriods);
        
        // Se não houver período selecionado e existirem períodos, selecione o mais recente
        if (!selectedPeriodId && typedPayrollPeriods.length > 0) {
          setSelectedPeriodId(typedPayrollPeriods[0].id);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar períodos de folha de pagamento:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os períodos de folha de pagamento.",
        variant: "destructive",
      });
    }
  };

  // Buscar dados de folha de pagamento para um período específico
  const fetchPayrollData = async (periodId: string) => {
    try {
      // Buscar contratos ativos para obter salários base
      const { data: contractsData, error: contractsError } = await supabase
        .from("contracts")
        .select("*")
        .eq("status", "active");

      if (contractsError) throw contractsError;

      // Buscar itens de folha de pagamento existentes para este período
      const { data: payrollItemsData, error: payrollItemsError } = await supabase
        .from("payroll_items")
        .select("*")
        .eq("payroll_period_id", periodId);

      if (payrollItemsError) throw payrollItemsError;

      // Atualizar dados de folha de pagamento com valores dos contratos e itens existentes
      if (contractsData) {
        const updatedPayrollData = employeePayrollData.map(emp => {
          // Encontrar contrato ativo do funcionário
          const contract = contractsData.find(c => c.employee_id === emp.id);
          
          // Encontrar item de folha de pagamento existente
          const payrollItem = payrollItemsData?.find(p => p.employee_id === emp.id);
          
          return {
            ...emp,
            base_salary: contract?.salary || 0,
            allowances: payrollItem?.allowances || 0,
            overtime_hours: payrollItem?.overtime_hours || 0,
            overtime_rate: payrollItem?.overtime_rate || 1.5,
          };
        });
        
        setEmployeePayrollData(updatedPayrollData);
        
        // Se existirem itens de folha de pagamento, calcular imediatamente
        if (payrollItemsData && payrollItemsData.length > 0) {
          calculatePayroll();
        }
      }
    } catch (error) {
      console.error("Erro ao buscar dados de folha de pagamento:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados de folha de pagamento.",
        variant: "destructive",
      });
    }
  };

  // Atualizar dados de um funcionário específico
  const updateEmployeeData = (
    employeeId: string,
    field: keyof EmployeePayrollData,
    value: number | string
  ) => {
    setEmployeePayrollData(prev =>
      prev.map(emp =>
        emp.id === employeeId
          ? { ...emp, [field]: typeof value === "string" ? parseFloat(value) || 0 : value }
          : emp
      )
    );
  };

  // Calcular folha de pagamento
  const calculatePayroll = () => {
    setIsCalculating(true);
    
    try {
      // Calcular folha de pagamento para cada funcionário
      const calculated = employeePayrollData.map(emp => {
        // Calcular valor das horas extras
        const overtimeAmount = calculateOvertimeAmount(
          emp.base_salary,
          emp.overtime_hours,
          emp.overtime_rate
        );
        
        // Calcular salário bruto
        const grossSalary = emp.base_salary + emp.allowances + overtimeAmount;
        
        // Calcular imposto de renda
        const incomeTax = calculateIncomeTax(grossSalary, angolanTaxRates);
        
        // Calcular seguridade social
        const socialSecurity = calculateSocialSecurity(grossSalary, angolanTaxRates);
        
        // Calcular contribuição do empregador para seguridade social
        const employerSocialSecurity = calculateEmployerSocialSecurity(grossSalary, angolanTaxRates);
        
        // Outras deduções (valor fixo para demonstração)
        const otherDeductions = 0;
        
        // Calcular salário líquido
        const netSalary = calculateNetSalary(
          emp.base_salary,
          emp.allowances,
          overtimeAmount,
          incomeTax,
          socialSecurity,
          otherDeductions
        );
        
        return {
          employee_id: emp.id,
          full_name: `${emp.first_name} ${emp.last_name}`,
          position: emp.position,
          base_salary: emp.base_salary,
          allowances: emp.allowances,
          overtime_hours: emp.overtime_hours,
          overtime_rate: emp.overtime_rate,
          overtime_amount: overtimeAmount,
          gross_salary: grossSalary,
          income_tax: incomeTax,
          social_security: socialSecurity,
          other_deductions: otherDeductions,
          net_salary: netSalary,
          employer_social_security: employerSocialSecurity,
        };
      });
      
      setCalculatedPayroll(calculated);
      
      // Calcular resumo da folha de pagamento
      const summary: PayrollSummary = {
        total_employees: calculated.length,
        total_gross: calculated.reduce((sum, emp) => sum + emp.gross_salary, 0),
        total_net: calculated.reduce((sum, emp) => sum + emp.net_salary, 0),
        total_income_tax: calculated.reduce((sum, emp) => sum + emp.income_tax, 0),
        total_social_security: calculated.reduce((sum, emp) => sum + emp.social_security, 0),
        total_employer_social_security: calculated.reduce((sum, emp) => sum + emp.employer_social_security, 0),
        total_other_deductions: calculated.reduce((sum, emp) => sum + emp.other_deductions, 0),
      };
      
      setPayrollSummary(summary);
      
      // Chamar callback onSave se fornecido
      if (onSave) {
        onSave(calculated, summary);
      }
      
      toast({
        title: "Cálculo concluído",
        description: "A folha de pagamento foi calculada com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao calcular folha de pagamento:", error);
      toast({
        title: "Erro",
        description: "Não foi possível calcular a folha de pagamento.",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  // Salvar folha de pagamento no Supabase
  const savePayroll = async () => {
    if (!selectedPeriodId || calculatedPayroll.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione um período e calcule a folha de pagamento antes de salvar.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Preparar itens de folha de pagamento para inserção/atualização
      const payrollItems = calculatedPayroll.map(emp => ({
        payroll_period_id: selectedPeriodId,
        employee_id: emp.employee_id,
        base_salary: emp.base_salary,
        allowances: emp.allowances,
        overtime_hours: emp.overtime_hours,
        overtime_rate: emp.overtime_rate,
        income_tax: emp.income_tax,
        social_security: emp.social_security,
        other_deductions: emp.other_deductions,
        net_salary: emp.net_salary,
      }));
      
      // Excluir itens existentes para este período
      const { error: deleteError } = await supabase
        .from("payroll_items")
        .delete()
        .eq("payroll_period_id", selectedPeriodId);
      
      if (deleteError) throw deleteError;
      
      // Inserir novos itens
      const { error: insertError } = await supabase
        .from("payroll_items")
        .insert(payrollItems);
      
      if (insertError) throw insertError;
      
      // Atualizar status do período para "completed"
      const { error: updateError } = await supabase
        .from("payroll_periods")
        .update({
          status: "completed",
          processed_by: "current_user", // Idealmente, usar ID do usuário atual
          processed_at: new Date().toISOString(),
        })
        .eq("id", selectedPeriodId);
      
      if (updateError) throw updateError;
      
      toast({
        title: "Folha de pagamento salva",
        description: "A folha de pagamento foi salva com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao salvar folha de pagamento:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar a folha de pagamento.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Exportar folha de pagamento
  const exportPayroll = async (format: "pdf" | "excel") => {
    if (calculatedPayroll.length === 0) {
      toast({
        title: "Erro",
        description: "Calcule a folha de pagamento antes de exportar.",
        variant: "destructive",
      });
      return;
    }
    
    setIsExporting(true);
    
    try {
      // Simulação de exportação
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Chamar callback onExport se fornecido
      if (onExport) {
        onExport(format);
      }
      
      toast({
        title: "Exportação concluída",
        description: `A folha de pagamento foi exportada em formato ${format.toUpperCase()}.`,
      });
    } catch (error) {
      console.error(`Erro ao exportar folha de pagamento como ${format}:`, error);
      toast({
        title: "Erro",
        description: `Não foi possível exportar a folha de pagamento como ${format}.`,
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Calculadora de Folha de Pagamento</CardTitle>
        <CardDescription>
          Calcule a folha de pagamento dos funcionários com base nos salários e benefícios.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="calculator">Calculadora</TabsTrigger>
            <TabsTrigger value="results">Resultados</TabsTrigger>
            <TabsTrigger value="summary">Resumo</TabsTrigger>
          </TabsList>
          
          {/* Aba de Calculadora */}
          <TabsContent value="calculator">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-full">
                  <label className="text-sm font-medium">Período de Pagamento</label>
                  <Select value={selectedPeriodId} onValueChange={setSelectedPeriodId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um período" />
                    </SelectTrigger>
                    <SelectContent>
                      {payrollPeriods.map(period => (
                        <SelectItem key={period.id} value={period.id}>
                          {period.name} ({new Date(period.start_date).toLocaleDateString()} - {new Date(period.end_date).toLocaleDateString()})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  onClick={calculatePayroll}
                  disabled={isCalculating || !selectedPeriodId}
                  className="mt-6"
                >
                  {isCalculating ? (
                    <>Calculando...</>
                  ) : (
                    <>
                      <Calculator className="mr-2 h-4 w-4" />
                      Calcular
                    </>
                  )}
                </Button>
              </div>
              
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Funcionário</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead>Salário Base (Kz)</TableHead>
                      <TableHead>Subsídios (Kz)</TableHead>
                      <TableHead>Horas Extras</TableHead>
                      <TableHead>Taxa de Hora Extra</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeePayrollData.map(emp => (
                      <TableRow key={emp.id}>
                        <TableCell>{emp.first_name} {emp.last_name}</TableCell>
                        <TableCell>{emp.position}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={emp.base_salary}
                            onChange={e => updateEmployeeData(emp.id, "base_salary", e.target.value)}
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={emp.allowances}
                            onChange={e => updateEmployeeData(emp.id, "allowances", e.target.value)}
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={emp.overtime_hours}
                            onChange={e => updateEmployeeData(emp.id, "overtime_hours", e.target.value)}
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={emp.overtime_rate}
                            onChange={e => updateEmployeeData(emp.id, "overtime_rate", e.target.value)}
                            className="w-full"
                            step="0.1"
                            min="1"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
          
          {/* Aba de Resultados */}
          <TabsContent value="results">
            {calculatedPayroll.length > 0 ? (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Funcionário</TableHead>
                      <TableHead>Salário Base</TableHead>
                      <TableHead>Subsídios</TableHead>
                      <TableHead>Horas Extras</TableHead>
                      <TableHead>Salário Bruto</TableHead>
                      <TableHead>IRT</TableHead>
                      <TableHead>Seg. Social</TableHead>
                      <TableHead>Outras Deduções</TableHead>
                      <TableHead>Salário Líquido</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calculatedPayroll.map(emp => (
                      <TableRow key={emp.employee_id}>
                        <TableCell>{emp.full_name}</TableCell>
                        <TableCell>{formatKwanza(emp.base_salary)}</TableCell>
                        <TableCell>{formatKwanza(emp.allowances)}</TableCell>
                        <TableCell>
                          {emp.overtime_hours}h ({formatKwanza(emp.overtime_amount)})
                        </TableCell>
                        <TableCell className="font-medium">{formatKwanza(emp.gross_salary)}</TableCell>
                        <TableCell className="text-red-500">-{formatKwanza(emp.income_tax)}</TableCell>
                        <TableCell className="text-red-500">-{formatKwanza(emp.social_security)}</TableCell>
                        <TableCell className="text-red-500">-{formatKwanza(emp.other_deductions)}</TableCell>
                        <TableCell className="font-bold">{formatKwanza(emp.net_salary)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Calcule a folha de pagamento para ver os resultados.
                </p>
              </div>
            )}
          </TabsContent>
          
          {/* Aba de Resumo */}
          <TabsContent value="summary">
            {calculatedPayroll.length > 0 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Resumo da Folha</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Total de Funcionários:</dt>
                          <dd className="font-medium">{payrollSummary.total_employees}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Total Bruto:</dt>
                          <dd className="font-medium">{formatKwanza(payrollSummary.total_gross)}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Total Líquido:</dt>
                          <dd className="font-bold">{formatKwanza(payrollSummary.total_net)}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Impostos e Contribuições</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Total IRT:</dt>
                          <dd className="font-medium">{formatKwanza(payrollSummary.total_income_tax)}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Seg. Social (Funcionários):</dt>
                          <dd className="font-medium">{formatKwanza(payrollSummary.total_social_security)}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Seg. Social (Empresa):</dt>
                          <dd className="font-medium">{formatKwanza(payrollSummary.total_employer_social_security)}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="border p-4 rounded-md bg-muted/50">
                  <h3 className="font-medium mb-2">Custo Total para a Empresa</h3>
                  <p className="text-2xl font-bold">
                    {formatKwanza(payrollSummary.total_gross + payrollSummary.total_employer_social_security)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Inclui salários brutos e contribuições da empresa para a seguridade social.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Calcule a folha de pagamento para ver o resumo.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => exportPayroll("pdf")}
            disabled={isExporting || calculatedPayroll.length === 0}
          >
            {isExporting ? (
              <>Exportando...</>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Exportar PDF
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => exportPayroll("excel")}
            disabled={isExporting || calculatedPayroll.length === 0}
          >
            {isExporting ? (
              <>Exportando...</>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Exportar Excel
              </>
            )}
          </Button>
        </div>
        
        <Button
          onClick={savePayroll}
          disabled={isSaving || calculatedPayroll.length === 0}
        >
          {isSaving ? (
            <>Salvando...</>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Salvar Folha
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PayrollCalculator;
