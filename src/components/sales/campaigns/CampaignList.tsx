import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Plus,
  Calendar,
  DollarSign,
  BarChart,
  Target,
  Users,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Campaign {
  id: string;
  name: string;
  type: string;
  status: "active" | "scheduled" | "ended" | "draft";
  startDate: string;
  endDate: string;
  budget: string;
  spent: string;
  progress: number;
  leads: number;
  conversions: number;
  roi: string;
  description: string;
  channels: string[];
  targetAudience: string;
}

interface CampaignListProps {
  campaigns?: Campaign[];
  onViewDetails?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const CampaignList = ({
  campaigns = defaultCampaigns,
  onViewDetails = () => {},
  onEdit = () => {},
  onDelete = () => {},
}: CampaignListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "all" || campaign.status === statusFilter) &&
      (typeFilter === "all" || campaign.type === typeFilter)
  );

  const getStatusBadge = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Ativa
          </Badge>
        );
      case "scheduled":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Agendada
          </Badge>
        );
      case "ended":
        return <Badge variant="secondary">Finalizada</Badge>;
      case "draft":
        return (
          <Badge
            variant="outline"
            className="bg-amber-100 text-amber-800 hover:bg-amber-200"
          >
            Rascunho
          </Badge>
        );
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  // Get unique campaign types for filter
  const campaignTypes = [
    { id: "all", name: "Todos os Tipos" },
    ...Array.from(new Set(campaigns.map((c) => c.type))).map((type) => ({
      id: type,
      name: type,
    })),
  ];

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Campanhas de Marketing
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar campanhas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-[300px]"
            />
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Campanha
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="active">Ativas</SelectItem>
            <SelectItem value="scheduled">Agendadas</SelectItem>
            <SelectItem value="ended">Finalizadas</SelectItem>
            <SelectItem value="draft">Rascunhos</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo de Campanha" />
          </SelectTrigger>
          <SelectContent>
            {campaignTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{campaign.name}</CardTitle>
                {getStatusBadge(campaign.status)}
              </div>
              <p className="text-sm text-gray-500">{campaign.type}</p>
            </CardHeader>
            <CardContent className="pb-2">
              {campaign.status !== "draft" && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progresso</span>
                    <span>{campaign.progress}%</span>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 text-sm">
                {campaign.status !== "draft" && (
                  <div className="flex items-start">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-gray-500">Período</p>
                      <p>
                        {campaign.startDate} - {campaign.endDate}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <DollarSign className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-gray-500">Orçamento</p>
                    <p>{campaign.budget}</p>
                  </div>
                </div>

                {campaign.status !== "draft" && campaign.status !== "scheduled" && (
                  <div className="flex items-start">
                    <BarChart className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-gray-500">ROI</p>
                      <p>{campaign.roi}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <Target className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-gray-500">Leads</p>
                    <p>{campaign.leads}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500 line-clamp-2">
                  {campaign.description}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(campaign.id)}
              >
                <Eye className="h-4 w-4 mr-1" />
                Detalhes
              </Button>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(campaign.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => onDelete(campaign.id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Default mock data
const defaultCampaigns: Campaign[] = [
  {
    id: "CAM001",
    name: "Promoção de Inverno 2023",
    type: "Promoção Sazonal",
    status: "active",
    startDate: "01/05/2023",
    endDate: "30/06/2023",
    budget: "AOA 500,000",
    spent: "AOA 325,000",
    progress: 65,
    leads: 124,
    conversions: 45,
    roi: "215%",
    description: "Campanha promocional para produtos de inverno com descontos de até 30%.",
    channels: ["Email", "Redes