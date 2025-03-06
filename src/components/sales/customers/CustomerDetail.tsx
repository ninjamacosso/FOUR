import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Briefcase,
  ShoppingCart,
  History,
  Edit,
  Mail,
  Phone,
  MapPin,
  Globe,
  User,
  Users,
  Calendar,
} from "lucide-react";

interface CustomerDetailProps {
  customer?: {
    id: string;
    name: string;
    type: "company" | "individual";
    email: string;
    phone: string;
    status: string;
    avatar: string;
    address: string;
    website?: string;
    taxId?: string;
    contactPerson?: string;
    contactPersonRole?: string;
    contactPersonPhone?: string;
    contactPersonEmail?: string;
    notes?: string;
    createdAt: string;
    segment: string;
    totalPurchases: string;
    lastPurchase: string;
    orders: Array<{
      id: string;
      date: string;
      amount: string;
      status: string;
      items: number;
    }>;
    interactions: Array<{
      id: string;
      type: string;
      date: string;
      description: string;
      user: string;
    }>;
  };
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({
  customer = {
    id: "CLI001",
    name: "Supermercados Angola Ltda",
    type: "company",
    email: "contato@supermercadosangola.co.ao",
    phone: "+244 923 456 789",
    status: "Active",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=SA",
    address: "Rua Major Kanhangulo 28, Luanda",
    website: "www.supermercadosangola.co.ao",
    taxId: "NIF98765432",
    contactPerson: "António Fernandes",
    contactPersonRole: "Diretor de Compras",
    contactPersonPhone: "+244 923 456 790",
    contactPersonEmail: "antonio.fernandes@supermercadosangola.co.ao",
    notes: "Cliente desde 2018. Possui 12 lojas em Luanda e 3 em Benguela.",
    createdAt: "15/03/2018",
    segment: "Varejo Alimentício",
    totalPurchases: "AOA 12,500,000",
    lastPurchase: "22/05/2023",
    orders: [
      {
        id: "ORD-2023-056",
        date: "22/05/2023",
        amount: "AOA 1,250,000",
        status: "Entregue",
        items: 24,
      },
      {
        id: "ORD-2023-042",
        date: "15/04/2023",
        amount: "AOA 980,000",
        status: "Entregue",
        items: 18,
      },
      {
        id: "ORD-2023-028",
        date: "10/03/2023",
        amount: "AOA 1,450,000",
        status: "Entregue",
        items: 32,
      },
    ],
    interactions: [
      {
        id: "INT-001",
        type: "Reunião",
        date: "18/05/2023",
        description: "Reunião para discutir expansão de produtos na rede.",
        user: "Carlos Santos",
      },
      {
        id: "INT-002",
        type: "Email",
        date: "10/05/2023",
        description: "Envio de catálogo de novos produtos.",
        user: "Maria Gomes",
      },
      {
        id: "INT-003",
        type: "Chamada",
        date: "05/05/2023",
        description: "Discussão sobre promoções para o mês de junho.",
        user: "João Silva",
      },
    ],
  },
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-shrink-0">
          <Avatar className="h-32 w-32 border-2 border-gray-200">
            <AvatarImage src={customer.avatar} alt={customer.name} />
            <AvatarFallback>
              {customer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">{customer.name}</h1>
              <p className="text-gray-600">
                {customer.type === "company" ? "Empresa" : "Cliente Individual"}{" "}
                • {customer.segment}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant={
                    customer.status === "Active" ? "default" : "secondary"
                  }
                >
                  {customer.status === "Active" ? "Ativo" : customer.status}
                </Badge>
                <span className="text-sm text-gray-500">ID: {customer.id}</span>
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex space-x-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Ligar
              </Button>
              <Button className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Editar
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p>{customer.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Telefone</p>
              <p>{customer.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Cliente Desde</p>
              <p>{customer.createdAt}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de Compras</p>
              <p>{customer.totalPurchases}</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="w-full justify-start mb-6 bg-gray-100">
          <TabsTrigger value="info" className="data-[state=active]:bg-white">
            <FileText className="h-4 w-4 mr-2" />
            Informações
          </TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:bg-white">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Pedidos
          </TabsTrigger>
          <TabsTrigger
            value="interactions"
            className="data-[state=active]:bg-white"
          >
            <History className="h-4 w-4 mr-2" />
            Interações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Endereço</label>
                <div className="flex items-start mt-1">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <Input
                    value={customer.address}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>

              {customer.website && (
                <div>
                  <label className="text-sm font-medium">Website</label>
                  <div className="flex items-start mt-1">
                    <Globe className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <Input
                      value={customer.website}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                </div>
              )}

              {customer.taxId && (
                <div>
                  <label className="text-sm font-medium">NIF</label>
                  <Input
                    value={customer.taxId}
                    readOnly
                    className="bg-gray-50 mt-1"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium">Segmento</label>
                <Input
                  value={customer.segment}
                  readOnly
                  className="bg-gray-50 mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {customer.type === "company" && customer.contactPerson && (
            <Card>
              <CardHeader>
                <CardTitle>Contato Principal</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium">Nome</label>
                  <div className="flex items-start mt-1">
                    <User className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <Input
                      value={customer.contactPerson}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Cargo</label>
                  <div className="flex items-start mt-1">
                    <Briefcase className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <Input
                      value={customer.contactPersonRole}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <div className="flex items-start mt-1">
                    <Mail className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <Input
                      value={customer.contactPersonEmail}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Telefone</label>
                  <div className="flex items-start mt-1">
                    <Phone className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <Input
                      value={customer.contactPersonPhone}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {customer.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={customer.notes}
                  readOnly
                  className="bg-gray-50 min-h-[100px]"
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customer.orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{order.id}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{order.date}</span>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {order.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-sm text-gray-500">Valor</p>
                        <p className="font-medium">{order.amount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Itens</p>
                        <p>{order.items} produtos</p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-3">
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactions" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Histórico de Interações</CardTitle>
                <Button size="sm">Nova Interação</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customer.interactions.map((interaction) => (
                  <div
                    key={interaction.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{interaction.type}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{interaction.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm">{interaction.user}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700">
                      {interaction.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerDetail;
