import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Calendar,
  Home,
  Inbox,
  Layers,
  Search,
  Settings,
  TrendingUp,
  UserCircle,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Workspace",
    url: "/dashboard",
    icon: Layers,
  },
  {
    title: "AI Tools",
    url: "/ai-tools",
    icon: Inbox,
  },
  {
    title: "My History",
    url: "/my-history",
    icon: Calendar,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: Wallet,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: UserCircle,
  },
];

export function AppSidebar() {
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-2">
          <div className="flex flex-col items-center text-blue-600 gap-2">
            <TrendingUp className="size-14" />
            <h1 className="text-xl font-bold text-center">
              Next AI Career Agent
            </h1>
          </div>
          <h2 className="text-sm text-gray-400 text-center mt-3">
            Build Awesome Skills
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mt-2">
              {items.map((item, index) => (
                // <SidebarMenuItem key={item.title} className='p-2'>
                //     <SidebarMenuButton asChild className=''>
                <a
                  href={item.url}
                  key={index}
                  className={`p-2 text-lg flex gap-2 items-center
                                 hover:bg-gray-100 rounded-lg ${
                                   path.includes(item.url) && "bg-gray-200"
                                 }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </a>
                //     </SidebarMenuButton>
                // </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <h2 className="p-2 text-gray-400 text-sm">
          @2025 Next AI Career Agent. All rights reserved
        </h2>
      </SidebarFooter>
    </Sidebar>
  );
}
