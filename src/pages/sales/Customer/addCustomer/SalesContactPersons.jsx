import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createContactPersons } from "../../../../features/customerSlice";

const SalesContactPersons = () => {
  const dispatch = useDispatch();
  const contactPersons = useSelector(
    (state) => state.customer.customer_ContactPersons
  );

  const handleContactPersons = (index, field) => (e) => {
    dispatch(
      createContactPersons({
        index,
        field,
        value: e.target.value,
      })
    );
  };

  const handleRemoveContactPerson = (index) => {
    dispatch(
      createContactPersons({
        index,
        action: "remove",
      })
    );
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Contact Persons</h2>
      {contactPersons.map((person, index) => (
        <div key={index} className="border p-4 mb-4 rounded grid grid-cols-6 gap-4">
          <input
            type="text"
            placeholder="Salutation"
            value={person.salutation}
            onChange={handleContactPersons(index, "salutation")}
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="text"
            placeholder="First Name"
            value={person.firstName}
            onChange={handleContactPersons(index, "firstName")}
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={person.lastName}
            onChange={handleContactPersons(index, "lastName")}
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={person.email}
            onChange={handleContactPersons(index, "email")}
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="text"
            placeholder="Phone"
            value={person.phone}
            onChange={handleContactPersons(index, "phone")}
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="text"
            placeholder="Designation"
            value={person.designation}
            onChange={handleContactPersons(index, "designation")}
            className="w-full border px-2 py-1 rounded"
          />
          <button
            onClick={() => handleRemoveContactPerson(index)}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() =>
          dispatch(createContactPersons({ index: contactPersons.length }))
        }
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Contact Person
      </button>
    </div>
  );
};

export default SalesContactPersons;
