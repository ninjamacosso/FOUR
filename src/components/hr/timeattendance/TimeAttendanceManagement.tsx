import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Calendar,
  ClipboardList,
  Settings,
  Users,
  Search,
  Filter,
  Download,
  Clock3,
  FileText,
  UserCheck,
} from "lucide-react";

import TimeClockTab from "./TimeClockTab";
import AttendanceReportsTab from "./AttendanceReportsTab";
import ScheduleManagementTab from "./ScheduleManagementTab";
import TimeOffRequestsTab from "./TimeOffRequestsTab";
import TimeAttendanceSettings from "./TimeAttendanceSettings";

const TimeAttendanceManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("timeclock");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Controle de Ponto</h2>
          <p className="text-muted-foreground">
            Gerencie a jornada de trabalho, presenças e ausências dos funcionários
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Pesquisar
          </Button>
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

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="grid grid-cols-5 w-full mb-6">
          <TabsTrigger value="timeclock">
            <Clock className="h-4 w-4 mr-2" />
            Registro de Ponto
          </TabsTrigger>
          <TabsTrigger value="schedules">
            <Calendar className="h-4 w-4 mr-2" />
            Escalas
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="h-4 w-4 mr-2" />
            Relatórios
          </TabsTrigger>
          <TabsTrigger value="timeoff">
            <UserCheck className="h-4 w-4 mr-2" />
            Ausências
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeclock">
          <TimeClockTab />
        </TabsContent>

        <TabsContent value="schedules">
          <ScheduleManagementTab />
        </TabsContent>

        <TabsContent value="reports">
          <AttendanceReportsTab />
        </TabsContent>

        <TabsContent value="timeoff">
          <TimeOffRequestsTab />
        </TabsContent>

        <TabsContent value="settings">
          <TimeAttendanceSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TimeAttendanceManagement; 