import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";

interface LeaveRequestFormProps {
  onSubmit?: (data: LeaveFormValues) => void;
  onCancel?: () => void;
  defaultValues?: LeaveFormValues;
}

interface LeaveFormValues {
  leaveType: string;
  startDate: Date;
  endDate: Date;
  reason: string;
}

const LeaveRequestForm = ({
  onSubmit = () => {},
  onCancel = () => {},
  defaultValues = {
    leaveType: "vacation",
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    reason: "",
  },
}: LeaveRequestFormProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>(
    defaultValues.startDate,
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    defaultValues.endDate,
  );

  const form = useForm<LeaveFormValues>({
    defaultValues,
  });

  const handleSubmit = (data: LeaveFormValues) => {
    onSubmit(data);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <CardTitle>Solicitação de Ausência</CardTitle>
        <CardDescription>
          Envie sua solicitação de ausência para aprovação. Por favor, forneça
          todas as informações necessárias.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="leaveType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Ausência</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de ausência" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="vacation">Férias</SelectItem>
                      <SelectItem value="sick">Doença</SelectItem>
                      <SelectItem value="personal">Pessoal</SelectItem>
                      <SelectItem value="maternity">Maternidade</SelectItem>
                      <SelectItem value="paternity">Paternidade</SelectItem>
                      <SelectItem value="bereavement">Luto</SelectItem>
                      <SelectItem value="unpaid">Sem Remuneração</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Selecione o tipo de ausência que está solicitando.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data de Início</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <div className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
                          {startDate ? (
                            format(startDate, "dd/MM/yyyy")
                          ) : (
                            <span className="text-muted-foreground">
                              Selecione a data
                            </span>
                          )}
                          <CalendarIcon className="h-4 w-4 opacity-50" />
                        </div>
                      </FormControl>
                      <div className="absolute top-10 z-10">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setStartDate(date);
                          }}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data de Término</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <div className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
                          {endDate ? (
                            format(endDate, "dd/MM/yyyy")
                          ) : (
                            <span className="text-muted-foreground">
                              Selecione a data
                            </span>
                          )}
                          <CalendarIcon className="h-4 w-4 opacity-50" />
                        </div>
                      </FormControl>
                      <div className="absolute top-10 z-10">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setEndDate(date);
                          }}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                            (startDate && date < startDate)
                          }
                          initialFocus
                        />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivo</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Por favor, forneça detalhes sobre sua solicitação de ausência"
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Explique brevemente o motivo da sua solicitação de ausência.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="flex justify-between px-0">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit">Enviar Solicitação</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LeaveRequestForm;
