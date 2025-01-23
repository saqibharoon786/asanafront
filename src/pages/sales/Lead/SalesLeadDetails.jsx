import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const SalesLeadDetails = () => {
  const jwtLoginToken = localStorage.getItem("jwtLoginToken");
  const { leadId } = useParams(); // Get the lead ID from the URL
  const [leadDetails, setLeadDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotePopup, setShowNotePopup] = useState(false);
  const [showInteractionHistoryPopup, setShowInteractionHistoryPopup] =
    useState(false);
  const [salesEmployees, setSalesEmployees] = useState([]);
  const [leadTransferHistoryUsersNames, setLeadTransferHistoryUsersNames] =
    useState([]);

  const [noteInput, setNoteInput] = useState("");
  const [interactionHistoryInput, setInteractionHistoryInput] = useState({
    stage_Name: "",
    stage_Detail: "",
  });

  const fetchLeadDetails = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/lead/${leadId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtLoginToken}`,
          },
        }
      );
      setLeadDetails(response.data.information.lead);
      setLeadTransferHistoryUsersNames(
        response.data.information.leadTransferHistoryUsersNames
      );
      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadDetails();
  }, [noteInput, interactionHistoryInput]);

  const handleAddNote = async () => {
    try {
      await axios.post(
        `${API_URL}/lead/add-note/${leadId}`,
        { note: noteInput },
        {
          headers: {
            Authorization: `Bearer ${jwtLoginToken}`,
          },
        }
      );
      alert("Note added successfully!");
      setShowNotePopup(false);
      setNoteInput("");
    } catch (err) {
      alert(err.response ? err.response.data.message : err.message);
    }
  };

  const handleAddInteractionHistory = async () => {
    try {
      await axios.post(
        `${API_URL}/lead/add-interaction-history/${leadId}`,
        interactionHistoryInput,
        {
          headers: {
            Authorization: `Bearer ${jwtLoginToken}`,
          },
        }
      );
      alert("Interaction stage added successfully!");
      setShowInteractionHistoryPopup(false);
      setInteractionHistoryInput({ stage_Name: "", stage_Detail: "" });
    } catch (err) {
      alert(err.response ? err.response.data.message : err.message);
    }
  };

  const fetchSalesEmployees = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/department/get-sales-employees`,
        {
          headers: {
            Authorization: `Bearer ${jwtLoginToken}`,
          },
        }
      );
      console.log(response.data);

      if (
        response.data.success &&
        response.data.information &&
        response.data.information.users
      ) {
        setSalesEmployees(response.data.information.users);
        console.log("Sales Employees:", response.data.information.users);
      } else {
        console.error("No users found or invalid response structure.");
      }
    } catch (err) {
      console.error("Error fetching sales employees:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const {
    lead_Client,
    lead_Demography,
    lead_Behaviour,
    lead_Action,
    lead_AttributesOrAction,
    lead_Organization,
    lead_Title,
    lead_Label,
    lead_Source,
    lead_Notes,
    lead_InteractionHistory,
    lead_TransferAndAssign,
  } = leadDetails;

  return (
    <>
        <div className="flex flex-row gap-6">
      {/* Lead Details Section */}
      <div className="w-2/3 bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 border-b pb-4">
          Lead Details
        </h1>
        <div className="m-2 space-y-4 space-x-3">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mx-1"
            onClick={() => setShowNotePopup(true)}
          >
            Add Note
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={() => setShowInteractionHistoryPopup(true)}
          >
            Add Interaction History
          </button>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-700">{lead_Title}</h2>
          <p className="text-gray-600">Organization: {lead_Organization}</p>
          <p className="text-gray-600">Label: {lead_Label}</p>
          <p className="text-gray-600">Source: {lead_Source}</p>

          <h3 className="text-lg font-semibold text-gray-700 mt-6">
            Client Info
          </h3>
          <div className="grid grid-cols-2 gap-4 text-gray-600">
            <p>Name: {lead_Client.client_Name}</p>
            <p>Email: {lead_Client.client_Email}</p>
            <p>Address: {lead_Client.client_Address}</p>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6">
            Demography
          </h3>
          <div className="grid grid-cols-2 gap-4 text-gray-600">
            <p>Company Size: {lead_Demography.company_Size}</p>
            <p>Industry: {lead_Demography.industry_Match}</p>
            <p>Location: {lead_Demography.location}</p>
            <p>Job Title: {lead_Demography.job_Title}</p>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6">
            Behaviour
          </h3>
          <div className="grid grid-cols-2 gap-4 text-gray-600">
            <p>Visited Pricing Page: {lead_Behaviour.visited_Pricing_Page}</p>
            <p>
              Downloaded White Paper: {lead_Behaviour.downloaded_White_Paper}
            </p>
            <p>
              Repeated Website Visits: {lead_Behaviour.repeated_Website_Visits}
            </p>
            <p>
              Ignored Email or Unsubscribed:{" "}
              {lead_Behaviour.ignore_Email_or_Unsubscribed}
            </p>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6">Actions</h3>
          <div className="grid grid-cols-2 gap-4 text-gray-600">
            <p>
              Requested Demo or Quote:{" "}
              {lead_Action.requested_Demo_or_Quote ? "Yes" : "No"}
            </p>
            <p>
              Attended Sales Call:{" "}
              {lead_Action.attended_Sales_Call ? "Yes" : "No"}
            </p>
            <p>
              Opted for Trial Services:{" "}
              {lead_Action.opted_for_Trial_Services ? "Yes" : "No"}
            </p>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6">Notes</h3>
          <div className="space-y-2">
            {lead_Notes.map((note) => (
              <div key={note._id} className="border p-4 rounded-md">
                <p>{note.note}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Created At: {new Date(note.note_CreatedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6">
            Interaction History
          </h3>
          <div className="">
            {lead_InteractionHistory.map((stage) => (
              <div key={stage._id} className="border p-4 rounded-md">
                <p>Stage: {stage.stage_Name}</p>
                <p>Details: {stage.stage_Detail}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Created At:{" "}
                  {new Date(stage.stage_CreatedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lead Transfer History Section */}
      <div className="w-1/3 bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-4">
          Lead Transfer History
        </h3>
        {leadTransferHistoryUsersNames.map((transfer) => (
          <div key={transfer.transferredAt} className="border p-4 rounded-md">
            <p>Transferred By: {transfer.transferredBy}</p>
            <p>Assigned To: {transfer.assignedTo}</p>
            <p className="text-sm text-gray-500 mt-2">
              Transferred At:{" "}
              {new Date(transfer.transferredAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>

      {/* Note Popup */}
      {showNotePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-lg font-bold text-gray-700">Add Note</h3>
            <textarea
              className="w-full p-2 border rounded-md mt-4"
              rows="4"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
            ></textarea>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => setShowNotePopup(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={handleAddNote}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interaction History Popup */}
      {showInteractionHistoryPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-lg font-bold text-gray-700">
              Add Interaction History Stage
            </h3>
            <input
              type="text"
              placeholder="Stage Name"
              className="w-full p-2 border rounded-md mt-4"
              value={interactionHistoryInput.stage_Name}
              onChange={(e) =>
                setInteractionHistoryInput({
                  ...interactionHistoryInput,
                  stage_Name: e.target.value,
                })
              }
            />
            <textarea
              placeholder="Stage Detail"
              className="w-full p-2 border rounded-md mt-4"
              rows="4"
              value={interactionHistoryInput.stage_Detail}
              onChange={(e) =>
                setInteractionHistoryInput({
                  ...interactionHistoryInput,
                  stage_Detail: e.target.value,
                })
              }
            ></textarea>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => setShowInteractionHistoryPopup(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={handleAddInteractionHistory}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SalesLeadDetails;
