// This is a mock implementation for demonstration purposes
// In a real application, you would use a proper database like Supabase or MongoDB

interface User {
  id: number
  name: string
  course: string
  year: string
  skills: string[]
  hobbies: string[]
  interests: string[]
  isFriend?: boolean
}

// Mock user data
const mockUsers: User[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    course: "B.Tech CSE",
    year: "3rd Year",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    hobbies: ["Gaming", "Reading", "Hiking"],
    interests: ["Web Development", "AI", "Cloud Computing"],
  },
  {
    id: 2,
    name: "Priya Patel",
    course: "B.Tech CSE",
    year: "3rd Year",
    skills: ["UI/UX Design", "Figma", "HTML/CSS", "JavaScript"],
    hobbies: ["Painting", "Photography", "Cooking"],
    interests: ["UI Design", "Mobile Apps", "Graphic Design"],
  },
  {
    id: 3,
    name: "Arjun Singh",
    course: "B.Tech ECE",
    year: "2nd Year",
    skills: ["Arduino", "IoT", "C++", "PCB Design"],
    hobbies: ["Robotics", "Chess", "Swimming"],
    interests: ["Embedded Systems", "Robotics", "IoT"],
  },
  {
    id: 4,
    name: "Neha Gupta",
    course: "BCA",
    year: "3rd Year",
    skills: ["Python", "Data Analysis", "SQL", "Tableau"],
    hobbies: ["Dancing", "Traveling", "Music"],
    interests: ["Data Science", "Machine Learning", "Business Intelligence"],
  },
  {
    id: 5,
    name: "Vikram Mehta",
    course: "B.Tech IT",
    year: "4th Year",
    skills: ["Java", "Spring Boot", "Microservices", "Docker"],
    hobbies: ["Cricket", "Blogging", "Cycling"],
    interests: ["Backend Development", "DevOps", "System Design"],
  },
  {
    id: 6,
    name: "Ananya Reddy",
    course: "B.Des",
    year: "2nd Year",
    skills: ["Adobe Photoshop", "Illustrator", "InDesign", "Sketch"],
    hobbies: ["Sketching", "Fashion", "Yoga"],
    interests: ["Graphic Design", "Brand Identity", "UX Research"],
  },
  {
    id: 7,
    name: "Karan Malhotra",
    course: "B.Tech CSE",
    year: "1st Year",
    skills: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    hobbies: ["Football", "Video Games", "Movies"],
    interests: ["Frontend Development", "Game Development", "UI Design"],
  },
  {
    id: 8,
    name: "Shreya Verma",
    course: "B.Tech AI & ML",
    year: "3rd Year",
    skills: ["Python", "TensorFlow", "PyTorch", "Data Visualization"],
    hobbies: ["Reading", "Chess", "Podcasts"],
    interests: ["Machine Learning", "Computer Vision", "NLP"],
  },
  {
    id: 9,
    name: "Rohan Kapoor",
    course: "B.Tech Mechanical",
    year: "4th Year",
    skills: ["AutoCAD", "SolidWorks", "MATLAB", "3D Printing"],
    hobbies: ["Basketball", "Photography", "Trekking"],
    interests: ["CAD Design", "Robotics", "Sustainable Engineering"],
  },
]

// Mock friends data
let userFriends: number[] = [2, 5] // IDs of friends

export async function searchUsers(query?: string): Promise<User[]> {
  // In a real app, this would call your database API
  console.log("Searching users with query:", query)

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (!query) return mockUsers

  const lowercaseQuery = query.toLowerCase()
  return mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(lowercaseQuery) ||
      user.skills.some((skill) => skill.toLowerCase().includes(lowercaseQuery)) ||
      user.hobbies.some((hobby) => hobby.toLowerCase().includes(lowercaseQuery)) ||
      user.interests.some((interest) => interest.toLowerCase().includes(lowercaseQuery)),
  )
}

export async function getUserById(userId: number): Promise<User | null> {
  // In a real app, this would fetch from your database
  console.log("Getting user by ID:", userId)

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const user = mockUsers.find((user) => user.id === userId)
  if (!user) return null

  return {
    ...user,
    isFriend: userFriends.includes(userId),
  }
}

export async function getUserFriends(): Promise<User[]> {
  // In a real app, this would fetch from your database
  console.log("Getting user friends")

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return mockUsers.filter((user) => userFriends.includes(user.id)).map((user) => ({ ...user, isFriend: true }))
}

export async function addFriend(userId: number): Promise<boolean> {
  // In a real app, this would update your database
  console.log("Adding friend:", userId)

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1200))

  // Check if user exists
  const userExists = mockUsers.some((user) => user.id === userId)
  if (!userExists) return false

  // Check if already a friend
  if (userFriends.includes(userId)) return true

  // Add to friends
  userFriends.push(userId)

  return true
}

export async function removeFriend(userId: number): Promise<boolean> {
  // In a real app, this would update your database
  console.log("Removing friend:", userId)

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Remove from friends
  userFriends = userFriends.filter((id) => id !== userId)

  return true
}

