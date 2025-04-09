"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, UserPlus, UserCheck } from "lucide-react"
import Link from "next/link"
import { searchUsers, addFriend, getUserFriends } from "@/lib/users"

interface User {
  id: number
  name: string
  course: string
  year: string
  skills: string[]
  hobbies: string[]
  interests: string[]
  isFriend: boolean
}

export default function FindCollaboratorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [yearFilter, setYearFilter] = useState<string>("")
  const [skillFilter, setSkillFilter] = useState<string>("")
  const [hobbyFilter, setHobbyFilter] = useState<string>("")
  const [interestFilter, setInterestFilter] = useState<string>("")
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [friends, setFriends] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [addingFriend, setAddingFriend] = useState<number | null>(null)

  // Fetch users and friends on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, friendsData] = await Promise.all([searchUsers(), getUserFriends()])

        // Mark users who are already friends
        const usersWithFriendStatus = usersData.map((user) => ({
          ...user,
          isFriend: friendsData.some((friend) => friend.id === user.id),
        }))

        setUsers(usersWithFriendStatus)
        setFilteredUsers(usersWithFriendStatus)
        setFriends(friendsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Apply filters when any filter changes
  useEffect(() => {
    let result = [...users]

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.skills.some((skill) => skill.toLowerCase().includes(query)) ||
          user.hobbies.some((hobby) => hobby.toLowerCase().includes(query)) ||
          user.interests.some((interest) => interest.toLowerCase().includes(query)),
      )
    }

    // Apply year filter
    if (yearFilter && yearFilter !== "any") {
      result = result.filter((user) => user.year === yearFilter)
    }

    // Apply skill filter
    if (skillFilter && skillFilter !== "any") {
      result = result.filter((user) => user.skills.some((skill) => skill.toLowerCase() === skillFilter.toLowerCase()))
    }

    // Apply hobby filter
    if (hobbyFilter && hobbyFilter !== "any") {
      result = result.filter((user) => user.hobbies.some((hobby) => hobby.toLowerCase() === hobbyFilter.toLowerCase()))
    }

    // Apply interest filter
    if (interestFilter && interestFilter !== "any") {
      result = result.filter((user) =>
        user.interests.some((interest) => interest.toLowerCase() === interestFilter.toLowerCase()),
      )
    }

    setFilteredUsers(result)
  }, [searchQuery, yearFilter, skillFilter, hobbyFilter, interestFilter, users])

  const handleAddFriend = async (userId: number) => {
    setAddingFriend(userId)

    try {
      await addFriend(userId)

      // Update user list to reflect the new friend status
      setUsers(users.map((user) => (user.id === userId ? { ...user, isFriend: true } : user)))

      // Also update filtered users
      setFilteredUsers(filteredUsers.map((user) => (user.id === userId ? { ...user, isFriend: true } : user)))

      // Add to friends list if not already there
      const userToAdd = users.find((user) => user.id === userId)
      if (userToAdd && !friends.some((friend) => friend.id === userId)) {
        setFriends([...friends, { ...userToAdd, isFriend: true }])
      }
    } catch (error) {
      console.error("Error adding friend:", error)
    } finally {
      setAddingFriend(null)
    }
  }

  // Get unique skills, hobbies, and interests for filters
  const allSkills = Array.from(new Set(users.flatMap((user) => user.skills)))
  const allHobbies = Array.from(new Set(users.flatMap((user) => user.hobbies)))
  const allInterests = Array.from(new Set(users.flatMap((user) => user.interests)))
  const studyYears = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"]

  // Render user card
  const renderUserCard = (user: User) => (
    <Card key={user.id} className="overflow-hidden border-blue-200 hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-blue-600 text-white">{user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <Link href={`/dashboard/profile/${user.id}`} className="font-medium hover:underline">
                  {user.name}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {user.course} • {user.year}
                </p>
              </div>
            </div>
            {user.isFriend ? (
              <Button variant="outline" size="sm" className="gap-1 border-green-600 text-green-600" disabled>
                <UserCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Friends</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="gap-1 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={() => handleAddFriend(user.id)}
                disabled={addingFriend === user.id}
              >
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline">{addingFriend === user.id ? "Adding..." : "Add Friend"}</span>
              </Button>
            )}
          </div>

          {/* Skills */}
          {user.skills.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-medium text-muted-foreground mb-1">Skills</p>
              <div className="flex flex-wrap gap-1">
                {user.skills.map((skill, i) => (
                  <Badge key={i} className="bg-blue-600 hover:bg-blue-700 text-white">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies & Interests */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            {user.hobbies.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Hobbies</p>
                <div className="flex flex-wrap gap-1">
                  {user.hobbies.slice(0, 3).map((hobby, i) => (
                    <Badge key={i} className="bg-amber-400 hover:bg-amber-500 text-black">
                      {hobby}
                    </Badge>
                  ))}
                  {user.hobbies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{user.hobbies.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {user.interests.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Interests</p>
                <div className="flex flex-wrap gap-1">
                  {user.interests.slice(0, 3).map((interest, i) => (
                    <Badge key={i} className="bg-red-500 hover:bg-red-600 text-white">
                      {interest}
                    </Badge>
                  ))}
                  {user.interests.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{user.interests.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex border-t">
          <Link
            href={`/dashboard/messages/${user.id}`}
            className="flex-1 py-2 text-center text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
          >
            Message
          </Link>
          <Link
            href={`/dashboard/profile/${user.id}`}
            className="flex-1 py-2 text-center text-sm font-medium border-l text-blue-600 hover:bg-blue-50 transition-colors"
          >
            View Profile
          </Link>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-blue-700">Find Collaborators</h1>
      </div>

      <div className="rounded-lg border p-4 bg-sky-50">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, skill, hobby or interest..."
                className="pl-8 border-blue-200 focus-visible:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="gap-1 border-blue-200"
              onClick={() => {
                setSearchQuery("")
                setYearFilter("")
                setSkillFilter("")
                setHobbyFilter("")
                setInterestFilter("")
              }}
            >
              Clear
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium flex items-center gap-1 mb-1.5">
                <Filter className="h-4 w-4" />
                Study Year
              </label>
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="border-blue-200 focus-visible:ring-blue-500">
                  <SelectValue placeholder="Any year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any year</SelectItem>
                  {studyYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Skill</label>
              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger className="border-blue-200 focus-visible:ring-blue-500">
                  <SelectValue placeholder="Any skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any skill</SelectItem>
                  {allSkills.map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Hobby</label>
              <Select value={hobbyFilter} onValueChange={setHobbyFilter}>
                <SelectTrigger className="border-blue-200 focus-visible:ring-blue-500">
                  <SelectValue placeholder="Any hobby" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any hobby</SelectItem>
                  {allHobbies.map((hobby) => (
                    <SelectItem key={hobby} value={hobby}>
                      {hobby}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Interest</label>
              <Select value={interestFilter} onValueChange={setInterestFilter}>
                <SelectTrigger className="border-blue-200 focus-visible:ring-blue-500">
                  <SelectValue placeholder="Any interest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any interest</SelectItem>
                  {allInterests.map((interest) => (
                    <SelectItem key={interest} value={interest}>
                      {interest}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="friends">My Friends</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-blue-200 mb-4"></div>
                <div className="h-4 w-48 bg-blue-200 rounded mb-2"></div>
                <div className="h-3 w-32 bg-blue-200 rounded"></div>
              </div>
              <p className="mt-4 text-muted-foreground">Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No users found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4 border-blue-200"
                onClick={() => {
                  setSearchQuery("")
                  setYearFilter("")
                  setSkillFilter("")
                  setHobbyFilter("")
                  setInterestFilter("")
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredUsers.map((user) => renderUserCard(user))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="friends">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-blue-200 mb-4"></div>
                <div className="h-4 w-48 bg-blue-200 rounded mb-2"></div>
                <div className="h-3 w-32 bg-blue-200 rounded"></div>
              </div>
              <p className="mt-4 text-muted-foreground">Loading friends...</p>
            </div>
          ) : friends.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">You haven't added any friends yet.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Find and add friends to collaborate on projects together.
              </p>
              <Button
                className="mt-4 bg-blue-600 hover:bg-blue-700"
                onClick={() => document.querySelector('[data-value="all"]')?.click()}
              >
                Find Friends
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {friends.map((user) => renderUserCard(user))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

