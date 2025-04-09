import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, MessageSquare, Briefcase } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <Users className="h-5 w-5" />
            <span>UPES Project Collab</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Find Your Perfect Project Team
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
              Connect with UPES students who have the skills you need for your next project. Discover collaborators,
              form groups, and bring your ideas to life.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t py-16 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Features</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Find Collaborators</h3>
                <p className="text-muted-foreground">
                  Search for students based on skills, interests, and study year to build your dream team.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <MessageSquare className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Real-time Chat</h3>
                <p className="text-muted-foreground">
                  Communicate with potential team members and discuss project details instantly.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <Briefcase className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Project Groups</h3>
                <p className="text-muted-foreground">
                  Create and manage project groups to organize your team and track progress.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} UPES Project Collab. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">Made for UPES students</p>
        </div>
      </footer>
    </div>
  )
}

