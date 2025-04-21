// app/dashboard/groups/[id]/page.tsx
"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send } from "lucide-react"
import { useState } from "react"

export default function GroupDetailPage() {
  const { id } = useParams()
  const [messages, setMessages] = useState([
    { sender: "Rahul", content: "Hey team! Let's finalize designs." },
    { sender: "You", content: "Working on Figma now!" },
  ])
  const [newMessage, setNewMessage] = useState("")

  const sendMessage = () => {
    if (!newMessage.trim()) return
    setMessages([...messages, { sender: "You", content: newMessage }])
    setNewMessage("")
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Group: {id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`rounded-lg px-4 py-2 w-fit ${
                  msg.sender === "You"
                    ? "ml-auto bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage()
            }}
            className="flex items-center gap-2 pt-4 border-t"
          >
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
