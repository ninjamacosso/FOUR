import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  CalendarDays,
  BadgeDollarSign,
  Award,
  FileBarChart,
  ShoppingCart,
  Warehouse,
  TrendingUp,
  Briefcase,
  BarChart3,
  Settings,
  Truck,
  Factory,
  Landmark,
  BookOpen,
  Wrench,
  Building2,
  LogOut,
  User,
  Sun,
  Moon,
  LayoutDashboard,
  Wallet,
  Clock,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import MetricsSection from "./hr/dashboard/MetricsSection";
import QuickAccessCards from "./hr/dashboard/QuickAccessCards";
import RecentActivities from "./hr/dashboard/RecentActivities";
import EmployeeManagement from "./hr/employee/EmployeeManagement";
import PayrollProcessing from "./hr/payroll/PayrollProcessing";
import LeaveManagement from "./hr/leave/LeaveManagement";
import HRModule from "./hr/HRModule";
import HRNinjaModule from "./hr/HRNinjaModule";

type Module =
  | "dashboard"
  | "employees"
  | "payroll"
  | "leave"
  | "performance"
  | "reporting"
  | "sales"
  | "inventory"
  | "finance"
  | "crm"
  | "analytics"
  | "settings"
  | "logistics"
  | "manufacturing"
  | "accounting"
  | "projects"
  | "maintenance"
  | "assets"
  | "hr"
  | "timeattendance"
  | "timeoff";

interface HomeProps {
  onLogout?: () => void;
}

const Home: React.FC<HomeProps> = ({ onLogout = () => {} }) => {
  const [activeModule, setActiveModule] = useState<Module>("dashboard");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const navigate = useNavigate();

  // Mock data for metrics
  const metricsData = {
    totalEmployees: {
      count: "124",
      change: {
        value: "4%",
        isPositive: true,
      },
    },
    pendingLeaveRequests: {
      count: "8",
      change: {
        value: "12%",
        isPositive: false,
      },
    },
    upcomingEvaluations: {
      count: "12",
    },
    payrollStatus: {
      status: "Due in 5 days",
      dueDate: "28 May",
    },
  };

  const handleModuleChange = (module: Module) => {
    setActiveModule(module);
    
    // Navegar para a página do módulo correspondente
    if (module === "hr") {
      navigate("/hr");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Implementar lógica para alternar entre temas claro e escuro
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("isAuthenticated");
      if (onLogout) onLogout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const DashboardContent = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <MetricsSection
            totalEmployees={metricsData.totalEmployees}
            pendingLeaveRequests={metricsData.pendingLeaveRequests}
            upcomingEvaluations={metricsData.upcomingEvaluations}
            payrollStatus={metricsData.payrollStatus}
          />
          <QuickAccessCards onCardClick={(tab) => handleModuleChange(tab as Module)} />
        </div>
        <div className="space-y-6">
          <RecentActivities />
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Eventos Futuros</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                <p className="text-sm font-medium">Reunião de Equipe</p>
                <p className="text-xs text-gray-500">Amanhã, 10:00 - 11:30</p>
              </div>
              <div className="p-3 bg-green-50 rounded-md border border-green-100">
                <p className="text-sm font-medium">Treinamento de Segurança</p>
                <p className="text-xs text-gray-500">23/05/2023, 14:00 - 16:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const hrModules = [
    {
      name: "Dashboard RH",
      href: "/hr",
      icon: <LayoutDashboard className="h-5 w-5" />,
      description: "Visão geral dos recursos humanos"
    },
    {
      name: "Funcionários",
      href: "/hr/employees",
      icon: <Users className="h-5 w-5" />,
      description: "Gerenciamento de funcionários"
    },
    {
      name: "Folha de Pagamento",
      href: "/hr/payroll",
      icon: <Wallet className="h-5 w-5" />,
      description: "Processamento de salários"
    },
    {
      name: "Ponto e Presença",
      href: "/hr/timeattendance",
      icon: <Clock className="h-5 w-5" />,
      description: "Registro de ponto e escalas"
    },
    {
      name: "Férias e Ausências",
      href: "/hr/timeoff",
      icon: <Settings className="h-5 w-5" />,
      description: "Gerenciamento de férias e licenças"
    }
  ];

  const renderModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <DashboardContent />;
      case "hr":
        return null;
      case "employees":
        return <EmployeeManagement />;
      case "payroll":
        return <PayrollProcessing />;
      case "leave":
        return <LeaveManagement />;
      case "performance":
        return (
          <div
            className={`p-6 space-y-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Avaliação de Desempenho
            </h1>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              O módulo de avaliação de desempenho estará disponível em breve.
            </p>
          </div>
        );
      case "reporting":
      case "analytics":
        return (
          <div
            className={`p-6 space-y-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Análises & Relatórios
            </h1>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Painel completo de análises e relatórios estará disponível em
              breve.
            </p>
          </div>
        );
      case "sales":
        return (
          <div
            className={`p-6 space-y-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Vendas & Marketing
            </h1>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              O módulo de vendas e marketing estará disponível em breve.
            </p>
          </div>
        );
      case "inventory":
        return (
          <div
            className={`p-6 space-y-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Gestão de Inventário
            </h1>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              O módulo de gestão de inventário estará disponível em breve.
            </p>
          </div>
        );
      case "finance":
      case "accounting":
        return (
          <div
            className={`p-6 space-y-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Finanças & Contabilidade
            </h1>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              O módulo de finanças e contabilidade estará disponível em breve.
            </p>
          </div>
        );
      case "crm":
        return (
          <div
            className={`p-6 space-y-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Gestão de Relacionamento com Cliente
            </h1>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              O módulo de CRM estará disponível em breve.
            </p>
          </div>
        );
      case "logistics":
        return (
          <div
            className={`p-6 space-y-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Logística & Cadeia de Suprimentos
            </h1>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              O módulo de logística e cadeia de suprimentos estará disponível em
              breve.
            </p>
          </div>
        );
      case "manufacturing":
        return (
          <div
            className={`p-6 space-y-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Produção
            </h1>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              O módulo de produção estará disponível em breve.
            </p>
          </div>
        );
      case "projects":
        return (
          <div
            className={`p-6 space-y-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Gestão de Projetos
            </h1>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              O módulo de gestão de projetos estará disponível em breve.
            </p>
          </div>
        );
      case "maintenance":
        return (
          <div
            className={`p-6 space-y-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Gestão de Manutenção
            </h1>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              O módulo de gestão de manutenção estará disponível em breve.
            </p>
          </div>
        );
      case "assets":
        return (
          <div
            className={`p-6 space-y-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Gestão de Ativos
            </h1>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              O módulo de gestão de ativos estará disponível em breve.
            </p>
          </div>
        );
      case "settings":
        return (
          <div
            className={`p-6 space-y-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Configurações do Sistema
            </h1>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              O módulo de configurações do sistema estará disponível em breve.
            </p>
          </div>
        );
      case "hr":
        return <HRNinjaModule />;
      case "timeattendance":
        return (
          <div
            className={`p-6 space-y-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Ponto e Presença
            </h1>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              O módulo de ponto e presença estará disponível em breve.
            </p>
          </div>
        );
      case "timeoff":
        return (
          <div
            className={`p-6 space-y-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Férias e Ausências
            </h1>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              O módulo de férias e ausências estará disponível em breve.
            </p>
          </div>
        );
      default:
        return (
          <div
            className={`p-6 space-y-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Visão Geral do Painel
            </h1>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Bem-vindo ao Painel do ERPFOUR.
            </p>
          </div>
        );
    }
  };

  return (
    <div
      className={`flex flex-col h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      {/* Header */}
      <div
        className={`flex-none h-16 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-b px-6 flex items-center justify-between`}
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ERPFOUR
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} transition-colors`}
            aria-label="Alternar modo escuro"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </button>
          <span
            className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Bem-vindo, Admin
          </span>
          <div className="relative group">
            <button
              className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold cursor-pointer"
              aria-label="Menu do usuário"
            >
              A
            </button>
            <div
              className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"} hidden group-hover:block z-50`}
            >
              <button
                onClick={handleProfileClick}
                className={`flex items-center w-full px-4 py-2 text-sm ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <User className="mr-2 h-4 w-4" />
                Perfil
              </button>
              <button
                onClick={handleLogout}
                className={`flex items-center w-full px-4 py-2 text-sm ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`w-72 flex-none ${darkMode ? "bg-gray-800" : "bg-gray-100"} p-4`}
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 px-3 text-blue-500">
              Módulos Principais
            </h2>
            <nav className="space-y-1">
              <SidebarItem
                icon={<BarChart3 className="h-5 w-5" />}
                label="Painel Principal"
                active={activeModule === "dashboard"}
                onClick={() => handleModuleChange("dashboard")}
                darkMode={darkMode}
              />
              <SidebarItem
                icon={<Users className="h-5 w-5" />}
                label="Recursos Humanos"
                active={activeModule === "hr"}
                onClick={() => handleModuleChange("hr")}
                darkMode={darkMode}
              />
              <SidebarItem
                icon={<ShoppingCart className="h-5 w-5" />}
                label="Vendas & Marketing"
                active={activeModule === "sales"}
                onClick={() => handleModuleChange("sales")}
                darkMode={darkMode}
              />
              <SidebarItem
                icon={<Warehouse className="h-5 w-5" />}
                label="Gestão de Inventário"
                active={activeModule === "inventory"}
                onClick={() => handleModuleChange("inventory")}
                darkMode={darkMode}
              />
              <SidebarItem
                icon={<Landmark className="h-5 w-5" />}
                label="Finanças & Contabilidade"
                active={
                  activeModule === "finance" || activeModule === "accounting"
                }
                onClick={() => handleModuleChange("finance")}
                darkMode={darkMode}
              />
              <SidebarItem
                icon={<Briefcase className="h-5 w-5" />}
                label="CRM"
                active={activeModule === "crm"}
                onClick={() => handleModuleChange("crm")}
                darkMode={darkMode}
              />
            </nav>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 px-3 text-blue-500">
              Operações
            </h2>
            <nav className="space-y-1">
              <SidebarItem
                icon={<Truck className="h-5 w-5" />}
                label="Logística & SCM"
                active={activeModule === "logistics"}
                onClick={() => handleModuleChange("logistics")}
                darkMode={darkMode}
              />
              <SidebarItem
                icon={<Factory className="h-5 w-5" />}
                label="Produção"
                active={activeModule === "manufacturing"}
                onClick={() => handleModuleChange("manufacturing")}
                darkMode={darkMode}
              />
              <SidebarItem
                icon={<BookOpen className="h-5 w-5" />}
                label="Gestão de Projetos"
                active={activeModule === "projects"}
                onClick={() => handleModuleChange("projects")}
                darkMode={darkMode}
              />
              <SidebarItem
                icon={<Wrench className="h-5 w-5" />}
                label="Manutenção"
                active={activeModule === "maintenance"}
                onClick={() => handleModuleChange("maintenance")}
                darkMode={darkMode}
              />
              <SidebarItem
                icon={<Building2 className="h-5 w-5" />}
                label="Gestão de Ativos"
                active={activeModule === "assets"}
                onClick={() => handleModuleChange("assets")}
                darkMode={darkMode}
              />
            </nav>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 px-3 text-blue-500">
              Módulos de RH
            </h2>
            <nav className="space-y-1">
              <SidebarItem
                icon={<BadgeDollarSign className="h-5 w-5" />}
                label="Folha de Pagamento"
                active={activeModule === "payroll"}
                onClick={() => handleModuleChange("payroll")}
                darkMode={darkMode}
              />
              <SidebarItem
                icon={<CalendarDays className="h-5 w-5" />}
                label="Gestão de Ausências"
                active={activeModule === "leave"}
                onClick={() => handleModuleChange("leave")}
                darkMode={darkMode}
              />
              <SidebarItem
                icon={<Award className="h-5 w-5" />}
                label="Desempenho"
                active={activeModule === "performance"}
                onClick={() => handleModuleChange("performance")}
                darkMode={darkMode}
              />
              <SidebarItem
                icon={<FileBarChart className="h-5 w-5" />}
                label="Relatórios & Análises"
                active={
                  activeModule === "reporting" || activeModule === "analytics"
                }
                onClick={() => handleModuleChange("reporting")}
                darkMode={darkMode}
              />
              <SidebarItem
                icon={<Settings className="h-5 w-5" />}
                label="Configurações"
                active={activeModule === "settings"}
                onClick={() => handleModuleChange("settings")}
                darkMode={darkMode}
              />
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div
          className={`flex-1 overflow-auto ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
        >
          {renderModule()}
        </div>
      </div>
    </div>
  );
};

// Sidebar Item Component
interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  darkMode: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active,
  onClick,
  darkMode,
}) => {
  return (
    <button
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${
        active
          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
          : darkMode
            ? "text-gray-300 hover:bg-gray-700/50 hover:text-white"
            : "text-gray-700 hover:bg-gray-200/70 hover:text-gray-900"
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default Home;
