"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

interface Program {
  id: string
  goals: string
  tasks: string
  team: string
  priority: string
  owner: string
  status: string
  eta: string
  completionDate: string
  links: string
  notes: string
}

interface ProgramTableProps {
  programs: Program[]
}

const statusColors: Record<string, string> = {
  "In Progress": "bg-[var(--status-blue)] text-white",
  "To be picked": "bg-[var(--status-orange)] text-white",
  Ongoing: "bg-[var(--status-purple)] text-white",
  Completed: "bg-[var(--status-green)] text-white",
}

const priorityColors: Record<string, string> = {
  P0: "bg-[var(--status-red)] text-white",
  Critical: "bg-[var(--status-red)] text-white",
  High: "bg-[var(--status-orange)] text-white",
  Medium: "bg-[var(--status-yellow)] text-white",
  Low: "bg-muted text-muted-foreground",
}

export function ProgramTable({ programs }: ProgramTableProps) {
  const [columnWidths, setColumnWidths] = useState({
    goals: 200,
    tasks: 180,
    team: 140,
    priority: 100,
    owner: 140,
    status: 120,
    eta: 110,
    completionDate: 140,
    links: 100,
    notes: 250,
  })

  const [resizing, setResizing] = useState<string | null>(null)
  const startXRef = useRef(0)
  const startWidthRef = useRef(0)

  const handleMouseDown = (column: string, e: React.MouseEvent) => {
    setResizing(column)
    startXRef.current = e.clientX
    startWidthRef.current = columnWidths[column as keyof typeof columnWidths]
    e.preventDefault()
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizing) return

      const diff = e.clientX - startXRef.current
      const newWidth = Math.max(80, startWidthRef.current + diff)

      setColumnWidths((prev) => ({
        ...prev,
        [resizing]: newWidth,
      }))
    }

    const handleMouseUp = () => {
      setResizing(null)
    }

    if (resizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [resizing])

  const formatDate = (dateString: string) => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="overflow-auto max-h-[calc(100vh-140px)]">
      <table className="w-full border-collapse">
        <thead className="sticky top-0 z-10 bg-muted/50 backdrop-blur-sm">
          <tr className="border-b border-border">
            <th
              className="relative px-2.5 py-2 text-left text-xs font-semibold text-foreground border-r border-border/40"
              style={{ width: columnWidths.goals }}
            >
              Goals
              <div
                className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/30"
                onMouseDown={(e) => handleMouseDown("goals", e)}
              />
            </th>
            <th
              className="relative px-2.5 py-2 text-left text-xs font-semibold text-foreground border-r border-border/40"
              style={{ width: columnWidths.tasks }}
            >
              Tasks
              <div
                className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/30"
                onMouseDown={(e) => handleMouseDown("tasks", e)}
              />
            </th>
            <th
              className="relative px-2.5 py-2 text-left text-xs font-semibold text-foreground border-r border-border/40"
              style={{ width: columnWidths.team }}
            >
              Team
              <div
                className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/30"
                onMouseDown={(e) => handleMouseDown("team", e)}
              />
            </th>
            <th
              className="relative px-2.5 py-2 text-left text-xs font-semibold text-foreground border-r border-border/40"
              style={{ width: columnWidths.priority }}
            >
              Priority
              <div
                className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/30"
                onMouseDown={(e) => handleMouseDown("priority", e)}
              />
            </th>
            <th
              className="relative px-2.5 py-2 text-left text-xs font-semibold text-foreground border-r border-border/40"
              style={{ width: columnWidths.owner }}
            >
              Owner
              <div
                className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/30"
                onMouseDown={(e) => handleMouseDown("owner", e)}
              />
            </th>
            <th
              className="relative px-2.5 py-2 text-left text-xs font-semibold text-foreground border-r border-border/40"
              style={{ width: columnWidths.status }}
            >
              Status
              <div
                className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/30"
                onMouseDown={(e) => handleMouseDown("status", e)}
              />
            </th>
            <th
              className="relative px-2.5 py-2 text-left text-xs font-semibold text-foreground border-r border-border/40"
              style={{ width: columnWidths.eta }}
            >
              ETA
              <div
                className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/30"
                onMouseDown={(e) => handleMouseDown("eta", e)}
              />
            </th>
            <th
              className="relative px-2.5 py-2 text-left text-xs font-semibold text-foreground border-r border-border/40"
              style={{ width: columnWidths.completionDate }}
            >
              Completion Date
              <div
                className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/30"
                onMouseDown={(e) => handleMouseDown("completionDate", e)}
              />
            </th>
            <th
              className="relative px-2.5 py-2 text-left text-xs font-semibold text-foreground border-r border-border/40"
              style={{ width: columnWidths.links }}
            >
              Links
              <div
                className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/30"
                onMouseDown={(e) => handleMouseDown("links", e)}
              />
            </th>
            <th
              className="relative px-2.5 py-2 text-left text-xs font-semibold text-foreground"
              style={{ width: columnWidths.notes }}
            >
              Notes
              <div
                className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/30"
                onMouseDown={(e) => handleMouseDown("notes", e)}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program, index) => (
            <tr
              key={program.id}
              className={`border-b border-border transition-colors hover:bg-muted/30 ${
                index % 2 === 0 ? "bg-card" : "bg-muted/10"
              }`}
            >
              <td
                className="px-2.5 py-2 text-xs font-medium text-foreground border-r border-border/40"
                style={{ width: columnWidths.goals }}
              >
                <div className="line-clamp-2">{program.goals}</div>
              </td>
              <td
                className="px-2.5 py-2 text-xs text-muted-foreground border-r border-border/40"
                style={{ width: columnWidths.tasks }}
              >
                <div className="line-clamp-2">{program.tasks}</div>
              </td>
              <td
                className="px-2.5 py-2 text-xs text-foreground border-r border-border/40"
                style={{ width: columnWidths.team }}
              >
                {program.team}
              </td>
              <td className="px-2.5 py-2 border-r border-border/40" style={{ width: columnWidths.priority }}>
                <Badge
                  variant="secondary"
                  className={`${priorityColors[program.priority]} border-0 text-xs font-medium`}
                >
                  {program.priority}
                </Badge>
              </td>
              <td
                className="px-2.5 py-2 text-xs text-foreground border-r border-border/40"
                style={{ width: columnWidths.owner }}
              >
                {program.owner}
              </td>
              <td className="px-2.5 py-2 border-r border-border/40" style={{ width: columnWidths.status }}>
                <Badge variant="secondary" className={`${statusColors[program.status]} border-0 text-xs font-medium`}>
                  {program.status}
                </Badge>
              </td>
              <td
                className="px-2.5 py-2 text-xs text-muted-foreground border-r border-border/40"
                style={{ width: columnWidths.eta }}
              >
                {formatDate(program.eta)}
              </td>
              <td
                className="px-2.5 py-2 text-xs text-muted-foreground border-r border-border/40"
                style={{ width: columnWidths.completionDate }}
              >
                {formatDate(program.completionDate)}
              </td>
              <td className="px-2.5 py-2 border-r border-border/40" style={{ width: columnWidths.links }}>
                {program.links && (
                  <a
                    href={program.links}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </td>
              <td className="px-2.5 py-2 text-xs text-muted-foreground" style={{ width: columnWidths.notes }}>
                <div className="line-clamp-2">{program.notes}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
