import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";

interface PayrollPeriod {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: "draft" | "processing" | "completed" | "error";
  employees: number;
}

interface PayrollPeriodsProps {
  periods?: PayrollPeriod[];
  onSelectPeriod?: (period: PayrollPeriod) => void;
  onCreatePeriod?: (startDate: Date, endDate: Date) => void;
}

const PayrollPeriods = ({
  periods = [
    {
      id: "1",
      name: "Janeiro 2023",
      startDate: new Date(2023, 0, 1),
      endDate: new Date(2023, 0, 31),
      status: "completed",
      employees: 42,
    },
    {
      id: "2",
      name: "Fevereiro 2023",
      startDate: new Date(2023, 1, 1),
      endDate: new Date(2023, 1, 28),
      status: "completed",
      employees: 45,
    },
    {
      id: "3",
      name: "Março 2023",
      startDate: new Date(2023, 2, 1),
      endDate: new Date(2023, 2, 31),
      status: "processing",
      employees: 47,
    },
    {
      id: "4",
      name: "Abril 2023",
      startDate: new Date(2023, 3, 1),
      endDate: new Date(2023, 3, 30),
      status: "draft",
      employees: 47,
    },
  ],
  onSelectPeriod = () => {},
  onCreatePeriod = () => {},
}: PayrollPeriodsProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState<PayrollPeriod | null>(
    null,
  );
  const [view, setView] = useState<"list" | "calendar">("list");
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());

  // Generate years for the dropdown (5 years back, 5 years forward)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) =>
    (currentYear - 5 + i).toString(),
  );

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleSelectPeriod = (period: PayrollPeriod) => {
    setSelectedPeriod(period);
    onSelectPeriod(period);
  };

  const handleCreatePeriod = () => {
    const firstDay = startOfMonth(currentDate);
    const lastDay = endOfMonth(currentDate);
    onCreatePeriod(firstDay, lastDay);
  };

  const getStatusBadge = (status: PayrollPeriod["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Concluído
          </Badge>
        );
      case "processing":
        return (
          <Badge variant="default" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> Em Processamento
          </Badge>
        );
      case "draft":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            Rascunho
          </Badge>
        );
      case "error":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> Erro
          </Badge>
        );
      default:
        return null;
    }
  };

  // Filter periods by selected year
  const filteredPeriods = periods.filter(
    (period) => period.startDate.getFullYear().toString() === year,
  );

  // Get days with payroll periods for the calendar view
  const daysWithPeriods = periods.flatMap((period) => {
    if (
      isSameMonth(period.startDate, currentDate) ||
      isSameMonth(period.endDate, currentDate)
    ) {
      return eachDayOfInterval({
        start: period.startDate,
        end: period.endDate,
      });
    }
    return [];
  });

  return (
    <div className="bg-white w-full space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Períodos de Folha de Pagamento
        </h2>
        <div className="flex items-center gap-2">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Selecionar Ano" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              className={view === "list" ? "bg-secondary" : ""}
              onClick={() => setView("list")}
            >
              Lista
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={view === "calendar" ? "bg-secondary" : ""}
              onClick={() => setView("calendar")}
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleCreatePeriod}>Criar Período</Button>
        </div>
      </div>

      {view === "list" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPeriods.map((period) => (
            <Card
              key={period.id}
              className={`cursor-pointer hover:border-primary transition-colors ${selectedPeriod?.id === period.id ? "border-primary border-2" : ""}`}
              onClick={() => handleSelectPeriod(period)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{period.name}</CardTitle>
                  {getStatusBadge(period.status)}
                </div>
                <CardDescription>
                  {format(period.startDate, "dd/MM")} -{" "}
                  {format(period.endDate, "dd/MM/yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p>Funcionários: {period.employees}</p>
                </div>
              </CardContent>
              <div className="pt-2 justify-end px-6 pb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPeriod(period);
                  }}
                >
                  Ver Detalhes
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePreviousMonth}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="font-medium">
                  {format(currentDate, "MMMM yyyy")}
                </h3>
                <Button variant="outline" size="icon" onClick={handleNextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedPeriod?.startDate}
              month={currentDate}
              onMonthChange={setCurrentDate}
              className="rounded-md border"
              modifiers={{
                payrollDay: daysWithPeriods,
              }}
              modifiersClassNames={{
                payrollDay: "bg-primary/20",
              }}
              onDayClick={(day) => {
                const periodForDay = periods.find(
                  (period) => day >= period.startDate && day <= period.endDate,
                );
                if (periodForDay) {
                  handleSelectPeriod(periodForDay);
                }
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PayrollPeriods;
