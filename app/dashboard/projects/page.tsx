"use client"

import Link from "next/link"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FolderKanban } from "lucide-react"

export default function ProjectsPage() {
  const [projects] = useState([
    { id: "1", title: "Campus Connect App", description: "A mobile app for campus clubs & events" },
    { id: "2", title: "AI Resume Screener", description: "Smart resume parser using NLP" },
    { id: "3", title: "E-learning Dashboard", description: "Interactive platform for student learning" },
  ])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FolderKanban className="h-6 w-6 text-violet-600" />
          Projects
        </h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
            <Card className="hover:shadow-md transition cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
