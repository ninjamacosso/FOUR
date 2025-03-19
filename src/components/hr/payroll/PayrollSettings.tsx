import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Settings,
  Calendar,
  Clock,
  Calculator,
  Mail,
  Bell,
  Lock,
  Save,
  AlertTriangle,
} from "lucide-react";

const PayrollSettings: React.FC = () => {
  // Estados para as configurações
  const [payrollDate, setPayrollDate] = useState("5");
  const [currency, setCurrency] = useState("AOA");
  const [autoProcess, setAutoProcess] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [approvalRequired, setApprovalRequired] = useState(true);
  const [lockPeriod, setLockPeriod] = useState("3");
  const [overtimeRate, setOvertimeRate] = useState("50");
  const [nightShiftRate, setNightShiftRate] = useState("25");
  const [holidayRate, setHolidayRate] = useState("100");

  // Função para salvar configurações
  const handleSaveSettings = () => {
    console.log("Salvando configurações...");
    // Implementar salvamento das configurações
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Configurações da Folha</CardTitle>
              <CardDescription>
                Gerencie as configurações do processamento da folha de pagamento
              </CardDescription>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar Alterações</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja salvar as alterações nas configurações da folha?
                    Algumas alterações podem afetar o próximo processamento.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSaveSettings}>
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {/* Configurações Gerais */}
            <AccordionItem value="general">
              <AccordionTrigger className="text-lg font-semibold">
                <Settings className="h-5 w-5 mr-2" />
                Configurações Gerais
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel>Moeda</FormLabel>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a moeda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Moedas</SelectLabel>
                          <SelectItem value="AOA">Kwanza (AOA)</SelectItem>
                          <SelectItem value="USD">Dólar (USD)</SelectItem>
                          <SelectItem value="EUR">Euro (EUR)</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Moeda utilizada para cálculos e exibição de valores
                    </FormDescription>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Data de Pagamento</FormLabel>
                    <Select value={payrollDate} onValueChange={setPayrollDate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o dia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Dia do Mês</SelectLabel>
                          {Array.from({ length: 28 }, (_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1)}>
                              Dia {i + 1}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Dia do mês para processamento da folha
                    </FormDescription>
                  </FormItem>
                </div>

                <div className="space-y-4">
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Processamento Automático
                      </FormLabel>
                      <FormDescription>
                        Processa a folha automaticamente na data definida
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={autoProcess}
                        onCheckedChange={setAutoProcess}
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Notificações por Email
                      </FormLabel>
                      <FormDescription>
                        Envia notificações sobre o processamento da folha
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Aprovação Obrigatória
                      </FormLabel>
                      <FormDescription>
                        Requer aprovação antes do processamento final
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={approvalRequired}
                        onCheckedChange={setApprovalRequired}
                      />
                    </FormControl>
                  </FormItem>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Configurações de Cálculos */}
            <AccordionItem value="calculations">
              <AccordionTrigger className="text-lg font-semibold">
                <Calculator className="h-5 w-5 mr-2" />
                Configurações de Cálculos
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel>Taxa de Hora Extra (%)</FormLabel>
                    <Input
                      type="number"
                      value={overtimeRate}
                      onChange={(e) => setOvertimeRate(e.target.value)}
                    />
                    <FormDescription>
                      Percentual adicional para horas extras
                    </FormDescription>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Taxa de Trabalho Noturno (%)</FormLabel>
                    <Input
                      type="number"
                      value={nightShiftRate}
                      onChange={(e) => setNightShiftRate(e.target.value)}
                    />
                    <FormDescription>
                      Percentual adicional para trabalho noturno
                    </FormDescription>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Taxa de Feriados (%)</FormLabel>
                    <Input
                      type="number"
                      value={holidayRate}
                      onChange={(e) => setHolidayRate(e.target.value)}
                    />
                    <FormDescription>
                      Percentual adicional para trabalho em feriados
                    </FormDescription>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Período de Bloqueio (meses)</FormLabel>
                    <Input
                      type="number"
                      value={lockPeriod}
                      onChange={(e) => setLockPeriod(e.target.value)}
                    />
                    <FormDescription>
                      Meses após os quais a folha é bloqueada para edição
                    </FormDescription>
                  </FormItem>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Configurações de Notificações */}
            <AccordionItem value="notifications">
              <AccordionTrigger className="text-lg font-semibold">
                <Bell className="h-5 w-5 mr-2" />
                Configurações de Notificações
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-4">
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Lembrete de Processamento
                      </FormLabel>
                      <FormDescription>
                        Notifica sobre o próximo processamento da folha
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch defaultChecked />
                    </FormControl>
                  </FormItem>

                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Alerta de Inconsistências
                      </FormLabel>
                      <FormDescription>
                        Notifica sobre inconsistências nos cálculos
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch defaultChecked />
                    </FormControl>
                  </FormItem>

                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Confirmação de Pagamento
                      </FormLabel>
                      <FormDescription>
                        Notifica quando os pagamentos forem realizados
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch defaultChecked />
                    </FormControl>
                  </FormItem>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Configurações de Segurança */}
            <AccordionItem value="security">
              <AccordionTrigger className="text-lg font-semibold">
                <Lock className="h-5 w-5 mr-2" />
                Configurações de Segurança
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-4">
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Autenticação em Duas Etapas
                      </FormLabel>
                      <FormDescription>
                        Requer confirmação adicional para alterações críticas
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch defaultChecked />
                    </FormControl>
                  </FormItem>

                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Registro de Auditoria
                      </FormLabel>
                      <FormDescription>
                        Mantém registro detalhado de todas as alterações
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch defaultChecked />
                    </FormControl>
                  </FormItem>

                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Backup Automático
                      </FormLabel>
                      <FormDescription>
                        Realiza backup automático dos dados da folha
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch defaultChecked />
                    </FormControl>
                  </FormItem>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollSettings; 