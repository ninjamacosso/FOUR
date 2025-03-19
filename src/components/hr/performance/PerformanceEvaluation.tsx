import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Employee, PerformanceEvaluation as PerformanceEvaluationType } from "@/types/hr.types";
import { format } from "date-fns";
import {
  Award,
  Calendar,
  ChevronDown,
  Download,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Star,
  StarHalf,
  User,
} from "lucide-react";
import EvaluationForm from "./EvaluationForm";
import EvaluationCycles from "./EvaluationCycles";

interface PerformanceEvaluationProps {
  activeTab?: "list" | "cycles" | "new";
  onTabChange?: (tab: string) => void;
}

const PerformanceEvaluation: React.FC<PerformanceEvaluationProps> = ({
  activeTab = "list",
  onTabChange = () => {},
}) => {
  // Estados
  const [currentTab, setCurrentTab] = useState<string>(activeTab);
  const [evaluations, setEvaluations] = useState<PerformanceEvaluationType[]>([]);
  const [filteredEvaluations, setFilteredEvaluations] = useState<PerformanceEvaluationType[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [periodFilter, setPerioFilter] = useState<string>("all");
  const [showViewDialog, setShowViewDialog] = useState<boolean>(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState<PerformanceEvaluationType | null>(null);

  // Efeito para carregar dados ao montar o componente
  useEffect(() => {
    fetchEvaluations();
    fetchEmployees();
  }, []);

  // Efeito para filtrar avaliações quando os filtros ou a lista mudam
  useEffect(() => {
    filterEvaluations();
  }, [evaluations, searchTerm, ratingFilter, periodFilter]);

  // Efeito para sincronizar o estado interno com as props
  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  // Buscar avaliações de desempenho do Supabase
  const fetchEvaluations = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("performance_evaluations")
        .select("*")
        .order("review_date", { ascending: false });

      if (error) throw error;

      if (data) {
        // Converter o rating para o tipo correto
        const typedEvaluations = data.map(evaluation => ({
          ...evaluation,
          overall_rating: evaluation.overall_rating as PerformanceEvaluationType["overall_rating"]
        }));
        
        setEvaluations(typedEvaluations);
      }
    } catch (error) {
      console.error("Erro ao buscar avaliações de desempenho:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as avaliações de desempenho.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar funcionários do Supabase
  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("status", "active");

      if (error) throw error;

      if (data) {
        // Converter o status para o tipo correto
        const typedEmployees = data.map(emp => ({
          ...emp,
          status: emp.status as Employee["status"]
        }));
        
        setEmployees(typedEmployees);
      }
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os funcionários.",
        variant: "destructive",
      });
    }
  };

  // Filtrar avaliações de desempenho com base nos critérios de pesquisa e filtros
  const filterEvaluations = () => {
    let filtered = [...evaluations];

    // Filtrar por termo de pesquisa (ID do funcionário ou avaliador)
    if (searchTerm) {
      filtered = filtered.filter((evaluation) =>
        evaluation.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evaluation.reviewed_by.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por classificação
    if (ratingFilter !== "all") {
      filtered = filtered.filter((evaluation) => evaluation.overall_rating === ratingFilter);
    }

    // Filtrar por período
    if (periodFilter !== "all") {
      filtered = filtered.filter((evaluation) => evaluation.period === periodFilter);
    }

    setFilteredEvaluations(filtered);
  };

  // Manipuladores de eventos
  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    onTabChange(tab);
  };

  const handleViewEvaluation = (evaluation: PerformanceEvaluationType) => {
    setSelectedEvaluation(evaluation);
    setShowViewDialog(true);
  };

  const handleExportEvaluation = (id: string) => {
    toast({
      title: "Exportação iniciada",
      description: "A avaliação está sendo exportada para PDF.",
    });
  };

  // Função para obter o nome do funcionário pelo ID
  const getEmployeeName = (employeeId: string): string => {
    const employee = employees.find((emp) => emp.id === employeeId);
    return employee ? `${employee.first_name} ${employee.last_name}` : "Funcionário Desconhecido";
  };

  // Função para formatar a avaliação de desempenho
  const formatRating = (rating: PerformanceEvaluationType["overall_rating"]) => {
    switch (rating) {
      case "excellent":
        return { label: "Excelente", variant: "default" as const, stars: 5 };
      case "good":
        return { label: "Bom", variant: "default" as const, stars: 4 };
      case "satisfactory":
        return { label: "Satisfatório", variant: "secondary" as const, stars: 3 };
      case "needs_improvement":
        return { label: "Precisa Melhorar", variant: "outline" as const, stars: 2 };
      case "poor":
        return { label: "Insatisfatório", variant: "destructive" as const, stars: 1 };
      default:
        return { label: rating, variant: "default" as const, stars: 0 };
    }
  };

  // Função para renderizar estrelas com base na classificação
  const renderStars = (rating: PerformanceEvaluationType["overall_rating"]) => {
    const { stars } = formatRating(rating);
    const fullStars = Math.floor(stars);
    const hasHalfStar = stars % 1 !== 0;
    
    return (
      <div className="flex">
        {Array(fullStars).fill(0).map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf className="h-4 w-4 text-yellow-400 fill-yellow-400" />}
        {Array(5 - Math.ceil(stars)).fill(0).map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
        ))}
      </div>
    );
  };

  // Função para lidar com a criação de uma nova avaliação
  const handleEvaluationCreated = () => {
    fetchEvaluations();
    setCurrentTab("list");
    toast({
      title: "Avaliação criada",
      description: "A avaliação de desempenho foi criada com sucesso.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Avaliação de Desempenho</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={fetchEvaluations}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
          <Button onClick={() => handleTabChange("new")}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Avaliação
          </Button>
        </div>
      </div>

      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list">Avaliações</TabsTrigger>
          <TabsTrigger value="cycles">Ciclos de Avaliação</TabsTrigger>
          <TabsTrigger value="new">Nova Avaliação</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Avaliações de Desempenho</CardTitle>
              <CardDescription>
                Gerencie as avaliações de desempenho dos funcionários.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filtros e Pesquisa */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Pesquisar por funcionário ou avaliador..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={ratingFilter} onValueChange={setRatingFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Classificação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as Classificações</SelectItem>
                      <SelectItem value="excellent">Excelente</SelectItem>
                      <SelectItem value="good">Bom</SelectItem>
                      <SelectItem value="satisfactory">Satisfatório</SelectItem>
                      <SelectItem value="needs_improvement">Precisa Melhorar</SelectItem>
                      <SelectItem value="poor">Insatisfatório</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={periodFilter} onValueChange={setPerioFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Períodos</SelectItem>
                      <SelectItem value="2023-Q1">2023 - Q1</SelectItem>
                      <SelectItem value="2023-Q2">2023 - Q2</SelectItem>
                      <SelectItem value="2023-Q3">2023 - Q3</SelectItem>
                      <SelectItem value="2023-Q4">2023 - Q4</SelectItem>
                      <SelectItem value="2024-Q1">2024 - Q1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tabela de Avaliações */}
              <div className="border rounded-md">
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <p className="text-muted-foreground">Carregando avaliações...</p>
                  </div>
                ) : filteredEvaluations.length === 0 ? (
                  <div className="flex flex-col justify-center items-center h-64">
                    <Award className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Nenhuma avaliação encontrada.</p>
                    <Button
                      variant="link"
                      onClick={() => handleTabChange("new")}
                      className="mt-2"
                    >
                      Criar Nova Avaliação
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-3 font-medium">Funcionário</th>
                          <th className="text-left p-3 font-medium">Período</th>
                          <th className="text-left p-3 font-medium">Classificação</th>
                          <th className="text-left p-3 font-medium">Avaliador</th>
                          <th className="text-left p-3 font-medium">Data da Avaliação</th>
                          <th className="text-right p-3 font-medium">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEvaluations.map((evaluation) => (
                          <tr key={evaluation.id} className="border-b hover:bg-muted/50">
                            <td className="p-3">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>
                                    {getEmployeeName(evaluation.employee_id)
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{getEmployeeName(evaluation.employee_id)}</span>
                              </div>
                            </td>
                            <td className="p-3">{evaluation.period}</td>
                            <td className="p-3">
                              <div className="flex flex-col space-y-1">
                                <Badge variant={formatRating(evaluation.overall_rating).variant}>
                                  {formatRating(evaluation.overall_rating).label}
                                </Badge>
                                {renderStars(evaluation.overall_rating)}
                              </div>
                            </td>
                            <td className="p-3">{evaluation.reviewed_by}</td>
                            <td className="p-3">
                              {format(new Date(evaluation.review_date), "dd/MM/yyyy")}
                            </td>
                            <td className="p-3 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleViewEvaluation(evaluation)}>
                                    <FileText className="mr-2 h-4 w-4" />
                                    Ver Detalhes
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleExportEvaluation(evaluation.id)}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Exportar PDF
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Mostrando {filteredEvaluations.length} de {evaluations.length} avaliações
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="cycles">
          <EvaluationCycles />
        </TabsContent>

        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>Nova Avaliação de Desempenho</CardTitle>
              <CardDescription>
                Preencha o formulário para criar uma nova avaliação de desempenho.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Selecione um funcionário e preencha os campos de avaliação.
              </p>
              {/* Aqui seria o componente de formulário de avaliação */}
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Componente de formulário de avaliação em desenvolvimento.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleTabChange("list")}>
                Cancelar
              </Button>
              <Button onClick={() => handleEvaluationCreated()}>
                Criar Avaliação
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogo de Visualização de Avaliação */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Avaliação</DialogTitle>
            <DialogDescription>
              Avaliação de desempenho de {selectedEvaluation ? getEmployeeName(selectedEvaluation.employee_id) : ""} para o período {selectedEvaluation?.period}
            </DialogDescription>
          </DialogHeader>
          {selectedEvaluation && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">Informações Gerais</h3>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Funcionário</p>
                      <p className="font-medium">{getEmployeeName(selectedEvaluation.employee_id)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Período</p>
                      <p className="font-medium">{selectedEvaluation.period}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Data da Avaliação</p>
                      <p className="font-medium">{format(new Date(selectedEvaluation.review_date), "dd/MM/yyyy")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avaliador</p>
                      <p className="font-medium">{selectedEvaluation.reviewed_by}</p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Classificação Geral</p>
                  <Badge variant={formatRating(selectedEvaluation.overall_rating).variant} className="mb-1">
                    {formatRating(selectedEvaluation.overall_rating).label}
                  </Badge>
                  <div className="flex justify-center">
                    {renderStars(selectedEvaluation.overall_rating)}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium text-lg mb-2">Comentários</h3>
                <div className="bg-muted/50 p-4 rounded-md">
                  {selectedEvaluation.comments ? (
                    <p className="whitespace-pre-line">{selectedEvaluation.comments}</p>
                  ) : (
                    <p className="text-muted-foreground italic">Nenhum comentário registrado.</p>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              Fechar
            </Button>
            {selectedEvaluation && (
              <Button onClick={() => handleExportEvaluation(selectedEvaluation.id)}>
                <Download className="mr-2 h-4 w-4" />
                Exportar PDF
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PerformanceEvaluation;
