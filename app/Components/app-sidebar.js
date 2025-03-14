"use client";

import React, { useState } from "react";
import {
  Home,
  ChartNoAxesColumn,
  SquareCheckBig,
  Flag,
  Users,
  LifeBuoy,
  Settings,
  Layers,
  Search,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
} from "@/components/ui/sidebar";

// Menu items for sidebar.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "#",
    icon: ChartNoAxesColumn,
    barge: 10,
  },
  {
    title: "Project",
    url: "#",
    icon: Layers,
  },
  {
    title: "Tasks",
    url: "#",
    icon: SquareCheckBig,
  },
  {
    title: "Reporting",
    url: "#",
    icon: Flag,
  },
  {
    title: "Users",
    url: "#",
    icon: Users,
  },
  {
    title: "Support",
    url: "#",
    icon: LifeBuoy,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    active: true,
  },
];

export function AppSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLogoutDropdownOpen, setIsLogoutDropdownOpen] = useState(false);

  return (
    <SidebarProvider>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center gap-3">
          <Image
            src="/Logomark.png"
            alt="Logo"
            width={40}
            height={40}
            unoptimized
            priority
          />
          <h1 className="text-xl font-bold">Untitled UI</h1>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle Sidebar"
        >
          {isMobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
      <div className="hidden lg:block">
        <Sidebar
          collapsible="none"
          className="w-[16rem] h-auto bg-white shadow-md"
        >
          <SidebarHeader className="flex gap-5 item-start px-5">
            <SidebarGroupLabel>
              <Image
                src="/Logomark.png"
                alt="Logo"
                width={40}
                height={40}
                unoptimized
                priority
              />
              <h1 className="text-xl font-bold">Untitled UI</h1>
            </SidebarGroupLabel>
            <div className="">
              <input
                placeholder="Olivia Rhye"
                className="relative py-2 px-5 bg-white border border-gray-700 ml-2"
              ></input>
              <Search className="absolute w-4 h-4 top-[4.5rem] ml-3" />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="px-5">
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a
                          href={item.url}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                            item.active
                              ? "bg-gray-100 text-[#344054] font-bold"
                              : "hover:bg-gray-100 text-[#344054]"
                          }`}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                      {item.barge && (
                        <SidebarMenuBadge>{item.barge}</SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
                <div className="flex flex-col gap-2 items-start mt-6 bg-[#F9FAFB] rounded-md py-3 px-5">
                  <h1 className="font-bold">New features available!</h1>
                  <p>
                    Check out the new dashboard view. Pages now load faster.
                  </p>
                  <Image
                    src="/avatars/avatar6.png"
                    alt="Logo"
                    width={500}
                    height={500}
                    unoptimized
                    priority
                  />
                  <p>Dismiss What&apos;s New?</p>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <hr className="mt-5" />
          <SidebarFooter className="relative flex flex-row gap-2 py-5 px-5">
            <Image
              src="/avatars/avatar1.png"
              alt="User Avatar"
              width={40}
              height={40}
              unoptimized
              priority
            />
            <div className="flex flex-col">
              <h2 className="font-bold text-md">Olivia Rhye</h2>
              <p className="text-sm">olivia@untitledui.com</p>
            </div>

            <button
              onClick={() => setIsLogoutDropdownOpen(!isLogoutDropdownOpen)}
              aria-label="Logout"
              className="relative"
            >
              <LogOut className="w-5 h-5 cursor-pointer" />
            </button>

            {isLogoutDropdownOpen && (
              <div className="absolute bottom-12 right-0 bg-white shadow-lg p-3 rounded-md w-48">
                <p className="text-sm text-gray-600">
                  Are you sure you want to log out?
                </p>
                <button
                  className="mt-2 w-full bg-red-500 text-white py-1 rounded-md hover:bg-red-600"
                  onClick={() => {
                    console.log("User logged out");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </SidebarFooter>
        </Sidebar>
      </div>

      {/* Mobile Sidebar (overlay) */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white shadow-md">
          <Sidebar collapsible="none" className="w-[16rem] bg-white shadow-md">
            <SidebarHeader className="flex flex-row items-center justify-between px-5 py-4">
              <Image
                src="/Logomark.png"
                alt="Logo"
                width={40}
                height={40}
                unoptimized
                priority
              />
              <h1 className="text-xl font-bold">Untitled UI</h1>

              <button
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close Sidebar"
              >
                <X className="w-6 h-6" />
              </button>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu className="px-5">
                    {items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a
                            href={item.url}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                              item.active
                                ? "bg-gray-100 text-[#344054] font-bold"
                                : "hover:bg-gray-100 text-[#344054]"
                            }`}
                          >
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                        {item.barge && (
                          <SidebarMenuBadge>{item.barge}</SidebarMenuBadge>
                        )}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                  <div className="flex flex-col gap-2 items-start mt-6 bg-[#F9FAFB] rounded-md py-3 px-5">
                    <h1 className="font-bold">New features available!</h1>
                    <p>
                      Check out the new dashboard view. Pages now load faster.
                    </p>
                    <Image
                      src="/avatars/avatar6.png"
                      alt="Dashboard preview"
                      width={500}
                      height={500}
                      unoptimized
                      priority
                    />
                    <p>Dismiss What&apos;s New?</p>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <hr className="mt-5" />
            <SidebarFooter className="relative flex flex-row gap-2 py-5 px-5">
              <Image
                src="/avatars/avatar1.png"
                alt="User Avatar"
                width={40}
                height={40}
                unoptimized
                priority
              />
              <div className="flex flex-col">
                <h2 className="font-bold text-md">Olivia Rhye</h2>
                <p className="text-sm">olivia@untitledui.com</p>
              </div>

              <button
                onClick={() => setIsLogoutDropdownOpen(!isLogoutDropdownOpen)}
                aria-label="Logout"
                className="relative"
              >
                <LogOut className="w-5 h-5 cursor-pointer" />
              </button>

              {isLogoutDropdownOpen && (
                <div className="absolute bottom-12 right-0 bg-white shadow-lg p-3 rounded-md w-48">
                  <p className="text-sm text-gray-600">
                    Are you sure you want to log out?
                  </p>
                  <button
                    className="mt-2 w-full bg-red-500 text-white py-1 rounded-md hover:bg-red-600"
                    onClick={() => {
                      console.log("User logged out");
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </SidebarFooter>
          </Sidebar>
        </div>
      )}
    </SidebarProvider>
  );
}
