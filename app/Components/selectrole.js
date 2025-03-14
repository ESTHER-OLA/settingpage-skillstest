"use client";

import { useState, useEffect } from "react";
import { Users, Plus } from "lucide-react";

export default function ActiveRolesSection() {
  const [mounted, setMounted] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("superadmin");

  // On mount, read localStorage and update state
  useEffect(() => {
    setMounted(true);

    const savedRoles = localStorage.getItem("roles");
    if (savedRoles) {
      setRoles(JSON.parse(savedRoles));
    } else {
      // Default roles if nothing is stored
      setRoles([
        {
          id: "superadmin",
          title: "Superadmin",
          lastActive: "06/2023",
          isEditing: false,
        },
        {
          id: "developeradmin",
          title: "Developeradmin",
          lastActive: "01/2023",
          isEditing: false,
        },
        {
          id: "supportadmin",
          title: "Supportadmin",
          lastActive: "10/2023",
          isEditing: false,
        },
      ]);
    }

    const savedRole = localStorage.getItem("selectedRole");
    if (savedRole) {
      setSelectedRole(savedRole);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("roles", JSON.stringify(roles));
    }
  }, [roles, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("selectedRole", selectedRole);
    }
  }, [selectedRole, mounted]);

  // Do not render until after the component has mounted
  if (!mounted) {
    return null;
  }

  const handleSelectRole = (roleId) => {
    setSelectedRole(roleId);
  };

  const handleEditRole = (roleId) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === roleId ? { ...role, isEditing: true } : role
      )
    );
  };

  const handleSaveRole = (roleId, newTitle, newLastActive) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === roleId
          ? {
              ...role,
              title: newTitle,
              lastActive: newLastActive,
              isEditing: false,
            }
          : role
      )
    );
  };

  const handleAddRole = () => {
    const newId = `role${roles.length + 1}`;
    const newRole = {
      id: newId,
      title: `NewRole${roles.length + 1}`,
      lastActive: "MM/YYYY",
      isEditing: false,
    };
    setRoles((prev) => [...prev, newRole]);
    setSelectedRole(newId);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:gap-10 gap-5 lg:p-5">
      <div className="flex flex-row gap-10 items-start lg:mb-5">
        <div className="text-start">
          <h2 className="text-md font-bold text-[#344054]">Active Role</h2>
          <p className="text-[#667085]">
            Select active role available to the user
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start gap-5">
        {roles.map((role) => {
          const isActive = selectedRole === role.id;
          return (
            <div
              key={role.id}
              onClick={() => handleSelectRole(role.id)}
              className={`
                flex flex-row justify-between
                h-[7rem] w-[20rem] lg:w-[40rem]
                border rounded-md py-3 px-5
                cursor-pointer
                ${
                  isActive
                    ? "bg-purple-50 border-purple-300 text-purple-700"
                    : "bg-white border-[#667085] text-[#667085]"
                }
              `}
            >
              <div className="flex flex-row gap-5">
                <Users className="w-5 h-5" />
                <div>
                  {role.isEditing ? (
                    <EditRoleTitle
                      role={role}
                      onSave={(newTitle, newLastActive) =>
                        handleSaveRole(role.id, newTitle, newLastActive)
                      }
                    />
                  ) : (
                    <>
                      <h3 className="lg:text-md text-lg font-semibold">
                        {role.title}
                      </h3>
                      <p className="lg:text-sm text-md">
                        Last active {role.lastActive}
                      </p>
                      <p className="lg:text-sm text-md">
                        Set as default{" "}
                        <span
                          className="ml-2 underline cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditRole(role.id);
                          }}
                        >
                          Edit
                        </span>
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div>
                <input
                  type="radio"
                  name="activeRole"
                  value={role.id}
                  checked={isActive}
                  onChange={() => handleSelectRole(role.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-5 h-5 appearance-none rounded-full cursor-pointer border border-[#667085] 
                    checked:bg-[#7F56D9] checked:border-[#7F56D9]
                    relative
                    checked:after:content-['✓'] checked:after:absolute
                    checked:after:inset-0 checked:after:flex
                    checked:after:items-center checked:after:justify-center
                    checked:after:text-white checked:after:text-[10px]"
                />
              </div>
            </div>
          );
        })}
        <button
          onClick={handleAddRole}
          className="flex flex-row cursor-pointer gap-2 items-center text-[#667085] font-semibold"
        >
          <Plus />
          <span className="text-[17px]">Add role to user</span>
        </button>
      </div>
    </div>
  );
}

function EditRoleTitle({ role, onSave }) {
  const [tempTitle, setTempTitle] = useState(role.title);
  const [tempLastActive, setTempLastActive] = useState(role.lastActive);

  return (
    <div className="flex flex-col gap-1">
      <input
        value={tempTitle}
        onChange={(e) => setTempTitle(e.target.value)}
        className="border border-gray-300 rounded-sm px-2 py-1"
      />
      <input
        value={tempLastActive}
        onChange={(e) => setTempLastActive(e.target.value)}
        className="border border-gray-300 rounded-sm px-2 py-1"
      />
      <span
        className="underline cursor-pointer text-sm text-blue-600"
        onClick={() => onSave(tempTitle, tempLastActive)}
      >
        Save
      </span>
    </div>
  );
}
