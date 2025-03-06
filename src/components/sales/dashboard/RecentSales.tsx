import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface SaleItem {
  id: string;
  customer: {
    name: string;
    avatar?: string;
    initials: string;
  };
  amount: string;
  status: "completed" | "pending" | "canceled";
  date: string;
  products: number;
}

const RecentSales = () => {
  const sales: SaleItem[] = [
    {
      id: "INV-001",
      customer: {
        name: "Empresa ABC Ltda",
        initials: "ABC",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=ABC",
      },
      amount: "AOA 1,250,000",
      status: "completed",
      date: "Hoje, 10:30",
      products: 12,
    },
    {
      id: "INV-002",
      customer: {
        name: "Supermercados XYZ",
        initials: "XYZ",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=XYZ",
      },
      amount: "AOA 850,000",
      status: "pending",
      date: "Hoje, 09:15",
      products: 8,
    },
    {
      id: "INV-003",
      customer: {
        name: "Distribuidora Nacional",
        initials: "DN",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=DN",
      },
      amount: "AOA 2,100,000",
      status: "completed",
      date: "Ontem, 16:45",
      products: 24,
    },
    {
      id: "INV-004",
      customer: {
        name: "Restaurantes Unidos",
        initials: "RU",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=RU",
      },
      amount: "AOA 450,000",
      status: "canceled",
      date: "Ontem, 14:20",
      products: 5,
    },
    {
      id: "INV-005",
      customer: {
        name: "Hotéis Luanda",
        initials: "HL",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=HL",
      },
      amount: "AOA 1,750,000",
      status: "completed",
      date: "22/05/2023",
      products: 18,
    },
  ];

  const getStatusBadge = (status: SaleItem["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Concluído</Badge>;
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>
        );
      case "canceled":
        return <Badge className="bg-red-100 text-red-800">Cancelado</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {sales.map((sale) => (
        <div
          key={sale.id}
          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={sale.customer.avatar} />
              <AvatarFallback>{sale.customer.initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{sale.customer.name}</p>
              <p className="text-sm text-gray-500">
                {sale.id} • {sale.products} produtos
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">{sale.amount}</p>
            <div className="flex items-center justify-end space-x-2 mt-1">
              {getStatusBadge(sale.status)}
              <span className="text-xs text-gray-500">{sale.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentSales;
