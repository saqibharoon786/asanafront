import React from "react";

const SalesLeads = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {/* Dashboard Header */}
      <div className="mb-6 text-center sm:text-left">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">
          Sales Dashboard
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Track your sales, revenue, and performance metrics at a glance.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6">
        {[
          { title: "Total Revenue", value: "$120K", icon: "💰", bg: "bg-blue-500" },
          { title: "New Leads", value: "150", icon: "🆕", bg: "bg-green-500" },
          { title: "Closed Deals", value: "75", icon: "✅", bg: "bg-yellow-500" },
          { title: "Customer Satisfaction", value: "95%", icon: "🌟", bg: "bg-purple-500" },
        ].map((item, index) => (
          <div
            key={index}
            className={`${item.bg} text-white shadow rounded-lg p-4 sm:p-6 flex items-center justify-between`}
          >
            <div>
              <p className="text-xs sm:text-sm font-semibold">{item.title}</p>
              <p className="text-2xl sm:text-3xl font-bold mt-2">{item.value}</p>
            </div>
            <div className="text-4xl sm:text-6xl">{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Sales Graph Placeholder */}
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6">
        <h2 className="text-gray-900 text-xl sm:text-2xl font-semibold mb-4">
          Monthly Sales Graph
        </h2>
        <div className="h-48 sm:h-64 bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">[Graph Placeholder]</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-gray-900 text-xl sm:text-2xl font-semibold mb-4">
          Recent Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200">
                {["Customer", "Date", "Amount", "Status", "Actions"].map((header, idx) => (
                  <th
                    key={idx}
                    className="py-2 px-2 sm:py-3 sm:px-4 text-left text-gray-600 font-medium text-xs sm:text-sm"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, customer: "Acme Corp.", date: "2023-12-01", amount: "$5,500", status: "Closed" },
                { id: 2, customer: "Beta LLC", date: "2023-11-29", amount: "$3,200", status: "Pending" },
                { id: 3, customer: "Gamma Inc.", date: "2023-11-28", amount: "$7,800", status: "Closed" },
              ].map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="py-2 px-2 sm:py-3 sm:px-4 text-gray-700 text-xs sm:text-sm">
                    {order.customer}
                  </td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4 text-gray-600 text-xs sm:text-sm">
                    {order.date}
                  </td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4 text-gray-900 font-bold text-xs sm:text-sm">
                    {order.amount}
                  </td>
                  <td
                    className={`py-2 px-2 sm:py-3 sm:px-4 text-center text-xs sm:text-sm ${
                      order.status === "Closed" ? "text-green-600" : "text-yellow-500"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm">
                    <button className="text-blue-500 hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesLeads;
