"use client"

import { useState } from "react"
import { Search, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProgramTable } from "@/components/program-table"

const marketingPrograms = [
  {
    id: "1",
    goals: "Mission25 - Spyne Brand Enhancement",
    tasks: "Testimonials",
    team: "Marketing",
    priority: "P0",
    owner: "Anurag Kumar",
    status: "In Progress",
    eta: "2025-11-30",
    completionDate: "",
    links: "",
    notes: "",
  },
  {
    id: "2",
    goals: "Mission25 - Spyne Brand Enhancement",
    tasks: "Influencer tie-ups / Podcasts (10)",
    team: "Marketing",
    priority: "P0",
    owner: "Anurag Kumar",
    status: "In Progress",
    eta: "2025-11-30",
    completionDate: "",
    links: "",
    notes: "",
  },
  {
    id: "3",
    goals: "Mission25 - Spyne Brand Enhancement",
    tasks: "State dealer shows (10 till Dec)",
    team: "Marketing",
    priority: "P0",
    owner: "Anurag Kumar",
    status: "In Progress",
    eta: "2025-11-30",
    completionDate: "",
    links: "",
    notes: "",
  },
  {
    id: "4",
    goals: "Mission25 - Spyne Brand Enhancement",
    tasks: "Referral Program",
    team: "Marketing",
    priority: "P0",
    owner: "Anurag Kumar",
    status: "In Progress",
    eta: "2025-11-30",
    completionDate: "",
    links: "",
    notes: "",
  },
]

export default function ProgramDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [teamFilter, setTeamFilter] = useState("all")
  const [ownerFilter, setOwnerFilter] = useState("all")

  const filteredPrograms = marketingPrograms.filter((program) => {
    const matchesSearch =
      searchQuery === "" ||
      program.goals.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.team.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || program.status === statusFilter

    const matchesPriority = priorityFilter === "all" || program.priority === priorityFilter

    const matchesOwner = ownerFilter === "all" || program.owner === ownerFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesOwner
  })

  const stats = {
    total: marketingPrograms.length,
    inProgress: marketingPrograms.filter((p) => p.status === "In Progress").length,
    ongoing: marketingPrograms.filter((p) => p.status === "Ongoing").length,
    toBePicked: marketingPrograms.filter((p) => p.status === "To be picked").length,
    completed: marketingPrograms.filter((p) => p.status === "Completed").length,
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-[1600px] space-y-2">
        <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-2 shadow-sm">
          {/* Compact metrics */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStatusFilter("all")}
              className="rounded-md border border-border bg-background px-2 py-1 transition-all hover:border-primary hover:shadow-sm"
            >
              <div className="text-[10px] font-medium text-muted-foreground">Total</div>
              <div className="text-base font-semibold text-foreground">{stats.total}</div>
            </button>
            <button
              onClick={() => setStatusFilter("In Progress")}
              className="rounded-md border border-border bg-background px-2 py-1 transition-all hover:border-[var(--status-blue)] hover:shadow-sm"
            >
              <div className="text-[10px] font-medium text-muted-foreground">In Progress</div>
              <div className="text-base font-semibold text-[var(--status-blue)]">{stats.inProgress}</div>
            </button>
            <button
              onClick={() => setStatusFilter("Ongoing")}
              className="rounded-md border border-border bg-background px-2 py-1 transition-all hover:border-[var(--status-purple)] hover:shadow-sm"
            >
              <div className="text-[10px] font-medium text-muted-foreground">Ongoing</div>
              <div className="text-base font-semibold text-[var(--status-purple)]">{stats.ongoing}</div>
            </button>
            <button
              onClick={() => setStatusFilter("To be picked")}
              className="rounded-md border border-border bg-background px-2 py-1 transition-all hover:border-[var(--status-orange)] hover:shadow-sm"
            >
              <div className="text-[10px] font-medium text-muted-foreground">To be picked</div>
              <div className="text-base font-semibold text-[var(--status-orange)]">{stats.toBePicked}</div>
            </button>
            <button
              onClick={() => setStatusFilter("Completed")}
              className="rounded-md border border-border bg-background px-2 py-1 transition-all hover:border-[var(--status-green)] hover:shadow-sm"
            >
              <div className="text-[10px] font-medium text-muted-foreground">Completed</div>
              <div className="text-base font-semibold text-[var(--status-green)]">{stats.completed}</div>
            </button>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-border" />

          {/* Filters */}
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 min-w-[200px] max-w-[300px]">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 text-sm border-border"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px] h-8 text-sm border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="To be picked">To be picked</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Ongoing">Ongoing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[130px] h-8 text-sm border-border">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="P0">P0</SelectItem>
              </SelectContent>
            </Select>

            <Select value={ownerFilter} onValueChange={setOwnerFilter}>
              <SelectTrigger className="w-[130px] h-8 text-sm border-border">
                <SelectValue placeholder="Owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Owners</SelectItem>
                <SelectItem value="Anurag Kumar">Anurag Kumar</SelectItem>
              </SelectContent>
            </Select>

            <button
              onClick={() => window.location.href = 'https://spyne-programs.vercel.app/'}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border text-foreground rounded-md text-xs font-medium hover:bg-muted hover:text-foreground transition-colors h-8"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              All Programs
            </button>

            {(searchQuery || statusFilter !== "all" || priorityFilter !== "all" || ownerFilter !== "all") && (
              <button
                className="px-3 py-1.5 bg-background border border-border rounded-md text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                onClick={() => {
                  setSearchQuery("")
                  setStatusFilter("all")
                  setPriorityFilter("all")
                  setOwnerFilter("all")
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
          <ProgramTable programs={filteredPrograms} />
        </div>
      </div>
    </div>
  )
}
