import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;
const API_ADMIN_URL = process.env.REACT_APP_API_ADMIN_URL;

const EditStaff = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    department_Name: "",
    employee_Name: "",
    employee_Email: "",
    employee_Password: "",
    employee_Address: "",
    employee_Contact: "",
    employee_Designation: "",
    employee_Image: null,
    previewUrl: null,
  });

  const [departments, setDepartments] = useState([]);
  const [employeeImageUrl, setEmployeeImageUrl] = useState("");
  const jwtLoginToken = localStorage.getItem("jwtLoginToken");

  // Fetch departments for dropdown selection
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `${API_ADMIN_URL}/department/get-departments`,
          {
            headers: {
              Authorization: `Bearer ${jwtLoginToken}`,
            },
          }
        );
        const departmentData = response.data?.information?.departments || [];
        setDepartments(departmentData);
      } catch (err) {
        console.error("Failed to fetch departments:", err);
        setDepartments([]);
      }
    };

    fetchDepartments();
  }, [jwtLoginToken]);

  // Fetch existing user data and display the employee image
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${API_ADMIN_URL}/department/get-employee/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${jwtLoginToken}`,
            },
          }
        );

        const user = response.data?.information?.user;
        const designation = response.data?.information?.employee_Designation;

        if (user) {
          setFormData({
            department_Name: user.department,
            employee_Name: user.name,
            employee_Email: user.email,
            employee_Password: "",
            employee_Address: user.address || "",
            employee_Contact: user.contact || "",
            employee_Designation: designation,
            employee_Image: null,
            previewUrl: null,
          });

          // Construct the URL for the employee's image
          if (user.image?.filePath) {
            setEmployeeImageUrl(`${API_URL}${user.image.filePath}`);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        alert("Failed to load user data.");
      }
    };

    fetchUserData();
  }, [userId, jwtLoginToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
        previewUrl,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("employee_NewDepartment", formData.department_Name);
    formDataToSend.append("employee_NewName", formData.employee_Name);
    formDataToSend.append("employee_NewEmail", formData.employee_Email);
    formDataToSend.append("employee_NewPassword", formData.employee_Password);
    formDataToSend.append("employee_NewDesignation", formData.employee_Designation);
    formDataToSend.append("employee_NewContact", formData.employee_Contact);
    formDataToSend.append("employee_NewAddress", formData.employee_Address);

    if (formData.employee_Image) {
      formDataToSend.append("employee_Image", formData.employee_Image);
    }

    try {
      const response = await axios.patch(
        `${API_ADMIN_URL}/department/update-employee/${userId}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${jwtLoginToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 && response.data.success) {
        alert("User information updated successfully!");
        navigate("/admin/department");
      } else {
        alert(`Failed to update employee: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update user information.");
    }
  };

  return (
    <div>
      <h1>Edit Staff Information</h1>

      <form onSubmit={handleSubmit}>
        {/* Employee Image */}
        <div>
          <label>Profile Picture</label>
          {formData.previewUrl ? (
            <img src={formData.previewUrl} alt="Profile Preview" width="150" />
          ) : employeeImageUrl ? (
            <img src={employeeImageUrl} alt="Employee" width="150" />
          ) : (
            <span>No Image</span>
          )}
          <input
            type="file"
            name="employee_Image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Department Dropdown */}
        <label>Department</label>
        <select
          id="department_Name"
          name="department_Name"
          value={formData.department_Name}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.department_Name} value={dept.department_Name}>
              {dept.department_Name}
            </option>
          ))}
        </select>

        {/* Input Fields */}
        {[
          { name: "employee_Name", type: "text", placeholder: "Enter Full Name" },
          { name: "employee_Email", type: "email", placeholder: "Enter Email" },
          { name: "employee_Password", type: "password", placeholder: "Enter Password" },
          { name: "employee_Address", type: "text", placeholder: "Enter Address" },
          { name: "employee_Contact", type: "tel", placeholder: "Enter Contact Number" },
          { name: "employee_Designation", type: "text", placeholder: "Enter Designation" }
        ].map((field) => (
          <div key={field.name}>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleInputChange}
            />
          </div>
        ))}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditStaff;
