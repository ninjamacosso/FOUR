import React from "react";
import { ShoppingCart, Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SalesHeaderProps {
  title?: string;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
}

const SalesHeader = ({
  title = "Vendas & Marketing",
  onNotificationClick = () => {},
  onProfileClick = () => {},
}: SalesHeaderProps) => {
  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <ShoppingCart className="h-6 w-6 text-primary mr-2" />
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Pesquisar..." className="pl-10" />
        </div>

        <Button variant="ghost" size="icon" onClick={onNotificationClick}>
          <Bell className="h-5 w-5 text-gray-600" />
        </Button>

        <Button variant="ghost" size="icon" onClick={onProfileClick}>
          <User className="h-5 w-5 text-gray-600" />
        </Button>
      </div>
    </header>
  );
};

export default SalesHeader;
