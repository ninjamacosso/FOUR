import React, { useState } from "react";
import {
  BarChart,
  LineChart,
  PieChart,
  Download,
  FileText,
  FileSpreadsheet,
  FileDown,
  Printer,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ReportData {
  title: string;
  description: string;
  type: "table" | "chart";
  chartType?: "bar" | "line" | "pie";
  data: any;
}

interface ReportViewerProps {
  report?: ReportData;
  isLoading?: boolean;
  onExport?: (format: "pdf" | "excel" | "csv") => void;
  onPrint?: () => void;
}

const ReportViewer = ({
  report = {
    title: "Employee Distribution by Department",
    description:
      "Visual representation of employee count across different departments",
    type: "chart",
    chartType: "bar",
    data: {
      labels: ["HR", "Finance", "IT", "Operations", "Sales", "Marketing"],
      datasets: [
        {
          label: "Number of Employees",
          data: [12, 19, 25, 32, 18, 14],
        },
      ],
    },
  },
  isLoading = false,
  onExport = () => {},
  onPrint = () => {},
}: ReportViewerProps) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [activeView, setActiveView] = useState("visual");

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 50));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  const renderChartPlaceholder = () => {
    const ChartIcon = {
      bar: BarChart,
      line: LineChart,
      pie: PieChart,
    }[report.chartType || "bar"];

    return (
      <div className="flex flex-col items-center justify-center h-96 bg-muted/20 rounded-lg">
        <ChartIcon className="w-24 h-24 text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-center max-w-md">
          {report.chartType?.charAt(0).toUpperCase() +
            report.chartType?.slice(1)}{" "}
          chart visualization for {report.title}
          <br />
          <span className="text-sm">
            (Actual chart implementation would go here)
          </span>
        </p>
      </div>
    );
  };

  const renderTablePlaceholder = () => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted/50">
              <th className="p-3 text-left font-medium">Department</th>
              <th className="p-3 text-left font-medium">Employee Count</th>
              <th className="p-3 text-left font-medium">Average Salary</th>
              <th className="p-3 text-left font-medium">Turnover Rate</th>
            </tr>
          </thead>
          <tbody>
            {["HR", "Finance", "IT", "Operations", "Sales", "Marketing"].map(
              (dept, index) => (
                <tr
                  key={dept}
                  className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}
                >
                  <td className="p-3 border-t">{dept}</td>
                  <td className="p-3 border-t">
                    {Math.floor(Math.random() * 30) + 10}
                  </td>
                  <td className="p-3 border-t">
                    ${(Math.random() * 5000 + 3000).toFixed(2)}
                  </td>
                  <td className="p-3 border-t">
                    {(Math.random() * 10).toFixed(1)}%
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const renderRawDataPlaceholder = () => {
    return (
      <div className="bg-muted/10 p-4 rounded-lg overflow-x-auto">
        <pre className="text-xs">{JSON.stringify(report.data, null, 2)}</pre>
      </div>
    );
  };

  return (
    <Card className="w-full h-full bg-background">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{report.title}</CardTitle>
            <CardDescription>{report.description}</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 50}
            >
              <ZoomOut className="h-4 w-4 mr-1" />
              <span className="sr-only">Zoom Out</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleResetZoom}>
              <RotateCcw className="h-4 w-4 mr-1" />
              <span>{zoomLevel}%</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 200}
            >
              <ZoomIn className="h-4 w-4 mr-1" />
              <span className="sr-only">Zoom In</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  <span>Export</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onExport("pdf")}>
                  <FileText className="h-4 w-4 mr-2" />
                  <span>PDF</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onExport("excel")}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  <span>Excel</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onExport("csv")}>
                  <FileDown className="h-4 w-4 mr-2" />
                  <span>CSV</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" onClick={onPrint}>
              <Printer className="h-4 w-4 mr-1" />
              <span>Print</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: "top left",
            }}
          >
            <Tabs
              defaultValue="visual"
              value={activeView}
              onValueChange={setActiveView}
            >
              <TabsList className="mb-4">
                <TabsTrigger value="visual">Visual</TabsTrigger>
                <TabsTrigger value="table">Table</TabsTrigger>
                <TabsTrigger value="raw">Raw Data</TabsTrigger>
              </TabsList>
              <TabsContent value="visual" className="mt-0">
                {renderChartPlaceholder()}
              </TabsContent>
              <TabsContent value="table" className="mt-0">
                {renderTablePlaceholder()}
              </TabsContent>
              <TabsContent value="raw" className="mt-0">
                {renderRawDataPlaceholder()}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
        <div className="text-sm text-muted-foreground">
          Generated by: HR Module v1.0
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReportViewer;
