import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarIcon,
  CheckCircle2Icon,
  Clock,
  PlusCircleIcon,
  UserIcon,
} from "lucide-react";

interface EvaluationCycle {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "active" | "completed";
  progress: number;
  employeesTotal: number;
  employeesCompleted: number;
}

interface EvaluationCyclesProps {
  cycles?: EvaluationCycle[];
  onCreateCycle?: () => void;
  onViewCycle?: (cycleId: string) => void;
}

const EvaluationCycles = ({
  cycles = [
    {
      id: "1",
      name: "Mid-Year Review 2023",
      startDate: "2023-06-01",
      endDate: "2023-06-30",
      status: "completed",
      progress: 100,
      employeesTotal: 45,
      employeesCompleted: 45,
    },
    {
      id: "2",
      name: "Annual Performance Review 2023",
      startDate: "2023-12-01",
      endDate: "2023-12-31",
      status: "active",
      progress: 65,
      employeesTotal: 48,
      employeesCompleted: 31,
    },
    {
      id: "3",
      name: "Q1 Check-in 2024",
      startDate: "2024-03-15",
      endDate: "2024-03-31",
      status: "upcoming",
      progress: 0,
      employeesTotal: 50,
      employeesCompleted: 0,
    },
  ],
  onCreateCycle = () => {},
  onViewCycle = () => {},
}: EvaluationCyclesProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Evaluation Cycles
          </h2>
          <p className="text-gray-500">Manage performance evaluation periods</p>
        </div>
        <Button onClick={onCreateCycle} className="flex items-center gap-2">
          <PlusCircleIcon size={16} />
          Create New Cycle
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active & Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Cycles</TabsTrigger>
        </TabsList>

        {["active", "completed", "all"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="space-y-4">
            {cycles
              .filter((cycle) => {
                if (tabValue === "all") return true;
                if (tabValue === "active")
                  return ["active", "upcoming"].includes(
                    cycle.status as string,
                  );
                return cycle.status === tabValue;
              })
              .map((cycle) => (
                <Card key={cycle.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{cycle.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <CalendarIcon size={14} />
                          {cycle.startDate} to {cycle.endDate}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(cycle.status)}>
                        {cycle.status.charAt(0).toUpperCase() +
                          cycle.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-500">
                          Completion Progress
                        </span>
                        <span className="text-sm font-medium">
                          {cycle.progress}%
                        </span>
                      </div>
                      <Progress value={cycle.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <UserIcon size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {cycle.employeesCompleted} / {cycle.employeesTotal}{" "}
                          Employees
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {cycle.status === "completed" ? (
                          <CheckCircle2Icon
                            size={16}
                            className="text-green-500"
                          />
                        ) : (
                          <Clock size={16} className="text-blue-500" />
                        )}
                        <span className="text-sm text-gray-600">
                          {cycle.status === "completed"
                            ? "Completed on " + cycle.endDate
                            : cycle.status === "active"
                              ? "Due by " + cycle.endDate
                              : "Starts on " + cycle.startDate}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button
                      variant="outline"
                      onClick={() => onViewCycle(cycle.id)}
                      className="w-full"
                    >
                      {cycle.status === "upcoming"
                        ? "Configure Cycle"
                        : cycle.status === "active"
                          ? "Continue Evaluations"
                          : "View Results"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}

            {cycles.filter((cycle) => {
              if (tabValue === "all") return true;
              if (tabValue === "active")
                return ["active", "upcoming"].includes(cycle.status as string);
              return cycle.status === tabValue;
            }).length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  No {tabValue} evaluation cycles found
                </p>
                {tabValue !== "completed" && (
                  <Button
                    variant="outline"
                    onClick={onCreateCycle}
                    className="mt-4"
                  >
                    Create New Cycle
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default EvaluationCycles;
