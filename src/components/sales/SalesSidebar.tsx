import React from "react";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Users,
  BarChart,
  Calendar,
  MessageSquare,
  Tag,
  TrendingUp,
  Settings,
  PieChart,
  Target,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({
  icon,
  label,
  active = false,
  onClick = () => {},
}: SidebarItemProps) => {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      className={`w-full justify-start ${active ? "bg-primary text-primary-foreground" : ""}`}
      onClick={onClick}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Button>
  );
};

interface SalesSidebarProps {
  activeItem?: string;
  onItemSelect?: (item: string) => void;
}

const SalesSidebar = ({
  activeItem = "dashboard",
  onItemSelect = () => {},
}: SalesSidebarProps) => {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      id: "sales",
      label: "Vendas",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      id: "customers",
      label: "Clientes",
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: "products",
      label: "Produtos",
      icon: <Tag className="h-5 w-5" />,
    },
    {
      id: "campaigns",
      label: "Campanhas",
      icon: <Target className="h-5 w-5" />,
    },
    {
      id: "calendar",
      label: "Calendário",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      id: "communications",
      label: "Comunicações",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: "analytics",
      label: "Análises",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      id: "reports",
      label: "Relatórios",
      icon: <PieChart className="h-5 w-5" />,
    },
    {
      id: "settings",
      label: "Configurações",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 p-4">
      <div className="space-y-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeItem === item.id}
            onClick={() => onItemSelect(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SalesSidebar;
