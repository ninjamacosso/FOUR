import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  UserPlus,
  FileCheck,
  CreditCard,
  Clock,
} from "lucide-react";

interface Activity {
  id: string;
  type: "new_employee" | "leave_request" | "evaluation" | "payroll" | "other";
  title: string;
  description: string;
  timestamp: string;
  user?: {
    name: string;
    avatar?: string;
    initials: string;
  };
  status?: "pending" | "approved" | "rejected" | "completed";
}

interface RecentActivitiesProps {
  activities?: Activity[];
}

const RecentActivities = ({
  activities = defaultActivities,
}: RecentActivitiesProps) => {
  return (
    <Card className="w-full h-full bg-gradient-to-br from-gray-900/90 to-blue-900/90 border border-blue-800/30 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
          <Clock className="h-5 w-5" />
          Atividades Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-500/30"></div>

          {/* Activity items */}
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-4 relative">
                {/* Activity icon */}
                <div className="z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30">
                  {getActivityIcon(activity.type)}
                </div>

                {/* Activity content */}
                <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/10 text-white">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-white">{activity.title}</h4>
                    <span className="text-xs text-blue-200">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>

                  <p className="text-sm text-blue-100 mt-1">
                    {activity.description}
                  </p>

                  {/* User info if available */}
                  {activity.user && (
                    <div className="flex items-center mt-3">
                      <Avatar className="h-6 w-6 mr-2">
                        {activity.user.avatar ? (
                          <AvatarImage
                            src={activity.user.avatar}
                            alt={activity.user.name}
                          />
                        ) : (
                          <AvatarFallback>
                            {activity.user.initials}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <span className="text-sm text-blue-100">
                        {activity.user.name}
                      </span>
                    </div>
                  )}

                  {/* Status badge if available */}
                  {activity.status && (
                    <div className="mt-2">
                      <Badge
                        variant={getBadgeVariant(activity.status)}
                        className="text-xs"
                      >
                        {activity.status.charAt(0).toUpperCase() +
                          activity.status.slice(1)}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to get the appropriate icon based on activity type
const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "new_employee":
      return <UserPlus className="h-4 w-4" />;
    case "leave_request":
      return <CalendarDays className="h-4 w-4" />;
    case "evaluation":
      return <FileCheck className="h-4 w-4" />;
    case "payroll":
      return <CreditCard className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

// Helper function to get badge variant based on status
const getBadgeVariant = (status: Activity["status"]) => {
  switch (status) {
    case "approved":
      return "default";
    case "pending":
      return "secondary";
    case "rejected":
      return "destructive";
    case "completed":
      return "default";
    default:
      return "secondary";
  }
};

// Helper function to format timestamp as relative time
const formatTimeAgo = (timestamp: string) => {
  // This is a simple placeholder. In a real app, you would use a library like date-fns
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60),
  );

  if (diffInMinutes < 1) return "Agora mesmo";
  if (diffInMinutes < 60) return `há ${diffInMinutes}m`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `há ${diffInHours}h`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "Ontem";
  if (diffInDays < 7) return `há ${diffInDays}d`;

  return date.toLocaleDateString();
};

// Default activities for demonstration
const defaultActivities: Activity[] = [
  {
    id: "1",
    type: "new_employee",
    title: "Novo Funcionário Integrado",
    description:
      "Maria Silva foi integrada com sucesso ao departamento de Finanças.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    user: {
      name: "HR Manager",
      initials: "HM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=HR",
    },
    status: "completed",
  },
  {
    id: "2",
    type: "leave_request",
    title: "Solicitação de Férias Aprovada",
    description:
      "A solicitação de férias de João Neto para 15-22 de julho foi aprovada.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    user: {
      name: "Department Manager",
      initials: "DM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DM",
    },
    status: "approved",
  },
  {
    id: "3",
    type: "evaluation",
    title: "Avaliação de Desempenho Concluída",
    description:
      "As avaliações de desempenho do Q2 foram concluídas para a equipe de Vendas.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    user: {
      name: "Performance Manager",
      initials: "PM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PM",
    },
    status: "completed",
  },
  {
    id: "4",
    type: "payroll",
    title: "Processamento da Folha de Junho",
    description:
      "A folha de pagamento mensal de junho foi processada e aguarda aprovação final.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    user: {
      name: "Payroll Officer",
      initials: "PO",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PO",
    },
    status: "pending",
  },
  {
    id: "5",
    type: "leave_request",
    title: "Solicitação de Ausência Rejeitada",
    description:
      "A solicitação de ausência emergencial de António Costa foi rejeitada devido a restrições de pessoal.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    user: {
      name: "Department Manager",
      initials: "DM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DM2",
    },
    status: "rejected",
  },
];

export default RecentActivities;
