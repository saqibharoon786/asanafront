// import React, { useState } from "react";

// const ProjectShare = () => {
//   // Move all useState hooks to the top (not inside conditionals)
//   const [email, setEmail] = useState("");
//   const [access, setAccess] = useState("Editor");
//   const [notify, setNotify] = useState(false);
//   const [members, setMembers] = useState([
//     { name: "Task collaborators", role: "Editor" },
//     { name: "My workspace", role: "Editor" },
//     {
//       name: "Satti Squad Group",
//       role: "Project admin",
//       email: "saqibharoonharoon@gmail.com",
//     },
//   ]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Function to handle modal open/close
//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   // Handle form submission or invite logic
//   const handleInviteClick = () => {
//     console.log(`Invite sent to ${email} with ${access} role.`);
//   };

//   return (
//     <>
//       {/* Share Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg w-96">
//             {/* Modal Header */}
//             <div className="flex justify-between items-center">
//               <h2 className="text-lg font-semibold">Share Project</h2>
//               <button
//                 onClick={closeModal}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <span className="font-bold text-xl">&times;</span>
//               </button>
//             </div>

//             {/* Invite Email */}
//             <div className="mt-4">
//               <label className="block text-gray-700">Invite with email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Add members by name or email..."
//                 className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//               />
//               <select
//                 value={access}
//                 onChange={(e) => setAccess(e.target.value)}
//                 className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//               >
//                 <option value="Editor">Editor</option>
//                 <option value="Viewer">Viewer</option>
//               </select>
//               <div className="mt-2 flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={notify}
//                   onChange={() => setNotify(!notify)}
//                 />
//                 <label className="text-gray-600">
//                   Notify when tasks are added to the project
//                 </label>
//               </div>
//               <button
//                 onClick={handleInviteClick}
//                 className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//               >
//                 Invite
//               </button>
//             </div>

//             {/* Access Settings */}
//             <div className="mt-4">
//               <label className="block text-gray-700">Access settings</label>
//               <select className="mt-2 p-2 w-full border border-gray-300 rounded-md">
//                 <option value="My workspace">My workspace</option>
//                 <option value="Other Workspace">Other Workspace</option>
//               </select>
//             </div>

//             {/* Members List */}
//             <div className="mt-4">
//               <label className="block text-gray-700">Members</label>
//               <div className="mt-2">
//                 {members.map((member, index) => (
//                   <div
//                     key={index}
//                     className="flex justify-between items-center text-gray-600"
//                   >
//                     <span>{member.name}</span>
//                     <span className="text-gray-500">{member.role}</span>
//                   </div>
//                 ))}
//               </div>
//               <button
//                 className="mt-2 text-blue-500 hover:text-blue-600"
//                 onClick={() => alert("Manage notifications clicked")}
//               >
//                 Manage notifications
//               </button>
//             </div>

//             {/* Footer */}
//             <div className="mt-4 flex justify-between">
//               <button
//                 onClick={closeModal}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

      
//       <button
//         onClick={openModal}
//         className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//       >
//         Share
//       </button>
//     </>
//   );
// };

// export default ProjectShare;
