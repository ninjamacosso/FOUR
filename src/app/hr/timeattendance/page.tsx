'use client';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HrPageHeader } from '@/components/hr/shared/HrPageHeader';
import TimeAttendanceManagement from '@/components/hr/timeattendance/TimeAttendanceManagement';
import { Clock } from 'lucide-react';

const TimeAttendancePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Gestão de Ponto e Presença
        </h1>
        <p className="text-muted-foreground mt-2">
          Gerencie registros de ponto, escalas, relatórios e solicitações de ausência
        </p>
      </div>
      
      <TimeAttendanceManagement />
    </div>
  );
};

export default TimeAttendancePage; 