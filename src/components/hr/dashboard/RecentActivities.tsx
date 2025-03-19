import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  UserPlus,
  UserMinus,
  ArrowUpRight,
  Star,
  CalendarDays,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Activity {
  id: number;
  type: string;
  user: string;
  department: string;
  date: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
}

const ActivityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "contratação":
      return <UserPlus className="h-5 w-5 text-emerald-500" />;
    case "desligamento":
      return <UserMinus className="h-5 w-5 text-red-500" />;
    case "promoção":
      return <ArrowUpRight className="h-5 w-5 text-blue-500" />;
    case "avaliação":
      return <Star className="h-5 w-5 text-amber-500" />;
    case "férias":
      return <CalendarDays className="h-5 w-5 text-purple-500" />;
    default:
      return <div className="h-5 w-5 bg-gray-200 rounded-full" />;
  }
};

const ActivityBadge = ({ type }: { type: string }) => {
  let variant:
    | "default"
    | "secondary"
    | "destructive"
    | "outline" = "default";
  
  switch (type) {
    case "contratação":
      variant = "default";
      break;
    case "desligamento":
      variant = "destructive";
      break;
    case "promoção":
      variant = "secondary";
      break;
    case "avaliação":
      variant = "outline";
      break;
    case "férias":
      variant = "outline";
      break;
    default:
      variant = "default";
  }

  return (
    <Badge variant={variant} className="capitalize">
      {type}
    </Badge>
  );
};

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities = [] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
        <CardDescription>
          Últimas atividades no departamento de RH
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4"
            >
              <div className="bg-muted p-2 rounded-full">
                <ActivityIcon type={activity.type} />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">{activity.user}</p>
                    <ActivityBadge type={activity.type} />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.date}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Departamento: {activity.department}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
