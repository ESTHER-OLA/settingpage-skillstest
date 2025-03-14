// app/api/roles/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const roles = [
      {
        id: 1,
        name: "Superadmin",
        type: "DEFAULT",
        dateCreated: "Jan 1, 2023",
        status: "Active",
        roleUsers: [
          { id: 1, name: "User One", avatar: "/avatars/avatar1.png" },
          { id: 2, name: "User Two", avatar: "/avatars/avatar2.png" },
          { id: 3, name: "User Three", avatar: "/avatars/avatar3.png" },
          { id: 4, name: "User Four", avatar: "/avatars/avatar4.png" },
          { id: 5, name: "User Five", avatar: "/avatars/avatar5.png" },
          { id: 6, name: "User Six", avatar: "/avatars/avatar6.png" },
          { id: 7, name: "User Six", avatar: "/avatars/avatar6.png" },
        ],
      },
      {
        id: 2,
        name: "Merchantadmin",
        type: "DEFAULT",
        dateCreated: "Feb 1, 2023",
        status: "Active",
        roleUsers: [
          { id: 8, name: "User One", avatar: "/avatars/avatar1.png" },
          { id: 9, name: "User Two", avatar: "/avatars/avatar2.png" },
          { id: 10, name: "User Three", avatar: "/avatars/avatar3.png" },
          { id: 11, name: "User Four", avatar: "/avatars/avatar4.png" },
          { id: 12, name: "User Five", avatar: "/avatars/avatar5.png" },
          { id: 13, name: "User Six", avatar: "/avatars/avatar6.png" },
        ],
      },
      {
        id: 3,
        name: "supportadmin",
        type: "DEFAULT",
        dateCreated: "Mar 1, 2023",
        status: "Active",
        roleUsers: [
          { id: 14, name: "User One", avatar: "/avatars/avatar1.png" },
          { id: 15, name: "User Two", avatar: "/avatars/avatar2.png" },
          { id: 16, name: "User Three", avatar: "/avatars/avatar3.png" },
          { id: 17, name: "User Four", avatar: "/avatars/avatar4.png" },
          { id: 18, name: "User Five", avatar: "/avatars/avatar5.png" },
        ],
      },
      {
        id: 4,
        name: "sales personnel",
        type: "CUSTOM",
        dateCreated: "Apr 1, 2023",
        status: "Active",
        roleUsers: [
          { id: 19, name: "User One", avatar: "/avatars/avatar1.png" },
          { id: 20, name: "User Two", avatar: "/avatars/avatar2.png" },
          { id: 21, name: "User Three", avatar: "/avatars/avatar3.png" },
        ],
      },
      {
        id: 5,
        name: "Deputy sales personnel",
        type: "CUSTOM",
        dateCreated: "Mar 1, 2023",
        status: "In Active",
        roleUsers: [
          { id: 1, name: "User One", avatar: "/avatars/avatar1.png" },
          { id: 22, name: "User Two", avatar: "/avatars/avatar2.png" },
          { id: 23, name: "User Three", avatar: "/avatars/avatar3.png" },
          { id: 24, name: "User Four", avatar: "/avatars/avatar4.png" },
        ],
      },
      {
        id: 6,
        name: "Developeradmin",
        type: "SYSTEM-CUSTOM",
        dateCreated: "May 1, 2023",
        status: "Active",
        roleUsers: [
          { id: 25, name: "User One", avatar: "/avatars/avatar1.png" },
          { id: 26, name: "User Two", avatar: "/avatars/avatar2.png" },
          { id: 27, name: "User Three", avatar: "/avatars/avatar3.png" },
          { id: 28, name: "User Four", avatar: "/avatars/avatar4.png" },
        ],
      },
      {
        id: 7,
        name: "Developer-basic",
        type: "SYSTEM-CUSTOM",
        dateCreated: "Jun 1, 2023",
        status: "Active",
        roleUsers: [
          { id: 29, name: "User One", avatar: "/avatars/avatar1.png" },
          { id: 30, name: "User Two", avatar: "/avatars/avatar2.png" },
          { id: 31, name: "User Three", avatar: "/avatars/avatar3.png" },
        ],
      },
    ];

    console.debug("Roles fetched successfully");
    return NextResponse.json({ roles }, { status: 200 });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return NextResponse.json(
      { error: "Failed to fetch roles", details: error.message },
      { status: 500 }
    );
  }
}
