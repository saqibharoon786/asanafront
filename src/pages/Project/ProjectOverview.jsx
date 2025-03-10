import React from "react";

const ProjectOverview = () => {
  return (
    <>
      {/* Outer Container for Left and Right Sections */}
      <div className="flex ">
        {/* Scrollable Left Section */}
        <div className=" bg-gray-700 py-6 px-40 w-2/3 text-white">
          <h2 className="text-2xl font-bold my-4">Project Description</h2>

          {/* Project Roles */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Project Roles</h3>
            <div className="flex items-center gap-4 my-2">
              <button className="px-4 py-2 bg-gray-700 rounded border border-gray-500">
                + Add Member
              </button>
              <span className="flex items-center gap-2">
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://api.dicebear.com/6.x/avataaars/svg?seed=User6"
                  alt="User"
                />
                <p>Umer Khayam (Project Owner)</p>
              </span>
            </div>
          </div>

          {/* Connected Goals */}
          <h3 className="text-xl font-semibold my-2">Connected Goals</h3>
          <div className="mx-auto mb-6 bg-gray-50/10 flex border border-gray-500 p-6 rounded-lg">
            <img
              className="w-32"
              src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/98e78878c97c4d398e6265b92028d97dfb33043c/shooting_target.svg"
              alt="Goal"
            />
            <div className="flex flex-col gap-4">
              <p>
                Connect or create a goal to link this project to a larger
                purpose.
              </p>
              <button className="mt-2 px-4 py-2 bg-gray-700 rounded">
                + Add Goal
              </button>
            </div>
          </div>

          {/* Connected Portfolios */}
          <h3 className="text-xl font-semibold my-2">Connected Portfolios</h3>
          <div className="mx-auto mb-6 bg-gray-50/10 border border-gray-500 p-6 rounded-lg">
            <div className="flex items-center gap-4">
              <img
                className="w-32"
                src="http://d3ki9tyy5l5ruj.cloudfront.net/obj/eec973d84ee9922e06efd37775ea0dd9e9391271/organization_structure_dark_mode.svg"
                alt="Portfolio"
              />
              <p>
                Connect a portfolio to link this project to a larger body of
                work.
              </p>
            </div>
            <button className="mt-2 px-4 py-2 bg-gray-700 rounded">
              + Add to Portfolio
            </button>
          </div>

          {/* Key Resources */}
          <h3 className="text-xl font-semibold my-2">Key Resources</h3>
          <div className="mx-auto mb-6 bg-gray-50/10 border border-gray-500 p-6 rounded-lg">
            <div className="flex items-center gap-4">
              <img
                className="w-32"
                src="https://d3ki9tyy5l5ruj.cloudfront.net/obj/f696815edc59be79affd1063efd6728836b8e5e4/key_resources.svg"
                alt="Resources"
              />
              <p>Manage key resources to support this project effectively.</p>
            </div>
          </div>
        </div>

        {/* Fixed Right Section */}
        <div className="w-1/3 bg-gray-800 px-6 text-white  ">
          <h3 className="text-xl font-semibold">Project Status</h3>
          <div className="mt-4 flex gap-2">
            <button className="px-4 py-2 bg-green-600 rounded">On Track</button>
            <button className="px-4 py-2 bg-yellow-600 rounded">At Risk</button>
            <button className="px-4 py-2 bg-red-600 rounded">Off Track</button>
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-semibold">Recent Activity</h4>
            <div className="mt-4 text-gray-300">
              <div className="flex items-center gap-2">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://api.dicebear.com/6.x/avataaars/svg?seed=User1"
                  alt="User"
                />
                <span>
                  You, saqibharoonharoon@gmail.com, and Umer Khayam joined
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://api.dicebear.com/6.x/avataaars/svg?seed=User2"
                  alt="User"
                />
                <span>My workspace team joined</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectOverview;
