import React, { useState } from "react";
import SalesHeader from "./SalesHeader";
import SalesSidebar from "./SalesSidebar";
import SalesDashboard from "./dashboard/SalesDashboard";
import CustomerList from "./customers/CustomerList";
import CustomerDetail from "./customers/CustomerDetail";
import ProductList from "./products/ProductList";
import CampaignList from "./campaigns/CampaignList";
import SalesPlaceholder from "./SalesPlaceholder";

const SalesModule = () => {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedCampaignId, setSelectedCampaignId] = useState("");

  const handleSidebarItemSelect = (item: string) => {
    setActiveModule(item);
    // Reset selections when changing modules
    setSelectedCustomerId("");
    setSelectedProductId("");
    setSelectedCampaignId("");
  };

  const handleCustomerSelect = (id: string) => {
    setSelectedCustomerId(id);
    setActiveModule("customer-detail");
  };

  const handleProductSelect = (id: string) => {
    setSelectedProductId(id);
    setActiveModule("product-detail");
  };

  const handleCampaignSelect = (id: string) => {
    setSelectedCampaignId(id);
    setActiveModule("campaign-detail");
  };

  const renderContent = () => {
    switch (activeModule) {
      case "dashboard":
        return <SalesDashboard />;
      case "customers":
        return <CustomerList onViewDetails={handleCustomerSelect} />;
      case "customer-detail":
        return <CustomerDetail />;
      case "products":
        return <ProductList onViewDetails={handleProductSelect} />;
      case "campaigns":
        return <CampaignList onViewDetails={handleCampaignSelect} />;
      default:
        return <SalesPlaceholder />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <SalesHeader
        title={
          activeModule === "dashboard"
            ? "Vendas & Marketing"
            : getModuleTitle(activeModule)
        }
      />
      <div className="flex flex-1 overflow-hidden">
        <SalesSidebar
          activeItem={getActiveItem(activeModule)}
          onItemSelect={handleSidebarItemSelect}
        />
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

// Helper function to get the active sidebar item based on the current module
const getActiveItem = (module: string) => {
  if (module === "customer-detail") return "customers";
  if (module === "product-detail") return "products";
  if (module === "campaign-detail") return "campaigns";
  return module;
};

// Helper function to get the title for the current module
const getModuleTitle = (module: string) => {
  switch (module) {
    case "dashboard":
      return "Dashboard de Vendas & Marketing";
    case "customers":
    case "customer-detail":
      return "Gestão de Clientes";
    case "products":
    case "product-detail":
      return "Catálogo de Produtos";
    case "campaigns":
    case "campaign-detail":
      return "Campanhas de Marketing";
    case "calendar":
      return "Calendário de Eventos";
    case "communications":
      return "Comunicações";
    case "analytics":
      return "Análises de Vendas";
    case "reports":
      return "Relatórios";
    case "settings":
      return "Configurações";
    default:
      return "Vendas & Marketing";
  }
};

export default SalesModule;
