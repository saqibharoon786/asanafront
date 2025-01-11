import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const customers = [
  {
    name: "TTECh 1",
    companyName: "TTECh",
    email: "sohaib1@example.com",
    workPhone: "03091005929",
    receivables: "AED0.00",
    phone: "1234567890",
    website: "www.ttech1.com",
    status: "Active",
    mobilePhone: "0987654321",
    unusedCredits: "50",
    unusedCreditsBCY: "60",
    source: "Online",
    firstName: "Sohaib",
    lastName: "Mushtaq",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 2",
    companyName: "TTECh",
    email: "sohaib2@example.com",
    workPhone: "03091005930",
    receivables: "AED10.00",
    phone: "1234567891",
    website: "www.ttech2.com",
    status: "Active",
    mobilePhone: "0987654322",
    unusedCredits: "60",
    unusedCreditsBCY: "70",
    source: "Offline",
    firstName: "Ali",
    lastName: "Khan",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 3",
    companyName: "TTECh",
    email: "sohaib3@example.com",
    workPhone: "03091005931",
    receivables: "AED20.00",
    phone: "1234567892",
    website: "www.ttech3.com",
    status: "Inactive",
    mobilePhone: "0987654323",
    unusedCredits: "40",
    unusedCreditsBCY: "50",
    source: "Online",
    firstName: "John",
    lastName: "Doe",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 4",
    companyName: "TTECh",
    email: "sohaib4@example.com",
    workPhone: "03091005932",
    receivables: "AED30.00",
    phone: "1234567893",
    website: "www.ttech4.com",
    status: "Active",
    mobilePhone: "0987654324",
    unusedCredits: "70",
    unusedCreditsBCY: "80",
    source: "Online",
    firstName: "Jane",
    lastName: "Smith",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 5",
    companyName: "TTECh",
    email: "sohaib5@example.com",
    workPhone: "03091005933",
    receivables: "AED40.00",
    phone: "1234567894",
    website: "www.ttech5.com",
    status: "Active",
    mobilePhone: "0987654325",
    unusedCredits: "80",
    unusedCreditsBCY: "90",
    source: "Offline",
    firstName: "Mary",
    lastName: "Johnson",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 6",
    companyName: "TTECh",
    email: "sohaib6@example.com",
    workPhone: "03091005934",
    receivables: "AED50.00",
    phone: "1234567895",
    website: "www.ttech6.com",
    status: "Active",
    mobilePhone: "0987654326",
    unusedCredits: "60",
    unusedCreditsBCY: "70",
    source: "Online",
    firstName: "David",
    lastName: "Williams",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 7",
    companyName: "TTECh",
    email: "sohaib7@example.com",
    workPhone: "03091005935",
    receivables: "AED60.00",
    phone: "1234567896",
    website: "www.ttech7.com",
    status: "Inactive",
    mobilePhone: "0987654327",
    unusedCredits: "50",
    unusedCreditsBCY: "60",
    source: "Online",
    firstName: "Emma",
    lastName: "Brown",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 8",
    companyName: "TTECh",
    email: "sohaib8@example.com",
    workPhone: "03091005936",
    receivables: "AED70.00",
    phone: "1234567897",
    website: "www.ttech8.com",
    status: "Active",
    mobilePhone: "0987654328",
    unusedCredits: "40",
    unusedCreditsBCY: "50",
    source: "Offline",
    firstName: "Lucas",
    lastName: "Taylor",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 9",
    companyName: "TTECh",
    email: "sohaib9@example.com",
    workPhone: "03091005937",
    receivables: "AED80.00",
    phone: "1234567898",
    website: "www.ttech9.com",
    status: "Active",
    mobilePhone: "0987654329",
    unusedCredits: "90",
    unusedCreditsBCY: "100",
    source: "Online",
    firstName: "Olivia",
    lastName: "Anderson",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 10",
    companyName: "TTECh",
    email: "sohaib10@example.com",
    workPhone: "03091005938",
    receivables: "AED90.00",
    phone: "1234567899",
    website: "www.ttech10.com",
    status: "Active",
    mobilePhone: "0987654330",
    unusedCredits: "80",
    unusedCreditsBCY: "90",
    source: "Offline",
    firstName: "Isabella",
    lastName: "Thomas",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 11",
    companyName: "TTECh",
    email: "sohaib11@example.com",
    workPhone: "03091005939",
    receivables: "AED100.00",
    phone: "1234567900",
    website: "www.ttech11.com",
    status: "Inactive",
    mobilePhone: "0987654331",
    unusedCredits: "70",
    unusedCreditsBCY: "80",
    source: "Online",
    firstName: "Liam",
    lastName: "Jackson",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 12",
    companyName: "TTECh",
    email: "sohaib12@example.com",
    workPhone: "03091005940",
    receivables: "AED110.00",
    phone: "1234567901",
    website: "www.ttech12.com",
    status: "Active",
    mobilePhone: "0987654332",
    unusedCredits: "60",
    unusedCreditsBCY: "70",
    source: "Offline",
    firstName: "Mason",
    lastName: "White",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 13",
    companyName: "TTECh",
    email: "sohaib13@example.com",
    workPhone: "03091005941",
    receivables: "AED120.00",
    phone: "1234567902",
    website: "www.ttech13.com",
    status: "Active",
    mobilePhone: "0987654333",
    unusedCredits: "50",
    unusedCreditsBCY: "60",
    source: "Online",
    firstName: "Sophia",
    lastName: "Harris",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 14",
    companyName: "TTECh",
    email: "sohaib14@example.com",
    workPhone: "03091005942",
    receivables: "AED130.00",
    phone: "1234567903",
    website: "www.ttech14.com",
    status: "Inactive",
    mobilePhone: "0987654334",
    unusedCredits: "40",
    unusedCreditsBCY: "50",
    source: "Offline",
    firstName: "Ethan",
    lastName: "Martin",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 15",
    companyName: "TTECh",
    email: "sohaib15@example.com",
    workPhone: "03091005943",
    receivables: "AED140.00",
    phone: "1234567904",
    website: "www.ttech15.com",
    status: "Active",
    mobilePhone: "0987654335",
    unusedCredits: "30",
    unusedCreditsBCY: "40",
    source: "Online",
    firstName: "Ava",
    lastName: "Davis",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 16",
    companyName: "TTECh",
    email: "sohaib16@example.com",
    workPhone: "03091005944",
    receivables: "AED150.00",
    phone: "1234567905",
    website: "www.ttech16.com",
    status: "Active",
    mobilePhone: "0987654336",
    unusedCredits: "20",
    unusedCreditsBCY: "30",
    source: "Offline",
    firstName: "Isabella",
    lastName: "Garcia",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 17",
    companyName: "TTECh",
    email: "sohaib17@example.com",
    workPhone: "03091005945",
    receivables: "AED160.00",
    phone: "1234567906",
    website: "www.ttech17.com",
    status: "Active",
    mobilePhone: "0987654337",
    unusedCredits: "10",
    unusedCreditsBCY: "20",
    source: "Online",
    firstName: "Mason",
    lastName: "Rodriguez",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 18",
    companyName: "TTECh",
    email: "sohaib18@example.com",
    workPhone: "03091005946",
    receivables: "AED170.00",
    phone: "1234567907",
    website: "www.ttech18.com",
    status: "Inactive",
    mobilePhone: "0987654338",
    unusedCredits: "0",
    unusedCreditsBCY: "10",
    source: "Offline",
    firstName: "Ethan",
    lastName: "Lee",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 19",
    companyName: "TTECh",
    email: "sohaib19@example.com",
    workPhone: "03091005947",
    receivables: "AED180.00",
    phone: "1234567908",
    website: "www.ttech19.com",
    status: "Active",
    mobilePhone: "0987654339",
    unusedCredits: "50",
    unusedCreditsBCY: "60",
    source: "Online",
    firstName: "Olivia",
    lastName: "Young",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 20",
    companyName: "TTECh",
    email: "sohaib20@example.com",
    workPhone: "03091005948",
    receivables: "AED190.00",
    phone: "1234567909",
    website: "www.ttech20.com",
    status: "Active",
    mobilePhone: "0987654340",
    unusedCredits: "40",
    unusedCreditsBCY: "50",
    source: "Offline",
    firstName: "David",
    lastName: "Hernandez",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 21",
    companyName: "TTECh",
    email: "sohaib21@example.com",
    workPhone: "03091005949",
    receivables: "AED200.00",
    phone: "1234567910",
    website: "www.ttech21.com",
    status: "Inactive",
    mobilePhone: "0987654341",
    unusedCredits: "30",
    unusedCreditsBCY: "40",
    source: "Online",
    firstName: "Sophia",
    lastName: "Martinez",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 22",
    companyName: "TTECh",
    email: "sohaib22@example.com",
    workPhone: "03091005950",
    receivables: "AED210.00",
    phone: "1234567911",
    website: "www.ttech22.com",
    status: "Active",
    mobilePhone: "0987654342",
    unusedCredits: "20",
    unusedCreditsBCY: "30",
    source: "Online",
    firstName: "James",
    lastName: "Jackson",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 23",
    companyName: "TTECh",
    email: "sohaib23@example.com",
    workPhone: "03091005951",
    receivables: "AED220.00",
    phone: "1234567912",
    website: "www.ttech23.com",
    status: "Active",
    mobilePhone: "0987654343",
    unusedCredits: "10",
    unusedCreditsBCY: "20",
    source: "Offline",
    firstName: "Mason",
    lastName: "White",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 24",
    companyName: "TTECh",
    email: "sohaib24@example.com",
    workPhone: "03091005952",
    receivables: "AED230.00",
    phone: "1234567913",
    website: "www.ttech24.com",
    status: "Inactive",
    mobilePhone: "0987654344",
    unusedCredits: "0",
    unusedCreditsBCY: "10",
    source: "Online",
    firstName: "Liam",
    lastName: "Davis",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 25",
    companyName: "TTECh",
    email: "sohaib25@example.com",
    workPhone: "03091005953",
    receivables: "AED240.00",
    phone: "1234567914",
    website: "www.ttech25.com",
    status: "Active",
    mobilePhone: "0987654345",
    unusedCredits: "50",
    unusedCreditsBCY: "60",
    source: "Offline",
    firstName: "Charlotte",
    lastName: "Hernandez",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 26",
    companyName: "TTECh",
    email: "sohaib26@example.com",
    workPhone: "03091005954",
    receivables: "AED250.00",
    phone: "1234567915",
    website: "www.ttech26.com",
    status: "Active",
    mobilePhone: "0987654346",
    unusedCredits: "40",
    unusedCreditsBCY: "50",
    source: "Online",
    firstName: "Amelia",
    lastName: "Lopez",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 27",
    companyName: "TTECh",
    email: "sohaib27@example.com",
    workPhone: "03091005955",
    receivables: "AED260.00",
    phone: "1234567916",
    website: "www.ttech27.com",
    status: "Inactive",
    mobilePhone: "0987654347",
    unusedCredits: "30",
    unusedCreditsBCY: "40",
    source: "Offline",
    firstName: "Aiden",
    lastName: "Gonzalez",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 28",
    companyName: "TTECh",
    email: "sohaib28@example.com",
    workPhone: "03091005956",
    receivables: "AED270.00",
    phone: "1234567917",
    website: "www.ttech28.com",
    status: "Active",
    mobilePhone: "0987654348",
    unusedCredits: "20",
    unusedCreditsBCY: "30",
    source: "Online",
    firstName: "Harper",
    lastName: "Wilson",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 29",
    companyName: "TTECh",
    email: "sohaib29@example.com",
    workPhone: "03091005957",
    receivables: "AED280.00",
    phone: "1234567918",
    website: "www.ttech29.com",
    status: "Active",
    mobilePhone: "0987654349",
    unusedCredits: "10",
    unusedCreditsBCY: "20",
    source: "Offline",
    firstName: "Mia",
    lastName: "Martinez",
    paymentTerms: "30 Days",
  },
  {
    name: "TTECh 30",
    companyName: "TTECh",
    email: "sohaib30@example.com",
    workPhone: "03091005958",
    receivables: "AED290.00",
    phone: "1234567919",
    website: "www.ttech30.com",
    status: "Inactive",
    mobilePhone: "0987654350",
    unusedCredits: "0",
    unusedCreditsBCY: "10",
    source: "Online",
    firstName: "Sebastian",
    lastName: "Moore",
    paymentTerms: "30 Days",
  },
];

const PanelCustomer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    companyName: true,
    email: true,
    workPhone: true,
    receivables: true,
    phone: true,
    website: true,
    status: true,
    mobilePhone: true,
    unusedCredits: true,
    unusedCreditsBCY: true,
    source: true,
    firstName: true,
    lastName: true,
    paymentTerms: true,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleColumnToggle = (column) => {
    setVisibleColumns((prevState) => ({
      ...prevState,
      [column]: !prevState[column],
    }));
  };

  const handleAddCustomerClick = () => {
    navigate("/add-customers"); // Navigate to AddCustomer page
  };

  return (
    <div className="mx-auto p-6">
      <div className="flex justify-between items-center space-x-4 space-y-4 mb-4">
        <div className="text-lg font-semibold">All Customers</div>
        <div className="flex space-x-2">
          {/* "+ New" Button */}
          <button
            onClick={handleAddCustomerClick} // Trigger navigation when button is clicked
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center"
          >
            <span className="mr-2">+</span> New
          </button>

          {/* Three-dot Menu Button */}
          <button className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400 flex items-center">
            <span className="text-xl">...</span>
          </button>
        </div>
      </div>

      {/* Customized Column Button */}

      {/* Modal for Column Customization */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] ">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold">Customize Columns</div>
              <button
                onClick={toggleModal}
                className="text-gray-600 hover:text-gray-900"
              >
                X
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Column List with checkboxes */}
            <div className="space-y-3">
              {Object.keys(visibleColumns).map((column) => {
                const columnName = column.replace(/([A-Z])/g, " $1");
                const isVisible = visibleColumns[column];
                const isChecked = searchQuery
                  ? columnName.toLowerCase().includes(searchQuery.toLowerCase())
                  : true;

                return (
                  isChecked && (
                    <div className="flex items-center" key={column}>
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={isVisible}
                        onChange={() => handleColumnToggle(column)}
                      />
                      <span>{columnName}</span>
                    </div>
                  )
                );
              })}
            </div>

            {/* Footer with Save and Cancel buttons */}
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={toggleModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table with Scrollbar */}
      <div className=" mt-4 max-h-[600px] overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200 ">
    <thead className="s bg-gray-100 border border-gray-700 p-1">
      <tr >
        {visibleColumns.name && (
          <th className="text-left border border-gray-300">
            <div className="relative inline-block">
              <button
                onClick={toggleModal}
                className="text-gray-700 px-4 py-2 rounded-md hover:bg-blue-300 flex items-center"
              >
                {/* Icon */}
                <svg
                  className="w-5 h-5 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                >
                  <path d="M511 378.2h-47.1v-47.1h-32v47.1h-47.1v32h47.1v47.1h32v-47.1H511zM103.9 378.2H33.2V164h398.7v119.5h32V54.8H1.2v355.4h335.6v-32H103.9zm0-291.4h328V132H33.2V86.8h70.7z"></path>
                </svg>
              </button>
            </div>
            <input type="checkbox" className="mr-2" />
            NAME <span className="text-gray-500 text-xs">⇅</span>
          </th>
        )}
        {visibleColumns.companyName && (
          <th className=" text-left border border-gray-300">
            COMPANY NAME
          </th>
        )}
        {visibleColumns.email && (
          <th className="text-left border border-gray-300">
            EMAIL
          </th>
        )}
        {visibleColumns.workPhone && (
          <th className="text-left border border-gray-300">
            WORK PHONE
          </th>
        )}
        {visibleColumns.receivables && (
          <th className="text-left border border-gray-300">
            RECEIVABLES (BCY)
          </th>
        )}
        {visibleColumns.phone && (
          <th className="text-left border border-gray-300">
            PHONE
          </th>
        )}
        {visibleColumns.website && (
          <th className="text-left border border-gray-300">
            WEBSITE
          </th>
        )}
        {visibleColumns.status && (
          <th className="text-left border border-gray-300">
            STATUS
          </th>
        )}
        {visibleColumns.mobilePhone && (
          <th className="text-left border border-gray-300">
            MOBILE PHONE
          </th>
        )}
        {visibleColumns.unusedCredits && (
          <th className="text-left border border-gray-300">
            UNUSED CREDITS
          </th>
        )}
        {visibleColumns.unusedCreditsBCY && (
          <th className="text-left border border-gray-300">
            UNUSED CREDITS (BCY)
          </th>
        )}
        {visibleColumns.source && (
          <th className="text-left border border-gray-300">
            SOURCE
          </th>
        )}
        {visibleColumns.firstName && (
          <th className="text-left border border-gray-300">
            FIRST NAME
          </th>
        )}
        {visibleColumns.lastName && (
          <th className="text-left border border-gray-300">
            LAST NAME
          </th>
        )}
        {visibleColumns.paymentTerms && (
          <th className="text-left border border-gray-300">
            PAYMENT TERMS
          </th>
        )}
      </tr>
    </thead>

    <tbody>
      {customers.map((customer, index) => (
        <tr key={index} className="border-t border-gray-300 hover:bg-gray-50">
          {visibleColumns.name && (
            <td className="px-4 py-2 border border-gray-300">
              <input type="checkbox" className="mr-2" />
              {customer.name}
            </td>
          )}
          {visibleColumns.companyName && (
            <td className="px-4 py-2 border border-gray-300">{customer.companyName}</td>
          )}
          {visibleColumns.email && (
            <td className="px-4 py-2 border border-gray-300">{customer.email}</td>
          )}
          {visibleColumns.workPhone && (
            <td className="px-4 py-2 border border-gray-300">{customer.workPhone}</td>
          )}
          {visibleColumns.receivables && (
            <td className="px-4 py-2 border border-gray-300">{customer.receivables}</td>
          )}
          {visibleColumns.phone && (
            <td className="px-4 py-2 border border-gray-300">{customer.phone}</td>
          )}
          {visibleColumns.website && (
            <td className="px-4 py-2 border border-gray-300">{customer.website}</td>
          )}
          {visibleColumns.status && (
            <td className="px-4 py-2 border border-gray-300">{customer.status}</td>
          )}
          {visibleColumns.mobilePhone && (
            <td className="px-4 py-2 border border-gray-300">{customer.mobilePhone}</td>
          )}
          {visibleColumns.unusedCredits && (
            <td className="px-4 py-2 border border-gray-300">{customer.unusedCredits}</td>
          )}
          {visibleColumns.unusedCreditsBCY && (
            <td className="px-4 py-2 border border-gray-300">{customer.unusedCreditsBCY}</td>
          )}
          {visibleColumns.source && (
            <td className="px-4 py-2 border border-gray-300">{customer.source}</td>
          )}
          {visibleColumns.firstName && (
            <td className="px-4 py-2 border border-gray-300">{customer.firstName}</td>
          )}
          {visibleColumns.lastName && (
            <td className="px-4 py-2 border border-gray-300">{customer.lastName}</td>
          )}
          {visibleColumns.paymentTerms && (
            <td className="px-4 py-2 border border-gray-300">{customer.paymentTerms}</td>
          )}
        </tr>
      ))}
    </tbody>
  </table>

</div>


    </div>
  );
};

export default PanelCustomer;
