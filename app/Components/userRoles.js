"use client";

import { useState, useEffect } from "react";
import { Mail } from "lucide-react";

const UserRoles = () => {
  const [emailError, setEmailError] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedEmail") || "myAccountEmail";
    }
    return "myAccountEmail";
  });

  const [altEmail, setAltEmail] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("altEmail") || "";
    }
    return "";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedEmail", selectedEmail);
    }
  }, [selectedEmail]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("altEmail", altEmail);
    }
  }, [altEmail]);

  const handleEmailChange = (e) => {
    setSelectedEmail(e.target.value);
    setEmailError("");
  };

  const handleAltEmailChange = (e) => {
    setAltEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start">
      <div className="text-start">
        <h2 className="text-md font-bold text-[#101828]">Collected Email</h2>
        <p className="text-[#667085]">Select role account</p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="selectedEmail"
              value="myAccountEmail"
              id="myAccountEmail"
              checked={selectedEmail === "myAccountEmail"}
              onChange={handleEmailChange}
              className="form-radio h-5 w-5 cursor-pointer rounded-full border-gray-300 text-[#7F56D9] focus:ring-[#7F56D9]"
            />
            <label
              htmlFor="myAccountEmail"
              className="text-md font-bold text-[#101828]"
            >
              My account email
            </label>
          </div>
          <p className="text-[#667085] ml-[1.8rem]">olivia@untitledui.com</p>
        </div>

        <div className="">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="selectedEmail"
              value="altEmail"
              id="altEmail"
              checked={selectedEmail === "altEmail"}
              onChange={handleEmailChange}
              className="form-radio h-5 w-5 cursor-pointer rounded-full border-gray-300 text-[#7F56D9]  focus:ring-[#7F56D9]"
            />
            <label
              htmlFor="altEmail"
              className="text-md font-bold text-[#101828]"
            >
              An alternative email
            </label>
          </div>
          <div className="relative mt-2">
            <input
              type="email"
              value={altEmail}
              onChange={handleAltEmailChange}
              placeholder="billing@untitledui.com"
              className={`h-[30px] w-[20rem] bg-white border border-[#667085] ${
                emailError ? "border-red-500" : "border-[#7F56D9]"
              } rounded-sm mt-2 pl-7`}
            ></input>
            <Mail className="absolute w-4 h-4 bottom-[0.3rem] ml-2 text-gray-500" />
          </div>
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRoles;
