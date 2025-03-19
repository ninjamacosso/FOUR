import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Calendar,
  CalendarDays,
  Clock,
  Plus,
  Edit,
  Trash2,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  UserPlus,
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

// Tipo para as escalas
type Schedule = {
  id: string;
  name: string;
  department: string;
  type: "normal" | "plantao" | "flexivel";
  days: Array<{
    day: string;
    start: string;
    end: string;
    status: "active" | "inactive";
  }>;
  employees: Array<{
    id: string;
    name: string;
    avatar?: string;
    position: string;
  }>;
  status: "active" | "inactive" | "draft";
};

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  avatar?: string;
}

interface WorkSchedule {
  id: string;
  name: string;
  type: "standard" | "flexible" | "rotating" | "split";
  startTime: string;
  endTime: string;
  daysOfWeek: number[]; // 0 = Sunday, 6 = Saturday
  totalHours: number;
  color: string;
}

interface EmployeeSchedule {
  id: string;
  employeeId: string;
  employee: Employee;
  scheduleId: string;
  schedule: WorkSchedule;
  startDate: Date;
  endDate?: Date;
  status: "active" | "pending" | "canceled";
}

const ScheduleManagementTab: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: "SCH001",
      name: "Escala Administrativa",
      department: "Administrativo",
      type: "normal",
      days: [
        { day: "Segunda", start: "08:00", end: "17:00", status: "active" },
        { day: "Terça", start: "08:00", end: "17:00", status: "active" },
        { day: "Quarta", start: "08:00", end: "17:00", status: "active" },
        { day: "Quinta", start: "08:00", end: "17:00", status: "active" },
        { day: "Sexta", start: "08:00", end: "17:00", status: "active" },
        { day: "Sábado", start: "", end: "", status: "inactive" },
        { day: "Domingo", start: "", end: "", status: "inactive" },
      ],
      employees: [
        {
          id: "EMP001",
          name: "Ana Silva",
          avatar: "",
          position: "Assistente Administrativo",
        },
        {
          id: "EMP002",
          name: "Carlos Santos",
          avatar: "",
          position: "Auxiliar Financeiro",
        },
        {
          id: "EMP003",
          name: "Maria Oliveira",
          avatar: "",
          position: "Recepcionista",
        },
      ],
      status: "active",
    },
    {
      id: "SCH002",
      name: "Escala Desenvolvimento",
      department: "TI",
      type: "flexivel",
      days: [
        { day: "Segunda", start: "09:00", end: "18:00", status: "active" },
        { day: "Terça", start: "09:00", end: "18:00", status: "active" },
        { day: "Quarta", start: "09:00", end: "18:00", status: "active" },
        { day: "Quinta", start: "09:00", end: "18:00", status: "active" },
        { day: "Sexta", start: "09:00", end: "18:00", status: "active" },
        { day: "Sábado", start: "", end: "", status: "inactive" },
        { day: "Domingo", start: "", end: "", status: "inactive" },
      ],
      employees: [
        {
          id: "EMP004",
          name: "João Pereira",
          avatar: "",
          position: "Desenvolvedor Frontend",
        },
        {
          id: "EMP005",
          name: "Luísa Costa",
          avatar: "",
          position: "Desenvolvedora Backend",
        },
        {
          id: "EMP006",
          name: "Pedro Mendes",
          avatar: "",
          position: "DevOps",
        },
      ],
      status: "active",
    },
    {
      id: "SCH003",
      name: "Escala Suporte 24h",
      department: "TI",
      type: "plantao",
      days: [
        { day: "Segunda", start: "08:00", end: "20:00", status: "active" },
        { day: "Terça", start: "08:00", end: "20:00", status: "active" },
        { day: "Quarta", start: "08:00", end: "20:00", status: "active" },
        { day: "Quinta", start: "08:00", end: "20:00", status: "active" },
        { day: "Sexta", start: "08:00", end: "20:00", status: "active" },
        { day: "Sábado", start: "10:00", end: "16:00", status: "active" },
        { day: "Domingo", start: "10:00", end: "16:00", status: "active" },
      ],
      employees: [
        {
          id: "EMP007",
          name: "Roberto Lima",
          avatar: "",
          position: "Analista de Suporte",
        },
        {
          id: "EMP008",
          name: "Beatriz Souza",
          avatar: "",
          position: "Analista de Infraestrutura",
        },
      ],
      status: "active",
    },
  ]);

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [showEmployeesDialog, setShowEmployeesDialog] = useState(false);

  const [date, setDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [createScheduleDialogOpen, setCreateScheduleDialogOpen] = useState(false);
  const [newScheduleForm, setNewScheduleForm] = useState({
    employeeId: "",
    scheduleId: "",
    startDate: new Date(),
    endDate: undefined as Date | undefined,
  });

  // Mock data for employees
  const employees: Employee[] = [
    {
      id: "emp001",
      name: "Ana Silva",
      position: "Desenvolvedora Senior",
      department: "TI",
      avatar: "",
    },
    {
      id: "emp002",
      name: "Carlos Santos",
      position: "Analista de RH",
      department: "RH",
      avatar: "",
    },
    {
      id: "emp003",
      name: "Mariana Oliveira",
      position: "Designer UI/UX",
      department: "Marketing",
      avatar: "",
    },
    {
      id: "emp004",
      name: "João Ferreira",
      position: "Executivo de Vendas",
      department: "Vendas",
      avatar: "",
    },
    {
      id: "emp005",
      name: "Camila Rocha",
      position: "Analista Financeiro",
      department: "Financeiro",
      avatar: "",
    },
  ];

  // Mock data for work schedules
  const workSchedules: WorkSchedule[] = [
    {
      id: "sch001",
      name: "Horário Padrão",
      type: "standard",
      startTime: "08:00",
      endTime: "17:00",
      daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
      totalHours: 40,
      color: "#4CAF50",
    },
    {
      id: "sch002",
      name: "Horário Flexível",
      type: "flexible",
      startTime: "10:00",
      endTime: "19:00",
      daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
      totalHours: 40,
      color: "#2196F3",
    },
    {
      id: "sch003",
      name: "Escala 12x36",
      type: "rotating",
      startTime: "07:00",
      endTime: "19:00",
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // All days
      totalHours: 36,
      color: "#9C27B0",
    },
    {
      id: "sch004",
      name: "Meio Período",
      type: "split",
      startTime: "08:00",
      endTime: "12:00",
      daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
      totalHours: 20,
      color: "#FF9800",
    },
  ];

  // Mock data for assigned schedules
  const [employeeSchedules, setEmployeeSchedules] = useState<EmployeeSchedule[]>([
    {
      id: "es001",
      employeeId: "emp001",
      employee: employees[0],
      scheduleId: "sch001",
      schedule: workSchedules[0],
      startDate: new Date(2023, 3, 1), // April 1, 2023
      status: "active",
    },
    {
      id: "es002",
      employeeId: "emp002",
      employee: employees[1],
      scheduleId: "sch002",
      schedule: workSchedules[1],
      startDate: new Date(2023, 1, 15), // February 15, 2023
      status: "active",
    },
    {
      id: "es003",
      employeeId: "emp003",
      employee: employees[2],
      scheduleId: "sch001",
      schedule: workSchedules[0],
      startDate: new Date(2023, 2, 1), // March 1, 2023
      status: "active",
    },
    {
      id: "es004",
      employeeId: "emp004",
      employee: employees[3],
      scheduleId: "sch003",
      schedule: workSchedules[2],
      startDate: new Date(2023, 0, 1), // January 1, 2023
      status: "active",
    },
    {
      id: "es005",
      employeeId: "emp005",
      employee: employees[4],
      scheduleId: "sch004",
      schedule: workSchedules[3],
      startDate: new Date(2023, 5, 1), // June 1, 2023
      status: "pending",
    },
  ]);

  const handleOpenScheduleDetail = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
  };

  const renderScheduleTypeBadge = (type: string) => {
    switch (type) {
      case "normal":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            Padrão
          </Badge>
        );
      case "plantao":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
            Plantão
          </Badge>
        );
      case "flexivel":
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
            Flexível
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
            {type}
          </Badge>
        );
    }
  };

  const renderScheduleStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Ativa
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            Inativa
          </Badge>
        );
      case "draft":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            Rascunho
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
            {status}
          </Badge>
        );
    }
  };

  const handleCreateSchedule = () => {
    const employee = employees.find(emp => emp.id === newScheduleForm.employeeId);
    const schedule = workSchedules.find(sch => sch.id === newScheduleForm.scheduleId);
    
    if (employee && schedule) {
      const newSchedule: EmployeeSchedule = {
        id: `es${Date.now()}`,
        employeeId: newScheduleForm.employeeId,
        employee: employee,
        scheduleId: newScheduleForm.scheduleId,
        schedule: schedule,
        startDate: newScheduleForm.startDate,
        endDate: newScheduleForm.endDate,
        status: "pending",
      };
      
      setEmployeeSchedules([...employeeSchedules, newSchedule]);
      setCreateScheduleDialogOpen(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setNewScheduleForm({
      employeeId: "",
      scheduleId: "",
      startDate: new Date(),
      endDate: undefined,
    });
  };

  const handleScheduleStatusChange = (scheduleId: string, newStatus: "active" | "pending" | "canceled") => {
    const updatedSchedules = employeeSchedules.map(schedule => {
      if (schedule.id === scheduleId) {
        return { ...schedule, status: newStatus };
      }
      return schedule;
    });
    
    setEmployeeSchedules(updatedSchedules);
  };

  const filteredSchedules = employeeSchedules.filter(schedule => {
    const matchesSearch = schedule.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         schedule.schedule.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || schedule.employee.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });
  
  const departments = [...new Set(employees.map(emp => emp.department))];

  const formatScheduleTime = (schedule: WorkSchedule) => {
    return `${schedule.startTime} - ${schedule.endTime}`;
  };

  const getScheduleStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Ativo
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            Pendente
          </Badge>
        );
      case "canceled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            Cancelado
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
            Desconhecido
          </Badge>
        );
    }
  };

  const formatDaysOfWeek = (daysOfWeek: number[]) => {
    const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    return daysOfWeek.map(day => dayNames[day]).join(", ");
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho da seção de escalas */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Escalas</h2>
          <p className="text-muted-foreground">
            Gerencie as escalas de trabalho dos funcionários
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Escala
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Departamento
              </label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Todos os departamentos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os departamentos</SelectItem>
                  <SelectItem value="administrativo">Administrativo</SelectItem>
                  <SelectItem value="ti">TI</SelectItem>
                  <SelectItem value="vendas">Vendas</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="producao">Produção</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Tipo de Escala
              </label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="normal">Padrão</SelectItem>
                  <SelectItem value="plantao">Plantão</SelectItem>
                  <SelectItem value="flexivel">Flexível</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Status</label>
              <Select defaultValue="active">
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Ativas</SelectItem>
                  <SelectItem value="inactive">Inativas</SelectItem>
                  <SelectItem value="draft">Rascunho</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Escalas */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Escalas</CardTitle>
          <CardDescription>
            Lista de todas as escalas de trabalho cadastradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Nome da Escala</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Funcionários</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">{schedule.name}</TableCell>
                  <TableCell>{schedule.department}</TableCell>
                  <TableCell>{renderScheduleTypeBadge(schedule.type)}</TableCell>
                  <TableCell>
                    <div className="flex -space-x-2">
                      {schedule.employees.slice(0, 3).map((employee, i) => (
                        <Avatar key={i} className="border-2 border-background h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {schedule.employees.length > 3 && (
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-xs font-medium">
                          +{schedule.employees.length - 3}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{renderScheduleStatusBadge(schedule.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenScheduleDetail(schedule)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedSchedule(schedule);
                          setShowEmployeesDialog(true);
                        }}
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detalhes da Escala Selecionada */}
      {selectedSchedule && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{selectedSchedule.name}</CardTitle>
                <CardDescription>
                  {selectedSchedule.department} - {renderScheduleTypeBadge(selectedSchedule.type)}
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedSchedule(null)}>
                Fechar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Horários da Escala */}
              <div>
                <h3 className="text-lg font-medium mb-4">Horários</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {selectedSchedule.days.map((day, index) => (
                    <Card key={index} className={`${day.status === 'inactive' ? 'opacity-50' : ''}`}>
                      <CardHeader className="py-3">
                        <CardTitle className="text-base">{day.day}</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        {day.status === "active" ? (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                              <span>{day.start} - {day.end}</span>
                            </div>
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Folga</span>
                            <XCircle className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Funcionários na Escala */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Funcionários</h3>
                  <Button variant="outline" size="sm" onClick={() => setShowEmployeesDialog(true)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedSchedule.employees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {employee.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{employee.name}</div>
                              <div className="text-xs text-muted-foreground">{employee.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Diálogo para criar nova escala */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Criar Nova Escala</DialogTitle>
            <DialogDescription>
              Defina as informações da nova escala de trabalho
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-sm font-medium mb-1 block">
                  Nome da Escala
                </label>
                <Input placeholder="Nome da escala" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Departamento
                </label>
                <Select defaultValue="administrativo">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrativo">Administrativo</SelectItem>
                    <SelectItem value="ti">TI</SelectItem>
                    <SelectItem value="vendas">Vendas</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="producao">Produção</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Tipo de Escala
                </label>
                <Select defaultValue="normal">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Padrão</SelectItem>
                    <SelectItem value="plantao">Plantão</SelectItem>
                    <SelectItem value="flexivel">Flexível</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-sm">Dias da Semana</h4>
              {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map((day, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Checkbox id={`day-${index}`} defaultChecked={index < 5} />
                  <div className="grid grid-cols-3 gap-2 flex-1">
                    <label
                      htmlFor={`day-${index}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-20"
                    >
                      {day}
                    </label>
                    <div>
                      <Input
                        type="time"
                        defaultValue={index < 5 ? "08:00" : ""}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Input
                        type="time"
                        defaultValue={index < 5 ? "17:00" : ""}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                setShowCreateDialog(false);
                // Em um sistema real, aqui salvaria a nova escala
              }}
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para adicionar funcionários */}
      <Dialog open={showEmployeesDialog} onOpenChange={setShowEmployeesDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Adicionar Funcionários à Escala</DialogTitle>
            <DialogDescription>
              Selecione os funcionários que trabalharão nesta escala
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center space-x-2 mb-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar funcionários por nome ou ID..." className="flex-1" />
            </div>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead style={{ width: 50 }}></TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Departamento</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "EMP009",
                      name: "Fernanda Lima",
                      position: "Analista de RH",
                      department: "RH",
                    },
                    {
                      id: "EMP010",
                      name: "Marcos Souza",
                      position: "Analista Financeiro",
                      department: "Financeiro",
                    },
                    {
                      id: "EMP011",
                      name: "Juliana Mendes",
                      position: "Assistente Administrativo",
                      department: "Administrativo",
                    },
                    {
                      id: "EMP012",
                      name: "Ricardo Torres",
                      position: "Desenvolvedor Backend",
                      department: "TI",
                    },
                    {
                      id: "EMP013",
                      name: "Camila Ferreira",
                      position: "Designer",
                      department: "Marketing",
                    },
                  ].map((employee, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox id={`employee-${index}`} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-xs text-muted-foreground">{employee.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEmployeesDialog(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                setShowEmployeesDialog(false);
                // Em um sistema real, aqui adicionaria os funcionários
              }}
            >
              Adicionar Selecionados
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de criação de escala */}
      <Dialog open={createScheduleDialogOpen} onOpenChange={setCreateScheduleDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Atribuir Nova Escala</DialogTitle>
            <DialogDescription>
              Atribua uma escala de trabalho a um funcionário
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="employee" className="text-sm font-medium">
                Funcionário
              </label>
              <Select
                value={newScheduleForm.employeeId}
                onValueChange={(value) => setNewScheduleForm({ ...newScheduleForm, employeeId: value })}
              >
                <SelectTrigger id="employee">
                  <SelectValue placeholder="Selecione um funcionário" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name} - {employee.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="schedule" className="text-sm font-medium">
                Escala
              </label>
              <Select
                value={newScheduleForm.scheduleId}
                onValueChange={(value) => setNewScheduleForm({ ...newScheduleForm, scheduleId: value })}
              >
                <SelectTrigger id="schedule">
                  <SelectValue placeholder="Selecione uma escala" />
                </SelectTrigger>
                <SelectContent>
                  {workSchedules.map((schedule) => (
                    <SelectItem key={schedule.id} value={schedule.id}>
                      {schedule.name} ({formatScheduleTime(schedule)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="startDate" className="text-sm font-medium">
                Data de Início
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    id="startDate"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {newScheduleForm.startDate
                      ? format(newScheduleForm.startDate, "PPP", {
                          locale: pt,
                        })
                      : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newScheduleForm.startDate}
                    onSelect={(date) =>
                      date && setNewScheduleForm({ ...newScheduleForm, startDate: date })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <label htmlFor="endDate" className="text-sm font-medium">
                Data de Fim (opcional)
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    id="endDate"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {newScheduleForm.endDate
                      ? format(newScheduleForm.endDate, "PPP", {
                          locale: pt,
                        })
                      : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newScheduleForm.endDate}
                    onSelect={(date) =>
                      setNewScheduleForm({ ...newScheduleForm, endDate: date })
                    }
                    fromDate={newScheduleForm.startDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setCreateScheduleDialogOpen(false);
              resetForm();
            }}>
              Cancelar
            </Button>
            <Button
              onClick={handleCreateSchedule}
              disabled={!newScheduleForm.employeeId || !newScheduleForm.scheduleId}
            >
              Salvar Escala
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScheduleManagementTab; 