import React from "react";
import { Clock, Users, UserCheck, UserX, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AttendanceOverview: React.FC = () => {
  // Em um cenário real, esses dados viriam de uma API/banco de dados
  const attendanceData = {
    // Dados de presença para a semana atual
    weekSummary: {
      total: 245,
      present: 228,
      absent: 12,
      late: 5,
      onLeave: 8,
      workFromHome: 42,
    },
    // Estatísticas de presença por dia da semana
    dailyStats: [
      {
        day: "Segunda",
        date: "22/03/2023",
        present: 230,
        absent: 10,
        late: 5,
        onLeave: 7,
        workFromHome: 38,
      },
      {
        day: "Terça",
        date: "23/03/2023",
        present: 235,
        absent: 6,
        late: 4,
        onLeave: 7,
        workFromHome: 45,
      },
      {
        day: "Quarta",
        date: "24/03/2023",
        present: 228,
        absent: 12,
        late: 5,
        onLeave: 8,
        workFromHome: 40,
      },
      {
        day: "Quinta",
        date: "25/03/2023",
        present: 232,
        absent: 8,
        late: 5,
        onLeave: 8,
        workFromHome: 36,
      },
      {
        day: "Sexta",
        date: "26/03/2023",
        present: 225,
        absent: 15,
        late: 5,
        onLeave: 8,
        workFromHome: 42,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Cartões com métricas de visão geral */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Total</div>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold mt-2">{attendanceData.weekSummary.total}</div>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Presentes</div>
            <UserCheck className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold mt-2">{attendanceData.weekSummary.present}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {Math.round((attendanceData.weekSummary.present / attendanceData.weekSummary.total) * 100)}% do total
          </div>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Ausentes</div>
            <UserX className="h-4 w-4 text-red-500" />
          </div>
          <div className="text-2xl font-bold mt-2">{attendanceData.weekSummary.absent}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {Math.round((attendanceData.weekSummary.absent / attendanceData.weekSummary.total) * 100)}% do total
          </div>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Em Licença</div>
            <Calendar className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold mt-2">{attendanceData.weekSummary.onLeave}</div>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Home Office</div>
            <Clock className="h-4 w-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold mt-2">{attendanceData.weekSummary.workFromHome}</div>
        </div>
      </div>
      
      {/* Tabela com estatísticas diárias */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="text-left p-3 font-medium">Dia</th>
              <th className="text-center p-3 font-medium">Presentes</th>
              <th className="text-center p-3 font-medium">Ausentes</th>
              <th className="text-center p-3 font-medium">Atrasados</th>
              <th className="text-center p-3 font-medium">Em Licença</th>
              <th className="text-center p-3 font-medium">Home Office</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.dailyStats.map((day, index) => (
              <tr 
                key={index} 
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-3">
                  <div className="font-medium">{day.day}</div>
                  <div className="text-xs text-muted-foreground">{day.date}</div>
                </td>
                <td className="p-3 text-center">
                  <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                    {day.present}
                  </Badge>
                </td>
                <td className="p-3 text-center">
                  <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                    {day.absent}
                  </Badge>
                </td>
                <td className="p-3 text-center">
                  <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                    {day.late}
                  </Badge>
                </td>
                <td className="p-3 text-center">
                  <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                    {day.onLeave}
                  </Badge>
                </td>
                <td className="p-3 text-center">
                  <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">
                    {day.workFromHome}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceOverview; 