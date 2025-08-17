import React, { useState } from "react";
import {
  FileText,
  Search,
  Clock,
  User,
  BarChart3,
  FileSearch,
  Calendar as CalendarIcon,
  Eye,
  Download as DownloadIcon,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Sidebar from "@/components/admin/Sidebar";

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterPeriod, setFilterPeriod] = useState("all");

  // Mock report data
  const reports = [
    {
      id: 1,
      title: "Monthly Patient Volume Report",
      type: "analytics",
      department: "Administration",
      author: "Emily Rodriguez",
      authorRole: "Administrator",
      status: "approved",
      priority: "high",
      date: "2023-06-15",
      period: "May 2023",
      summary:
        "Monthly analysis of patient visits across all departments. Shows 15% increase in patient volume compared to previous month.",
      findings: [
        "Patient volume increased by 15% from April",
        "Emergency department saw highest growth at 22%",
        "Average wait time decreased by 8 minutes",
        "Patient satisfaction rating improved to 4.6/5",
      ],
      recommendations: [
        "Increase staffing in Emergency department",
        "Implement new triage system",
        "Expand clinic hours on weekends",
      ],
      attachments: 2,
      comments: 3,
      avatar: "ER",
    },
    {
      id: 2,
      title: "Equipment Maintenance Report",
      type: "maintenance",
      department: "Facilities",
      author: "David Wilson",
      authorRole: "Facilities Manager",
      status: "pending",
      priority: "urgent",
      date: "2023-06-14",
      period: "Q2 2023",
      summary:
        "Quarterly maintenance assessment of all medical equipment. Critical issues identified with MRI machine.",
      findings: [
        "MRI machine requires immediate calibration",
        "Three examination tables need replacement",
        "HVAC system in operating rooms needs servicing",
        "All emergency equipment passed inspection",
      ],
      recommendations: [
        "Schedule MRI calibration within 48 hours",
        "Order replacement examination tables",
        "Contract HVAC specialists for emergency units",
      ],
      attachments: 1,
      comments: 1,
      avatar: "DW",
    },
    {
      id: 3,
      title: "Staff Training Evaluation",
      type: "training",
      department: "Human Resources",
      author: "Lisa Anderson",
      authorRole: "HR Manager",
      status: "approved",
      priority: "normal",
      date: "2023-06-10",
      period: "Spring 2023",
      summary:
        "Evaluation of recent staff training programs. High satisfaction rates among participants.",
      findings: [
        "95% of participants rated training as excellent",
        "New EHR system training reduced errors by 40%",
        "Communication skills workshop received highest ratings",
        "Time management training needs improvement",
      ],
      recommendations: [
        "Continue EHR training for new hires",
        "Expand communication skills workshops",
        "Revise time management curriculum",
        "Schedule advanced training for senior staff",
      ],
      attachments: 3,
      comments: 5,
      avatar: "LA",
    },
    {
      id: 4,
      title: "Budget Analysis Report",
      type: "finance",
      department: "Finance",
      author: "James Taylor",
      authorRole: "Finance Officer",
      status: "review",
      priority: "high",
      date: "2023-06-08",
      period: "H1 2023",
      summary:
        "Comprehensive financial analysis for first half of 2023. Operating costs within budget, revenue exceeds projections.",
      findings: [
        "Revenue exceeded projections by 12%",
        "Operating costs 5% under budget",
        "Pharmaceutical expenses increased by 8%",
        "Equipment purchases within allocated budget",
      ],
      recommendations: [
        "Increase marketing budget for下半年",
        "Negotiate better rates with pharmaceutical suppliers",
        "Invest in new diagnostic equipment",
        "Create contingency fund for emergencies",
      ],
      attachments: 4,
      comments: 2,
      avatar: "JT",
    },
    {
      id: 5,
      title: "Patient Satisfaction Survey",
      type: "feedback",
      department: "Quality Assurance",
      author: "Jennifer Lee",
      authorRole: "QA Specialist",
      status: "approved",
      priority: "normal",
      date: "2023-06-05",
      period: "Q2 2023",
      summary:
        "Quarterly patient satisfaction survey results. Overall satisfaction rating of 4.7/5, highest in clinic history.",
      findings: [
        "Overall satisfaction: 4.7/5 (previous: 4.4/5)",
        "Staff courtesy rated 4.9/5",
        "Wait times rated 4.2/5",
        "Facility cleanliness rated 4.8/5",
      ],
      recommendations: [
        "Implement patient portal for appointment scheduling",
        "Add more seating in waiting areas",
        "Extend clinic hours for working patients",
        "Launch loyalty program for returning patients",
      ],
      attachments: 2,
      comments: 4,
      avatar: "JL",
    },
  ];

  const reportTypes = [
    "all",
    "analytics",
    "maintenance",
    "training",
    "finance",
    "feedback",
  ];
  const departments = [
    "all",
    "Administration",
    "Facilities",
    "Human Resources",
    "Finance",
    "Quality Assurance",
  ];
  const periods = ["all", "Q1 2023", "Q2 2023", "H1 2023", "May 2023"];

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || report.status === filterStatus;
    const matchesType = filterType === "all" || report.type === filterType;
    const matchesPeriod =
      filterPeriod === "all" || report.period === filterPeriod;

    return matchesSearch && matchesStatus && matchesType && matchesPeriod;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "review":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      analytics: "bg-blue-100 text-blue-800",
      maintenance: "bg-red-100 text-red-800",
      training: "bg-green-100 text-green-800",
      finance: "bg-purple-100 text-purple-800",
      feedback: "bg-yellow-100 text-yellow-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "normal":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Statistics for dashboard
  const stats = {
    totalReports: reports.length,
    approved: reports.filter((r) => r.status === "approved").length,
    pending: reports.filter((r) => r.status === "pending").length,
    urgent: reports.filter((r) => r.priority === "urgent").length,
  };

  const typeDistribution = {
    analytics: reports.filter((r) => r.type === "analytics").length,
    maintenance: reports.filter((r) => r.type === "maintenance").length,
    training: reports.filter((r) => r.type === "training").length,
    finance: reports.filter((r) => r.type === "finance").length,
    feedback: reports.filter((r) => r.type === "feedback").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-64 p-8">
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <FileText className="h-8 w-8 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Reports Management
            </h1>
          </div>
          <p className="text-gray-600">
            Review, analyze, and manage reports submitted by staff members
          </p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-emerald-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats.totalReports}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Approved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats.approved}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-yellow-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pending Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats.pending}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-red-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Urgent Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats.urgent}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="list" className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <TabsList className="bg-white p-1 rounded-lg border border-gray-200">
              <TabsTrigger
                value="list"
                className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 px-4 py-2 rounded-md"
              >
                <FileSearch className="h-4 w-4 mr-2" />
                List View
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 px-4 py-2 rounded-md"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border-gray-200 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Submit Report</span>
              </Button>
            </div>
          </div>

          <TabsContent value="list">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filters */}
              <div className="lg:col-span-1 space-y-4">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Filters</CardTitle>
                      <CardDescription>
                        Refine your report search
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Status
                        </label>
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          <option value="all">All Status</option>
                          <option value="approved">Approved</option>
                          <option value="pending">Pending Review</option>
                          <option value="review">Under Review</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Report Type
                        </label>
                        <select
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          <option value="all">All Types</option>
                          {reportTypes
                            .filter((t) => t !== "all")
                            .map((type) => (
                              <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Time Period
                        </label>
                        <select
                          value={filterPeriod}
                          onChange={(e) => setFilterPeriod(e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          <option value="all">All Periods</option>
                          {periods
                            .filter((p) => p !== "all")
                            .map((period) => (
                              <option key={period} value={period}>
                                {period}
                              </option>
                            ))}
                        </select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sticky Stats Card */}
                  <Card className="sticky top-8">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Report Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Approved</span>
                          <span className="font-medium">{stats.approved}</span>
                        </div>
                        <Progress
                          value={(stats.approved / stats.totalReports) * 100}
                          className="h-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Pending</span>
                          <span className="font-medium">{stats.pending}</span>
                        </div>
                        <Progress
                          value={(stats.pending / stats.totalReports) * 100}
                          className="h-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Urgent</span>
                          <span className="font-medium">{stats.urgent}</span>
                        </div>
                        <Progress
                          value={(stats.urgent / stats.totalReports) * 100}
                          className="h-2"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Reports List */}
              <div className="lg:col-span-3 space-y-4">
                {filteredReports.length === 0 ? (
                  <Card className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No reports found
                    </h3>
                    <p className="text-gray-500">
                      Try adjusting your search or filter criteria.
                    </p>
                    <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white">
                      Submit New Report
                    </Button>
                  </Card>
                ) : (
                  filteredReports.map((report) => (
                    <Card
                      key={report.id}
                      className={`hover:shadow-md transition-shadow ${
                        report.priority === "urgent"
                          ? "border-l-4 border-red-500"
                          : ""
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                          <div className="flex-1">
                            <div className="flex items-start space-x-3 mb-3">
                              <div
                                className={`h-10 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0`}
                              >
                                <FileText className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                  {report.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                  {report.summary}
                                </p>
                                <div className="flex flex-wrap items-center gap-2">
                                  <Badge
                                    variant="secondary"
                                    className={getTypeColor(report.type)}
                                  >
                                    {report.type.replace(/^\w/, (c) =>
                                      c.toUpperCase()
                                    )}
                                  </Badge>
                                  <Badge
                                    variant="secondary"
                                    className={getStatusColor(report.status)}
                                  >
                                    {report.status.replace(/^\w/, (c) =>
                                      c.toUpperCase()
                                    )}
                                  </Badge>
                                  <Badge
                                    variant="secondary"
                                    className={getPriorityColor(
                                      report.priority
                                    )}
                                  >
                                    {report.priority}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-4">
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                {report.author}
                                <span className="mx-1">•</span>
                                {report.authorRole}
                              </div>
                              <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                {report.date}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {report.period}
                              </div>
                              <div className="flex items-center">
                                <span className="mr-1">📊</span>
                                {report.department}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 mt-4 lg:mt-0 lg:ml-4">
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-gray-400 hover:text-blue-600"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-gray-400 hover:text-green-600"
                            >
                              <DownloadIcon className="h-4 w-4" />
                            </Button>
                            <div className="text-center">
                              <div className="text-sm font-medium text-gray-900">
                                {report.comments}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                Comments
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Reports Analytics</CardTitle>
                <CardDescription>
                  Overview of report submissions and trends
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Type Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        Report Type Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(typeDistribution).map(
                          ([type, count]) => (
                            <div
                              key={type}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center space-x-2">
                                <div
                                  className={`h-3 w-3 rounded-full ${
                                    type === "analytics"
                                      ? "bg-blue-500"
                                      : type === "maintenance"
                                      ? "bg-red-500"
                                      : type === "training"
                                      ? "bg-green-500"
                                      : type === "finance"
                                      ? "bg-purple-500"
                                      : "bg-yellow-500"
                                  }`}
                                ></div>
                                <span className="text-sm capitalize">
                                  {type}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">
                                  {count}
                                </span>
                                <Progress
                                  value={(count / stats.totalReports) * 100}
                                  className="h-2 w-20"
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Status Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Status Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span className="text-sm">Approved</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">
                              {stats.approved}
                            </span>
                            <Progress
                              value={
                                (stats.approved / stats.totalReports) * 100
                              }
                              className="h-2 w-20"
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                            <span className="text-sm">Pending</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">
                              {stats.pending}
                            </span>
                            <Progress
                              value={(stats.pending / stats.totalReports) * 100}
                              className="h-2 w-20"
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                            <span className="text-sm">Under Review</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">
                              {stats.totalReports -
                                stats.approved -
                                stats.pending}
                            </span>
                            <Progress
                              value={
                                ((stats.totalReports -
                                  stats.approved -
                                  stats.pending) /
                                  stats.totalReports) *
                                100
                              }
                              className="h-2 w-20"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Reports */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Recent Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reports.slice(0, 5).map((report) => (
                        <div
                          key={report.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`h-8 w-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center`}
                            >
                              <span className="text-white text-sm font-medium">
                                {report.avatar}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">
                                {report.title}
                              </p>
                              <p className="text-gray-500 text-xs">
                                {report.author} • {report.date}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            className={getStatusColor(report.status)}
                          >
                            {report.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;
