import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BadgeDollarSign, Download, FileText, Printer } from "lucide-react";
import PayrollPeriods from "./PayrollPeriods";
import PayrollCalculator from "./PayrollCalculator";

const PayrollProcessing = () => {
  const [activeTab, setActiveTab] = useState("periods");
  const [selectedPeriod, setSelectedPeriod] = useState<any>(null);

  const handleSelectPeriod = (period: any) => {
    setSelectedPeriod(period);
    setActiveTab("calculator");
  };

  const handleCreatePeriod = (startDate: Date, endDate: Date) => {
    // In a real app, you would create a new period in your database
    console.log("Creating new period:", { startDate, endDate });
    // For demo purposes, we'll just simulate selecting a period
    const newPeriod = {
      id: Math.random().toString(36).substring(7),
      name: `${startDate.toLocaleString("default", { month: "long" })} ${startDate.getFullYear()}`,
      startDate,
      endDate,
      status: "draft",
      employees: 124,
    };
    alert(`Período de folha de pagamento criado: ${newPeriod.name}`);
    handleSelectPeriod(newPeriod);
  };

  const handleSavePayroll = (data: any) => {
    // In a real app, you would save this to your backend
    console.log("Saving payroll data:", data);
    alert("Folha de pagamento salva com sucesso!");
  };

  const handleExportPayroll = (format: string) => {
    // In a real app, you would generate and download the file
    console.log(`Exporting payroll as ${format}`);
    alert(`Exportando folha de pagamento como ${format}`);
  };

  const handleGenerateReport = (reportType: string) => {
    alert(`Gerando relatório: ${reportType}`);
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <BadgeDollarSign className="h-6 w-6 mr-2 text-primary" />
          <h1 className="text-2xl font-bold text-gray-800">
            Processamento de Folha de Pagamento
          </h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleExportPayroll("pdf")}
            className="flex items-center"
          >
            <FileText className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExportPayroll("excel")}
            className="flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar Excel
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExportPayroll("print")}
            className="flex items-center"
          >
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full space-y-6"
      >
        <TabsList>
          <TabsTrigger value="periods" className="px-6">
            Períodos
          </TabsTrigger>
          <TabsTrigger value="calculator" className="px-6">
            Calculadora
          </TabsTrigger>
          <TabsTrigger value="reports" className="px-6">
            Relatórios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="periods" className="mt-0">
          <PayrollPeriods
            onSelectPeriod={handleSelectPeriod}
            onCreatePeriod={handleCreatePeriod}
          />
        </TabsContent>

        <TabsContent value="calculator" className="mt-0">
          <PayrollCalculator
            onSave={handleSavePayroll}
            onExport={handleExportPayroll}
          />
        </TabsContent>

        <TabsContent value="reports" className="mt-0">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              Relatórios de Folha de Pagamento
            </h2>
            <p className="text-gray-500 mb-6">
              Selecione um tipo de relatório para gerar.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors"
                onClick={() => handleGenerateReport("Resumo Mensal")}
              >
                <h3 className="font-medium mb-2">Resumo Mensal</h3>
                <p className="text-sm text-gray-500">
                  Resumo de todos os pagamentos do mês.
                </p>
              </div>

              <div
                className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors"
                onClick={() =>
                  handleGenerateReport("Detalhamento por Funcionário")
                }
              >
                <h3 className="font-medium mb-2">
                  Detalhamento por Funcionário
                </h3>
                <p className="text-sm text-gray-500">
                  Detalhes de pagamento para cada funcionário.
                </p>
              </div>

              <div
                className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors"
                onClick={() => handleGenerateReport("Impostos e Contribuições")}
              >
                <h3 className="font-medium mb-2">Impostos e Contribuições</h3>
                <p className="text-sm text-gray-500">
                  Relatório de impostos e contribuições sociais.
                </p>
              </div>

              <div
                className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors"
                onClick={() => handleGenerateReport("Horas Extras")}
              >
                <h3 className="font-medium mb-2">Horas Extras</h3>
                <p className="text-sm text-gray-500">
                  Relatório de horas extras trabalhadas.
                </p>
              </div>

              <div
                className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors"
                onClick={() => handleGenerateReport("Contracheques")}
              >
                <h3 className="font-medium mb-2">Contracheques</h3>
                <p className="text-sm text-gray-500">
                  Gerar contracheques para todos os funcionários.
                </p>
              </div>

              <div
                className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors"
                onClick={() => handleGenerateReport("Relatório Anual")}
              >
                <h3 className="font-medium mb-2">Relatório Anual</h3>
                <p className="text-sm text-gray-500">
                  Resumo anual de pagamentos e impostos.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollProcessing;
