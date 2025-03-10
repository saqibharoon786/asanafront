import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import teamgoal from "../../assets/images/teamgoal.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Projectgoal = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isGoalsVisible, setIsGoalsVisible] = useState(false);
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isTeamGoalsVisible, setIsTeamGoalsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goalType, setGoalType] = useState('My Goal');
  const [goalTitle, setGoalTitle] = useState('');
  const [goalOwner, setGoalOwner] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [privacy, setPrivacy] = useState('private');
  const [members, setMembers] = useState('');
  const [jwtLogintoken, setJwtLoginToken] = useState("");
  const [goals, setGoals] = useState([]); 
  const navigate=useNavigate() // State to store fetched goals

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const toggleMyGoalsVisibility = () => {
    setIsGoalsVisible(true);
    setIsCreateVisible(true);
    setIsTeamGoalsVisible(false);
    setGoalType('My Goal');
  };

  const toggleTeamGoalsVisibility = () => {
    setIsTeamGoalsVisible(!isTeamGoalsVisible);
    setIsGoalsVisible(false);
    setIsCreateVisible(!isTeamGoalsVisible);
    setGoalType('Team Goal');
  };

  const handleRowClick = (_id) => {
    navigate(`/goal/${_id}`); // Navigate using _id
  };
  

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch JWT token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("jwtLoginToken");
    if (storedToken) {
      setJwtLoginToken(storedToken);
    } else {
      console.error("No Authorization Token found");
    }
  }, []);

  // Fetch all goals from the API
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get('http://localhost:3000/goal/get-all-goals', {
          headers: {
            Authorization: `Bearer ${jwtLogintoken}`,
          },
        });
        if (response.status === 200) {
          setGoals(response.data.goals);  // Assuming the response contains a "goals" key
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    if (jwtLogintoken) {
      fetchGoals();
    }
  }, [jwtLogintoken]);  // Runs when jwtLogintoken changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    const goalData = {
        goalTitle,
        goalOwner,
        timePeriod,
        privacy,
        members,
    };

    console.log("Goal Data before sending:", goalData); // Debugging

    try {
        const response = await axios.post(
            "http://localhost:3000/goal/create-goal",
            goalData,
            {
                headers: {
                    Authorization: `Bearer ${jwtLogintoken}`,
                },
            }
        );

        if (response.status === 201) {
            // On success, update goals state directly
            const newGoal = response.data.goal; // Assuming response contains the new goal object
            setGoals((prevGoals) => [...prevGoals, newGoal]);

            alert("Goal created successfully!");
            closeModal();
        }
    } catch (error) {
        console.error("Error Response:", error.response?.data);
        alert(`Error: ${error.response?.data?.message || "Failed to create goal"}`);
    }
};

  

  return (
    <>
      <nav className="bg-white-800 text-black px-6 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white mr-4">
              <span className="text-xs">👤</span>
            </div>
            <span className="text-xl font-semibold">My workspace</span>
          </div>
          <div className="flex space-x-6 ml-12">
            <button className="hover:text-blue-400" onClick={toggleTeamGoalsVisibility}>Team goals</button>
            <button className="hover:text-blue-400" onClick={toggleMyGoalsVisibility}>My goals</button>
          </div>
        </div>
      </nav>


      {isCreateVisible && (
        <div className="bg-gray-100 p-6 mt-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">{`Create ${goalType}`}</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600" onClick={openModal}>
            <FaPlus className="text-white mr-2" />
            <span>Create Goal</span>
          </button>
        </div>
      )}





      {isGoalsVisible &&  (
        <div className="bg-white p-6 mt-4 rounded-lg shadow-md">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Time period</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Owner</th>
              </tr>
            </thead>
            <tbody>
    {goals.map((goal, index) => (
        <tr 
            key={index} 
            className="cursor-pointer hover:bg-gray-100" 
            onClick={() => handleRowClick(goal._id)} // Use correct _id
        >
            <td className="border border-gray-300 px-4 py-2">{goal.goalTitle}</td>
            <td className="border border-gray-300 px-4 py-2">{goal.timePeriod}</td>
            <td className="border border-gray-300 px-4 py-2">{goal.status || "N/A"}</td>
            <td className="border border-gray-300 px-4 py-2">{goal.goalOwner}</td>
        </tr>
    ))}
</tbody>

          </table>
        </div>
      )}
  
  {isTeamGoalsVisible && (
    <div className="flex flex-wrap justify-center">
      {/* Goal Item */}
      {goals.map((goal, index) => (
        <div key={index} className="max-w-xs p-6 mt-4 mx-2 rounded-lg shadow-md bg-white">
          {/* Goal Title and Progress */}
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-bold">{goal.goalTitle}</h3>
            <span className="text-sm text-gray-500">{goal.timePeriod}</span>
          </div>

          {/* Progress Bar */}
          <div className="mt-2">
            <div className="w-full h-2 bg-gray-300 rounded-full">
              <div
                className="h-2 bg-green-500 rounded-full"
                style={{ width: `${goal.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Goal Status */}
          <div className="mt-2">
            <div
              className={`px-4 py-1 inline-block text-white rounded-full ${
                goal.status === "Completed"
                  ? "bg-green-500"
                  : goal.status === "In Progress"
                  ? "bg-yellow-500"
                  : "bg-gray-500"
              }`}
            >
              {goal.status} {/* Display goal status */}
            </div>
          </div>

          {/* Additional Goal Information */}
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Owner:</strong> {goal.goalOwner}</p>
            <p><strong>Time Period:</strong> {goal.timePeriod}</p>
            <p><strong>Status:</strong> {goal.status}</p>
          </div>
        </div>
      ))}
    </div>
  )}






      
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[600px] flex">
            <div className="w-1/3 flex items-center justify-center">
              <img src={teamgoal} alt="Goal" className="w-full h-auto" />
            </div>
            <div className="w-2/3 pl-6">
              <h2 className="text-xl font-bold mb-4">{`Add ${goalType}`}</h2>
              <form onSubmit={handleSubmit}>
                <label className="block mb-2">Goal Title</label>
                <input
                  type="text"
                  className="w-full border p-2 mb-4"
                  placeholder="Enter goal title"
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                />
                <label className="block mb-2">Goal Owner</label>
                <input
                  type="text"
                  className="w-full border p-2 mb-4"
                  placeholder="Goal Owner"
                  value={goalOwner}
                  onChange={(e) => setGoalOwner(e.target.value)}
                  disabled
                />
                <label className="block mb-2">Time Period</label>
                <select
                  className="w-full border p-2 mb-4"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                >
                  <option>Q1 FY25</option>
                  <option>Q2 FY25</option>
                  <option>Q3 FY25</option>
                </select>
                <label className="block mb-2">Privacy</label>
                <select
                  className="w-full border p-2 mb-4"
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value)}
                >
                  <option>public</option>
                  <option>private</option>
                </select>
                <label className="block mb-2">Members</label>
                <input
                  type="text"
                  className="w-full border p-2 mb-4"
                  placeholder="Name or email"
                  value={members}
                  onChange={(e) => setMembers(e.target.value)}
                />
                <div className="flex justify-end">
                  <button className="bg-gray-300 px-4 py-2 rounded-lg mr-2" onClick={closeModal}>Cancel</button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" type="submit">Save Goal</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Projectgoal;
