"use client"

import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Pencil, User, GraduationCap, Mail, Sparkles } from "lucide-react"

const mockProfile = {
  name: "Tanvi Singhal",
  email: "tanvi.singhal@stu.upes.ac.in",
  course: "B.Des – User Experience Design",
  year: "2nd Year",
  about:
    "I'm a passionate UI/UX designer who loves solving problems with beautiful interfaces. Currently exploring user research and micro-interactions.",
  skills: ["Figma", "Photoshop", "Illustrator", "UI/UX", "Design Systems"],
  hobbies: ["Sketching", "Yoga", "Fashion"],
  interests: ["UX Research", "Brand Identity", "Micro Animations"],
  links: {
    linkedin: "https://linkedin.com/in/tanvisinghal",
    portfolio: "https://behance.net/tanvisinghal",
  },
  stats: {
    projects: 6,
    friends: 12,
    messages: 28,
  },
}

export default function ProfilePage() {
  const router = useRouter()

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Top Section */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-6">
          <Avatar className="h-20 w-20 text-2xl">
            <AvatarFallback className="bg-blue-600 text-white">
              {mockProfile.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <CardTitle className="text-2xl">{mockProfile.name}</CardTitle>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              {mockProfile.course} • {mockProfile.year}
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {mockProfile.email}
            </p>
          </div>
          <Button variant="outline" onClick={() => router.push("/dashboard/profile/edit")}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </CardHeader>
      </Card>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            About Me
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{mockProfile.about}</p>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="py-6">
            <p className="text-sm text-muted-foreground">Projects</p>
            <p className="text-2xl font-bold">{mockProfile.stats.projects}</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="py-6">
            <p className="text-sm text-muted-foreground">Friends</p>
            <p className="text-2xl font-bold">{mockProfile.stats.friends}</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="py-6">
            <p className="text-sm text-muted-foreground">Messages</p>
            <p className="text-2xl font-bold">{mockProfile.stats.messages}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Highlights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-semibold mb-1">Skills</p>
            <div className="flex flex-wrap gap-2">
              {mockProfile.skills.map((s) => (
                <Badge key={s} variant="default">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold mb-1">Hobbies</p>
            <div className="flex flex-wrap gap-2">
              {mockProfile.hobbies.map((h) => (
                <Badge key={h} variant="outline">
                  {h}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold mb-1">Interests</p>
            <div className="flex flex-wrap gap-2">
              {mockProfile.interests.map((i) => (
                <Badge key={i} className="bg-pink-100 text-pink-800">
                  {i}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <a
            href={mockProfile.links.linkedin}
            target="_blank"
            className="text-blue-600 hover:underline text-sm"
          >
            LinkedIn ↗
          </a>
          <a
            href={mockProfile.links.portfolio}
            target="_blank"
            className="text-blue-600 hover:underline text-sm"
          >
            Portfolio ↗
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
