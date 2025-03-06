import React from "react";
import {
  Search,
  Filter,
  Calendar,
  FileText,
  BarChart,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";

interface ReportSelectorProps {
  onReportTypeChange?: (reportType: string) => void;
  onFilterChange?: (filters: any) => void;
  onDateRangeChange?: (dateRange: any) => void;
  onGenerateReport?: () => void;
}

const ReportSelector = ({
  onReportTypeChange = () => {},
  onFilterChange = () => {},
  onDateRangeChange = () => {},
  onGenerateReport = () => {},
}: ReportSelectorProps) => {
  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Report Selector</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Report Type Selection */}
          <div>
            <h3 className="text-md font-medium mb-2">Report Type</h3>
            <Tabs defaultValue="employee" onValueChange={onReportTypeChange}>
              <TabsList className="w-full grid grid-cols-5 mb-4">
                <TabsTrigger
                  value="employee"
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Employee
                </TabsTrigger>
                <TabsTrigger
                  value="payroll"
                  className="flex items-center gap-2"
                >
                  <BarChart className="h-4 w-4" />
                  Payroll
                </TabsTrigger>
                <TabsTrigger value="leave" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Leave
                </TabsTrigger>
                <TabsTrigger
                  value="performance"
                  className="flex items-center gap-2"
                >
                  <BarChart className="h-4 w-4" />
                  Performance
                </TabsTrigger>
                <TabsTrigger
                  value="compliance"
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Compliance
                </TabsTrigger>
              </TabsList>

              {/* Employee Reports Content */}
              <TabsContent value="employee" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Department</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <Select defaultValue="active">
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="onleave">On Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              {/* Payroll Reports Content */}
              <TabsContent value="payroll" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">
                      Payroll Period
                    </label>
                    <Select defaultValue="current">
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current Month</SelectItem>
                        <SelectItem value="previous">Previous Month</SelectItem>
                        <SelectItem value="q1">Q1 2023</SelectItem>
                        <SelectItem value="q2">Q2 2023</SelectItem>
                        <SelectItem value="q3">Q3 2023</SelectItem>
                        <SelectItem value="q4">Q4 2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Report Detail</label>
                    <Select defaultValue="summary">
                      <SelectTrigger>
                        <SelectValue placeholder="Select detail level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summary">Summary</SelectItem>
                        <SelectItem value="detailed">Detailed</SelectItem>
                        <SelectItem value="tax">Tax Breakdown</SelectItem>
                        <SelectItem value="deductions">
                          Deductions Only
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              {/* Leave Reports Content */}
              <TabsContent value="leave" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Leave Type</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="vacation">Vacation</SelectItem>
                        <SelectItem value="sick">Sick Leave</SelectItem>
                        <SelectItem value="maternity">Maternity</SelectItem>
                        <SelectItem value="paternity">Paternity</SelectItem>
                        <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              {/* Performance Reports Content */}
              <TabsContent value="performance" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">
                      Evaluation Cycle
                    </label>
                    <Select defaultValue="current">
                      <SelectTrigger>
                        <SelectValue placeholder="Select cycle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current Cycle</SelectItem>
                        <SelectItem value="previous">Previous Cycle</SelectItem>
                        <SelectItem value="annual2023">Annual 2023</SelectItem>
                        <SelectItem value="q12023">Q1 2023</SelectItem>
                        <SelectItem value="q22023">Q2 2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Department</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              {/* Compliance Reports Content */}
              <TabsContent value="compliance" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">
                      Compliance Type
                    </label>
                    <Select defaultValue="tax">
                      <SelectTrigger>
                        <SelectValue placeholder="Select compliance type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tax">Tax Compliance</SelectItem>
                        <SelectItem value="social">Social Security</SelectItem>
                        <SelectItem value="labor">Labor Law</SelectItem>
                        <SelectItem value="documents">
                          Required Documents
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="compliant">Compliant</SelectItem>
                        <SelectItem value="noncompliant">
                          Non-Compliant
                        </SelectItem>
                        <SelectItem value="pending">Pending Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Date Range Selection */}
          <div>
            <h3 className="text-md font-medium mb-2">Date Range</h3>
            <DatePickerWithRange className="w-full" />
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search by keyword..."
                className="pl-8"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Additional Filters
            </Button>
          </div>

          {/* Generate Report Button */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Settings
            </Button>
            <Button
              onClick={onGenerateReport}
              className="flex items-center gap-2"
            >
              Generate Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportSelector;
