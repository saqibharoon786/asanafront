// npm install react-datepicker

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import teamgoal from "../../assets/images/teamgoal.png";

import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faAngleDown,
  faAngleRight,
  faArrowDownWideShort,
  faBolt,
  faCalendarDays,
  faCircle,
  faEllipsis,
  faPlus,
  faStar,
  faThumbsUp,
  faTriangleExclamation,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function ProjectGoalPannel() {
  const { goalId } = useParams(); // Correctly extracts goalId from the URL
  const [goal, setGoal] = useState(null);
  const [statusUpdated, setStatusUpdated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subGoalTitle, setSubGoalTitle] = useState(""); // State for sub-goal title
const [subGoalOwner, setSubGoalOwner] = useState(""); // State for sub-goal owner
const [submembers, setsubmembers] = useState(""); // State for submembers
const [timeperiod, settimeperiod] = useState(""); // State for timeperiod
 // State to toggle modal visibility

  

  const navigate = useNavigate(); // Declare navigate function
  // State to hold the goal data
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true);
  const [userGoals, setUserGoals] = useState([]); // State for user's goals
  const [selectedSubGoal, setSelectedSubGoal] = useState(null); // State for selected sub-goal
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [setStatus, setSetStatus] = useState(false);
  const [goals, setGoals] = useState([]); // State to store all fetched goals
  const [statusVisible, setStatusVisible] = useState(false); // // Control visibility of sub-goal input
  // For controlling dropdown visibility


  const updateGoalStatus = async (newStatus) => {
    try {
        const jwtLoginToken = localStorage.getItem("jwtLoginToken");
        if (!jwtLoginToken) {
            console.error("JWT Token is missing!");
            return;
        }

        const response = await axios.patch(
            `http://localhost:3000/goal/updateGoalStatus/${goalId}`,
            { status: newStatus },
            { headers: { Authorization: `Bearer ${jwtLoginToken}` } }
        );

        if (response.data.success) {
            setGoal((prevGoal) => ({
                ...prevGoal,
                status: newStatus, // Update status in UI
            }));
            setStatusUpdated(true); // Hide status selection after update
        }
    } catch (error) {
        console.error(
            "Error updating goal status:",
            error.response?.data || error.message
        );
    }
};


useEffect(() => {
  const fetchGoal = async () => {
    try {
      const jwtLoginToken = localStorage.getItem("jwtLoginToken");
      if (!jwtLoginToken) {
        throw new Error("No authentication token found.");
      }

      const response = await axios.get(
        `http://localhost:3000/goal/getbyid/${goalId}`,
        {
          headers: { Authorization: `Bearer ${jwtLoginToken}` },
        }
      );

      if (!response.data || !response.data.goal) {
        throw new Error("Goal data not found in response.");
      }

      setGoal(response.data.goal);

      // ✅ Hide status section if status exists
      if (response.data.goal.status) {
        setStatusUpdated(true);
      }

    } catch (err) {
      console.error("Error fetching project:", err.message || err);
      setError(err.message || "Failed to load project.");
    }
  };

  if (goalId) {
    fetchGoal();
  }
}, [goalId]);

  

  // Log goal state to check if goal data is loaded
  console.log("Goal data:", goal);

  const data = {
    labels: ["Jan 2025", "Feb", "Mar"],
    datasets: [
      {
        label: "Progress",
        data: [0, 50, 100], // Example progress values
        borderColor: "rgba(0, 0, 255, 0.5)", // Blue line
        backgroundColor: "rgba(0, 0, 255, 0.1)", // Light fill area
        fill: true, // Shaded region
        pointRadius: 5,
        pointBackgroundColor: "gray", // Small dot at progress point
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  const [setstatus, setsetstatus] = useState(false);

  // date picker
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsOpen(false); // Close the calendar after selection
  };
  const handleSubGoalChange = (goalId) => {
    setSelectedSubGoal(goalId);
    setIsDropdownOpen(false); // Close dropdown after selection
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Sub-goal Title:", subGoalTitle);
    console.log("Sub-goal Owner:", subGoalOwner);
    console.log("submembers:", submembers);
    console.log("timeperiod:", timeperiod);
    setIsModalOpen(false); // Close modal after submission
  };

  return (
    <div className=" ">
      {/* header  */}
      <div className="bg-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] py-3 px-5">
        <div className="text-gray-500 text-sm">My workspace goals</div>
        <div className="flex items-center space-x-3">
          <span className="font-bold text-lg">
            {goal ? goal.goalTitle : "Loading goal..."}{" "}
            {/* Change goal.title to goal.goalTitle */}
          </span>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
      </div>

      {/* main  content  */}
      <div className="flex mt-10">
        {/* left side content  */}
        <div className="mx-24">
          <div className="space-y-2  ">
            <div className="mb-11 text-3xl">
             
              {!goal?.status || !statusUpdated ? (
  <div>
    {/* ✅ Show status selection buttons only if status is NOT updated */}
    <div className="text-xl text-gray-600 font-semibold">
      What's the status?
    </div>
    <div className="flex space-x-6 items-center">
  {["On Track", "At Risk", "Off Track"].map((status) => (
    <button
      key={status}
      className="px-3 py-1 border rounded-md cursor-pointer hover:bg-gray-200 flex items-center"
      onClick={() => navigate(`/goalUpdateStatus/${goalId}`)} // ✅ Navigate instead of updating directly
    >
      <FontAwesomeIcon
        icon={faCircle}
        className={`mr-2 text-[8px] ${
          status === "On Track"
            ? "text-green-700"
            : status === "At Risk"
            ? "text-yellow-700"
            : "text-red-700"
        }`}
      />
      {status}
    </button>
  ))}
</div>

  </div>
) : (
  // ✅ After status update, hide status section & show goal title with status
  <div className="text-2xl font-semibold">
    {goal.goalTitle} is{" "}
    <span
      className={`font-semibold ${
        goal.status === "On Track"
          ? "text-green-600"
          : goal.status === "At Risk"
          ? "text-yellow-600"
          : "text-red-600"
      }`}
    >
      {goal.status}
    </span>
    .
  </div>
)}

            </div>
            <div>
           
           
            </div>

            {goal && (
  <div className="border border-gray-200 rounded-md p-5 mt-5">
    {/* ✅ Summary Section */}
    <div className="mb-3">
      <div>{goal.owner}</div> 
      <div className="text-md font-semibold">Summary</div> {/* Summary Label */}
      <p className="pl-4 text-gray-700">{goal.summary || "No summary available."}</p>
    </div>

    {/* ✅ Status Update */}
    <div className="mb-3">
      <div className="text-md font-semibold">Status Update</div> {/* Status Update Label */}
      <p className="pl-4 text-gray-700">{goal.statusupdate || "No status update available."}</p>
    </div>

    {/* ✅ Goal Owner Name */}
    <div className="mt-4">
      <div className="text-md font-semibold">Goal Owner</div> {/* Owner Label */}
      <p className="pl-4 text-gray-700">{goal.goalOwner || "No owner assigned."}</p>
    </div>
  </div>
)}



            <div className="flex space-x-3 rounded-md">
              <div className="px-20 py-5 border rounded-md border-gray-200 hover:bg-slate-300 text-center">
                <div className="text-sm text-gray-700">Goal completion</div>
                <div className="text-3xl font-semibold">0%</div>
                <div className="text-sm">26 days left in Q1 FY25</div>
              </div>
              <div className="px-20 py-5 border rounded-md border-gray-200 hover:bg-slate-300 text-center">
                <div className="text-sm text-gray-700">Latest status</div>
                {goal ? (
                  <div>Latest</div>
                ) : (
                  <div className="text-3xl font-semibold space-x-3 text-gray-500">
                    <input type="checkbox" />
                    <span>No status</span>
                  </div>
                )}
                <div className="text-sm text-blue-700 mt-1">Set status</div>
              </div>
            </div>

            <div className="goal-status"></div>

            <div className="flex-col  py-5 border border-gray-200 rounded-md">
              <div className="justify-between   flex px-7">
                <div className="flex space-x-2 items-center">
                  <span className="font-bold text-xl">Progress</span>
                </div>
              </div>

              <div className="px-10 mt-7">
                <div className="h-64 ">
                  <Line data={data} options={options} />
                </div>
              </div>
              <div className=" ">
      <button
        className="bg-[#4573D2] px-6 py-1 rounded-md text-white m-3"
        onClick={() => setIsModalOpen(!isModalOpen)} // Toggle modal visibility
      >
        <FontAwesomeIcon icon={faPlus} /> Connect a sub-goal
      </button>

      
              </div>
  


 




            </div>
          </div>
        </div>

        {/* right side content */}
        <div className="text-sm space-y-6 border-l px-8 mt-24">
          <div className="text-lg font-semibold">About this goal</div>
          <div className="space-y-2">
            <div className="text-gray-700">Goal owner</div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faUser}
                className="border-dotted border-gray-700 p-2 border-2 rounded-full"
              />
              <span>No owner</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-gray-700">Accountable team</div>
            <div className="space-x-2 flex items-center">
              <div className=" border-dotted border-gray-700 w-7  h-7 border-2 rounded-full items-center justify-center flex ">
                <FontAwesomeIcon icon={faUsers} className="" />
              </div>
              <span>No Team</span>
            </div>
          </div>
          <div className=" w-full border-b border-gray-700" />{" "}
          {/*bracker line */}
          <div className="flex flex-col my-4">
            <span className=" text-gray-700">Time period</span>
            <span className="font-semibold mt-3">Q1 FY25</span>
          </div>
          {/* date picker */}
          <div className="text-sm">
            <div>Custom due date</div>
            <span onClick={() => setIsOpen(!isOpen)} className=" py-2">
              {selectedDate ? (
                selectedDate.toLocaleDateString()
              ) : (
                <FontAwesomeIcon icon={faCalendarDays} size="lg" />
              )}
            </span>
            <div className="absolute ">
              {isOpen && (
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  inline // This will display the calendar inline
                />
              )}
            </div>
          </div>
          
        </div>
      </div>

      <div className="">
  {isModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center py-10 bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full flex pt-10 max-w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-center">
          <img src={teamgoal} alt="Goal" className="w-full h-auto" />
        </div>
        <div className="pl-4 pr-4">
          <h2 className="text-xl font-bold mb-4">{`Add Sub-Goal`}</h2>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">Goal Title</label>
            <input
              type="text"
              className="w-full border p-2 mb-4"
              placeholder="Enter sub-goal title"
              value={subGoalTitle}
              onChange={(e) => setSubGoalTitle(e.target.value)}
            />
            <label className="block mb-2">Goal Owner</label>
            <input
              type="text"
              className="w-full border p-2 mb-4"
              placeholder="Sub-goal owner"
              value={subGoalOwner}
              onChange={(e) => setSubGoalOwner(e.target.value)}
            />
            <label className="block mb-2">Members</label>
            <input
              type="text"
              className="w-full border p-2 mb-4"
              placeholder="Sub-goal members"
              value={submembers}
              onChange={(e) => setsubmembers(e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Time period</label>
                <input
                  type="text"
                  className="w-full border p-2 mb-4"
                  placeholder="Enter time period"
                  value={timeperiod}
                  onChange={(e) => settimeperiod(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2">Privacy</label>
                <select className="w-full border p-2 mb-4">
                  <option>Public</option>
                  <option>Private</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg mr-2"
                onClick={() => setIsModalOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                type="submit"
              >
                Save Sub-Goal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )}
</div>

    </div>
  );
}

export default ProjectGoalPannel;
