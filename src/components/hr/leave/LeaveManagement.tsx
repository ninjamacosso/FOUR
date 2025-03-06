import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Plus } from "lucide-react";
import LeaveCalendar from "./LeaveCalendar";
import LeaveRequestForm from "./LeaveRequestForm";

const LeaveManagement = () => {
  const [activeTab, setActiveTab] = useState("calendar");
  const [showRequestForm, setShowRequestForm] = useState(false);

  const handleNewRequest = () => {
    setShowRequestForm(true);
    setActiveTab("requests");
  };

  const handleCancelRequest = () => {
    setShowRequestForm(false);
  };

  const handleSubmitRequest = (data: any) => {
    console.log("Leave request submitted:", data);
    alert("Solicitação de ausência enviada com sucesso!");
    setShowRequestForm(false);
  };

  const handleApproveRequest = (id: string) => {
    alert(`Solicitação ${id} aprovada com sucesso!`);
  };

  const handleRejectRequest = (id: string) => {
    alert(`Solicitação ${id} rejeitada!`);
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <CalendarDays className="h-6 w-6 mr-2 text-primary" />
          <h1 className="text-2xl font-bold text-gray-800">
            Gestão de Ausências
          </h1>
        </div>
        <Button onClick={handleNewRequest} className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Nova Solicitação
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full space-y-6"
      >
        <TabsList>
          <TabsTrigger value="calendar" className="px-6">
            Calendário
          </TabsTrigger>
          <TabsTrigger value="requests" className="px-6">
            Minhas Solicitações
          </TabsTrigger>
          <TabsTrigger value="approvals" className="px-6">
            Aprovações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-0">
          <LeaveCalendar
            onDateSelect={(date) => console.log("Selected date:", date)}
            onEventClick={(event) => console.log("Clicked event:", event)}
          />
        </TabsContent>

        <TabsContent value="requests" className="mt-0">
          {showRequestForm ? (
            <LeaveRequestForm
              onSubmit={handleSubmitRequest}
              onCancel={handleCancelRequest}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Minhas Solicitações de Ausência</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Férias</h3>
                      <p className="text-sm text-gray-500">
                        15/07/2023 - 22/07/2023
                      </p>
                      <div className="mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Aprovado
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                  </div>

                  <div className="p-4 border rounded-md flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Doença</h3>
                      <p className="text-sm text-gray-500">
                        05/09/2023 - 07/09/2023
                      </p>
                      <div className="mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pendente
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="approvals" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Solicitações Pendentes de Aprovação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">António Fernandes - Pessoal</h3>
                    <p className="text-sm text-gray-500">18/05/2023 (1 dia)</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Motivo: Consulta médica
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleRejectRequest("1")}
                    >
                      Rejeitar
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApproveRequest("1")}
                    >
                      Aprovar
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-md flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Maria Santos - Férias</h3>
                    <p className="text-sm text-gray-500">
                      10/06/2023 - 15/06/2023 (5 dias)
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Motivo: Férias familiares
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleRejectRequest("2")}
                    >
                      Rejeitar
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApproveRequest("2")}
                    >
                      Aprovar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeaveManagement;
