// app/dashboard/groups/page.tsx
"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Users } from "lucide-react"

const mockGroups = [
  { id: "1", name: "Web Dev Group", description: "Frontend & backend dev discussions" },
  { id: "2", name: "AI Project Team", description: "Collaborating on the ML project" },
  { id: "3", name: "Hackathon Team", description: "Weekend hackathon prep" },
]

export default function GroupsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users className="h-6 w-6 text-blue-600" />
          Groups
        </h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Group
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockGroups.map((group) => (
          <Link key={group.id} href={`/dashboard/groups/${group.id}`}>
            <Card className="hover:shadow-md transition cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">{group.name}</CardTitle>
                <CardDescription>{group.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
