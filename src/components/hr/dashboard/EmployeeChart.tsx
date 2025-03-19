import React from "react";

const EmployeeChart: React.FC = () => {
  // Em um cenário real, esses dados viriam de uma API/banco de dados
  const chartData = {
    months: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    // Dados fictícios de contratação por mês
    hires: [5, 3, 7, 2, 4, 8, 6, 9, 4, 5, 7, 3],
    // Dados fictícios de saída por mês
    exits: [2, 1, 3, 1, 2, 3, 4, 2, 1, 2, 3, 1],
  };

  // Calculando o valor máximo para o eixo Y (para dimensionar corretamente)
  const maxValue = Math.max(...chartData.hires, ...chartData.exits) + 2;

  // Altura total do gráfico em pixels
  const chartHeight = 180;
  
  // Calculando o fator de escala para converter valores para pixels
  const scale = chartHeight / maxValue;

  return (
    <div className="w-full h-full">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{maxValue}</span>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <span className="block w-3 h-3 rounded-full bg-primary mr-1"></span>
              <span>Contratações</span>
            </div>
            <div className="flex items-center">
              <span className="block w-3 h-3 rounded-full bg-red-500 mr-1"></span>
              <span>Desligamentos</span>
            </div>
          </div>
        </div>
        
        <div 
          className="w-full relative" 
          style={{ height: `${chartHeight}px` }}
        >
          {/* Linhas de referência horizontais */}
          {[0, 0.25, 0.5, 0.75, 1].map((perc, i) => (
            <div 
              key={i}
              className="absolute w-full border-t border-dashed border-gray-200 text-xs text-muted-foreground"
              style={{ 
                bottom: `${perc * chartHeight}px`,
                zIndex: 1
              }}
            >
              <span className="absolute -top-3 -left-5">
                {Math.round(maxValue * (1 - perc))}
              </span>
            </div>
          ))}
          
          {/* Colunas para cada mês */}
          <div className="absolute inset-0 flex justify-between items-end">
            {chartData.months.map((month, i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Coluna de desligamentos */}
                <div
                  className="w-4 bg-red-500/90 rounded-t-sm relative z-20"
                  style={{ 
                    height: `${chartData.exits[i] * scale}px`,
                    marginBottom: '-1px'
                  }}
                >
                  <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white px-1 rounded">
                    {chartData.exits[i]}
                  </span>
                </div>
                
                {/* Coluna de contratações */}
                <div
                  className="w-6 bg-primary/90 rounded-t-sm relative z-10 group"
                  style={{ 
                    height: `${chartData.hires[i] * scale}px` 
                  }}
                >
                  <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white px-1 rounded">
                    {chartData.hires[i]}
                  </span>
                </div>
                
                {/* Label do mês */}
                <span className="text-xs text-muted-foreground mt-1">
                  {month}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeChart; 