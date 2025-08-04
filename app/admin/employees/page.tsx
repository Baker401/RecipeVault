"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChefHat, Search, Plus, Mail, Calendar, Trash2, UserCheck, UserX } from "lucide-react"
import Link from "next/link"

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const employees = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@company.com",
      role: "Head Chef",
      status: "Active",
      joinDate: "2023-01-15",
      lastActive: "2 hours ago",
      recipesAccessed: 45,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "Sous Chef",
      status: "Active",
      joinDate: "2023-03-22",
      lastActive: "1 day ago",
      recipesAccessed: 32,
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.wilson@company.com",
      role: "Line Cook",
      status: "Inactive",
      joinDate: "2023-06-10",
      lastActive: "1 week ago",
      recipesAccessed: 18,
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@company.com",
      role: "Pastry Chef",
      status: "Active",
      joinDate: "2023-02-28",
      lastActive: "4 hours ago",
      recipesAccessed: 28,
    },
  ]

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-600" : "bg-gray-600"
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="flex items-center mr-6">
                <ChefHat className="h-8 w-8 text-yellow-600 mr-3" />
                <h1 className="text-2xl font-bold text-white">Employee Management</h1>
              </Link>
            </div>
            <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Employee Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{employees.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                {employees.filter((e) => e.status === "Active").length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Inactive</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-400">
                {employees.filter((e) => e.status === "Inactive").length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Avg. Recipes Accessed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">
                {Math.round(employees.reduce((acc, e) => acc + e.recipesAccessed, 0) / employees.length)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Employees List */}
        <div className="space-y-4">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-slate-700 text-white">{getInitials(employee.name)}</AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="text-lg font-semibold text-white">{employee.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-300">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {employee.email}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Joined {new Date(employee.joinDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge className={`${getStatusColor(employee.status)} text-white mb-2`}>{employee.status}</Badge>
                      <p className="text-sm text-gray-300">{employee.role}</p>
                      <p className="text-xs text-gray-400">Last active: {employee.lastActive}</p>
                      <p className="text-xs text-gray-400">Recipes accessed: {employee.recipesAccessed}</p>
                    </div>

                    <div className="flex space-x-2">
                      {employee.status === "Active" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-slate-700 bg-transparent"
                        >
                          <UserX className="h-4 w-4 mr-1" />
                          Deactivate
                        </Button>
                      ) : (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <UserCheck className="h-4 w-4 mr-1" />
                          Activate
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <div className="h-16 w-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No employees found</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first employee"}
            </p>
            <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
