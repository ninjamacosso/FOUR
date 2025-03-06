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
  FileCheck,
  History,
  Edit,
  Download,
  Upload,
  Plus,
} from "lucide-react";

interface EmployeeDetailProps {
  employee?: {
    id: string;
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    status: string;
    avatar: string;
    hireDate: string;
    address: string;
    nationalId: string;
    taxId: string;
    socialSecurityNumber: string;
    bankAccount: string;
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
    };
    documents: Array<{
      id: string;
      name: string;
      type: string;
      uploadDate: string;
      size: string;
    }>;
    contracts: Array<{
      id: string;
      type: string;
      startDate: string;
      endDate: string | null;
      salary: number;
      status: string;
    }>;
    employmentHistory: Array<{
      id: string;
      position: string;
      department: string;
      startDate: string;
      endDate: string | null;
      description: string;
    }>;
  };
}

const EmployeeDetail: React.FC<EmployeeDetailProps> = ({
  employee = {
    id: "EMP001",
    name: "João Silva",
    position: "Engenheiro de Software Sênior",
    department: "Tecnologia",
    email: "joao.silva@exemplo.com",
    phone: "+244 923 456 789",
    status: "Active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=joao",
    hireDate: "2020-03-15",
    address: "Rua Major Kanhangulo 28, Luanda",
    nationalId: "12345678LA042",
    taxId: "NIF98765432",
    socialSecurityNumber: "INSS123456789",
    bankAccount: "BAI 0000123456789",
    emergencyContact: {
      name: "Maria Silva",
      relationship: "Cônjuge",
      phone: "+244 923 456 790",
    },
    documents: [
      {
        id: "DOC001",
        name: "Bilhete de Identidade",
        type: "PDF",
        uploadDate: "2020-03-10",
        size: "2.4 MB",
      },
      {
        id: "DOC002",
        name: "Contrato de Trabalho",
        type: "PDF",
        uploadDate: "2020-03-15",
        size: "3.1 MB",
      },
      {
        id: "DOC003",
        name: "Certificados Académicos",
        type: "PDF",
        uploadDate: "2020-03-12",
        size: "5.7 MB",
      },
    ],
    contracts: [
      {
        id: "CON001",
        type: "Permanente",
        startDate: "2020-03-15",
        endDate: null,
        salary: 350000,
        status: "Active",
      },
      {
        id: "CON002",
        type: "Período Probatório",
        startDate: "2019-12-15",
        endDate: "2020-03-14",
        salary: 300000,
        status: "Completed",
      },
    ],
    employmentHistory: [
      {
        id: "HIST001",
        position: "Engenheiro de Software Sênior",
        department: "Tecnologia",
        startDate: "2021-06-01",
        endDate: null,
        description:
          "Liderando equipe de desenvolvimento para aplicações bancárias principais.",
      },
      {
        id: "HIST002",
        position: "Engenheiro de Software",
        department: "Tecnologia",
        startDate: "2020-03-15",
        endDate: "2021-05-31",
        description:
          "Desenvolvimento e manutenção de sistemas de relatórios financeiros.",
      },
    ],
  },
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-shrink-0">
          <Avatar className="h-32 w-32 border-2 border-gray-200">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback>
              {employee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">{employee.name}</h1>
              <p className="text-gray-600">
                {employee.position} • {employee.department}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant={
                    employee.status === "Active" ? "default" : "secondary"
                  }
                >
                  {employee.status === "Active" ? "Ativo" : employee.status}
                </Badge>
                <span className="text-sm text-gray-500">ID: {employee.id}</span>
              </div>
            </div>

            <div className="mt-4 md:mt-0">
              <Button variant="outline" className="mr-2">
                <Edit className="h-4 w-4 mr-2" />
                Editar Perfil
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p>{employee.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Telefone</p>
              <p>{employee.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Data de Contratação</p>
              <p>{employee.hireDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Endereço</p>
              <p>{employee.address}</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="w-full justify-start mb-6 bg-gray-100">
          <TabsTrigger
            value="personal"
            className="data-[state=active]:bg-white"
          >
            <FileText className="h-4 w-4 mr-2" />
            Dados Pessoais
          </TabsTrigger>
          <TabsTrigger
            value="contracts"
            className="data-[state=active]:bg-white"
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Contratos
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="data-[state=active]:bg-white"
          >
            <FileCheck className="h-4 w-4 mr-2" />
            Documentos
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-white">
            <History className="h-4 w-4 mr-2" />
            Histórico Profissional
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">
                  Bilhete de Identidade
                </label>
                <Input value={employee.nationalId} readOnly className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">NIF</label>
                <Input value={employee.taxId} readOnly className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Número de Segurança Social
                </label>
                <Input
                  value={employee.socialSecurityNumber}
                  readOnly
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Conta Bancária</label>
                <Input value={employee.bankAccount} readOnly className="mt-1" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contato de Emergência</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Nome</label>
                <Input
                  value={employee.emergencyContact.name}
                  readOnly
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Relação</label>
                <Input
                  value={employee.emergencyContact.relationship}
                  readOnly
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Telefone</label>
                <Input
                  value={employee.emergencyContact.phone}
                  readOnly
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Contratos de Trabalho</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Contrato
            </Button>
          </div>

          {employee.contracts.map((contract) => (
            <Card key={contract.id} className="mb-4">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">Contrato {contract.type}</h4>
                    <p className="text-sm text-gray-500">
                      {contract.startDate} - {contract.endDate || "Presente"}
                    </p>
                  </div>
                  <Badge
                    variant={
                      contract.status === "Active" ? "default" : "secondary"
                    }
                    className="mt-2 md:mt-0"
                  >
                    {contract.status === "Active"
                      ? "Ativo"
                      : contract.status === "Completed"
                        ? "Concluído"
                        : contract.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-500">Salário (AOA)</p>
                    <p className="font-medium">
                      {contract.salary.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ID do Contrato</p>
                    <p>{contract.id}</p>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Documentos do Funcionário</h3>
            <Button size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Carregar Documento
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {employee.documents.map((doc) => (
              <Card key={doc.id} className="overflow-hidden">
                <div className="bg-gray-100 p-4 flex justify-center items-center h-32">
                  <FileText className="h-16 w-16 text-gray-400" />
                </div>
                <CardContent className="pt-4">
                  <h4 className="font-medium">{doc.name}</h4>
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{doc.type}</span>
                    <span>{doc.size}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Carregado em: {doc.uploadDate}
                  </p>

                  <div className="flex justify-between mt-4">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Baixar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                    >
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Histórico Profissional</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Registro
            </Button>
          </div>

          <div className="relative border-l-2 border-gray-200 pl-6 ml-4">
            {employee.employmentHistory.map((history, index) => (
              <div key={history.id} className="mb-8 relative">
                <div className="absolute -left-10 top-0 w-6 h-6 rounded-full flex items-center justify-center bg-primary text-white shadow-lg">
                  <span className="text-xs">{index + 1}</span>
                </div>

                <Card>
                  <CardContent className="pt-6">
                    <div className="mb-2">
                      <h4 className="font-semibold">{history.position}</h4>
                      <p className="text-sm text-gray-600">
                        {history.department}
                      </p>
                      <p className="text-sm text-gray-500">
                        {history.startDate} - {history.endDate || "Presente"}
                      </p>
                    </div>

                    <div className="mt-4">
                      <label className="text-sm font-medium">Descrição</label>
                      <Textarea
                        value={history.description}
                        readOnly
                        className="mt-1 min-h-[80px]"
                      />
                    </div>

                    <div className="flex justify-end mt-4">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeDetail;
