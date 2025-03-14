import RolesList from "./Components/rolesList";
import ActiveRolesSection from "./Components/selectrole";
import UserRoles from "./Components/userRoles";

export default function Home() {
  // Menu items.
  const items = [
    {
      title: "My details",
      url: "#",
    },
    {
      title: "Profile",
      url: "#",
    },
    {
      title: "Password",
      url: "#",
    },
    {
      title: "Team",
      url: "#",
    },
    {
      title: "Plans",
      url: "#",
    },
    {
      title: "Roles",
      url: "#",
      active: true,
    },
    {
      title: "Notification",
      url: "#",
    },
    {
      title: "Integration",
      url: "#",
    },
    {
      title: "API",
      url: "#",
    },
  ];

  return (
    <main className="flex flex-col gap-5 py-5 px-5">
      <div className="flex flex-col gap-3 items-start">
        <div className="text-start">
          <h1 className="text-xl font-bold text-[#101828]">Settings</h1>
          <p className="text-[#667085]">
            Manage your team and preferences here.
          </p>
        </div>

        <div className="overflow-x-auto w-full scrollbar-hide">
          <div className="inline-flex items-center border border-gray-300 rounded-md divide-x divide-gray-300">
            {items.map((item) => (
              <a
                key={item.title}
                href={item.url}
                className={`flex-shrink-0 whitespace-nowrap px-4 py-2 text-sm transition-colors hover:bg-gray-100 ${
                  item.active
                    ? "bg-gray-100 text-[#344054] font-bold"
                    : "hover:bg-gray-100 text-[#344054]"
                }`}
              >
                <span>{item.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-3">
        <div className="text-start">
          <h1 className="text-xl font-bold text-[#101828]">User Roles</h1>
          <p className="text-[#667085]">
            Update your roles details and information
          </p>
        </div>
        <hr className="mt-2 w-[350px] lg:w-[65rem] h-2" />
        <UserRoles />
        <hr className="mt-2 w-[350px] lg:w-[65rem] h-2" />
        <ActiveRolesSection />
        <RolesList />
      </div>
    </main>
  );
}
