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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Calculator,
  Plus,
  Pencil,
  Trash2,
  BadgeDollarSign,
  Percent,
} from "lucide-react";

interface PayrollDeductionsProps {
  formatCurrency: (value: number) => string;
}

// Tipos de dedução disponíveis
const deductionTypes = [
  {
    id: "irt",
    name: "IRT",
    description: "Imposto sobre Rendimento do Trabalho",
    type: "percentage",
  },
  {
    id: "social_security",
    name: "Segurança Social",
    description: "Contribuição para segurança social",
    type: "percentage",
  },
  {
    id: "health_insurance",
    name: "Plano de Saúde",
    description: "Desconto do plano de saúde",
    type: "fixed",
  },
  {
    id: "union_fee",
    name: "Taxa Sindical",
    description: "Contribuição sindical",
    type: "percentage",
  },
  {
    id: "pension",
    name: "Fundo de Pensão",
    description: "Contribuição para fundo de pensão",
    type: "percentage",
  },
];

// Dados fictícios de deduções
const mockDeductions = [
  {
    id: 1,
    type: "irt",
    name: "IRT",
    description: "Imposto sobre Rendimento do Trabalho",
    percentage: 17,
    amount: 107561.92,
    baseAmount: 632700.48,
    calculationType: "percentage",
    status: "active",
  },
  {
    id: 2,
    type: "social_security",
    name: "Segurança Social",
    description: "Contribuição para segurança social",
    percentage: 3,
    amount: 18987.98,
    baseAmount: 632700.48,
    calculationType: "percentage",
    status: "active",
  },
  {
    id: 3,
    type: "health_insurance",
    name: "Plano de Saúde",
    description: "Desconto do plano de saúde corporativo",
    amount: 15000,
    calculationType: "fixed",
    status: "active",
  },
  {
    id: 4,
    type: "union_fee",
    name: "Taxa Sindical",
    description: "Contribuição sindical mensal",
    percentage: 1,
    amount: 6327.00,
    baseAmount: 632700.48,
    calculationType: "percentage",
    status: "active",
  },
];

const PayrollDeductions: React.FC<PayrollDeductionsProps> = ({ formatCurrency }) => {
  const [deductions, setDeductions] = useState(mockDeductions);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDeduction, setNewDeduction] = useState({
    type: "",
    amount: "",
    percentage: "",
    baseAmount: "",
  });

  // Cálculo do total de deduções
  const totalDeductions = deductions.reduce((acc, curr) => acc + curr.amount, 0);

  // Função para adicionar nova dedução
  const handleAddDeduction = () => {
    // Em um sistema real, aqui faria a validação e salvaria no backend
    console.log("Nova dedução:", newDeduction);
    setIsAddDialogOpen(false);
    setNewDeduction({
      type: "",
      amount: "",
      percentage: "",
      baseAmount: "",
    });
  };

  // Função para remover dedução
  const handleRemoveDeduction = (id: number) => {
    // Em um sistema real, aqui removeria do backend
    setDeductions(deductions.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Deduções da Folha</CardTitle>
              <CardDescription>
                Gerencie as deduções aplicadas na folha de pagamento
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Dedução
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Nova Dedução</DialogTitle>
                  <DialogDescription>
                    Preencha os dados da nova dedução a ser aplicada na folha
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Tipo de Dedução</Label>
                    <Select
                      value={newDeduction.type}
                      onValueChange={(value) =>
                        setNewDeduction({ ...newDeduction, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tipos de Dedução</SelectLabel>
                          {deductionTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {newDeduction.type && (
                    <>
                      {deductionTypes.find((t) => t.id === newDeduction.type)
                        ?.type === "percentage" ? (
                        <>
                          <div className="space-y-2">
                            <Label>Percentual (%)</Label>
                            <Input
                              type="number"
                              value={newDeduction.percentage}
                              onChange={(e) =>
                                setNewDeduction({
                                  ...newDeduction,
                                  percentage: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Valor Base</Label>
                            <Input
                              type="number"
                              value={newDeduction.baseAmount}
                              onChange={(e) =>
                                setNewDeduction({
                                  ...newDeduction,
                                  baseAmount: e.target.value,
                                })
                              }
                            />
                          </div>
                        </>
                      ) : (
                        <div className="space-y-2">
                          <Label>Valor Fixo</Label>
                          <Input
                            type="number"
                            value={newDeduction.amount}
                            onChange={(e) =>
                              setNewDeduction({
                                ...newDeduction,
                                amount: e.target.value,
                              })
                            }
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleAddDeduction}>Adicionar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Deduções
                </CardTitle>
                <Calculator className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(totalDeductions)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Soma de todas as deduções aplicadas
                </p>
              </CardContent>
            </Card>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Base de Cálculo</TableHead>
                  <TableHead className="text-right">Percentual</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deductions.map((deduction) => (
                  <TableRow key={deduction.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{deduction.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {deduction.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {deduction.calculationType === "percentage" ? (
                        <div className="flex items-center">
                          <Percent className="h-4 w-4 mr-1 text-muted-foreground" />
                          Percentual
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <BadgeDollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                          Valor Fixo
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {deduction.baseAmount
                        ? formatCurrency(deduction.baseAmount)
                        : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      {deduction.percentage ? `${deduction.percentage}%` : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(deduction.amount)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveDeduction(deduction.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollDeductions; 