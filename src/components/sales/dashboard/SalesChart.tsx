import React from "react";

const SalesChart = () => {
  // This is a placeholder for a chart component
  // In a real implementation, you would use a library like recharts
  return (
    <div className="w-full h-[300px] bg-gray-50 rounded-md flex items-center justify-center">
      <div className="text-center">
        <div className="flex flex-col items-center">
          <div className="w-full h-[250px] relative">
            {/* Simulated chart bars */}
            <div className="absolute bottom-0 left-[5%] w-[5%] h-[60%] bg-blue-500 rounded-t-md"></div>
            <div className="absolute bottom-0 left-[15%] w-[5%] h-[75%] bg-blue-500 rounded-t-md"></div>
            <div className="absolute bottom-0 left-[25%] w-[5%] h-[45%] bg-blue-500 rounded-t-md"></div>
            <div className="absolute bottom-0 left-[35%] w-[5%] h-[80%] bg-blue-500 rounded-t-md"></div>
            <div className="absolute bottom-0 left-[45%] w-[5%] h-[65%] bg-blue-500 rounded-t-md"></div>
            <div className="absolute bottom-0 left-[55%] w-[5%] h-[90%] bg-blue-500 rounded-t-md"></div>
            <div className="absolute bottom-0 left-[65%] w-[5%] h-[70%] bg-blue-500 rounded-t-md"></div>
            <div className="absolute bottom-0 left-[75%] w-[5%] h-[85%] bg-blue-500 rounded-t-md"></div>
            <div className="absolute bottom-0 left-[85%] w-[5%] h-[55%] bg-blue-500 rounded-t-md"></div>

            {/* Simulated trend line */}
            <div className="absolute top-[30%] left-0 w-full h-[2px] bg-green-500"></div>

            {/* X-axis labels */}
            <div className="absolute bottom-[-25px] left-0 w-full flex justify-between px-[5%] text-xs text-gray-500">
              <span>Jan</span>
              <span>Fev</span>
              <span>Mar</span>
              <span>Abr</span>
              <span>Mai</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Ago</span>
              <span>Set</span>
            </div>

            {/* Y-axis labels */}
            <div className="absolute top-0 left-[-40px] h-full flex flex-col justify-between text-xs text-gray-500">
              <span>200M</span>
              <span>150M</span>
              <span>100M</span>
              <span>50M</span>
              <span>0</span>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 mt-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
              <span className="text-xs text-gray-500">Vendas Atuais</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              <span className="text-xs text-gray-500">Meta</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
