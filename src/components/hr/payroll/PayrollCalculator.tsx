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

// Interfaces
interface EmployeeData {
  id: string;
  name: string;
  position: string;
  baseSalary: number;
  allowances: number;
  overtimeHours: number;
  overtimeRate: number;
}

interface TaxRates {
  incomeTax: number;
  socialSecurity: number;
  otherDeductions: number;
}

interface CalculatedEmployeePayroll {
  employeeId: string;
  name: string;
  grossSalary: number;
  incomeTax: number;
  socialSecurity: number;
  otherDeductions: number;
  netSalary: number;
}

interface CalculatedPayroll {
  employees: CalculatedEmployeePayroll[];
  totalGross: number;
  totalNet: number;
  totalTax: number;
  totalSocialSecurity: number;
}

interface PayrollCalculatorProps {
  employeeData?: EmployeeData[];
  taxRates?: TaxRates;
  onSave?: (calculatedData: CalculatedPayroll) => void;
  onExport?: (format: "pdf" | "excel") => void;
}

// Dados padrão
const defaultEmployeeData: EmployeeData[] = [
  {
    id: "001",
    name: "João Silva",
    position: "Desenvolvedor de Software",
    baseSalary: 250000,
    allowances: 25000,
    overtimeHours: 10,
    overtimeRate: 1.5,
  },
  {
    id: "002",
    name: "Maria Fernandes",
    position: "Gerente de Projetos",
    baseSalary: 350000,
    allowances: 35000,
    overtimeHours: 5,
    overtimeRate: 1.5,
  },
  {
    id: "003",
    name: "Carlos Eduardo",
    position: "Especialista de RH",
    baseSalary: 200000,
    allowances: 20000,
    overtimeHours: 8,
    overtimeRate: 1.5,
  },
];

const defaultTaxRates: TaxRates = {
  incomeTax: 0.17, // 17% taxa de imposto de renda para Angola
  socialSecurity: 0.03, // 3% contribuição para segurança social
  otherDeductions: 0.01, // 1% outras deduções
};

const PayrollCalculator: React.FC<PayrollCalculatorProps> = ({
  employeeData = defaultEmployeeData,
  taxRates = defaultTaxRates,
  onSave = () => {},
  onExport = () => {},
}) => {
  const [activeTab, setActiveTab] = useState<
    "calculation" | "taxSettings" | "results"
  >("calculation");
  const [calculatedPayroll, setCalculatedPayroll] =
    useState<CalculatedPayroll | null>(null);
  const [customTaxRates, setCustomTaxRates] = useState<TaxRates>(taxRates);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Função para calcular a folha de pagamento
  const calculatePayroll = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const calculatedEmployees = employeeData.map((employee) => {
        const overtimePay =
          (employee.baseSalary / 176) *
          employee.overtimeHours *
          employee.overtimeRate;
        const grossSalary =
          employee.baseSalary + employee.allowances + overtimePay;
        const incomeTax = grossSalary * customTaxRates.incomeTax;
        const socialSecurity = grossSalary * customTaxRates.socialSecurity;
        const otherDeductions = grossSalary * customTaxRates.otherDeductions;
        const netSalary =
          grossSalary - incomeTax - socialSecurity - otherDeductions;

        return {
          employeeId: employee.id,
          name: employee.name,
          grossSalary,
          incomeTax,
          socialSecurity,
          otherDeductions,
          netSalary,
        };
      });

      const totals = calculatedEmployees.reduce(
        (acc, emp) => ({
          totalGross: acc.totalGross + emp.grossSalary,
          totalNet: acc.totalNet + emp.netSalary,
          totalTax: acc.totalTax + emp.incomeTax,
          totalSocialSecurity: acc.totalSocialSecurity + emp.socialSecurity,
        }),
        { totalGross: 0, totalNet: 0, totalTax: 0, totalSocialSecurity: 0 },
      );

      const result: CalculatedPayroll = {
        employees: calculatedEmployees,
        ...totals,
      };

      setCalculatedPayroll(result);
      return result;
    } catch (err) {
      setError("Erro ao calcular folha de pagamento");
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    const result = await calculatePayroll();
    if (result) onSave(result);
  };

  const handleExport = async (format: "pdf" | "excel") => {
    if (!calculatedPayroll) {
      const result = await calculatePayroll();
      if (result) onExport(format);
    } else {
      onExport(format);
    }
  };

  return (
    <div className="w-full h-full bg-white p-6">
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">
                Calculadora de Folha de Pagamento
              </CardTitle>
              <CardDescription>
                Calcule salários de funcionários com conformidade fiscal
                angolana
              </CardDescription>
            </div>
            <Calculator className="h-8 w-8 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
              {error}
            </div>
          )}

          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as any)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="calculation" disabled={isLoading}>
                Cálculo
              </TabsTrigger>
              <TabsTrigger value="taxSettings" disabled={isLoading}>
                Configurações Fiscais
              </TabsTrigger>
              <TabsTrigger value="results" disabled={isLoading}>
                Resultados
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calculation" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Seleção de Funcionários</CardTitle>
                    <CardDescription>
                      Selecione funcionários para cálculo da folha
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="text-center py-4">Carregando...</div>
                    ) : (
                      <div className="space-y-4">
                        {employeeData.map((employee) => (
                          <div
                            key={employee.id}
                            className="flex items-center space-x-2 p-2 border rounded-md"
                          >
                            <div className="flex-1">
                              <p className="font-medium">{employee.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {employee.position}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                {formatKwanza(employee.baseSalary)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Parâmetros de Cálculo</CardTitle>
                    <CardDescription>
                      Configure parâmetros adicionais
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">
                          Período de Pagamento
                        </label>
                        <Select defaultValue="current" disabled={isLoading}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o período" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="current">Mês Atual</SelectItem>
                            <SelectItem value="previous">
                              Mês Anterior
                            </SelectItem>
                            <SelectItem value="custom">
                              Período Personalizado
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">
                          Incluir Bônus
                        </label>
                        <Select defaultValue="no" disabled={isLoading}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a opção" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Sim</SelectItem>
                            <SelectItem value="no">Não</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">
                          Data de Pagamento
                        </label>
                        <Input
                          type="date"
                          defaultValue={new Date().toISOString().split("T")[0]}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("taxSettings")}
                  disabled={isLoading}
                >
                  Próximo: Configurações Fiscais
                </Button>
                <Button onClick={calculatePayroll} disabled={isLoading}>
                  {isLoading ? "Calculando..." : "Calcular"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="taxSettings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configuração Fiscal Angolana</CardTitle>
                  <CardDescription>
                    Configure taxas de acordo com a legislação angolana
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Taxa de Imposto de Renda (%)
                      </label>
                      <div className="flex items-center">
                        <Input
                          type="number"
                          value={customTaxRates.incomeTax * 100}
                          onChange={(e) =>
                            setCustomTaxRates({
                              ...customTaxRates,
                              incomeTax: Number(e.target.value) / 100,
                            })
                          }
                          min="0"
                          max="100"
                          step="0.1"
                          disabled={isLoading}
                        />
                        <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Taxa padrão: 17%
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Segurança Social (%)
                      </label>
                      <div className="flex items-center">
                        <Input
                          type="number"
                          value={customTaxRates.socialSecurity * 100}
                          onChange={(e) =>
                            setCustomTaxRates({
                              ...customTaxRates,
                              socialSecurity: Number(e.target.value) / 100,
                            })
                          }
                          min="0"
                          max="100"
                          step="0.1"
                          disabled={isLoading}
                        />
                        <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Contribuição do funcionário: 3%
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Outras Deduções (%)
                      </label>
                      <div className="flex items-center">
                        <Input
                          type="number"
                          value={customTaxRates.otherDeductions * 100}
                          onChange={(e) =>
                            setCustomTaxRates({
                              ...customTaxRates,
                              otherDeductions: Number(e.target.value) / 100,
                            })
                          }
                          min="0"
                          max="100"
                          step="0.1"
                          disabled={isLoading}
                        />
                        <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Deduções adicionais
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("calculation")}
                  disabled={isLoading}
                >
                  Voltar
                </Button>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("results")}
                    disabled={isLoading}
                  >
                    Próximo: Resultados
                  </Button>
                  <Button onClick={calculatePayroll} disabled={isLoading}>
                    {isLoading ? "Calculando..." : "Calcular"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Calculator className="h-12 w-12 text-muted-foreground mb-4 animate-spin" />
                  <h3 className="text-lg font-medium">Calculando...</h3>
                </div>
              ) : calculatedPayroll ? (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Resultados da Folha</CardTitle>
                      <CardDescription>
                        Salários calculados com deduções fiscais
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Funcionário</TableHead>
                            <TableHead>Salário Bruto</TableHead>
                            <TableHead>Imposto de Renda</TableHead>
                            <TableHead>Segurança Social</TableHead>
                            <TableHead>Outras Deduções</TableHead>
                            <TableHead>Salário Líquido</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {calculatedPayroll.employees.map((employee) => (
                            <TableRow key={employee.employeeId}>
                              <TableCell className="font-medium">
                                {employee.name}
                              </TableCell>
                              <TableCell>
                                {formatKwanza(employee.grossSalary)}
                              </TableCell>
                              <TableCell>
                                {formatKwanza(employee.incomeTax)}
                              </TableCell>
                              <TableCell>
                                {formatKwanza(employee.socialSecurity)}
                              </TableCell>
                              <TableCell>
                                {formatKwanza(employee.otherDeductions)}
                              </TableCell>
                              <TableCell className="font-bold">
                                {formatKwanza(employee.netSalary)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <div>
                        <p className="text-sm font-medium">
                          Total Bruto:{" "}
                          {formatKwanza(calculatedPayroll.totalGross)}
                        </p>
                        <p className="text-sm font-medium">
                          Total Líquido:{" "}
                          {formatKwanza(calculatedPayroll.totalNet)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Total de Impostos:{" "}
                          {formatKwanza(calculatedPayroll.totalTax)}
                        </p>
                        <p className="text-sm font-medium">
                          Total de Segurança Social:{" "}
                          {formatKwanza(calculatedPayroll.totalSocialSecurity)}
                        </p>
                      </div>
                    </CardFooter>
                  </Card>
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab("taxSettings")}
                    >
                      Voltar
                    </Button>
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => handleExport("pdf")}
                        className="flex items-center"
                        disabled={isLoading}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Exportar PDF
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleExport("excel")}
                        className="flex items-center"
                        disabled={isLoading}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Exportar Excel
                      </Button>
                      <Button
                        onClick={handleSave}
                        className="flex items-center"
                        disabled={isLoading}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Folha
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <Calculator className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Nenhum Cálculo Ainda</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Por favor, calcule a folha primeiro
                  </p>
                  <Button onClick={calculatePayroll} disabled={isLoading}>
                    {isLoading ? "Calculando..." : "Calcular Agora"}
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollCalculator;
