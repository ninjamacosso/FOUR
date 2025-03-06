import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ReportSelector from "./ReportSelector";
import ReportViewer from "./ReportViewer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileBarChart, Save, Share2, Clock } from "lucide-react";

interface ReportingDashboardProps {
  savedReports?: SavedReport[];
  onSaveReport?: (report: any) => void;
  onShareReport?: (reportId: string) => void;
}

interface SavedReport {
  id: string;
  title: string;
  type: string;
  createdAt: string;
  lastRun: string;
}

const ReportingDashboard = ({
  savedReports = defaultSavedReports,
  onSaveReport = () => {},
  onShareReport = () => {},
}: ReportingDashboardProps) => {
  const [activeTab, setActiveTab] = useState("new");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentReport, setCurrentReport] = useState<any>(null);
  const [selectedReportType, setSelectedReportType] = useState("employee");

  const handleGenerateReport = () => {
    setIsGenerating(true);

    // Simulate API call to generate report
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentReport({
        title: getReportTitle(selectedReportType),
        description: `Detailed ${selectedReportType} report with comprehensive analytics and insights`,
        type: "chart",
        chartType: "bar",
        data: getMockDataForReportType(selectedReportType),
      });
    }, 1500);
  };

  const getReportTitle = (type: string) => {
    switch (type) {
      case "employee":
        return "Employee Distribution by Department";
      case "payroll":
        return "Payroll Expense Analysis";
      case "leave":
        return "Leave Utilization Report";
      case "performance":
        return "Performance Evaluation Summary";
      case "compliance":
        return "Regulatory Compliance Status";
      default:
        return "Generated Report";
    }
  };

  const getMockDataForReportType = (type: string) => {
    // Mock data for different report types
    switch (type) {
      case "employee":
        return {
          labels: ["HR", "Finance", "IT", "Operations", "Sales", "Marketing"],
          datasets: [
            {
              label: "Number of Employees",
              data: [12, 19, 25, 32, 18, 14],
            },
          ],
        };
      case "payroll":
        return {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Total Payroll (AOA)",
              data: [4500000, 4650000, 4800000, 4950000, 5100000, 5250000],
            },
          ],
        };
      case "leave":
        return {
          labels: [
            "Vacation",
            "Sick",
            "Personal",
            "Maternity",
            "Paternity",
            "Other",
          ],
          datasets: [
            {
              label: "Days Taken",
              data: [120, 45, 30, 60, 15, 10],
            },
          ],
        };
      case "performance":
        return {
          labels: [
            "Excellent",
            "Good",
            "Satisfactory",
            "Needs Improvement",
            "Unsatisfactory",
          ],
          datasets: [
            {
              label: "Employee Count",
              data: [15, 35, 25, 10, 5],
            },
          ],
        };
      case "compliance":
        return {
          labels: [
            "Tax",
            "Social Security",
            "Labor Law",
            "Documentation",
            "Health & Safety",
          ],
          datasets: [
            {
              label: "Compliance Rate (%)",
              data: [98, 100, 95, 92, 88],
            },
          ],
        };
      default:
        return {
          labels: ["Category 1", "Category 2", "Category 3"],
          datasets: [
            {
              label: "Values",
              data: [10, 20, 30],
            },
          ],
        };
    }
  };

  const handleReportTypeChange = (type: string) => {
    setSelectedReportType(type);
  };

  const handleExportReport = (format: "pdf" | "excel" | "csv") => {
    console.log(`Exporting report in ${format} format`);
    // Implementation would connect to actual export functionality
  };

  const handlePrintReport = () => {
    console.log("Printing report");
    // Implementation would connect to actual print functionality
  };

  const handleSaveReport = () => {
    if (currentReport) {
      onSaveReport({
        ...currentReport,
        id: `report-${Date.now()}`,
        createdAt: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <FileBarChart className="mr-2 h-6 w-6" />
            Reporting Dashboard
          </h1>
          <p className="text-gray-600">
            Generate and manage reports for compliance and management purposes
          </p>
        </div>
        <div className="flex space-x-2">
          {currentReport && (
            <>
              <Button
                variant="outline"
                onClick={handleSaveReport}
                className="flex items-center"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Report
              </Button>
              <Button
                variant="outline"
                onClick={() => onShareReport("current")}
                className="flex items-center"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="new">New Report</TabsTrigger>
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReportSelector
              onReportTypeChange={handleReportTypeChange}
              onGenerateReport={handleGenerateReport}
            />

            {currentReport ? (
              <ReportViewer
                report={currentReport}
                isLoading={isGenerating}
                onExport={handleExportReport}
                onPrint={handlePrintReport}
              />
            ) : (
              <Card className="w-full h-full flex items-center justify-center bg-white">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileBarChart className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    No Report Generated Yet
                  </h3>
                  <p className="text-gray-500 text-center max-w-md mb-6">
                    Configure your report parameters on the left and click
                    "Generate Report" to create a new report.
                  </p>
                  <Button
                    onClick={handleGenerateReport}
                    disabled={isGenerating}
                    className="flex items-center"
                  >
                    {isGenerating ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Generating...
                      </>
                    ) : (
                      "Generate Sample Report"
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedReports.length > 0 ? (
              savedReports.map((report) => (
                <Card
                  key={report.id}
                  className="cursor-pointer hover:border-primary transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-lg">{report.title}</h3>
                        <p className="text-sm text-gray-500">
                          {report.type} Report
                        </p>
                      </div>
                      <FileBarChart className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Last run: {report.lastRun}</span>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onShareReport(report.id)}
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
                <FileBarChart className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  No Saved Reports
                </h3>
                <p className="text-gray-500 text-center max-w-md mb-6">
                  You haven't saved any reports yet. Generate a new report and
                  save it to see it here.
                </p>
                <Button onClick={() => setActiveTab("new")}>
                  Create New Report
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
            <FileBarChart className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Scheduled Reports Coming Soon
            </h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              The ability to schedule automated reports is coming in a future
              update. Stay tuned!
            </p>
            <Button onClick={() => setActiveTab("new")}>
              Create One-time Report
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Default mock data
const defaultSavedReports: SavedReport[] = [
  {
    id: "report-1",
    title: "Monthly Employee Headcount",
    type: "Employee",
    createdAt: "2023-05-15T10:30:00Z",
    lastRun: "2 days ago",
  },
  {
    id: "report-2",
    title: "Q2 Payroll Summary",
    type: "Payroll",
    createdAt: "2023-06-01T14:45:00Z",
    lastRun: "1 week ago",
  },
  {
    id: "report-3",
    title: "Annual Leave Utilization",
    type: "Leave",
    createdAt: "2023-04-20T09:15:00Z",
    lastRun: "3 days ago",
  },
  {
    id: "report-4",
    title: "Tax Compliance Status",
    type: "Compliance",
    createdAt: "2023-05-28T16:20:00Z",
    lastRun: "Yesterday",
  },
];

export default ReportingDashboard;
