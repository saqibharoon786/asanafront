import { useState, useEffect } from "react";
import axios from "axios";
import { Filter, SortAsc, Plus, ChevronDown, CheckCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProjectList = () => {
  const [selectedUserIds, setSelectedUserIds] = useState([]); // Store selected user IDs (can handle multiple users)
  const { projectId } = useParams(); // This will get the projectId from the URL
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [newTask, setNewTask] = useState({
    Task_Title: "",
    // AssignedTo: "", // Store the selected user ID(s) here
    DueDate: "",
    // TaskCreatedBy: "",
  });
  const [jwtLogintoken, setJwtLoginToken] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Declare the state for filter and sort order
  const [filterCompleted, setFilterCompleted] = useState("all");
  const [showFilterForm, setShowFilterForm] = useState(false); // Define the filter form state
  const [sortOrder, setSortOrder] = useState("asc"); // Define sort order state

  // Handle user selection (single or multiple users)
  const handleUserSelect = (e) => {
    const userId = e.target.value;
    setSelectedUserIds((prevSelectedUserIds) => {
      if (!prevSelectedUserIds.includes(userId)) {
        return [...prevSelectedUserIds, userId];
      }
      return prevSelectedUserIds;
    });

    // Update Task_AssignedTo with the selected user ID(s)
    setNewTask({ ...newTask, Task_AssignedTo: [...selectedUserIds, userId] });
  };

  // Get JWT token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("jwtLoginToken");
    if (storedToken) {
      setJwtLoginToken(storedToken);
    } else {
      console.error("No Authorization Token found");
    }
  }, []);

  // Fetch users for task assignment
  useEffect(() => {
    const fetchEmployeesByDepartment = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/department/get-employee-by-department`,
          {
            headers: {
              Authorization: jwtLogintoken ? `Bearer ${jwtLogintoken}` : "",
              "Content-Type": "application/json",
            },
          }
        );
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          setError("Invalid employees response.");
        }
      } catch (error) {
        setError("Error fetching employees.");
      } finally {
        setLoading(false);
      }
    };

    if (jwtLogintoken) {
      fetchEmployeesByDepartment();
    }
  }, [jwtLogintoken]);

  // Fetch tasks based on projectId
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/task/getAllTaskByProjectId/${projectId}`,
          {
            headers: {
              Authorization: jwtLogintoken ? `Bearer ${jwtLogintoken}` : "",
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data && Array.isArray(response.data.tasks)) {
          setTasks(response.data.tasks);
        } else {
          setError("Failed to fetch tasks.");
        }
      } catch (error) {
        setError("Error fetching tasks.");
      } finally {
        setLoading(false);
      }
    };

    if (projectId && jwtLogintoken) {
      fetchTasks();
    }
  }, [projectId, jwtLogintoken]);

  // Handle task creation
  const handleSaveTask = async () => {
    if (!newTask.Task_Title.trim()) {
      setError("Task title is required!");
      return;
    }
    if (newTask.Task_AssignedTo.length === 0) {
      setError("Task assignee(s) is/are required!");
      return;
    }

    const formattedTask = {
      project_Id: projectId,
      ...newTask,
      TaskDueDate: newTask.Task_DueDate || null,
      TaskCreatedOn: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/task/create-task/${projectId}`,
        formattedTask,
        {
          headers: {
            Authorization: jwtLogintoken ? `Bearer ${jwtLogintoken}` : "",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        setTasks((prevTasks) => [...prevTasks, response.data]);
        setNewTask({
          Task_Title: "",
          Task_AssignedTo: [],
          Task_DueDate: "",
          lastModified: "",
          collaborators: [],
          TaskCreatedBy: "",
          TaskCreatedOn: new Date().toISOString().split("T")[0],
          TaskCompletedDate: "",
        });
        setShowForm(false);
      } else {
        setError("Failed to create task.");
      }
    } catch (error) {
      setError("Error creating task.");
    }
  };
  // Sorting tasks
  const handleSortTasks = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      return sortOrder === "asc"
        ? a.Task_Title.localeCompare(b.Task_Title)
        : b.Task_Title.localeCompare(a.Task_Title);
    });

    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setTasks(sortedTasks);
  };

  // Filtering tasks based on completion status
  const filteredTasks = tasks.filter((task) => {
    if (filterCompleted === "all") return true;
    if (filterCompleted === "completed") return task.completedOn;
    if (filterCompleted === "incomplete") return !task.completedOn;
    return true;
  });

  return (
    <div className="p-4 bg-white text-gray-700">
      <div className="flex items-center justify-between bg-white p-2 space-x-3 rounded-sm">
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-1 bg-white/10 border border-gray-400 px-6 py-1 rounded-md focus:bg-blue-500 hover:text-white"
        >
          <Plus className="text-sm" />
          <span>Add task</span>
          <ChevronDown className="text-sm" />
        </button>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowFilterForm(!showFilterForm)}
            className="flex items-center space-x-1 bg-white/10 border border-gray-400 px-3 py-1 rounded-md hover:bg-white "
          >
            <Filter className="text-sm" />
            <span>Filter</span>
          </button>

          {showFilterForm && (
            <div className="relative">
              <div className="absolute top-full -left-10 mt-2 w-48 bg-gray-50 shadow-lg rounded-md p-3 border border-gray-700 animate-fadeIn">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter Tasks:
                </label>
                <select
                  className="w-full p-2 bg-white border border-gray-600 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setFilterCompleted(e.target.value)}
                >
                  <option value="all">Show all</option>
                  <option value="completed">Completed</option>
                  <option value="incomplete">Incomplete</option>
                </select>
              </div>
            </div>
          )}

          <button
            onClick={handleSortTasks}
            className="flex items-center space-x-1 bg-white/10 border border-gray-400 px-3 py-1 rounded-md hover:bg-white "
          >
            <SortAsc className="text-sm" />
            <span>Sort</span>
          </button>
        </div>
      </div>

      {/* New Task Form */}
      {showForm && (
        <div className="p-4 bg-gray-50 rounded-md mt-4">
          <h2 className="text-lg font-semibold mb-2">Add New Task</h2>
          <div className="grid grid-cols-8 gap-2">
            {Object.keys(newTask).map((field) => (
              <div key={field} className="flex flex-col">
                <label className="text-sm text-gray-800 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>

                <input
                  type={
                    ["dueDate", "createdOn", "completedOn"].includes(field)
                      ? "date"
                      : "text"
                  }
                  className="p-2 bg-white border border-gray-600 rounded text-gray-700"
                  value={newTask[field]}
                  onChange={(e) =>
                    setNewTask({ ...newTask, [field]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>

          {/* Assign User Dropdown */}
          <div className="mb-2">
            <label className="block font-medium">Assign to</label>
            <select
              className="w-full p-2 border rounded"
              onChange={handleUserSelect}
              disabled={users.length === 0}
            >
              <option value="">--Select User--</option>
              {users.length > 0 ? (
                users.map((user) => (
                  <option key={user._name} value={user._name}>
                    {user.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No users available
                </option>
              )}
            </select>
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={handleSaveTask}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
            >
              Save Task
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Task Table */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full border-collapse border border-gray-600 text-gray-700">
          <thead>
            <tr className="bg-white text-left border border-gray-600">
              <th className="p-2 border border-gray-600">Task Title</th>
              <th className="p-2 border border-gray-600">Task Assigned To</th>
              <th className="p-2 border border-gray-600">Task Due Date</th>
              <th className="p-2 border border-gray-600">Task Completed On</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <tr key={task._id} className="border border-gray-600">
                  <td className="p-2 border border-gray-600 flex items-center space-x-2">
                    <CheckCircle
                      className={`cursor-pointer ${
                        task.completedOn ? "text-green-400" : "text-gray-500"
                      }`}
                    />
                    <span>{task.Task_Title}</span>
                  </td>
                  <td className="p-2 border border-gray-600">
                    {Array.isArray(task.Task_AssignedTo) &&
                    task.Task_AssignedTo.length > 0
                      ? task.Task_AssignedTo.map((username) => {
                          // Compare username directly with user name
                          const user = users.find((u) => u.name === username);
                          return user ? user.name : "Unknown User";
                        }).join(", ")
                      : "Unassigned"}
                  </td>

                  <td className="p-2 border border-gray-600">
                    {task.Task_DueDate || "Not Completed"}
                  </td>
                  <td className="p-2 border border-gray-600">
                    {task.Task_CompletedDate || "Pending"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-2 text-center">
                  No tasks available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;
