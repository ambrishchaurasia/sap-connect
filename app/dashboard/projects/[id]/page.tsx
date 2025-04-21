"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

const mockProjects = {
  "1": {
    title: "Campus Connect App",
    description: "A mobile app for campus clubs & events",
    updates: [
      { sender: "Riya", content: "Designed the home screen." },
      { sender: "You", content: "Connected Firebase auth." },
    ],
  },
  "2": {
    title: "AI Resume Screener",
    description: "Smart resume parser using NLP",
    updates: [
      { sender: "You", content: "Added GPT-4 scoring logic." },
      { sender: "Ankit", content: "Wrote backend job matcher." },
    ],
  },
  "3": {
    title: "E-learning Dashboard",
    description: "Interactive platform for student learning",
    updates: [
      { sender: "Neha", content: "Added quiz component." },
      { sender: "You", content: "Improved animations on lesson player." },
    ],
  },
}

export default function ProjectDetailPage() {
  const { id } = useParams()
  const project = mockProjects[id as keyof typeof mockProjects]
  const [updates, setUpdates] = useState(project?.updates || [])
  const [newUpdate, setNewUpdate] = useState("")

  const handleSend = () => {
    if (!newUpdate.trim()) return
    setUpdates([...updates, { sender: "You", content: newUpdate }])
    setNewUpdate("")
  }

  if (!project) return <div className="p-6 text-red-500">Project not found</div>

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <p className="text-muted-foreground">{project.description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {updates.map((u, i) => (
              <div
                key={i}
                className={`w-fit px-3 py-2 rounded-lg ${
                  u.sender === "You"
                    ? "ml-auto bg-violet-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{u.content}</p>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex items-center gap-2 pt-4 border-t"
          >
            <Input
              value={newUpdate}
              onChange={(e) => setNewUpdate(e.target.value)}
              placeholder="Post an update..."
            />
            <Button type="submit">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
