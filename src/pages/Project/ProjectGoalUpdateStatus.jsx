import {
  faAngleDown,
  faCheck,
  faCircle,
  faPaperclip,
  faAngleRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import PreviousUpdate from "../../assets/images/PreviousUpdate.png";

const GoalUpdateStatus = () => {
  const { goalId } = useParams();
  const [statusUpdated, setStatusUpdated] = useState(false); // Track if status is updated


  const [setstatus, setsetstatus] = useState(false); // Controls dropdown visibility
  const [selectedStatus, setSelectedStatus] = useState("Select Status"); // Tracks selected status

  // Handle status selection
  const handleStatusChange = (status) => {
    setSelectedStatus(status); // Update the selected status
    setsetstatus(false); // Close the dropdown after selection
  };

  // Track visibility of different fields
  const [goal, setGoal] = useState(null);
  const navigate = useNavigate();

  const [summary, setSummary] = useState(""); // Tracks the summary

  const [newStatus, setNewStatus] = useState('');

  const [showProgress, setShowProgress] = useState(true);
  const [showOwner, setShowOwner] = useState(true);
  const [showTimePeriod, setShowTimePeriod] = useState(true);
  const [showCustomDueDate, setShowCustomDueDate] = useState(true);
  const [attachfile, setattachfile] = useState(false);
  const [selectedfile, setselectedfile] = useState([]); // Initialize as an empty array
  const [showpopup, setshowpopup] = useState(false);

  //   const fetchGoalStatus = async () => {
  //     try {
  //       const jwtLoginToken = localStorage.getItem("jwtLoginToken");
  //       if (!jwtLoginToken) throw new Error("JWT Token not found!");

  //       const response = await axios.get(
  //         `http://localhost:3000/goal/getbyid/${goalId}`, // <-- use GET endpoint here
  //         {
  //           headers: {
  //             Authorization: `Bearer ${jwtLoginToken}`,
  //           },
  //         }
  //       );

  //       console.log("Fetched goal data:", response.data);
  //       setGoal(response.data.goal);
  //       setSelectedStatus(response.data.goal.status || "Select Status");
  //     } catch (error) {
  //       console.error("Error fetching goal:", error);
  //     }
  //   };

  //   if (_id) fetchGoalStatus();
  // }, [_id]);

  // This is your missing function definition:

  const handleSummaryChange = (event) => {
    setSummary(event.target.value); // Update summary state
  };

  // Post status update to backend
// Post status update to backend
// Post status update to backend
const handlePostStatus = async () => {
  try {
    // Retrieve JWT token from localStorage
    const jwtLoginToken = localStorage.getItem("jwtLoginToken");
    
    if (!jwtLoginToken) {
      console.error("ERROR: JWT Token is missing! User is not authenticated.");
      return;
    }

    // Validate fields before sending request
    if (!selectedStatus || !summary.trim() || !newStatus.trim()) {
      console.error("ERROR: Status, Summary, and Status Update are required.");
      return;
    }

    // Prepare the payload
    const payload = {
      status: selectedStatus,
      summary: summary.trim(),
      statusupdate: newStatus.trim(), // Ensure this is properly populated
    };

    console.log("Sending Update:", payload);

    // Sending the PATCH request to update the goal status
    const response = await axios.patch(
      `http://localhost:3000/goal/updateGoalStatus/${goalId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${jwtLoginToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Successfully Updated!", response.data);

    // Update the UI immediately after success
    setGoal((prevGoal) => ({
      ...prevGoal,
      status: selectedStatus,
      summary: summary,
      statusupdate: newStatus,
    }));

    // Navigate to the goal page after updating
    navigate(`/goal/${goalId}`);

  } catch (error) {
    console.error("Error updating status:", error.response?.data || error.message);
  }
};





  const uploadBtnClick = () => {
    document.getElementById("fileInput").click();
  };

  const selectedfilechange = (event) => {
    const files = Array.from(event.target.files); // Get selected files

    if (files.length + selectedfile.length > 3) {
      setshowpopup(true);
      setTimeout(() => {
        setshowpopup(false);
      }, 3000);
      return;
    }

    setselectedfile((prevFiles) => [...prevFiles, ...files]); // Properly update state
  };

  // Handle checkbox toggle to show/hide fields
  const handleCheckboxToggle = (field) => {
    if (field === "progress") {
      setShowProgress((prev) => !prev);
    } else if (field === "owner") {
      setShowOwner((prev) => !prev);
    } else if (field === "timePeriod") {
      setShowTimePeriod((prev) => !prev);
    } else if (field === "customDueDate") {
      setShowCustomDueDate((prev) => !prev);
    }
  };

  const [showfield, setshowfield] = useState(false);
  return (
    <div className="overflow-hidden h-screen">
      {/* header  */}
      <div className="">
        <div className="bg-white drop-shadow-[0_4px_5px_rgba(0,0,0,0.2)] py-5 ">
          {/* header  */}
          <div className="px-10 ">
            <div className="justify-between flex">
              <div className="flex space-x-3 items-center text-sm text-gray-700">
                <span className="cursor-pointer">heloo world</span>
                <FontAwesomeIcon icon={faAngleRight} />
                <div className="text-gray-800 cursor-pointer">
                  Status update
                </div>
              </div>
              <div className="space-x-3">
                <span className="border border-gray-300 px-4 rounded-md space-x-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer ">
                  <FontAwesomeIcon icon={faPlus} />
                  <span>Add recipients</span>
                </span>
                <span>
                  <button
                    type="button"
                    className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 cursor-pointer"
                    onClick={handlePostStatus}
                  >
                    Post
                  </button>{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* main content */}
      <div className="flex w-full  ">
        {/* pop up message */}
        {showpopup && (
          <div className="fixed top-5 left-[50%] bg-red-500 text-white px-4 py-2 rounded-md shadow-md">
            You can only upload up to 3 files.
          </div>
        )}
        {/* Left content */}
        <div className="overflow-y-auto h-screen flex w-4/5">
          <div className="lg:px-56 pt-20  w-full">
            <div className="text-3xl my-8 px-2">
             {/* Status update input */}
        <textarea 
          value={newStatus} 
          onChange={(e) => setNewStatus(e.target.value)} 
          placeholder="Enter status update"
        />
            </div>
            <div className=" px-2">
              <ul className="text-sm space-y-5">
                <li className="flex items-center">
                  <div className="w-52 text-gray-700">
                    Status <span className="text-red-500">*</span>
                  </div>



                  
                  <div className="relative">
                    <span
                      onClick={() => setsetstatus((prev) => !prev)}
                      className="space-x-2 px-2 py-1 rounded-md cursor-pointer flex items-center bg-gray-100 border border-gray-300"
                    >
                      {/* Display selected status */}
                      <span>{selectedStatus}</span>
                      <FontAwesomeIcon
                        icon={faAngleDown}
                        size="sm"
                        className="ml-2"
                      />
                    </span>

                    {/* Dropdown list */}
                    {setstatus && (
                      <div className="absolute mt-3 bg-white drop-shadow-lg rounded-md w-40 z-10">
                        <ul className="space-y-1 text-sm">
                          <li className="font-semibold text-gray-700">Open</li>
                          <ul>
                            <li
                              onClick={() => handleStatusChange("On Track")}
                              className="px-2 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            >
                              <FontAwesomeIcon
                                icon={faCircle}
                                size="xs"
                                className="mr-1 text-green-700"
                              />
                              On Track
                            </li>
                            <li
                              onClick={() => handleStatusChange("At Risk")}
                              className="px-2 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            >
                              <FontAwesomeIcon
                                icon={faCircle}
                                size="xs"
                                className="mr-1 text-orange-700"
                              />
                              At Risk
                            </li>
                            <li
                              onClick={() => handleStatusChange("Off track")}
                              className="px-2 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            >
                              <FontAwesomeIcon
                                icon={faCircle}
                                size="xs"
                                className="mr-1 text-red-700"
                              />
                              Off Track
                            </li>
                          </ul>
                          <li className="font-semibold text-gray-700">
                            Closed
                          </li>
                          <ul>
                            <li
                              onClick={() => handleStatusChange("Achieved")}
                              className="px-2 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            >
                              <FontAwesomeIcon
                                icon={faCircle}
                                size="xs"
                                className="mr-1 text-green-700"
                              />
                              Achieved
                            </li>
                            <li
                              onClick={() => handleStatusChange("Partial")}
                              className="px-2 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            >
                              <FontAwesomeIcon
                                icon={faCircle}
                                size="xs"
                                className="mr-1 text-orange-700"
                              />
                              Partial
                            </li>
                            <li
                              onClick={() => handleStatusChange("Missed")}
                              className="px-2 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            >
                              <FontAwesomeIcon
                                icon={faCircle}
                                size="xs"
                                className="mr-1 text-red-700"
                              />
                              Missed
                            </li>
                            <li
                              onClick={() => handleStatusChange("Dropped")}
                              className="px-2 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            >
                              <FontAwesomeIcon
                                icon={faCircle}
                                size="xs"
                                className="mr-1 text-gray-700"
                              />
                              Dropped
                            </li>
                          </ul>
                        </ul>
                      </div>
                    )}
                  </div>
                </li>

                {/* Other List Items */}
                {showProgress && (
                  <li className="flex items-center">
                    <div className="w-52 text-gray-700">Progress</div>
                    <div className="w-16 bg-gray-200 py-1 rounded-full" />
                    <span className="ml-2">0%</span>
                  </li>
                )}
                {showOwner && (
                  <li className="flex items-center">
                    <div className="w-52 text-gray-700">Owner</div>
                    <div>Amir Javed</div>
                  </li>
                )}
                {showTimePeriod && (
                  <li className="flex items-center">
                    <div className="w-52 text-gray-700">Time Period</div>
                    <div>Q1 FY25</div>
                  </li>
                )}

                {/* Show or hide fields dropdown */}
                <li className="items-center cursor-pointer w-full ">
                  <div
                    className="text-gray-700 cursor-pointer hover:underline"
                    onClick={() => {
                      setshowfield((prev) => !prev);
                    }}
                  >
                    Show or hide fields
                    <FontAwesomeIcon icon={faAngleDown} className="ml-1" />
                  </div>
                  <div className=" ">
                    <ul
                      className={`bg-white absolute border ${
                        showfield ? "" : "hidden"
                      }`}
                    >
                      <li
                        onClick={() => {
                          handleCheckboxToggle("progress");
                          setshowfield(false);
                        }}
                        className="space-x-3 py-1 hover:bg-gray-100 flex w-56 px-2 my-1 cursor-pointer"
                      >
                        {showProgress ? (
                          <span>
                            <FontAwesomeIcon icon={faCheck} />
                          </span>
                        ) : (
                          <span>
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-white"
                            />
                          </span>
                        )}
                        <span>Progress</span>
                      </li>
                      <li
                        onClick={() => {
                          handleCheckboxToggle("owner");
                          setshowfield(false);
                        }}
                        className="space-x-3 py-1 hover:bg-gray-100 flex w-56 px-2 my-1 cursor-pointer"
                      >
                        {showOwner ? (
                          <span>
                            <FontAwesomeIcon icon={faCheck} />
                          </span>
                        ) : (
                          <span>
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-white"
                            />
                          </span>
                        )}
                        <span>Owner</span>
                      </li>
                      <li
                        onClick={() => {
                          handleCheckboxToggle("timePeriod");
                          setshowfield(false);
                        }}
                        className="space-x-3 py-1 hover:bg-gray-100 flex w-56 px-2 my-1 cursor-pointer"
                      >
                        {showTimePeriod ? (
                          <span>
                            <FontAwesomeIcon icon={faCheck} />
                          </span>
                        ) : (
                          <span>
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-white"
                            />
                          </span>
                        )}

                        <span>Time Period</span>
                      </li>
                      <li>
                        <div className="w-full border-b my-3" />
                        <div className="px-3 ">
                          <button
                            type="button"
                            onClick={() => {
                              setshowfield(false);
                            }}
                            className="w-full text-center py-2 hover:bg-blue-600 bg-blue-500 mb-3 rounded-md text-white"
                          >
                            Save
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* Attachment */}
                <li className="flex flex-col relative">
                  {/* Attachment button */}
                  <div
                    onClick={() => setattachfile((prev) => !prev)}
                    className="w-52 space-x-2 items-center flex hover:underline text-gray-700 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faPaperclip} />
                    <span>Add Attachment</span>
                  </div>

                  {/* File Upload UI */}
                  <div
                    className={`${
                      attachfile ? "" : "hidden"
                    } absolute mt-8 bg-white border px-4 py-3 shadow-lg rounded-md`}
                  >
                    <div className="underline underline-offset-8 text-gray-700">
                      Upload
                    </div>
                    <div className="w-full border-b mt-1 mb-3"></div>

                    <div className="flex flex-col items-center">
                      <p className="text-xs text-gray-600">
                        Select or drag files from your computer
                      </p>

                      {/* Upload Button */}
                      <button
                        onClick={uploadBtnClick}
                        className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-200 cursor-pointer my-2"
                      >
                        Choose a file
                      </button>

                      {/* Hidden file input */}
                      <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        onChange={selectedfilechange}
                      />
                    </div>
                  </div>

                  {/* Show selected file details */}
                  {/* File Upload UI */}
                  {selectedfile.length > 0 && (
                    <div className="mt-3 space-y-3">
                      {selectedfile.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 p-3 border rounded-md bg-gray-100 shadow-sm"
                        >
                          {/* Thumbnail or file icon */}
                          {file.type.startsWith("image/") ? (
                            <img
                              src={URL.createObjectURL(file)}
                              alt="Preview"
                              className="w-12 h-12 object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-md">
                              <FontAwesomeIcon
                                icon={faPaperclip}
                                className="text-gray-600"
                              />
                            </div>
                          )}

                          {/* File Info */}
                          <div>
                            <p className="text-sm font-semibold">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024).toFixed(2)} KB
                            </p>
                          </div>

                          {/* Remove file button */}
                          <button
                            onClick={() =>
                              setselectedfile((prevFiles) =>
                                prevFiles.filter((_, i) => i !== index)
                              )
                            }
                            className="ml-auto text-red-500 text-xs underline hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              </ul>
            </div>
            <div className="w-full border-b my-6"></div>
            {/* Summary */}
         
            <textarea
  className="w-full "
  name="textarea"
  id="textarea"
  placeholder="How is this goal progressing? Are there key accomplishments or critical risks to share?"
  value={summary} // Link the textarea to summary state
  onChange={handleSummaryChange} // Update the state when the user types
/>


          </div>
        </div>

        {/* Right content */}
        <div className="w-1/5 border-l px-6  overflow-y-auto pt-7 overflow-auto">
          <div className="text-2xl font-semibold">Previous Update</div>
          <div className="w-full border-b my-6"></div>
          <div className="flex justify-center">
            <img
              src={PreviousUpdate}
              alt="Previous Update Image"
              className="w-44"
            />
          </div>
          <p className="px-3 text-center">
            Your previous status update will appear here, so you can reference
            it later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoalUpdateStatus;
