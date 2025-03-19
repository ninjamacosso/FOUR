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
import {
  Table,
  TableBody,
  TableCaption,
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, MapPin, Calendar, ArrowRight, Search, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TimeRecord {
  id: string;
  type: "clockIn" | "clockOut" | "breakStart" | "breakEnd";
  timestamp: Date;
  location?: string;
  notes?: string;
}

interface EmployeeTimeRecord {
  id: string;
  name: string;
  department: string;
  avatar?: string;
  status: "present" | "absent" | "late" | "onBreak" | "leftEarly";
  timeRecords: TimeRecord[];
}

const TimeClockTab: React.FC = () => {
  const [currentDate] = useState(new Date());
  const [clockInDialogOpen, setClockInDialogOpen] = useState(false);
  const [clockOutDialogOpen, setClockOutDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeEmployee, setActiveEmployee] = useState<EmployeeTimeRecord | null>(null);
  const [notes, setNotes] = useState("");
  const [location, setLocation] = useState("Office - Sede");

  // Mock data para registros de ponto dos funcionários
  const [employeeRecords, setEmployeeRecords] = useState<EmployeeTimeRecord[]>([
    {
      id: "emp001",
      name: "Ana Silva",
      department: "TI",
      avatar: "",
      status: "present",
      timeRecords: [
        {
          id: "rec001",
          type: "clockIn",
          timestamp: new Date(currentDate.setHours(8, 2, 0, 0)),
          location: "Office - Sede",
        },
      ],
    },
    {
      id: "emp002",
      name: "Carlos Santos",
      department: "RH",
      avatar: "",
      status: "late",
      timeRecords: [
        {
          id: "rec002",
          type: "clockIn",
          timestamp: new Date(currentDate.setHours(9, 15, 0, 0)),
          location: "Remote - Home Office",
          notes: "Problema com transporte público",
        },
      ],
    },
    {
      id: "emp003",
      name: "Mariana Oliveira",
      department: "Marketing",
      avatar: "",
      status: "onBreak",
      timeRecords: [
        {
          id: "rec003",
          type: "clockIn",
          timestamp: new Date(currentDate.setHours(8, 0, 0, 0)),
          location: "Office - Sede",
        },
        {
          id: "rec004",
          type: "breakStart",
          timestamp: new Date(currentDate.setHours(12, 0, 0, 0)),
          location: "Office - Sede",
        },
      ],
    },
    {
      id: "emp004",
      name: "João Ferreira",
      department: "Vendas",
      avatar: "",
      status: "absent",
      timeRecords: [],
    },
    {
      id: "emp005",
      name: "Camila Rocha",
      department: "Financeiro",
      avatar: "",
      status: "present",
      timeRecords: [
        {
          id: "rec005",
          type: "clockIn",
          timestamp: new Date(currentDate.setHours(8, 5, 0, 0)),
          location: "Office - Filial Norte",
        },
      ],
    },
  ]);

  const handleClockIn = (employeeId: string) => {
    const employee = employeeRecords.find((emp) => emp.id === employeeId);
    if (employee) {
      setActiveEmployee(employee);
      setClockInDialogOpen(true);
    }
  };

  const handleClockOut = (employeeId: string) => {
    const employee = employeeRecords.find((emp) => emp.id === employeeId);
    if (employee) {
      setActiveEmployee(employee);
      setClockOutDialogOpen(true);
    }
  };

  const confirmClockIn = () => {
    if (activeEmployee) {
      const newTimeRecord: TimeRecord = {
        id: `rec${Date.now()}`,
        type: "clockIn",
        timestamp: new Date(),
        location,
        notes,
      };

      const updatedRecords = employeeRecords.map((emp) => {
        if (emp.id === activeEmployee.id) {
          return {
            ...emp,
            status: "present",
            timeRecords: [...emp.timeRecords, newTimeRecord],
          };
        }
        return emp;
      });

      setEmployeeRecords(updatedRecords);
      setClockInDialogOpen(false);
      setNotes("");
    }
  };

  const confirmClockOut = () => {
    if (activeEmployee) {
      const newTimeRecord: TimeRecord = {
        id: `rec${Date.now()}`,
        type: "clockOut",
        timestamp: new Date(),
        location,
        notes,
      };

      const updatedRecords = employeeRecords.map((emp) => {
        if (emp.id === activeEmployee.id) {
          const currentHour = new Date().getHours();
          const newStatus = currentHour < 17 ? "leftEarly" : "present";
          
          return {
            ...emp,
            status: newStatus,
            timeRecords: [...emp.timeRecords, newTimeRecord],
          };
        }
        return emp;
      });

      setEmployeeRecords(updatedRecords);
      setClockOutDialogOpen(false);
      setNotes("");
    }
  };

  const filteredEmployees = employeeRecords.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Clock className="h-3.5 w-3.5 mr-1" />
            Atrasado
          </Badge>
        );
      case "onBreak":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            Em Pausa
          </Badge>
        );
      case "leftEarly":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
            <ArrowRight className="h-3.5 w-3.5 mr-1" />
            Saída Antecipada
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const canClockIn = (employee: EmployeeTimeRecord) => {
    if (employee.timeRecords.length === 0) return true;
    
    const lastRecord = employee.timeRecords[employee.timeRecords.length - 1];
    return lastRecord.type === "clockOut" || lastRecord.type === "breakEnd";
  };

  const canClockOut = (employee: EmployeeTimeRecord) => {
    if (employee.timeRecords.length === 0) return false;
    
    const lastRecord = employee.timeRecords[employee.timeRecords.length - 1];
    return lastRecord.type === "clockIn" || lastRecord.type === "breakStart";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Clock className="mr-2 h-6 w-6" />
            Registro de Ponto do Dia
          </CardTitle>
          <CardDescription>
            {currentDate.toLocaleDateString("pt-BR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar funcionário por nome ou departamento..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Table>
            <TableCaption>Lista de funcionários e registros de ponto do dia</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Funcionário</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Entrada</TableHead>
                <TableHead>Saída</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => {
                const clockInRecord = employee.timeRecords.find(
                  (record) => record.type === "clockIn"
                );
                const clockOutRecord = employee.timeRecords.find(
                  (record) => record.type === "clockOut"
                );

                return (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback>
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{employee.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{getStatusBadge(employee.status)}</TableCell>
                    <TableCell>
                      {clockInRecord ? (
                        <div className="flex items-center text-sm">
                          <Clock className="mr-1 h-3.5 w-3.5 text-green-500" />
                          {formatTime(clockInRecord.timestamp)}
                          {clockInRecord.location && (
                            <span className="ml-2 flex items-center text-xs text-gray-500">
                              <MapPin className="mr-1 h-3 w-3" />
                              {clockInRecord.location}
                            </span>
                          )}
                        </div>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      {clockOutRecord ? (
                        <div className="flex items-center text-sm">
                          <Clock className="mr-1 h-3.5 w-3.5 text-red-500" />
                          {formatTime(clockOutRecord.timestamp)}
                        </div>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleClockIn(employee.id)}
                          disabled={!canClockIn(employee)}
                        >
                          Entrada
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleClockOut(employee.id)}
                          disabled={!canClockOut(employee)}
                        >
                          Saída
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog de Registro de Entrada */}
      <Dialog open={clockInDialogOpen} onOpenChange={setClockInDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Entrada</DialogTitle>
            <DialogDescription>
              Confirme o registro de entrada para {activeEmployee?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="location">Local</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="notes">Observações (opcional)</Label>
              <Textarea
                id="notes"
                placeholder="Adicione observações se necessário..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setClockInDialogOpen(false);
                setNotes("");
              }}
            >
              Cancelar
            </Button>
            <Button onClick={confirmClockIn}>Confirmar Entrada</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Registro de Saída */}
      <Dialog open={clockOutDialogOpen} onOpenChange={setClockOutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Saída</DialogTitle>
            <DialogDescription>
              Confirme o registro de saída para {activeEmployee?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="outLocation">Local</Label>
              <Input
                id="outLocation"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="outNotes">Observações (opcional)</Label>
              <Textarea
                id="outNotes"
                placeholder="Adicione observações se necessário..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setClockOutDialogOpen(false);
                setNotes("");
              }}
            >
              Cancelar
            </Button>
            <Button onClick={confirmClockOut}>Confirmar Saída</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TimeClockTab; 