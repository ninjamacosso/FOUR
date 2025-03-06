import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  FileText,
  Mail,
  Phone,
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  type: "company" | "individual";
  email: string;
  phone: string;
  status: "active" | "inactive" | "lead";
  totalPurchases: string;
  lastPurchase: string;
}

interface CustomerListProps {
  customers?: Customer[];
  onViewDetails?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSendEmail?: (id: string) => void;
}

const CustomerList = ({
  customers = defaultCustomers,
  onViewDetails = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onSendEmail = () => {},
}: CustomerListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  );

  const getStatusBadge = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Ativo
          </Badge>
        );
      case "inactive":
        return <Badge variant="secondary">Inativo</Badge>;
      case "lead":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-200"
          >
            Lead
          </Badge>
        );
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Diretório de Clientes
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-[300px]"
            />
          </div>
          <Button>Adicionar Cliente</Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total de Compras</TableHead>
              <TableHead>Última Compra</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>
                    {customer.type === "company" ? "Empresa" : "Individual"}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="flex items-center">
                        <Mail className="h-3 w-3 mr-1" /> {customer.email}
                      </span>
                      <span className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" /> {customer.phone}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell>{customer.totalPurchases}</TableCell>
                  <TableCell>{customer.lastPurchase}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onViewDetails(customer.id)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(customer.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onSendEmail(customer.id)}
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Enviar Email
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete(customer.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-6 text-gray-500"
                >
                  Nenhum cliente encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Default mock data
const defaultCustomers: Customer[] = [
  {
    id: "CLI001",
    name: "Supermercados Angola Ltda",
    type: "company",
    email: "contato@supermercadosangola.co.ao",
    phone: "+244 923 456 789",
    status: "active",
    totalPurchases: "AOA 12,500,000",
    lastPurchase: "22/05/2023",
  },
  {
    id: "CLI002",
    name: "Restaurantes Unidos",
    type: "company",
    email: "compras@restaurantesunidos.co.ao",
    phone: "+244 923 123 456",
    status: "active",
    totalPurchases: "AOA 8,750,000",
    lastPurchase: "18/05/2023",
  },
  {
    id: "CLI003",
    name: "João Mendes",
    type: "individual",
    email: "joao.mendes@email.com",
    phone: "+244 923 789 012",
    status: "inactive",
    totalPurchases: "AOA 1,200,000",
    lastPurchase: "10/03/2023",
  },
  {
    id: "CLI004",
    name: "Hotéis Luanda",
    type: "company",
    email: "suprimentos@hoteisluanda.co.ao",
    phone: "+244 923 345 678",
    status: "active",
    totalPurchases: "AOA 15,800,000",
    lastPurchase: "20/05/2023",
  },
  {
    id: "CLI005",
    name: "Maria Santos",
    type: "individual",
    email: "maria.santos@email.com",
    phone: "+244 923 567 890",
    status: "lead",
    totalPurchases: "AOA 0",
    lastPurchase: "-",
  },
];

export default CustomerList;
