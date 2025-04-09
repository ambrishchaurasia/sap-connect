import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MessageSquare, Users, Search, PlusCircle } from "lucide-react"

export default function DashboardPage() {
  // This would normally be fetched from the server
  const recentChats = [
    { id: 1, name: "Web Dev Group", lastMessage: "When is our next meeting?", time: "2h ago", unread: 3 },
    { id: 2, name: "Rahul Sharma", lastMessage: "I've sent you the design files", time: "5h ago", unread: 0 },
    { id: 3, name: "AI Project Team", lastMessage: "Let's finalize the dataset tomorrow", time: "1d ago", unread: 1 },
  ]

  const suggestedUsers = [
    {
      id: 1,
      name: "Priya Patel",
      course: "B.Tech CSE",
      year: "3rd Year",
      skills: ["UI/UX Design", "Figma", "HTML/CSS"],
    },
    {
      id: 2,
      name: "Arjun Singh",
      course: "B.Tech ECE",
      year: "2nd Year",
      skills: ["Arduino", "IoT", "C++"],
    },
    {
      id: 3,
      name: "Neha Gupta",
      course: "BCA",
      year: "3rd Year",
      skills: ["Python", "Data Analysis", "SQL"],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/find-collaborators">
            <Button variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              Find Collaborators
            </Button>
          </Link>
          <Link href="/dashboard/create-group">
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              New Group
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Recent Chats</CardTitle>
              <CardDescription>Continue your conversations</CardDescription>
            </div>
            <Link href="/dashboard/messages">
              <Button variant="ghost" size="sm" className="gap-1">
                <MessageSquare className="h-4 w-4" />
                All Messages
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentChats.map((chat) => (
                <Link href={`/dashboard/messages/${chat.id}`} key={chat.id}>
                  <div className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{chat.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{chat.name}</div>
                        <div className="text-sm text-muted-foreground">{chat.lastMessage}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                      {chat.unread > 0 && (
                        <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 text-center">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Suggested Collaborators</CardTitle>
              <CardDescription>People you might want to work with</CardDescription>
            </div>
            <Link href="/dashboard/find-collaborators">
              <Button variant="ghost" size="sm" className="gap-1">
                <Users className="h-4 w-4" />
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestedUsers.map((user) => (
                <Link href={`/dashboard/profile/${user.id}`} key={user.id}>
                  <div className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.course} • {user.year}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 max-w-[150px] justify-end">
                      {user.skills.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {user.skills.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{user.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Groups</CardTitle>
          <CardDescription>Project groups you're a part of</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((group) => (
              <Link href={`/dashboard/groups/${group}`} key={group}>
                <div className="rounded-lg border p-4 transition-colors hover:bg-muted">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">
                      {group === 1 && "Web Development Team"}
                      {group === 2 && "AI Research Group"}
                      {group === 3 && "Mobile App Project"}
                    </h3>
                    <Badge>
                      {group === 1 && "Active"}
                      {group === 2 && "Planning"}
                      {group === 3 && "Completed"}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {group === 1 && "Building a portfolio website for the department"}
                    {group === 2 && "Researching NLP applications for student feedback"}
                    {group === 3 && "Developed a campus navigation app"}
                  </p>
                  <div className="mt-4 flex -space-x-2">
                    {[...Array(3 + group)].map((_, i) => (
                      <Avatar key={i} className="border-2 border-background">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {String.fromCharCode(65 + i)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
            <Link href="/dashboard/create-group">
              <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center transition-colors hover:bg-muted">
                <PlusCircle className="mb-2 h-8 w-8 text-muted-foreground" />
                <h3 className="font-semibold">Create New Group</h3>
                <p className="mt-2 text-sm text-muted-foreground">Start a new project group and invite collaborators</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

