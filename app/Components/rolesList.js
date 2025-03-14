"use client";

import React, { useEffect, useState } from "react";
import { CloudDownload, Check, ArrowDown } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { exportRolesToPDF, exportRolesToExcel } from "./exportFunction";

const RolesList = () => {
  const [roles, setRoles] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGlobalDownloadOptions, setShowGlobalDownloadOptions] =
    useState(false);
  const [activeRowDropdown, setActiveRowDropdown] = useState(null);

  useEffect(() => {
    setMounted(true);

    const fetchRoles = async () => {
      try {
        const response = await axios.get("/api/roles");
        setRoles(response.data.roles);
      } catch (error) {
        console.error("Failed to fetch roles", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [])

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  const handleDownloadAllPDF = () => {
    exportRolesToPDF(roles);
    setShowGlobalDownloadOptions(false);
  };

  const handleDownloadAllExcel = () => {
    exportRolesToExcel(roles);
    setShowGlobalDownloadOptions(false);
  };

  const handleDownloadSelectedPDF = () => {
    const selected = roles.filter((role) => selectedRoles.includes(role.id));
    exportRolesToPDF(selected);
  };

  const handleDownloadSelectedExcel = () => {
    const selected = roles.filter((role) => selectedRoles.includes(role.id));
    exportRolesToExcel(selected);
  };

  const handleDownloadRowPDF = (role) => {
    exportRolesToPDF([role]);
    setActiveRowDropdown(null);
  };

  const handleDownloadRowExcel = (role) => {
    exportRolesToExcel([role]);
    setActiveRowDropdown(null);
  };

  const toggleRowDropdown = (roleId) => {
    setActiveRowDropdown((prev) => (prev === roleId ? null : roleId));
  };

  const handleCheckboxChange = (roleId) => {
    if (selectedRoles.includes(roleId)) {
      setSelectedRoles(selectedRoles.filter((id) => id !== roleId));
    } else {
      setSelectedRoles([...selectedRoles, roleId]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allRoleIds = roles.map((role) => role.id);
      setSelectedRoles(allRoleIds);
    } else {
      setSelectedRoles([]);
    }
  };

  return (
    <div className="flex flex-col w-full space-y-4 mt-3 cursor-pointer">
      <div className="flex lg:flex-row flex-col justify-between items-start cursor-default">
        <h1 className="text-lg font-bold">User Roles</h1>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => setShowGlobalDownloadOptions((prev) => !prev)}
            className="flex items-center gap-2 border border-[#667085] bg-white text-[#667085] px-6 py-2 rounded-lg"
          >
            <CloudDownload />
            <span>Download All</span>
          </button>
          {selectedRoles.length > 1 && (
            <div className="flex lg:flex-row flex-col gap-2">
              <button
                onClick={handleDownloadSelectedPDF}
                className="flex items-center gap-2 border border-[#667085] bg-white text-[#667085] px-6 py-2 rounded-lg"
              >
                <CloudDownload />
                <span>Download Selected PDF</span>
              </button>
              <button
                onClick={handleDownloadSelectedExcel}
                className="flex items-center gap-2 border border-[#667085] bg-white text-[#667085] px-6 py-2 rounded-lg"
              >
                <CloudDownload />
                <span>Download Selected Excel</span>
              </button>
            </div>
          )}
          {/* Global Download Options Dropdown */}
          {showGlobalDownloadOptions && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-10">
              <button
                onClick={handleDownloadAllPDF}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                PDF
              </button>
              <button
                onClick={handleDownloadAllExcel}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Excel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="roleList overflow-x-auto w-full scrollbar-hide">
        <table className="min-w-full bg-white border border-gray-200 text-sm flex-shrink-0 whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50">
              <th className="pr-6 pl-3 py-3">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  onChange={handleSelectAll}
                  // Mark as checked if all roles are selected
                  checked={
                    selectedRoles.length === roles.length && roles.length > 0
                  }
                />
              </th>
              <th className="px-6 py-3 flex flex-inline text-left font-medium text-gray-500 uppercase">
                Name <ArrowDown className="ml-2 w-5 h-5" />
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                Type
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                Date Created
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                Role Users
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase"></th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-b border-gray-200">
                <td className="pr-6 pl-3 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={selectedRoles.includes(role.id)}
                    onChange={() => handleCheckboxChange(role.id)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{role.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{role.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {role.dateCreated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                      role.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <Check className="w-3 h-3 mr-2" />
                    {role.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex -space-x-2">
                    {role.roleUsers.slice(0, 5).map((user) => (
                      <Image
                        key={user.id}
                        src={user.avatar}
                        alt={user.name}
                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                        width={24}
                        height={24}
                        title={user.name}
                      />
                    ))}
                    {role.roleUsers.length > 5 && (
                      <div className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-xs text-gray-700 ring-2 ring-white">
                        +{role.roleUsers.length - 5}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap relative">
                  <button
                    onClick={() => toggleRowDropdown(role.id)}
                    className="flex items-center cursor-pointer"
                  >
                    <CloudDownload />
                  </button>

                  {activeRowDropdown === role.id && (
                    <div className="flex flex-col absolute cursor-pointer right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-10">
                      <button
                        onClick={() => handleDownloadRowPDF(role)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        PDF
                      </button>
                      <button
                        onClick={() => handleDownloadRowExcel(role)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Excel
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolesList;
