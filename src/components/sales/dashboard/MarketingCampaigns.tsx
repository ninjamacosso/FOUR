import React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "scheduled" | "ended" | "draft";
  progress: number;
  startDate: string;
  endDate: string;
  budget: string;
  spent: string;
  leads: number;
}

const MarketingCampaigns = () => {
  const campaigns: Campaign[] = [
    {
      id: "CAM-001",
      name: "Promoção de Inverno 2023",
      status: "active",
      progress: 65,
      startDate: "01/05/2023",
      endDate: "30/06/2023",
      budget: "AOA 500,000",
      spent: "AOA 325,000",
      leads: 124,
    },
    {
      id: "CAM-002",
      name: "Lançamento Produto X",
      status: "scheduled",
      progress: 0,
      startDate: "15/06/2023",
      endDate: "15/07/2023",
      budget: "AOA 750,000",
      spent: "AOA 0",
      leads: 0,
    },
    {
      id: "CAM-003",
      name: "Campanha Dia das Mães",
      status: "ended",
      progress: 100,
      startDate: "15/04/2023",
      endDate: "15/05/2023",
      budget: "AOA 300,000",
      spent: "AOA 298,500",
      leads: 87,
    },
    {
      id: "CAM-004",
      name: "Expansão Mercado Sul",
      status: "draft",
      progress: 0,
      startDate: "",
      endDate: "",
      budget: "AOA 1,200,000",
      spent: "AOA 0",
      leads: 0,
    },
  ];

  const getStatusBadge = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Ativa</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Agendada</Badge>;
      case "ended":
        return <Badge className="bg-gray-100 text-gray-800">Finalizada</Badge>;
      case "draft":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Rascunho</Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <div
          key={campaign.id}
          className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium">{campaign.name}</h3>
              <p className="text-sm text-gray-500">{campaign.id}</p>
            </div>
            {getStatusBadge(campaign.status)}
          </div>

          {campaign.status !== "draft" && (
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Progresso</span>
                <span>{campaign.progress}%</span>
              </div>
              <Progress value={campaign.progress} className="h-2" />
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 text-sm mt-3">
            {campaign.status !== "draft" && (
              <>
                <div>
                  <p className="text-gray-500">Período</p>
                  <p>
                    {campaign.startDate} - {campaign.endDate}
                  </p>
                </div>
              </>
            )}
            <div>
              <p className="text-gray-500">Orçamento</p>
              <p>{campaign.budget}</p>
            </div>
            <div>
              <p className="text-gray-500">Gasto</p>
              <p>{campaign.spent}</p>
            </div>
            <div>
              <p className="text-gray-500">Leads Gerados</p>
              <p>{campaign.leads}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketingCampaigns;
