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
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import MetricsSection from "./hr/dashboard/MetricsSection";
import QuickAccessCards from "./hr/dashboard/QuickAccessCards";
import RecentActivities from "./hr/dashboard/RecentActivities";
import EmployeeManagement from "./hr/employee/EmployeeManagement";
import PayrollProcessing from "./hr/payroll/PayrollProcessing";
import LeaveManagement from "./hr/leave/LeaveManagement";

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
  | "assets";

interface HomeProps {
  darkMode?: boolean;
  toggleDarkMode?: () => void;
}

const Home: React.FC<HomeProps> = ({
  darkMode = true,
  toggleDarkMode = () => {},
}) => {
  const [activeModule, setActiveModule] = useState<Module>("dashboard");
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

  // Function to handle module navigation
  const handleModuleChange = (module: Module) => {
    setActiveModule(module);
  };

  // Render the active module content
  const renderModuleContent = () => {
    switch (activeModule) {
      case "dashboard":
        return (
          <div
            className={`p-6 space-y-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
          >
            <div className="mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Painel ERPFOUR
              </h1>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Bem-vindo ao seu sistema ERP completo para gestão empresarial
                integrada
              </p>
            </div>
            <MetricsSection
              totalEmployees={metricsData.totalEmployees}
              pendingLeaveRequests={metricsData.pendingLeaveRequests}
              upcomingEvaluations={metricsData.upcomingEvaluations}
              payrollStatus={metricsData.payrollStatus}
            />
            <QuickAccessCards
              cards={[
                {
                  title: "Recursos Humanos",
                  description:
                    "Gerencie funcionários, contratos e documentos de RH",
                  icon: <Users className="h-6 w-6" />,
                  onClick: () => handleModuleChange("employees"),
                },
                {
                  title: "Vendas & Marketing",
                  description:
                    "Gerencie pedidos, clientes e campanhas de marketing",
                  icon: <ShoppingCart className="h-6 w-6" />,
                  onClick: () => handleModuleChange("sales"),
                },
                {
                  title: "Gestão de Inventário",
                  description:
                    "Controle níveis de estoque, transferências e avaliações",
                  icon: <Warehouse className="h-6 w-6" />,
                  onClick: () => handleModuleChange("inventory"),
                },
                {
                  title: "Finanças & Contabilidade",
                  description:
                    "Gerencie transações financeiras, relatórios e conformidade fiscal",
                  icon: <Landmark className="h-6 w-6" />,
                  onClick: () => handleModuleChange("finance"),
                },
                {
                  title: "Produção",
                  description:
                    "Planeje produção, gerencie BOM e acompanhe operações",
                  icon: <Factory className="h-6 w-6" />,
                  onClick: () => handleModuleChange("manufacturing"),
                },
                {
                  title: "Logística & SCM",
                  description:
                    "Gerencie compras, envios e cadeia de suprimentos",
                  icon: <Truck className="h-6 w-6" />,
                  onClick: () => handleModuleChange("logistics"),
                },
                {
                  title: "Gestão de Projetos",
                  description:
                    "Acompanhe projetos, tarefas e alocação de recursos",
                  icon: <BookOpen className="h-6 w-6" />,
                  onClick: () => handleModuleChange("projects"),
                },
                {
                  title: "Análises & Relatórios",
                  description: "Gere insights e inteligência de negócios",
                  icon: <TrendingUp className="h-6 w-6" />,
                  onClick: () => handleModuleChange("analytics"),
                },
              ]}
            />
            <RecentActivities />
          </div>
        );
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
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
                active={activeModule === "employees"}
                onClick={() => handleModuleChange("employees")}
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
          {renderModuleContent()}
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
