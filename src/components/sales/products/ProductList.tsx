import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Plus,
  ArrowUpDown,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: "active" | "inactive" | "low_stock";
  image?: string;
  description: string;
  sku: string;
}

interface ProductListProps {
  products?: Product[];
  onViewDetails?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const ProductList = ({
  products = defaultProducts,
  onViewDetails = () => {},
  onEdit = () => {},
  onDelete = () => {},
}: ProductListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = products.filter(
    (product) =>
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === "all" || product.category === categoryFilter) &&
      (statusFilter === "all" || product.status === statusFilter),
  );

  const getStatusBadge = (status: Product["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Ativo
          </Badge>
        );
      case "inactive":
        return <Badge variant="secondary">Inativo</Badge>;
      case "low_stock":
        return (
          <Badge
            variant="outline"
            className="bg-amber-100 text-amber-800 hover:bg-amber-200"
          >
            Estoque Baixo
          </Badge>
        );
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  // Get unique categories for filter
  const categories = [
    { id: "all", name: "Todas as Categorias" },
    ...Array.from(new Set(products.map((p) => p.category))).map((category) => ({
      id: category,
      name: category,
    })),
  ];

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Catálogo de Produtos
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-[300px]"
            />
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Adicionar Produto
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
              <SelectItem value="low_stock">Estoque Baixo</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {filteredProducts.length} produtos
          </span>
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode("grid")}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode("list")}
            >
              Lista
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <ArrowUpDown className="h-3 w-3" />
            Ordenar
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square bg-gray-100 relative">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Sem imagem
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  {getStatusBadge(product.status)}
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <p className="text-sm text-gray-500">{product.category}</p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="font-bold text-lg">{product.price}</p>
                  <p className="text-sm text-gray-500">
                    Estoque: {product.stock}
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {product.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails(product.id)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Detalhes
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(product.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(product.id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Produto
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  SKU
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Categoria
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Preço
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Estoque
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden mr-3">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
                            Sem img
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{product.sku}</td>
                  <td className="px-4 py-3 text-sm">{product.category}</td>
                  <td className="px-4 py-3 text-sm font-medium">
                    {product.price}
                  </td>
                  <td className="px-4 py-3 text-sm">{product.stock}</td>
                  <td className="px-4 py-3">
                    {getStatusBadge(product.status)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewDetails(product.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(product.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(product.id)}
                        className="text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Default mock data
const defaultProducts: Product[] = [
  {
    id: "PROD001",
    name: "Arroz Longo Fino 5kg",
    category: "Alimentos Básicos",
    price: "AOA 5,200",
    stock: 120,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=300&q=80",
    description: "Arroz longo fino de alta qualidade, pacote de 5kg.",
    sku: "ALI-ARR-001",
  },
  {
    id: "PROD002",
    name: "Óleo de Girassol 1L",
    category: "Alimentos Básicos",
    price: "AOA 3,800",
    stock: 85,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1620705337543-03753636a128?w=300&q=80",
    description: "Óleo de girassol refinado, garrafa de 1 litro.",
    sku: "ALI-OLE-002",
  },
  {
    id: "PROD003",
    name: "Feijão Preto 1kg",
    category: "Alimentos Básicos",
    price: "AOA 2,500",
    stock: 5,
    status: "low_stock",
    image:
      "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=300&q=80",
    description: "Feijão preto de primeira qualidade, pacote de 1kg.",
    sku: "ALI-FEI-003",
  },
  {
    id: "PROD004",
    name: "Açúcar Refinado 2kg",
    category: "Alimentos Básicos",
    price: "AOA 3,200",
    stock: 150,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1624453962232-78f1fe7e8f5d?w=300&q=80",
    description: "Açúcar refinado de alta qualidade, pacote de 2kg.",
    sku: "ALI-ACU-004",
  },
  {
    id: "PROD005",
    name: "Leite em Pó Integral 400g",
    category: "Laticínios",
    price: "AOA 4,500",
    stock: 75,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&q=80",
    description: "Leite em pó integral, lata de 400g.",
    sku: "LAT-LEI-005",
  },
  {
    id: "PROD006",
    name: "Café Moído 250g",
    category: "Bebidas",
    price: "AOA 3,000",
    stock: 0,
    status: "inactive",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&q=80",
    description: "Café moído tradicional, pacote de 250g.",
    sku: "BEB-CAF-006",
  },
  {
    id: "PROD007",
    name: "Farinha de Trigo 1kg",
    category: "Alimentos Básicos",
    price: "AOA 2,800",
    stock: 100,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1627485937980-221c88ac04f9?w=300&q=80",
    description: "Farinha de trigo tipo 1, pacote de 1kg.",
    sku: "ALI-FAR-007",
  },
  {
    id: "PROD008",
    name: "Macarrão Espaguete 500g",
    category: "Massas",
    price: "AOA 1,800",
    stock: 8,
    status: "low_stock",
    image:
      "https://images.unsplash.com/photo-1612966874574-e0a92ad2bc43?w=300&q=80",
    description: "Macarrão tipo espaguete, pacote de 500g.",
    sku: "MAS-ESP-008",
  },
];

export default ProductList;
