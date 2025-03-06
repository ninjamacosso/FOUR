import React from "react";
import { ShoppingCart } from "lucide-react";

const SalesPlaceholder = () => {
  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <ShoppingCart className="h-16 w-16 text-blue-500 mb-6" />
      <h1 className="text-4xl font-bold text-blue-500 mb-4">
        Vendas & Marketing
      </h1>
      <p className="text-xl text-gray-400 text-center max-w-md">
        O módulo de vendas e marketing estará disponível em breve.
      </p>
    </div>
  );
};

export default SalesPlaceholder;
