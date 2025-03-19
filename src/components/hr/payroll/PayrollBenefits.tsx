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
  Car,
  Coffee,
  Gift,
  Briefcase,
  Heart,
} from "lucide-react";

interface PayrollBenefitsProps {
  formatCurrency: (value: number) => string;
}

// Tipos de benefícios disponíveis
const benefitTypes = [
  {
    id: "meal_allowance",
    name: "Subsídio de Alimentação",
    description: "Valor mensal para alimentação",
    type: "fixed",
    icon: Coffee,
  },
  {
    id: "transport_allowance",
    name: "Subsídio de Transporte",
    description: "Ajuda de custo para transporte",
    type: "fixed",
    icon: Car,
  },
  {
    id: "performance_bonus",
    name: "Bônus de Desempenho",
    description: "Bônus baseado na performance",
    type: "percentage",
    icon: Gift,
  },
  {
    id: "health_plan",
    name: "Plano de Saúde",
    description: "Benefício de assistência médica",
    type: "fixed",
    icon: Heart,
  },
  {
    id: "education_allowance",
    name: "Auxílio Educação",
    description: "Subsídio para formação",
    type: "fixed",
    icon: Briefcase,
  },
];

// Dados fictícios de benefícios
const mockBenefits = [
  {
    id: 1,
    type: "meal_allowance",
    name: "Subsídio de Alimentação",
    description: "Valor mensal para alimentação",
    amount: 35000,
    calculationType: "fixed",
    status: "active",
    icon: Coffee,
  },
  {
    id: 2,
    type: "transport_allowance",
    name: "Subsídio de Transporte",
    description: "Ajuda de custo para transporte",
    amount: 25000,
    calculationType: "fixed",
    status: "active",
    icon: Car,
  },
  {
    id: 3,
    type: "performance_bonus",
    name: "Bônus de Desempenho",
    description: "Bônus baseado na performance mensal",
    percentage: 10,
    baseAmount: 632954.50,
    amount: 63295.45,
    calculationType: "percentage",
    status: "active",
    icon: Gift,
  },
  {
    id: 4,
    type: "health_plan",
    name: "Plano de Saúde",
    description: "Cobertura de plano de saúde",
    amount: 45000,
    calculationType: "fixed",
    status: "active",
    icon: Heart,
  },
];

const PayrollBenefits: React.FC<PayrollBenefitsProps> = ({ formatCurrency }) => {
  const [benefits, setBenefits] = useState(mockBenefits);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newBenefit, setNewBenefit] = useState({
    type: "",
    amount: "",
    percentage: "",
    baseAmount: "",
  });

  // Cálculo do total de benefícios
  const totalBenefits = benefits.reduce((acc, curr) => acc + curr.amount, 0);

  // Função para adicionar novo benefício
  const handleAddBenefit = () => {
    // Em um sistema real, aqui faria a validação e salvaria no backend
    console.log("Novo benefício:", newBenefit);
    setIsAddDialogOpen(false);
    setNewBenefit({
      type: "",
      amount: "",
      percentage: "",
      baseAmount: "",
    });
  };

  // Função para remover benefício
  const handleRemoveBenefit = (id: number) => {
    // Em um sistema real, aqui removeria do backend
    setBenefits(benefits.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Benefícios da Folha</CardTitle>
              <CardDescription>
                Gerencie os benefícios incluídos na folha de pagamento
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Benefício
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Benefício</DialogTitle>
                  <DialogDescription>
                    Preencha os dados do novo benefício a ser incluído na folha
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Tipo de Benefício</Label>
                    <Select
                      value={newBenefit.type}
                      onValueChange={(value) =>
                        setNewBenefit({ ...newBenefit, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tipos de Benefício</SelectLabel>
                          {benefitTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              <div className="flex items-center">
                                <type.icon className="h-4 w-4 mr-2" />
                                {type.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {newBenefit.type && (
                    <>
                      {benefitTypes.find((t) => t.id === newBenefit.type)
                        ?.type === "percentage" ? (
                        <>
                          <div className="space-y-2">
                            <Label>Percentual (%)</Label>
                            <Input
                              type="number"
                              value={newBenefit.percentage}
                              onChange={(e) =>
                                setNewBenefit({
                                  ...newBenefit,
                                  percentage: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Valor Base</Label>
                            <Input
                              type="number"
                              value={newBenefit.baseAmount}
                              onChange={(e) =>
                                setNewBenefit({
                                  ...newBenefit,
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
                            value={newBenefit.amount}
                            onChange={(e) =>
                              setNewBenefit({
                                ...newBenefit,
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
                  <Button onClick={handleAddBenefit}>Adicionar</Button>
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
                  Total de Benefícios
                </CardTitle>
                <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(totalBenefits)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Soma de todos os benefícios concedidos
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
                {benefits.map((benefit) => (
                  <TableRow key={benefit.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <benefit.icon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{benefit.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {benefit.calculationType === "percentage" ? (
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
                      {benefit.baseAmount
                        ? formatCurrency(benefit.baseAmount)
                        : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      {benefit.percentage ? `${benefit.percentage}%` : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(benefit.amount)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveBenefit(benefit.id)}
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

export default PayrollBenefits; 