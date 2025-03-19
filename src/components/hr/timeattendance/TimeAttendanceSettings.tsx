import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  Calendar,
  AlertCircle,
  Settings,
  MapPin,
  Smartphone,
} from "lucide-react";

const TimeAttendanceSettings: React.FC = () => {
  const [workHoursConfig, setWorkHoursConfig] = useState({
    standardWorkHours: 8,
    overtimeThreshold: 2,
    lateArrivalThreshold: 15, // minutes
  });

  const [attendanceRules, setAttendanceRules] = useState({
    allowRemoteWork: false,
    requireLocationTracking: false,
    requireDeviceRegistration: false,
  });

  const [clockInMethods, setClockInMethods] = useState({
    webBrowser: true,
    mobileApp: false,
    biometricDevice: false,
    rfidCard: false,
  });

  const handleWorkHoursConfigChange = (field: string, value: number) => {
    setWorkHoursConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAttendanceRulesToggle = (field: keyof typeof attendanceRules) => {
    setAttendanceRules(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleClockInMethodToggle = (method: keyof typeof clockInMethods) => {
    setClockInMethods(prev => ({
      ...prev,
      [method]: !prev[method]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Configurações de Ponto</h2>
          <p className="text-muted-foreground">
            Gerencie as configurações de registro de ponto e jornada de trabalho
          </p>
        </div>
        <Button>
          <Settings className="mr-2 h-4 w-4" />
          Salvar Configurações
        </Button>
      </div>

      {/* Configurações de Horas de Trabalho */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Configurações de Jornada
          </CardTitle>
          <CardDescription>
            Defina as regras padrão para jornada de trabalho e horas extras
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Horas de Trabalho Padrão
            </label>
            <Input
              type="number"
              value={workHoursConfig.standardWorkHours}
              onChange={(e) => handleWorkHoursConfigChange('standardWorkHours', Number(e.target.value))}
              min={4}
              max={12}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Horas diárias de trabalho padrão
            </p>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Limite para Horas Extras
            </label>
            <Input
              type="number"
              value={workHoursConfig.overtimeThreshold}
              onChange={(e) => handleWorkHoursConfigChange('overtimeThreshold', Number(e.target.value))}
              min={0}
              max={4}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Horas adicionais para considerar hora extra
            </p>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Tolerância de Atraso
            </label>
            <Input
              type="number"
              value={workHoursConfig.lateArrivalThreshold}
              onChange={(e) => handleWorkHoursConfigChange('lateArrivalThreshold', Number(e.target.value))}
              min={0}
              max={60}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Minutos de tolerância para atrasos
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Regras de Presença */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Regras de Presença
          </CardTitle>
          <CardDescription>
            Configure as regras de registro de ponto e presença
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="flex items-center space-x-2 mb-2">
              <Switch
                checked={attendanceRules.allowRemoteWork}
                onCheckedChange={() => handleAttendanceRulesToggle('allowRemoteWork')}
              />
              <span className="text-sm font-medium">Trabalho Remoto</span>
            </label>
            <p className="text-xs text-muted-foreground">
              Permitir registro de ponto para trabalho remoto
            </p>
          </div>

          <div>
            <label className="flex items-center space-x-2 mb-2">
              <Switch
                checked={attendanceRules.requireLocationTracking}
                onCheckedChange={() => handleAttendanceRulesToggle('requireLocationTracking')}
              />
              <span className="text-sm font-medium">Rastreamento de Local</span>
            </label>
            <p className="text-xs text-muted-foreground">
              Exigir localização geográfica no registro de ponto
            </p>
          </div>

          <div>
            <label className="flex items-center space-x-2 mb-2">
              <Switch
                checked={attendanceRules.requireDeviceRegistration}
                onCheckedChange={() => handleAttendanceRulesToggle('requireDeviceRegistration')}
              />
              <span className="text-sm font-medium">Registro de Dispositivo</span>
            </label>
            <p className="text-xs text-muted-foreground">
              Exigir registro único de dispositivo
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Métodos de Registro de Ponto */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="h-5 w-5 mr-2" />
            Métodos de Registro
          </CardTitle>
          <CardDescription>
            Selecione os métodos permitidos para registro de ponto
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="flex items-center space-x-2 mb-2">
              <Switch
                checked={clockInMethods.webBrowser}
                onCheckedChange={() => handleClockInMethodToggle('webBrowser')}
              />
              <span className="text-sm font-medium">Navegador Web</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-2 mb-2">
              <Switch
                checked={clockInMethods.mobileApp}
                onCheckedChange={() => handleClockInMethodToggle('mobileApp')}
              />
              <span className="text-sm font-medium">Aplicativo Mobile</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-2 mb-2">
              <Switch
                checked={clockInMethods.biometricDevice}
                onCheckedChange={() => handleClockInMethodToggle('biometricDevice')}
              />
              <span className="text-sm font-medium">Dispositivo Biométrico</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-2 mb-2">
              <Switch
                checked={clockInMethods.rfidCard}
                onCheckedChange={() => handleClockInMethodToggle('rfidCard')}
              />
              <span className="text-sm font-medium">Cartão RFID</span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Alertas e Notificações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Alertas e Notificações
          </CardTitle>
          <CardDescription>
            Configure alertas para atrasos, ausências e outras ocorrências
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Notificações de Atraso
            </label>
            <Select defaultValue="manager">
              <SelectTrigger>
                <SelectValue placeholder="Selecione o destinatário" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manager">Apenas Gestor</SelectItem>
                <SelectItem value="hr">RH e Gestor</SelectItem>
                <SelectItem value="all">Todos os Níveis</SelectItem>
                <SelectItem value="none">Desativado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Notificações de Ausência
            </label>
            <Select defaultValue="hr">
              <SelectTrigger>
                <SelectValue placeholder="Selecione o destinatário" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manager">Apenas Gestor</SelectItem>
                <SelectItem value="hr">RH e Gestor</SelectItem>
                <SelectItem value="all">Todos os Níveis</SelectItem>
                <SelectItem value="none">Desativado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeAttendanceSettings; 