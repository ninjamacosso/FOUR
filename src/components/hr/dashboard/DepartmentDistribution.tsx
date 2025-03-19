import React from "react";

const DepartmentDistribution: React.FC = () => {
  // Em um cenário real, esses dados viriam de uma API/banco de dados
  const departments = [
    { name: "Vendas", count: 45, color: "bg-blue-500" },
    { name: "TI", count: 38, color: "bg-green-500" },
    { name: "Marketing", count: 28, color: "bg-purple-500" },
    { name: "Financeiro", count: 22, color: "bg-amber-500" },
    { name: "Operações", count: 32, color: "bg-pink-500" },
    { name: "RH", count: 15, color: "bg-cyan-500" },
    { name: "Administrativo", count: 18, color: "bg-red-500" },
    { name: "Jurídico", count: 8, color: "bg-indigo-500" },
  ];

  // Calculando o total de funcionários
  const totalEmployees = departments.reduce((sum, dept) => sum + dept.count, 0);

  // Ordenando os departamentos pelo número de funcionários (maior para menor)
  const sortedDepartments = [...departments].sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-4">
      {/* Mostrar os departamentos como barras */}
      <div className="space-y-3">
        {sortedDepartments.map((dept, index) => {
          // Calculando a porcentagem para o tamanho da barra
          const percentage = (dept.count / totalEmployees) * 100;
          
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${dept.color} mr-2`} />
                  <span>{dept.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{dept.count}</span>
                  <span className="text-xs text-muted-foreground">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${dept.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="text-xs text-muted-foreground flex justify-between pt-2 border-t">
        <span>Total de funcionários: {totalEmployees}</span>
        <span>8 departamentos</span>
      </div>
    </div>
  );
};

export default DepartmentDistribution; 