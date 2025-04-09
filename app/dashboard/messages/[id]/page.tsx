"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, ArrowLeft, MoreVertical, Paperclip, Flag, AlertTriangle, Info, Users } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { reportUser, reportMessage } from "@/lib/reports"

interface Message {
  id: number
  sender: string
  senderId: number
  content: string
  timestamp: string
  isCurrentUser: boolean
}

export default function ChatPage() {
  const { id } = useParams()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [reportReason, setReportReason] = useState("")
  const [reportType, setReportType] = useState<"user" | "message">("user")
  const [reportedItemId, setReportedItemId] = useState<number | null>(null)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [reportSubmitting, setReportSubmitting] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock data - in a real app, this would be fetched from the server
  const chatInfo = {
    id: Number(id),
    name: id === "1" ? "Web Dev Group" : id === "2" ? "Rahul Sharma" : "AI Project Team",
    members: id === "1" || id === "3" ? 5 : 2,
    isGroup: id === "1" || id === "3",
  }

  // Load initial messages
  useEffect(() => {
    // Mock data - in a real app, this would be fetched from the server
    const initialMessages: Message[] = [
      {
        id: 1,
        sender: "Ankit Verma",
        senderId: 101,
        content: "Hey everyone! When is our next meeting?",
        timestamp: "10:30 AM",
        isCurrentUser: false,
      },
      {
        id: 2,
        sender: "You",
        senderId: 0,
        content: "I think we planned for tomorrow at 4 PM",
        timestamp: "10:32 AM",
        isCurrentUser: true,
      },
      {
        id: 3,
        sender: "Priya Patel",
        senderId: 102,
        content: "Yes, that's correct. We need to finalize the project scope.",
        timestamp: "10:35 AM",
        isCurrentUser: false,
      },
      {
        id: 4,
        sender: "Arjun Singh",
        senderId: 103,
        content: "I've prepared some mockups for the UI. I'll share them during the meeting.",
        timestamp: "10:40 AM",
        isCurrentUser: false,
      },
    ]

    setMessages(initialMessages)
  }, [id])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) return

    const newMessage: Message = {
      id: messages.length + 1,
      sender: "You",
      senderId: 0,
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isCurrentUser: true,
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  const handleReportUser = (userId: number) => {
    setReportType("user")
    setReportedItemId(userId)
    setReportDialogOpen(true)
  }

  const handleReportMessage = (messageId: number) => {
    setReportType("message")
    setReportedItemId(messageId)
    setReportDialogOpen(true)
  }

  const submitReport = async () => {
    if (!reportReason.trim() || !reportedItemId) return

    setReportSubmitting(true)

    try {
      if (reportType === "user") {
        await reportUser(reportedItemId, reportReason)
      } else {
        await reportMessage(reportedItemId, reportReason)
      }

      // Reset and close dialog
      setReportReason("")
      setReportDialogOpen(false)

      // Show success message (in a real app, you'd use a toast)
      alert("Report submitted successfully. Our team will review it.")
    } catch (error) {
      console.error("Error submitting report:", error)
      alert("Failed to submit report. Please try again.")
    } finally {
      setReportSubmitting(false)
    }
  }

  // Function to determine chat bubble color based on sender
  const getChatBubbleClass = (msg: Message) => {
    if (msg.isCurrentUser) {
      return "chat-bubble chat-bubble-user"
    }

    if (chatInfo.isGroup) {
      // Assign different colors based on user ID for group chats
      const colorIndex = msg.senderId % 4
      return `chat-bubble chat-bubble-group-${colorIndex + 1}`
    }

    return "chat-bubble chat-bubble-other"
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <Card className="flex h-full flex-col rounded-none border-x-0 border-t-0 shadow-none">
        <CardHeader className="border-b px-4 py-3 bg-sky-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/dashboard/messages">
                <Button variant="ghost" size="icon" className="md:hidden">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <Avatar>
                <AvatarFallback className="bg-blue-600 text-white">{chatInfo.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">{chatInfo.name}</CardTitle>
                {chatInfo.isGroup && <p className="text-xs text-muted-foreground">{chatInfo.members} members</p>}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/profile/${chatInfo.isGroup ? "" : id}`}>
                    <Info className="mr-2 h-4 w-4" />
                    {chatInfo.isGroup ? "Group Info" : "View Profile"}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {!chatInfo.isGroup && (
                  <DropdownMenuItem onClick={() => handleReportUser(Number(id))}>
                    <Flag className="mr-2 h-4 w-4 text-red-500" />
                    <span className="text-red-500">Report User</span>
                  </DropdownMenuItem>
                )}
                {chatInfo.isGroup && (
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/groups/${id}`}>
                      <Users className="mr-2 h-4 w-4" />
                      View Group
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isCurrentUser ? "justify-end" : "justify-start"}`}>
                <div className={getChatBubbleClass(msg)}>
                  {!msg.isCurrentUser && chatInfo.isGroup && <p className="mb-1 text-xs font-medium">{msg.sender}</p>}
                  <p>{msg.content}</p>
                  <div className="mt-1 flex items-center justify-end gap-2">
                    <p className="text-right text-xs opacity-80">{msg.timestamp}</p>
                    {!msg.isCurrentUser && (
                      <button
                        onClick={() => handleReportMessage(msg.id)}
                        className="opacity-0 hover:opacity-100 transition-opacity"
                        title="Report message"
                      >
                        <Flag className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <div className="border-t p-3 bg-sky-50">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Button type="button" variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border-blue-200 focus-visible:ring-blue-500"
            />
            <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </Card>

      {/* Report Dialog */}
      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-500">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Report {reportType === "user" ? "User" : "Message"}
            </DialogTitle>
            <DialogDescription>
              Please provide details about why you're reporting this {reportType}. Our team will review your report and
              take appropriate action.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Describe the issue..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReportDialogOpen(false)} disabled={reportSubmitting}>
              Cancel
            </Button>
            <Button
              onClick={submitReport}
              disabled={!reportReason.trim() || reportSubmitting}
              className="bg-red-500 hover:bg-red-600"
            >
              {reportSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

