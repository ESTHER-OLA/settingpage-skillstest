// exportFunctions.js
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import autoTable from "jspdf-autotable";

// Function to export roles to PDF
export const exportRolesToPDF = async (roles) => {
  const doc = new jsPDF("p", "pt");

  doc.setFontSize(18);
  doc.text("User Roles", 40, 40);

  const baseUrl = window.location.origin;

  const tableRows = roles.map((role) => {
    const userCount = `${role.roleUsers.length} users`;
    const avatarURLs = role.roleUsers
      .map((user) => `${baseUrl}${user.avatar}`)
      .join(", ");
    return [
      role.name,
      role.type,
      role.dateCreated,
      role.status,
      userCount,
      avatarURLs,
    ];
  });

  // Adding table with autoTable
  autoTable(doc, {
    head: [["Name", "Type", "Date Created", "Status", "Role Users", "Avatar"]],
    body: tableRows,
    startY: 60,
  });

  doc.save("roles.pdf");
};

// Function to export roles to Excel
export const exportRolesToExcel = (roles) => {
  const baseUrl = window.location.origin;

  const data = roles.map((role) => ({
    Name: role.name,
    Type: role.type,
    "Date Created": role.dateCreated,
    Status: role.status,
    "Role Users": `${role.roleUsers.length} users`,
    "Avatar URL": role.roleUsers
      .map((user) => `${baseUrl}${user.avatar}`)
      .join(", "),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Roles");
  XLSX.writeFile(workbook, "roles.xlsx");
};
