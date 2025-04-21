"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users } from "lucide-react"

const mockConversations = [
  { id: 1, name: "Web Dev Group", isGroup: true },
  { id: 2, name: "Rahul Sharma", isGroup: false },
  { id: 3, name: "AI Project Team", isGroup: true },
]

export default function MessagesPage() {
  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            Your Conversations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockConversations.map((chat) => (
            <Link
              key={chat.id}
              href={`/dashboard/messages/${chat.id}`}
              className="flex items-center gap-4 hover:bg-blue-50 p-3 rounded-lg transition"
            >
              <Avatar>
                <AvatarFallback>{chat.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{chat.name}</p>
                <p className="text-sm text-muted-foreground">
                  {chat.isGroup ? "Group chat" : "Direct message"}
                </p>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
