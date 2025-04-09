"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, X, Plus } from "lucide-react"
import { createUserProfile } from "@/lib/profile"
import { Badge } from "@/components/ui/badge"

const studyYears = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"]

export default function CreateProfilePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    studyYear: "",
    course: "",
    bio: "",
  })

  const [hobbies, setHobbies] = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>([])

  const [newHobby, setNewHobby] = useState("")
  const [newInterest, setNewInterest] = useState("")
  const [newSkill, setNewSkill] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addItem = (type: "hobby" | "interest" | "skill", value: string) => {
    if (!value.trim()) return

    if (type === "hobby") {
      if (!hobbies.includes(value.trim())) {
        setHobbies([...hobbies, value.trim()])
      }
      setNewHobby("")
    } else if (type === "interest") {
      if (!interests.includes(value.trim())) {
        setInterests([...interests, value.trim()])
      }
      setNewInterest("")
    } else if (type === "skill") {
      if (!skills.includes(value.trim())) {
        setSkills([...skills, value.trim()])
      }
      setNewSkill("")
    }
  }

  const removeItem = (type: "hobby" | "interest" | "skill", value: string) => {
    if (type === "hobby") {
      setHobbies(hobbies.filter((item) => item !== value))
    } else if (type === "interest") {
      setInterests(interests.filter((item) => item !== value))
    } else if (type === "skill") {
      setSkills(skills.filter((item) => item !== value))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validate required fields
      if (!formData.fullName || !formData.studyYear || !formData.course) {
        throw new Error("Please fill in all required fields")
      }

      const profileData = {
        ...formData,
        hobbies: hobbies.join(","),
        interests: interests.join(","),
        skills: skills.join(","),
      }

      const success = await createUserProfile(profileData)

      if (success) {
        router.push("/dashboard")
      } else {
        setError("Failed to create profile. Please try again.")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while creating your profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-3xl py-10">
      <Card className="border-blue-200 shadow-lg">
        <CardHeader className="space-y-1 border-b">
          <CardTitle className="text-2xl text-blue-700">Create Your Profile</CardTitle>
          <CardDescription>Tell us about yourself so others can find you for project collaborations</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="border-blue-200 focus-visible:ring-blue-500"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="studyYear">Study Year *</Label>
                <Select value={formData.studyYear} onValueChange={(value) => handleSelectChange("studyYear", value)}>
                  <SelectTrigger className="border-blue-200 focus-visible:ring-blue-500">
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                  <SelectContent>
                    {studyYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="course">Course/Program *</Label>
                <Input
                  id="course"
                  name="course"
                  placeholder="e.g., B.Tech Computer Science"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="border-blue-200 focus-visible:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill, index) => (
                  <Badge key={index} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeItem("skill", skill)}
                      className="ml-1 rounded-full hover:bg-blue-800/50 p-0.5"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {skill}</span>
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  id="newSkill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill (e.g., Python, React)"
                  className="border-blue-200 focus-visible:ring-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addItem("skill", newSkill)
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => addItem("skill", newSkill)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Press Enter or click the + button to add a skill</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hobbies">Hobbies</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {hobbies.map((hobby, index) => (
                    <Badge key={index} className="bg-amber-400 hover:bg-amber-500 text-black flex items-center gap-1">
                      {hobby}
                      <button
                        type="button"
                        onClick={() => removeItem("hobby", hobby)}
                        className="ml-1 rounded-full hover:bg-amber-600/50 p-0.5"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {hobby}</span>
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="newHobby"
                    value={newHobby}
                    onChange={(e) => setNewHobby(e.target.value)}
                    placeholder="Add a hobby (e.g., Photography)"
                    className="border-blue-200 focus-visible:ring-blue-500"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addItem("hobby", newHobby)
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => addItem("hobby", newHobby)}
                    className="bg-amber-400 hover:bg-amber-500 text-black"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">Interests</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {interests.map((interest, index) => (
                    <Badge key={index} className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-1">
                      {interest}
                      <button
                        type="button"
                        onClick={() => removeItem("interest", interest)}
                        className="ml-1 rounded-full hover:bg-red-700/50 p-0.5"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {interest}</span>
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="newInterest"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    placeholder="Add an interest (e.g., AI)"
                    className="border-blue-200 focus-visible:ring-blue-500"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addItem("interest", newInterest)
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => addItem("interest", newInterest)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell others about yourself, your goals, and what kind of projects you're interested in..."
                value={formData.bio}
                onChange={handleChange}
                className="min-h-[120px] border-blue-200 focus-visible:ring-blue-500"
              />
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? "Creating Profile..." : "Create Profile"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

