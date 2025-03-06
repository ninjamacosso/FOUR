import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight, Filter, Users } from "lucide-react";

interface LeaveEvent {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType:
    | "vacation"
    | "sick"
    | "personal"
    | "maternity"
    | "paternity"
    | "bereavement";
  startDate: Date;
  endDate: Date;
  status: "approved" | "pending" | "rejected";
}

interface LeaveCalendarProps {
  events?: LeaveEvent[];
  onDateSelect?: (date: Date) => void;
  onEventClick?: (event: LeaveEvent) => void;
  onViewChange?: (view: "month" | "week" | "day") => void;
  onFilterChange?: (filters: string[]) => void;
}

const leaveTypeColors: Record<string, string> = {
  vacation: "bg-blue-100 text-blue-800 border-blue-200",
  sick: "bg-red-100 text-red-800 border-red-200",
  personal: "bg-purple-100 text-purple-800 border-purple-200",
  maternity: "bg-pink-100 text-pink-800 border-pink-200",
  paternity: "bg-indigo-100 text-indigo-800 border-indigo-200",
  bereavement: "bg-gray-100 text-gray-800 border-gray-200",
};

const statusColors: Record<string, string> = {
  approved: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
};

const mockEmployees = [
  { id: "1", name: "João Silva" },
  { id: "2", name: "Maria Santos" },
  { id: "3", name: "Carlos Oliveira" },
  { id: "4", name: "Ana Pereira" },
  { id: "5", name: "Pedro Costa" },
];

const mockEvents: LeaveEvent[] = [
  {
    id: "1",
    employeeId: "1",
    employeeName: "João Silva",
    leaveType: "vacation",
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 10),
    status: "approved",
  },
  {
    id: "2",
    employeeId: "2",
    employeeName: "Maria Santos",
    leaveType: "sick",
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 12),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 14),
    status: "approved",
  },
  {
    id: "3",
    employeeId: "3",
    employeeName: "Carlos Oliveira",
    leaveType: "personal",
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 18),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 18),
    status: "pending",
  },
  {
    id: "4",
    employeeId: "4",
    employeeName: "Ana Pereira",
    leaveType: "maternity",
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 3, 20),
    status: "approved",
  },
];

const LeaveCalendar = ({
  events = mockEvents,
  onDateSelect = () => {},
  onEventClick = () => {},
  onViewChange = () => {},
  onFilterChange = () => {},
}: LeaveCalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedView, setSelectedView] = useState<"month" | "week" | "day">(
    "month",
  );
  const [selectedEmployee, setSelectedEmployee] = useState<string>("all");
  const [selectedLeaveType, setSelectedLeaveType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Get the current month and year for display
  const currentMonthYear = currentDate.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  // Filter events based on selected filters
  const filteredEvents = events.filter((event) => {
    if (selectedEmployee !== "all" && event.employeeId !== selectedEmployee)
      return false;
    if (selectedLeaveType !== "all" && event.leaveType !== selectedLeaveType)
      return false;
    if (selectedStatus !== "all" && event.status !== selectedStatus)
      return false;
    return true;
  });

  // Handle month navigation
  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  // Handle view change
  const handleViewChange = (view: "month" | "week" | "day") => {
    setSelectedView(view);
    onViewChange(view);
  };

  // Check if a date has events
  const hasEvents = (date: Date) => {
    return filteredEvents.some((event) => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      return date >= eventStart && date <= eventEnd;
    });
  };

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter((event) => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      return date >= eventStart && date <= eventEnd;
    });
  };

  // Render day cell content with events
  const renderDayContent = (day: Date) => {
    const dayEvents = getEventsForDate(day);
    if (dayEvents.length === 0) return null;

    return (
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="flex space-x-1">
          {dayEvents.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className={`w-2 h-2 rounded-full ${event.status === "approved" ? "bg-green-500" : event.status === "pending" ? "bg-yellow-500" : "bg-red-500"}`}
            />
          ))}
          {dayEvents.length > 3 && (
            <div className="w-2 h-2 rounded-full bg-gray-500" />
          )}
        </div>
      </div>
    );
  };

  // Get leave type in Portuguese
  const getLeaveTypeText = (type: string) => {
    switch (type) {
      case "vacation":
        return "Férias";
      case "sick":
        return "Doença";
      case "personal":
        return "Pessoal";
      case "maternity":
        return "Maternidade";
      case "paternity":
        return "Paternidade";
      case "bereavement":
        return "Luto";
      default:
        return type;
    }
  };

  // Get status in Portuguese
  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Aprovado";
      case "pending":
        return "Pendente";
      case "rejected":
        return "Rejeitado";
      default:
        return status;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full h-full">
      <div className="flex flex-col space-y-4">
        {/* Header with title and controls */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Calendário de Ausências
          </h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleViewChange("month")}
              className={
                selectedView === "month"
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              Mês
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleViewChange("week")}
              className={
                selectedView === "week"
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              Semana
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleViewChange("day")}
              className={
                selectedView === "day"
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              Dia
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 pb-2 border-b border-gray-200">
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtros:</span>
          </div>

          <div className="flex-1 flex flex-wrap gap-2">
            <Select
              value={selectedEmployee}
              onValueChange={(value) => {
                setSelectedEmployee(value);
                onFilterChange([value, selectedLeaveType, selectedStatus]);
              }}
            >
              <SelectTrigger className="w-[180px] h-8">
                <SelectValue placeholder="Todos os Funcionários" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Funcionários</SelectItem>
                {mockEmployees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedLeaveType}
              onValueChange={(value) => {
                setSelectedLeaveType(value);
                onFilterChange([selectedEmployee, value, selectedStatus]);
              }}
            >
              <SelectTrigger className="w-[180px] h-8">
                <SelectValue placeholder="Tipo de Ausência" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="vacation">Férias</SelectItem>
                <SelectItem value="sick">Doença</SelectItem>
                <SelectItem value="personal">Pessoal</SelectItem>
                <SelectItem value="maternity">Maternidade</SelectItem>
                <SelectItem value="paternity">Paternidade</SelectItem>
                <SelectItem value="bereavement">Luto</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedStatus}
              onValueChange={(value) => {
                setSelectedStatus(value);
                onFilterChange([selectedEmployee, selectedLeaveType, value]);
              }}
            >
              <SelectTrigger className="w-[180px] h-8">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="approved">Aprovado</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="rejected">Rejeitado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Calendar navigation */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-medium">{currentMonthYear}</h3>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(new Date())}
          >
            Hoje
          </Button>
        </div>

        {/* Calendar */}
        <div className="relative">
          <Calendar
            mode="single"
            selected={currentDate}
            onSelect={(date) => date && onDateSelect(date)}
            month={currentDate}
            className="rounded-md border"
            components={{
              DayContent: ({ date }) => (
                <div className="relative w-full h-full flex items-center justify-center">
                  {date.getDate()}
                  {renderDayContent(date)}
                </div>
              ),
            }}
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-200">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">
              Tipos de Ausência:
            </span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(leaveTypeColors).map(([type, colorClass]) => (
                <Badge key={type} className={colorClass}>
                  {getLeaveTypeText(type)}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Events for selected date */}
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">
            Eventos para{" "}
            {currentDate.toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h3>
          <div className="space-y-2">
            {getEventsForDate(currentDate).length > 0 ? (
              getEventsForDate(currentDate).map((event) => (
                <div
                  key={event.id}
                  className="p-3 rounded-md border cursor-pointer hover:bg-gray-50"
                  onClick={() => onEventClick(event)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">
                          {event.employeeName}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-1">
                        <Badge className={leaveTypeColors[event.leaveType]}>
                          {getLeaveTypeText(event.leaveType)}
                        </Badge>
                        <Badge className={statusColors[event.status]}>
                          {getStatusText(event.status)}
                        </Badge>
                      </div>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="text-sm text-gray-500">
                            {event.startDate.toLocaleDateString()} -{" "}
                            {event.endDate.toLocaleDateString()}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {event.endDate.getTime() -
                              event.startDate.getTime() >
                            0
                              ? `${Math.ceil((event.endDate.getTime() - event.startDate.getTime()) / (1000 * 60 * 60 * 24))} dias`
                              : "1 dia"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                Nenhum evento de ausência para esta data
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveCalendar;
