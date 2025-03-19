import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  FileText,
  Filter,
  Download,
  Search,
  Calendar as CalendarIcon,
  PieChart,
  Clock,
  Users,
  AlertCircle,
  CheckCircle,
  XCircle,
  BarChart3,
} from "lucide-react";
import { format, subDays, differenceInMinutes } from "date-fns";
import { pt } from "date-fns/locale";

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: Date;
  clockIn: Date | null;
  clockOut: Date | null;
  lateMinutes: number;
  earlyDepartureMinutes: number;
  status: "present" | "absent" | "late" | "incomplete" | "weekend" | "holiday";
  workHours: number;
  overtimeHours: number;
}

interface Department {
  id: string;
  name: string;
}

// Mock data
const departments: Department[] = [
  { id: "dept1", name: "TI" },
  { id: "dept2", name: "RH" },
  { id: "dept3", name: "Financeiro" },
  { id: "dept4", name: "Marketing" },
  { id: "dept5", name: "Vendas" },
];

const generateMockAttendanceData = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const today = new Date();
  const employees = [
    { id: "emp1", name: "Ana Silva", department: "TI" },
    { id: "emp2", name: "Carlos Santos", department: "RH" },
    { id: "emp3", name: "Mariana Oliveira", department: "Marketing" },
    { id: "emp4", name: "João Ferreira", department: "Vendas" },
    { id: "emp5", name: "Camila Rocha", department: "Financeiro" },
  ];

  // Gera registros para os últimos 30 dias
  for (let i = 0; i < 30; i++) {
    const date = subDays(today, i);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    
    employees.forEach((employee, empIndex) => {
      if (isWeekend) {
        // Não gera registros para fins de semana para alguns funcionários
        if (Math.random() > 0.8) {
          records.push({
            id: `rec${date.getTime()}-${employee.id}`,
            employeeId: employee.id,
            employeeName: employee.name,
            department: employee.department,
            date: date,
            clockIn: null,
            clockOut: null,
            lateMinutes: 0,
            earlyDepartureMinutes: 0,
            status: "weekend",
            workHours: 0,
            overtimeHours: 0,
          });
        }
      } else {
        // Status aleatório para dias úteis
        const random = Math.random();
        let status: AttendanceRecord["status"] = "present";
        let clockIn: Date | null = new Date(date);
        let clockOut: Date | null = new Date(date);
        let lateMinutes = 0;
        let earlyDepartureMinutes = 0;
        let workHours = 8;
        let overtimeHours = 0;

        // Configura hora de entrada
        clockIn.setHours(8, 0, 0);
        
        // Configura hora de saída
        clockOut.setHours(17, 0, 0);

        if (random < 0.1) {
          // Ausente
          status = "absent";
          clockIn = null;
          clockOut = null;
          workHours = 0;
        } else if (random < 0.2) {
          // Atrasado
          status = "late";
          lateMinutes = Math.floor(Math.random() * 60) + 10; // 10-70 minutos
          clockIn.setMinutes(clockIn.getMinutes() + lateMinutes);
          workHours = Math.max(0, 8 - lateMinutes / 60);
        } else if (random < 0.3) {
          // Saída antecipada
          status = "incomplete";
          earlyDepartureMinutes = Math.floor(Math.random() * 60) + 10; // 10-70 minutos
          clockOut.setMinutes(clockOut.getMinutes() - earlyDepartureMinutes);
          workHours = Math.max(0, 8 - earlyDepartureMinutes / 60);
        } else if (random < 0.4) {
          // Hora extra
          overtimeHours = Math.floor(Math.random() * 3) + 1; // 1-3 horas extras
          clockOut.setHours(clockOut.getHours() + overtimeHours);
          workHours = 8 + overtimeHours;
        }

        records.push({
          id: `rec${date.getTime()}-${employee.id}`,
          employeeId: employee.id,
          employeeName: employee.name,
          department: employee.department,
          date: date,
          clockIn,
          clockOut,
          lateMinutes,
          earlyDepartureMinutes,
          status,
          workHours,
          overtimeHours,
        });
      }
    });
  }

  return records;
};

const AttendanceReportsTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [attendanceData] = useState<AttendanceRecord[]>(generateMockAttendanceData());

  const filteredData = attendanceData.filter((record) => {
    const matchesDateRange =
      dateRange.from && dateRange.to
        ? record.date >= dateRange.from && record.date <= dateRange.to
        : true;
    
    const matchesDepartment =
      selectedDepartment === "all" || record.department === selectedDepartment;
    
    const matchesSearch =
      record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesDateRange && matchesDepartment && matchesSearch;
  });

  // Estatísticas gerais
  const totalPresent = filteredData.filter(r => r.status === "present").length;
  const totalAbsent = filteredData.filter(r => r.status === "absent").length;
  const totalLate = filteredData.filter(r => r.status === "late").length;
  const totalIncomplete = filteredData.filter(r => r.status === "incomplete").length;
  const totalRecords = filteredData.length;
  
  const attendanceRate = totalRecords ? Math.round((totalPresent / totalRecords) * 100) : 0;
  const punctualityRate = totalRecords ? Math.round(((totalPresent - totalLate) / totalRecords) * 100) : 0;
  
  const totalWorkHours = filteredData.reduce((sum, record) => sum + record.workHours, 0);
  const totalOvertimeHours = filteredData.reduce((sum, record) => sum + record.overtimeHours, 0);

  // Formatação para exibição
  const formatDate = (date: Date) => {
    return format(date, "dd/MM/yyyy");
  };

  const formatTime = (date: Date | null) => {
    if (!date) return "—";
    return format(date, "HH:mm");
  };

  const calculateWorkedTime = (record: AttendanceRecord) => {
    if (!record.clockIn || !record.clockOut) return "—";
    
    const diffMinutes = differenceInMinutes(record.clockOut, record.clockIn);
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    return `${hours}h${minutes ? ` ${minutes}m` : ""}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Presente
          </Badge>
        );
      case "absent":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Ausente
          </Badge>
        );
      case "late":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            Atrasado
          </Badge>
        );
      case "incomplete":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            Saída Antecipada
          </Badge>
        );
      case "weekend":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
            <CalendarIcon className="h-3.5 w-3.5 mr-1" />
            Fim de Semana
          </Badge>
        );
      case "holiday":
        return (
          <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-200">
            <CalendarIcon className="h-3.5 w-3.5 mr-1" />
            Feriado
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center text-2xl">
                <FileText className="mr-2 h-6 w-6" />
                Relatórios de Presença
              </CardTitle>
              <CardDescription>
                Analise os registros de ponto e estatísticas de presença
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Filtros */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Buscar funcionário ou departamento..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select
                value={selectedDepartment}
                onValueChange={setSelectedDepartment}
              >
                <SelectTrigger className="w-full md:w-1/3">
                  <SelectValue placeholder="Filtrar por departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os departamentos</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.name}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full md:w-1/3 justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from
                      ? `${format(dateRange.from, "dd/MM/yyyy")} - ${
                          dateRange.to
                            ? format(dateRange.to, "dd/MM/yyyy")
                            : format(new Date(), "dd/MM/yyyy")
                        }`
                      : "Selecione o período"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange as any}
                    initialFocus
                    locale={pt}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-muted-foreground text-sm">Taxa de Presença</p>
                      <h3 className="text-2xl font-bold">{attendanceRate}%</h3>
                    </div>
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-muted-foreground text-sm">Taxa de Pontualidade</p>
                      <h3 className="text-2xl font-bold">{punctualityRate}%</h3>
                    </div>
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-muted-foreground text-sm">Horas Trabalhadas</p>
                      <h3 className="text-2xl font-bold">{totalWorkHours.toFixed(1)}h</h3>
                    </div>
                    <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-muted-foreground text-sm">Horas Extras</p>
                      <h3 className="text-2xl font-bold">{totalOvertimeHours.toFixed(1)}h</h3>
                    </div>
                    <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs para diferentes visões de relatório */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="daily">
                  <Calendar className="h-4 w-4 mr-2" />
                  Registros Diários
                </TabsTrigger>
                <TabsTrigger value="summary">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Resumo por Funcionário
                </TabsTrigger>
                <TabsTrigger value="department">
                  <PieChart className="h-4 w-4 mr-2" />
                  Análise por Departamento
                </TabsTrigger>
              </TabsList>

              {/* Tabela de Registros Diários */}
              <TabsContent value="daily">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Funcionário</TableHead>
                        <TableHead>Departamento</TableHead>
                        <TableHead>Entrada</TableHead>
                        <TableHead>Saída</TableHead>
                        <TableHead>Horas Trabalhadas</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Observações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.slice(0, 20).map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{formatDate(record.date)}</TableCell>
                          <TableCell>{record.employeeName}</TableCell>
                          <TableCell>{record.department}</TableCell>
                          <TableCell>{formatTime(record.clockIn)}</TableCell>
                          <TableCell>{formatTime(record.clockOut)}</TableCell>
                          <TableCell>{calculateWorkedTime(record)}</TableCell>
                          <TableCell>{getStatusBadge(record.status)}</TableCell>
                          <TableCell>
                            {record.lateMinutes > 0 && (
                              <div className="text-xs text-amber-600">
                                Atraso: {record.lateMinutes} min
                              </div>
                            )}
                            {record.earlyDepartureMinutes > 0 && (
                              <div className="text-xs text-blue-600">
                                Saída antecipada: {record.earlyDepartureMinutes} min
                              </div>
                            )}
                            {record.overtimeHours > 0 && (
                              <div className="text-xs text-purple-600">
                                Hora extra: {record.overtimeHours}h
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-muted-foreground">
                    Exibindo 20 de {filteredData.length} registros
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Anterior
                    </Button>
                    <Button variant="outline" size="sm">
                      Próximo
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Resumo por Funcionário */}
              <TabsContent value="summary">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Funcionário</TableHead>
                        <TableHead>Departamento</TableHead>
                        <TableHead>Dias Trabalhados</TableHead>
                        <TableHead>Horas Trabalhadas</TableHead>
                        <TableHead>Horas Extras</TableHead>
                        <TableHead>Atrasos</TableHead>
                        <TableHead>Faltas</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from(
                        new Set(filteredData.map((r) => r.employeeId))
                      ).map((employeeId) => {
                        const employeeRecords = filteredData.filter(
                          (r) => r.employeeId === employeeId
                        );
                        const employeeName = employeeRecords[0]?.employeeName || "";
                        const department = employeeRecords[0]?.department || "";
                        
                        const daysWorked = employeeRecords.filter(
                          (r) => r.status === "present" || r.status === "late" || r.status === "incomplete"
                        ).length;
                        
                        const hoursWorked = employeeRecords.reduce(
                          (sum, r) => sum + r.workHours,
                          0
                        );
                        
                        const overtimeHours = employeeRecords.reduce(
                          (sum, r) => sum + r.overtimeHours,
                          0
                        );
                        
                        const lateCount = employeeRecords.filter(
                          (r) => r.status === "late"
                        ).length;
                        
                        const absentCount = employeeRecords.filter(
                          (r) => r.status === "absent"
                        ).length;

                        return (
                          <TableRow key={employeeId}>
                            <TableCell>{employeeName}</TableCell>
                            <TableCell>{department}</TableCell>
                            <TableCell>{daysWorked}</TableCell>
                            <TableCell>{hoursWorked.toFixed(1)}</TableCell>
                            <TableCell>{overtimeHours.toFixed(1)}</TableCell>
                            <TableCell>{lateCount}</TableCell>
                            <TableCell>{absentCount}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Análise por Departamento */}
              <TabsContent value="department">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Departamento</TableHead>
                        <TableHead>Funcionários</TableHead>
                        <TableHead>Taxa de Presença</TableHead>
                        <TableHead>Taxa de Pontualidade</TableHead>
                        <TableHead>Horas Trabalhadas</TableHead>
                        <TableHead>Horas Extras</TableHead>
                        <TableHead>Atrasos</TableHead>
                        <TableHead>Faltas</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from(
                        new Set(filteredData.map((r) => r.department))
                      ).map((department) => {
                        const departmentRecords = filteredData.filter(
                          (r) => r.department === department
                        );
                        
                        const employees = new Set(
                          departmentRecords.map((r) => r.employeeId)
                        ).size;
                        
                        const totalRecordsCount = departmentRecords.length;
                        
                        const presentCount = departmentRecords.filter(
                          (r) => r.status === "present" || r.status === "late" || r.status === "incomplete"
                        ).length;
                        
                        const punctualCount = departmentRecords.filter(
                          (r) => r.status === "present"
                        ).length;
                        
                        const attendanceRate = totalRecordsCount
                          ? Math.round((presentCount / totalRecordsCount) * 100)
                          : 0;
                        
                        const punctualityRate = totalRecordsCount
                          ? Math.round((punctualCount / totalRecordsCount) * 100)
                          : 0;
                        
                        const hoursWorked = departmentRecords.reduce(
                          (sum, r) => sum + r.workHours,
                          0
                        );
                        
                        const overtimeHours = departmentRecords.reduce(
                          (sum, r) => sum + r.overtimeHours,
                          0
                        );
                        
                        const lateCount = departmentRecords.filter(
                          (r) => r.status === "late"
                        ).length;
                        
                        const absentCount = departmentRecords.filter(
                          (r) => r.status === "absent"
                        ).length;

                        return (
                          <TableRow key={department}>
                            <TableCell className="font-medium">{department}</TableCell>
                            <TableCell>{employees}</TableCell>
                            <TableCell>{attendanceRate}%</TableCell>
                            <TableCell>{punctualityRate}%</TableCell>
                            <TableCell>{hoursWorked.toFixed(1)}</TableCell>
                            <TableCell>{overtimeHours.toFixed(1)}</TableCell>
                            <TableCell>{lateCount}</TableCell>
                            <TableCell>{absentCount}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <div className="text-xs text-muted-foreground">
            Última atualização: {format(new Date(), "dd/MM/yyyy HH:mm")}
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar Relatório
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AttendanceReportsTab; 