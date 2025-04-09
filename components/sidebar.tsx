"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, MessageSquare, FolderKanban, UserCircle, Settings, Search } from "lucide-react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ReactNode
  }[]
}

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  const items = [
    {
      href: "/dashboard",
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      href: "/dashboard/find-collaborators",
      title: "Find Collaborators",
      icon: <Search className="h-5 w-5" />,
    },
    {
      href: "/dashboard/messages",
      title: "Messages",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      href: "/dashboard/groups",
      title: "My Groups",
      icon: <Users className="h-5 w-5" />,
    },
    {
      href: "/dashboard/projects",
      title: "Projects",
      icon: <FolderKanban className="h-5 w-5" />,
    },
    {
      href: "/dashboard/profile",
      title: "My Profile",
      icon: <UserCircle className="h-5 w-5" />,
    },
    {
      href: "/dashboard/settings",
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className={cn("pb-12 border-r hidden md:block", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Navigation</h2>
          <SidebarNav items={items} />
        </div>
      </div>
    </div>
  )
}

function SidebarNav({ items, className }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("space-y-1", className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-muted",
            pathname === item.href || pathname?.startsWith(`${item.href}/`) ? "bg-muted" : "transparent",
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

