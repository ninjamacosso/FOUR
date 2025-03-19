'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HrPageHeader } from '@/components/hr/shared/HrPageHeader';
import EmployeeManagement from '@/components/hr/employee/EmployeeManagement';
import EmployeeDetail from '@/components/hr/employee/EmployeeDetail';
import EmployeeOnboarding from '@/components/hr/employee/EmployeeOnboarding';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { 
  Button,
  buttonVariants
} from '@/components/ui/button';
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
  Download, 
  Upload, 
  Plus, 
  Users, 
  FileText,
  FileSpreadsheet,
  UserPlus,
  UserMinus,
  UserCheck,
  Calendar,
  UploadCloud,
  TrendingUp,
  TrendingDown,
  User
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function EmployeesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("active");
  const [currentView, setCurrentView] = useState<"list" | "details" | "onboarding">("list");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [showImportDialog, setShowImportDialog] = useState<boolean>(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [employeeCount, setEmployeeCount] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    onLeave: 0,
    trend: {
      total: 0,
      active: 2.5,
      inactive: -1.3,
      onLeave: 1.7
    }
  });

  // Buscar contagem de funcionários
  useEffect(() => {
    fetchEmployeeCounts();
  }, []);

  const fetchEmployeeCounts = async () => {
    try {
      // Contagem total
      const { count: total } = await supabase
        .from('employees')
        .select('*', { count: 'exact', head: true });
      
      // Contagem de ativos
      const { count: active } = await supabase
        .from('employees')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');
      
      // Contagem de inativos
      const { count: inactive } = await supabase
        .from('employees')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'inactive');
      
      // Contagem de funcionários de férias
      const { count: onLeave } = await supabase
        .from('employees')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'on_leave');
      
      setEmployeeCount({
        total: total || 0,
        active: active || 0,
        inactive: inactive || 0,
        onLeave: onLeave || 0,
        trend: {
          total: 3.2,
          active: 2.5,
          inactive: -1.3,
          onLeave: 1.7
        }
      });
      
    } catch (error) {
      console.error('Erro ao buscar contagem de funcionários:', error);
    }
  };

  const handleExportEmployees = async () => {
    try {
      toast({
        title: "Exportando dados",
        description: "Aguarde enquanto exportamos os dados dos funcionários."
      });

      // Buscar todos os funcionários
      const { data, error } = await supabase
        .from('employees')
        .select('*');

      if (error) throw error;

      if (data && data.length > 0) {
        // Preparar o arquivo CSV
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(emp => Object.values(emp).map(val => 
          // Tratar valores com vírgulas
          typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val
        ).join(','));
        
        const csvContent = [headers, ...rows].join('\n');
        
        // Criar blob e link para download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `funcionarios_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Exportação concluída",
          description: "Os dados dos funcionários foram exportados com sucesso."
        });
      } else {
        toast({
          title: "Sem dados para exportar",
          description: "Não há funcionários cadastrados para exportar."
        });
      }
    } catch (error) {
      console.error('Erro ao exportar funcionários:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao exportar os dados dos funcionários.",
        variant: "destructive"
      });
    }
  };

  const handleImportEmployees = async () => {
    if (!importFile) {
      toast({
        title: "Erro",
        description: "Selecione um arquivo CSV para importar.",
        variant: "destructive"
      });
      return;
    }
    
    setIsImporting(true);
    
    try {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',');
        
        const employees = [];
        
        // Processar cada linha (ignorando o cabeçalho)
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          
          const values = lines[i].split(',');
          const employee: Record<string, any> = {};
          
          headers.forEach((header, index) => {
            // Remover quotes e espaços em branco
            const cleanHeader = header.trim().replace(/^"(.+(?="$))"$/, '$1');
            let value = values[index]?.trim() || null;
            
            // Tratar valores entre aspas
            if (value && value.startsWith('"') && value.endsWith('"')) {
              value = value.slice(1, -1);
            }
            
            employee[cleanHeader] = value;
          });
          
          // Remover o ID para que seja gerado um novo
          delete employee.id;
          delete employee.created_at;
          
          employees.push(employee);
        }
        
        // Importar os funcionários para o Supabase
        if (employees.length > 0) {
          const { data, error } = await supabase
            .from('employees')
            .insert(employees);
            
          if (error) throw error;
          
          toast({
            title: "Importação concluída",
            description: `${employees.length} funcionários importados com sucesso.`
          });
          
          // Atualizar contagem e fechar diálogo
          fetchEmployeeCounts();
          setShowImportDialog(false);
          setImportFile(null);
        } else {
          toast({
            title: "Erro",
            description: "Não foi possível processar o arquivo. Verifique se o formato está correto.",
            variant: "destructive"
          });
        }
      };
      
      reader.readAsText(importFile);
    } catch (error) {
      console.error('Erro ao importar funcionários:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao importar os funcionários.",
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImportFile(e.target.files[0]);
    }
  };

  // Funções do gerenciamento de funcionários
  const handleEmployeeSelect = (id: string) => {
    setSelectedEmployeeId(id);
    setCurrentView("details");
  };

  const handleStartOnboarding = () => {
    setCurrentView("onboarding");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedEmployeeId(null);
  };

  const handleEmployeeTabChange = (view: "list" | "details" | "onboarding") => {
    setCurrentView(view);
  };

  const handleEmployeeAdded = () => {
    fetchEmployeeCounts();
    setCurrentView("list");
    
    toast({
      title: "Funcionário adicionado",
      description: "O novo funcionário foi adicionado com sucesso."
    });
  };

  return (
    <div className="flex flex-col space-y-6 p-6">
      <HrPageHeader
        title="Funcionários"
        description="Gerenciamento completo de funcionários e dados pessoais"
        icon={<Users className="h-6 w-6" />}
      />

      {/* Estatísticas - Mostrar apenas na visão de lista */}
      {currentView === "list" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card Total de Funcionários */}
          <Card className="overflow-hidden border-none shadow-lg">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-1">
              <CardContent className="p-0">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-b-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Total de Funcionários</p>
                      <div className="flex items-baseline">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{employeeCount.total}</h3>
                        <span className="flex items-center ml-2 text-xs font-medium text-green-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +{employeeCount.trend.total}%
                        </span>
                      </div>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-3 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
          
          {/* Card Funcionários Ativos */}
          <Card className="overflow-hidden border-none shadow-lg">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-1">
              <CardContent className="p-0">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-b-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Funcionários Ativos</p>
                      <div className="flex items-baseline">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{employeeCount.active}</h3>
                        <span className="flex items-center ml-2 text-xs font-medium text-green-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +{employeeCount.trend.active}%
                        </span>
                      </div>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <UserCheck className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-3 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: `${(employeeCount.active / Math.max(employeeCount.total, 1)) * 100}%` }}></div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
          
          {/* Card Funcionários Inativos */}
          <Card className="overflow-hidden border-none shadow-lg">
            <div className="bg-gradient-to-r from-red-500 to-rose-600 p-1">
              <CardContent className="p-0">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-b-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">Funcionários Inativos</p>
                      <div className="flex items-baseline">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{employeeCount.inactive}</h3>
                        <span className="flex items-center ml-2 text-xs font-medium text-red-600">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          {employeeCount.trend.inactive}%
                        </span>
                      </div>
                    </div>
                    <div className="bg-red-100 p-3 rounded-full">
                      <UserMinus className="h-5 w-5 text-red-600" />
                    </div>
                  </div>
                  <div className="mt-3 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: `${(employeeCount.inactive / Math.max(employeeCount.total, 1)) * 100}%` }}></div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
          
          {/* Card Em Férias/Licença */}
          <Card className="overflow-hidden border-none shadow-lg">
            <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-1">
              <CardContent className="p-0">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-b-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-1">Em Férias/Licença</p>
                      <div className="flex items-baseline">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{employeeCount.onLeave}</h3>
                        <span className="flex items-center ml-2 text-xs font-medium text-yellow-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +{employeeCount.trend.onLeave}%
                        </span>
                      </div>
                    </div>
                    <div className="bg-amber-100 p-3 rounded-full">
                      <Calendar className="h-5 w-5 text-amber-600" />
                    </div>
                  </div>
                  <div className="mt-3 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(employeeCount.onLeave / Math.max(employeeCount.total, 1)) * 100}%` }}></div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      )}
      
      {/* Ações e Gerenciamento - Mostrar apenas na visão de lista */}
      {currentView === "list" && (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pb-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-1 flex-grow">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full bg-gray-100 dark:bg-gray-700 p-1 rounded-md">
                <TabsTrigger 
                  value="active" 
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:shadow-sm rounded-md flex-1"
                >
                  <UserCheck className="h-4 w-4 mr-2" />
                  Ativos
                </TabsTrigger>
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:shadow-sm rounded-md flex-1"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Todos
                </TabsTrigger>
                <TabsTrigger 
                  value="inactive" 
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:shadow-sm rounded-md flex-1"
                >
                  <UserMinus className="h-4 w-4 mr-2" />
                  Inativos
                </TabsTrigger>
                <TabsTrigger 
                  value="onLeave" 
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:shadow-sm rounded-md flex-1"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Férias/Licença
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex gap-2">
            <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-white shadow hover:bg-gray-100 hover:text-blue-600 transition-all">
                  <Upload className="mr-2 h-4 w-4" />
                  Importar
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Importar Funcionários</DialogTitle>
                  <DialogDescription>
                    Carregue um arquivo CSV contendo os dados dos funcionários.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="file">Arquivo CSV</Label>
                    <Input 
                      id="file"
                      type="file" 
                      accept=".csv"
                      onChange={handleFileChange}
                    />
                    {importFile && (
                      <p className="text-sm text-muted-foreground">
                        Arquivo selecionado: {importFile.name}
                      </p>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowImportDialog(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleImportEmployees} disabled={isImporting || !importFile}>
                    {isImporting ? "Importando..." : "Importar"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button 
              variant="outline" 
              onClick={handleExportEmployees}
              className="bg-white shadow hover:bg-gray-100 hover:text-green-600 transition-all"
            >
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            
            <Button 
              onClick={handleStartOnboarding}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-md hover:shadow-lg transition-all"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Novo Funcionário
            </Button>
          </div>
        </div>
      )}
      
      {/* Título das outras visualizações */}
      {currentView === "details" && (
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <User className="text-blue-600 h-5 w-5 mr-2" />
            Detalhes do Funcionário
          </h2>
          <Button 
            variant="outline" 
            onClick={handleBackToList}
            className="bg-white hover:bg-blue-50 hover:text-blue-600 transition-all"
          >
            Voltar para a Lista
          </Button>
        </div>
      )}
      
      {currentView === "onboarding" && (
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <UserPlus className="text-green-600 h-5 w-5 mr-2" />
            Cadastrar Novo Funcionário
          </h2>
          <Button 
            variant="outline" 
            onClick={handleBackToList}
            className="bg-white hover:bg-red-50 hover:text-red-600 transition-all"
          >
            Cancelar
          </Button>
        </div>
      )}
      
      {/* Conteúdo principal baseado na visualização atual */}
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md ${currentView === "onboarding" ? "border border-green-200" : currentView === "details" ? "border border-blue-200" : ""}`}>
        {currentView === "list" && (
          <EmployeeManagement 
            activeTab="list"
            onTabChange={handleEmployeeTabChange}
            onEmployeeSelect={handleEmployeeSelect}
            onAddEmployee={handleStartOnboarding}
          />
        )}
        
        {currentView === "details" && selectedEmployeeId && (
          <EmployeeDetail 
            employeeId={selectedEmployeeId}
            onBack={handleBackToList}
            onEdit={(id) => console.log("Editar funcionário:", id)}
          />
        )}
        
        {currentView === "onboarding" && (
          <EmployeeOnboarding 
            onComplete={handleEmployeeAdded}
            onCancel={handleBackToList}
          />
        )}
      </div>
    </div>
  );
} 