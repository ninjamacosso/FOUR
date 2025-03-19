import React from "react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BadgeDollarSign, Calculator, Clock, Calendar } from "lucide-react";

interface PayrollCalculationProps {
  formatCurrency: (value: number) => string;
}

// Dados fictícios de cálculos
const mockCalculations = {
  regularHours: {
    hours: 176,
    ratePerHour: 2840.91,
    total: 500000,
  },
  overtime: {
    hours: 12,
    ratePerHour: 4261.36,
    total: 51136.32,
  },
  nightShift: {
    hours: 24,
    ratePerHour: 3409.09,
    total: 81818.16,
  },
  deductions: [
    {
      name: "IRT (Imposto sobre Rendimento do Trabalho)",
      percentage: 17,
      amount: 107561.92,
      description: "Imposto progressivo sobre o rendimento",
    },
    {
      name: "Segurança Social",
      percentage: 3,
      amount: 18987.98,
      description: "Contribuição para a segurança social",
    },
    {
      name: "Plano de Saúde",
      amount: 15000,
      description: "Desconto do plano de saúde corporativo",
    },
  ],
  benefits: [
    {
      name: "Subsídio de Alimentação",
      amount: 35000,
      description: "Valor fixo mensal para alimentação",
    },
    {
      name: "Subsídio de Transporte",
      amount: 25000,
      description: "Ajuda de custo para transporte",
    },
    {
      name: "Bônus de Produtividade",
      percentage: 10,
      amount: 63295.45,
      description: "Bônus baseado na performance mensal",
    },
  ],
};

const PayrollCalculation: React.FC<PayrollCalculationProps> = ({ formatCurrency }) => {
  // Cálculo do total de rendimentos
  const totalEarnings =
    mockCalculations.regularHours.total +
    mockCalculations.overtime.total +
    mockCalculations.nightShift.total;

  // Cálculo do total de deduções
  const totalDeductions = mockCalculations.deductions.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  // Cálculo do total de benefícios
  const totalBenefits = mockCalculations.benefits.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  // Cálculo do salário líquido
  const netSalary = totalEarnings + totalBenefits - totalDeductions;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Rendimentos
            </CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalEarnings)}</div>
            <p className="text-xs text-muted-foreground">
              Soma de todos os rendimentos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Benefícios
            </CardTitle>
            <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalBenefits)}</div>
            <p className="text-xs text-muted-foreground">
              Soma de todos os benefícios
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Deduções
            </CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalDeductions)}</div>
            <p className="text-xs text-muted-foreground">
              Soma de todas as deduções
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Salário Líquido
            </CardTitle>
            <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(netSalary)}</div>
            <p className="text-xs text-muted-foreground">
              Valor líquido a receber
            </p>
          </CardContent>
        </Card>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="hours">
          <AccordionTrigger>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Cálculo de Horas
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Horas</TableHead>
                  <TableHead className="text-right">Valor/Hora</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Horas Normais</TableCell>
                  <TableCell className="text-right">{mockCalculations.regularHours.hours}h</TableCell>
                  <TableCell className="text-right">{formatCurrency(mockCalculations.regularHours.ratePerHour)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(mockCalculations.regularHours.total)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Horas Extras</TableCell>
                  <TableCell className="text-right">{mockCalculations.overtime.hours}h</TableCell>
                  <TableCell className="text-right">{formatCurrency(mockCalculations.overtime.ratePerHour)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(mockCalculations.overtime.total)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Adicional Noturno</TableCell>
                  <TableCell className="text-right">{mockCalculations.nightShift.hours}h</TableCell>
                  <TableCell className="text-right">{formatCurrency(mockCalculations.nightShift.ratePerHour)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(mockCalculations.nightShift.total)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="deductions">
          <AccordionTrigger>
            <div className="flex items-center">
              <Calculator className="h-4 w-4 mr-2" />
              Deduções
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Detalhes</TableHead>
                  <TableHead className="text-right">Percentual</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCalculations.deductions.map((deduction, index) => (
                  <TableRow key={index}>
                    <TableCell>{deduction.name}</TableCell>
                    <TableCell>{deduction.description}</TableCell>
                    <TableCell className="text-right">
                      {deduction.percentage ? `${deduction.percentage}%` : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(deduction.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="benefits">
          <AccordionTrigger>
            <div className="flex items-center">
              <BadgeDollarSign className="h-4 w-4 mr-2" />
              Benefícios
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Detalhes</TableHead>
                  <TableHead className="text-right">Percentual</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCalculations.benefits.map((benefit, index) => (
                  <TableRow key={index}>
                    <TableCell>{benefit.name}</TableCell>
                    <TableCell>{benefit.description}</TableCell>
                    <TableCell className="text-right">
                      {benefit.percentage ? `${benefit.percentage}%` : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(benefit.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PayrollCalculation; 