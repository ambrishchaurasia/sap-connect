"use client"
import React from "react"

import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function EditProfilePage() {
  const router = useRouter()

  // Mock form state
  const [form, setForm] = React.useState({
    name: "Tanvi Singhal",
    course: "B.Des – User Experience Design",
    year: "2nd Year",
    about: "I'm a passionate UI/UX designer who loves solving problems with beautiful interfaces.",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updated profile data:", form)
    // TODO: send to backend or save in DB
    router.push("/dashboard/profile")
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input name="name" value={form.name} onChange={handleChange} required />
            </div>

            <div>
              <label className="text-sm font-medium">Course</label>
              <Input name="course" value={form.course} onChange={handleChange} required />
            </div>

            <div>
              <label className="text-sm font-medium">Year</label>
              <Input name="year" value={form.year} onChange={handleChange} required />
            </div>

            <div>
              <label className="text-sm font-medium">About Me</label>
              <Textarea
                name="about"
                value={form.about}
                onChange={handleChange}
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => router.push("/dashboard/profile")}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
